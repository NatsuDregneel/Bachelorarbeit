<script setup lang="ts">
    import { inject, onMounted, onUnmounted, ref } from 'vue'

    const props = withDefaults(defineProps<{ text?: string; title?: string }>(), {
        text: 'Ich nutze gerade die Gamified AID-Environment!',
        title: 'Gamified AID-Environment',
    })

    // provided by the app of a group (only Group 2 does); otherwise a no-op
    const onShare = inject<() => void>('onShare', () => {})

    const open = ref(false)
    const copyState = ref<'idle' | 'ok' | 'failed'>('idle')
    const root = ref<HTMLElement | null>(null)

    function done(): void {
        onShare()
        open.value = false
    }

    function viaMail(): void {
        window.location.href =
            `mailto:?subject=${encodeURIComponent(props.title)}&body=${encodeURIComponent(props.text)}`
        done()
    }

    function viaSms(): void {
        window.location.href = `sms:?&body=${encodeURIComponent(props.text)}`
        done()
    }

    function viaWhatsApp(): void {
        window.open(`https://wa.me/?text=${encodeURIComponent(props.text)}`, '_blank', 'noopener')
        done()
    }

    async function copyText(): Promise<void> {
        try {
            await navigator.clipboard.writeText(props.text)
            copyState.value = 'ok'
            onShare()
        } catch {
            copyState.value = 'failed'
        }
        setTimeout(() => { copyState.value = 'idle'; open.value = false }, 1200)
    }

    // close on outside click and Escape
    function onDocClick(e: MouseEvent): void {
        if (open.value && root.value && !root.value.contains(e.target as Node)) open.value = false
    }
    function onKey(e: KeyboardEvent): void {
        if (e.key === 'Escape') open.value = false
    }
    onMounted(() => {
        document.addEventListener('click', onDocClick)
        document.addEventListener('keydown', onKey)
    })
    onUnmounted(() => {
        document.removeEventListener('click', onDocClick)
        document.removeEventListener('keydown', onKey)
    })
</script>

<template>
    <div ref="root" class="share">
        <button class="share-btn" aria-haspopup="menu" :aria-expanded="open" @click="open = !open">
            Share
        </button>

        <div v-if="open" class="socials" role="menu">
            <button class="item" role="menuitem" @click="viaMail">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
                </svg>
                Per E-Mail teilen
            </button>
            <button class="item" role="menuitem" @click="viaSms">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 5h16v11H9l-5 4z" />
                </svg>
                Per SMS teilen
            </button>
            <button class="item" role="menuitem" @click="viaWhatsApp">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" />
                </svg>
                Auf WhatsApp teilen
            </button>
            <button class="item" role="menuitem" @click="copyText">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h8" />
                </svg>
                <span v-if="copyState === 'ok'">Kopiert!</span>
                <span v-else-if="copyState === 'failed'">Kopieren nicht möglich</span>
                <span v-else>Text kopieren</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
    .share { position: relative; display: inline-block; }

    .share-btn {
        background-color: #eeeffd;
        padding: 8px 16px;
        border: none;
        border-radius: 10px;
        font-size: 20px;
        cursor: pointer;
    }

    .share-btn:hover { color: #5b65dc; }

    .socials {
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 8px;
        padding: 6px;
        min-width: 230px;
        background: #eeeffd;
        border-radius: 12px;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        white-space: nowrap;
        z-index: 10;
    }

    .item {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        padding: 10px 12px;
        background: none;
        border: none;
        border-radius: 8px;
        font-size: 15px;
        text-align: left;
        cursor: pointer;
    }

    .item:hover,
    .item:focus-visible {
        background: #eeeffd;
        color: #5b65dc;
        outline: none;
    }
</style>