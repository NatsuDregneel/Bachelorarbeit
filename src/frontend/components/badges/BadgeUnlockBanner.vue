<script setup lang="ts">
    import { onBeforeUnmount, ref, watch } from 'vue'
    import { badges, tierColors } from '../../storage/badges.js'
    import { badgeUnlockQueue } from '../../storage/badgeUnlockedDate.js'

    const currentBadge = ref<(typeof badges)[number] | null>(null)
    let hideTimeout: ReturnType<typeof setTimeout> | undefined

    function showNextBadge(): void {
        if (currentBadge.value || badgeUnlockQueue.value.length === 0) return

        const event = badgeUnlockQueue.value.shift()
        if (!event) return

        const badge = badges.find(({ id }) => id === event.id)
        if (!badge) {
            showNextBadge()
            return
        }

        currentBadge.value = badge
    }

    watch(badgeUnlockQueue, showNextBadge, { deep: true, immediate: true })

    function hideAfterEnter(): void {
        hideTimeout = setTimeout(() => {
            currentBadge.value = null
        }, 3000)
    }

    function showFollowingBadge(): void {
        showNextBadge()
    }

    onBeforeUnmount(() => {
        if (hideTimeout) clearTimeout(hideTimeout)
    })
</script>

<template>
    <Transition
        name="banner"
        appear
        @after-enter="hideAfterEnter"
        @after-leave="showFollowingBadge"
    >
        <div v-if="currentBadge" class="banner">
            <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M0 0h24v24H0z" fill="none" />
                <path :fill="tierColors[currentBadge.tier]" d="M12 2a7 7 0 0 0-4 12.75V21l4-2l4 2v-6.25A7 7 0 0 0 12 2Zm0 2a5 5 0 1 1 0 10a5 5 0 0 1 0-10Z" />
            </svg>
            <p class="text">Abzeichen freigeschaltet: <span class="highlight">{{ currentBadge.title }}</span></p>
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
        font-weight: bold;
    }
</style>
