<script setup lang="ts">
    import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
    import { leaveDialog, answerLeave } from '../../util/leaveConfirm.js'

    const cancelButton = ref<HTMLButtonElement | null>(null)

    // focus lands on "Abbrechen", so a stray Enter key does not throw changes away
    watch(() => leaveDialog.visible, async (visible) => {
        if (visible) {
            await nextTick()
            cancelButton.value?.focus()
        }
    })

    function onKeydown(e: KeyboardEvent): void {
        if (leaveDialog.visible && e.key === 'Escape') answerLeave(false)
    }
    onMounted(() => window.addEventListener('keydown', onKeydown))
    onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
    <Transition name="fade">
        <div v-if="leaveDialog.visible" class="backdrop" @click.self="answerLeave(false)">
            <div class="dialog" role="alertdialog" aria-modal="true" aria-labelledby="leave-message">
                <p id="leave-message" class="message">
                    Bist du sicher, dass du die Bearbeitung abbrechen willst?
                    Alle deine Änderungen gehen verloren.
                </p>
                <div class="buttons">
                    <button class="btn danger" @click="answerLeave(true)">
                        Ohne Speichern<br />Fortfahren
                    </button>
                    <button ref="cancelButton" class="btn cancel" @click="answerLeave(false)">
                        Abbrechen
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
    .backdrop {
        position: fixed;
        inset: 0;
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.4);
    }

    .dialog {
        width: min(500px, calc(100vw - 40px));
        box-sizing: border-box;
        padding: 25px;
        background: #fff;
        border: 2px solid #000;
        border-radius: 20px;
        text-align: center;
    }

    .message {
        margin: 0 0 25px;
        font-size: 20px;
        line-height: 1.3;
    }

    .buttons {
        display: flex;
        gap: 20px;
    }

    .btn {
        flex: 1;
        padding: 10px;
        border-radius: 12px;
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
    }

    .danger {
        background: #ff0000;
        color: #fff;
        border: 2px solid #ff0000;
    }

    .cancel {
        background: #eeeffd;
        color: #000;
        border: 2px solid #000;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>