<script setup lang="ts">
    import { onBeforeUnmount, ref, watch } from 'vue'
    import { avatarSaveCount } from '../../storage/avatar.js'

    const visible = ref(false)
    let hideTimeout: ReturnType<typeof setTimeout> | undefined

    watch(avatarSaveCount, () => {
        visible.value = true
        if (hideTimeout) clearTimeout(hideTimeout)
        hideTimeout = setTimeout(() => {
            visible.value = false
        }, 3000)
    })

    onBeforeUnmount(() => {
        if (hideTimeout) clearTimeout(hideTimeout)
    })
</script>

<template>
    <Transition name="banner">
        <div v-if="visible" class="banner" role="status" aria-live="polite">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M0 0h16v16H0z" fill="none" />
                <g fill="#5b65dc">
                    <path d="M11 6a3 3 0 1 1-6 0a3 3 0 0 1 6 0" />
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </g>
            </svg>
            <p class="text"><span class="highlight">Avatar erfolgreich abgespeichert</span></p>
        </div>
    </Transition>
</template>

<style scoped>
    .banner {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 600px;
        border: solid;
        border-radius: 30px;
        border-color: #b7b7b7;
        z-index: 100;
    }

    .banner-enter-active,
    .banner-leave-active {
        transition: top 0.4s ease, opacity 0.4s ease;
    }

    .banner-enter-from,
    .banner-leave-to {
        top: -120px;
        opacity: 0;
    }

    .text {
        font-size: 20px;
    }

    .highlight {
        color: #5b65dc;
        font-weight: bold;
    }
</style>
