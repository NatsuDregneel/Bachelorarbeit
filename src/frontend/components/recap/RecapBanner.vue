<script setup lang="ts">
    import { onBeforeUnmount, ref, watch } from 'vue'
    import { recapAvailable } from '../../storage/recap.js'
    import { badgeBannerPending } from '../../storage/badgeUnlockedDate.js'
    import { questBannerPending } from '../../storage/questProgress.js'
    import { streakBannerVisible } from '../../storage/streak.js'

    const visible = ref(false)
    let hideTimeout: ReturnType<typeof setTimeout> | undefined

    watch(
        [recapAvailable, questBannerPending, badgeBannerPending, streakBannerVisible],
        ([available, questPending, badgePending, streakVisible]) => {
            if (available && !questPending && !badgePending && !streakVisible) visible.value = true
        },
        { immediate: true, flush: 'sync' },
    )

    function hideAfterEnter() {
        hideTimeout = setTimeout(() => {
            visible.value = false
        }, 3000)
    }

    onBeforeUnmount(() => {
        if (hideTimeout) clearTimeout(hideTimeout)
    })
</script>

<template>
    <Transition name="banner" appear @after-enter="hideAfterEnter">
        <div v-if="visible" class="banner">
            <p class="text">Dein <span class="highlight">Experiment-Rückblick</span> ist jetzt freigeschaltet!</p>
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
