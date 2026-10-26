<script setup lang="ts">
    import { onBeforeUnmount, ref, watch } from 'vue'
    import { completedQuestQueue, questBannerPending } from '../../storage/questProgress.js'

    const questLabels: Record<string, string> = {
        'daily-meals': 'Tägliche Mahlzeiten-Quest',
        'daily-sport': 'Tägliche Sport-Quest',
        'daily-share': 'Tägliche Teilen-Quest',
        'experiment-meals': 'Experiment-Mahlzeiten-Quest',
        'experiment-sport': 'Experiment-Sport-Quest',
        'experiment-avatar': 'Avatar-Quest',
        'experiment-share': 'Teilen-Quest',
    }

    const currentQuest = ref<string | null>(null)
    const visible = ref(false)
    let hideTimeout: ReturnType<typeof setTimeout> | undefined

    function showNextQuest(): void {
        if (currentQuest.value) return
        if (completedQuestQueue.value.length === 0) {
            questBannerPending.value = false
            return
        }
        questBannerPending.value = true
        currentQuest.value = completedQuestQueue.value.shift() ?? null
        visible.value = currentQuest.value !== null
    }

    function hideAfterEnter(): void {
        hideTimeout = setTimeout(() => { visible.value = false }, 3000)
    }

    function showFollowingQuest(): void {
        currentQuest.value = null
        showNextQuest()
    }

    watch(completedQuestQueue, showNextQuest, { deep: true, immediate: true })

    onBeforeUnmount(() => {
        if (hideTimeout) clearTimeout(hideTimeout)
    })
</script>

<template>
    <Transition name="banner" @after-enter="hideAfterEnter" @after-leave="showFollowingQuest">
        <div v-if="visible && currentQuest" class="banner">
            <p class="text">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"
                    aria-hidden="true">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="currentColor" d="M21 16h-1V5c0-1.65-1.35-3-3-3H5C3.35 2 2 3.35 2 5v3c0 .55.45 1 1 1h3v10c0 1.65 1.35 3 3 3h10c1.65 0 3-1.35 3-3v-2c0-.55-.45-1-1-1M4 7V5c0-.55.45-1 1-1s1 .45 1 1v2zm6 10v2c0 .55-.45 1-1 1s-1-.45-1-1V5c0-.35-.07-.69-.18-1H17c.55 0 1 .45 1 1v11h-7c-.55 0-1 .45-1 1m10 2c0 .55-.45 1-1 1h-7.17a3 3 0 0 0 .17-1v-1h8z" />
                </svg>
                <span class="highlight">{{ questLabels[currentQuest] }}</span> abgeschlossen!
            </p>
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
        align-items: center;
        justify-content: center;
        width: min(600px, calc(100vw - 32px));
        border: solid 1px #b7b7b7;
        border-radius: 30px;
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
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 20px;
    }
    .text svg { flex: 0 0 auto; color: #5b65dc; }
    .highlight { color: #5b65dc; font-weight: bold; }
</style>
