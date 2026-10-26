<script setup lang="ts">
    import { onBeforeUnmount, ref, watch } from 'vue'
    import { streakBannerVisible, streakIncreaseVersion } from '../../storage/streak.js'

    // Streak Banner Visibility und Transtion
    const visible = ref(false)
    let hideTimeout: ReturnType<typeof setTimeout> | undefined

    watch(streakIncreaseVersion, () => {
        streakBannerVisible.value = true
        visible.value = true
    }, { flush: 'sync' })

    function hideAfterEnter() {
        hideTimeout = setTimeout(() => {
            visible.value = false
        }, 3000)
    }

    function afterLeave() {
        streakBannerVisible.value = false
    }

    onBeforeUnmount(() => {
        if (hideTimeout) clearTimeout(hideTimeout)
        streakBannerVisible.value = false
    })
</script>

<template>
    <Transition name="banner" appear @after-enter="hideAfterEnter" @after-leave="afterLeave">
        <div v-if="visible" class="banner">
            <!-- Icon-->
            <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="#f29d38" d="M12.063 2.065a.67.67 0 0 0-.759.149a.8.8 0 0 0-.205.738c.099.44.151.9.151 1.37c0 1.076-.271 1.83-.738 2.455c-.474.635-1.16 1.152-2.027 1.735a.3.3 0 0 0-.038.031l-.105.106a6.75 6.75 0 1 0 9.685 2.63a.25.25 0 0 0-.413-.05l-.208.241c-.878 1.026-1.587 1.855-3.04 2.225c-.062.015-.1.004-.127-.013a.24.24 0 0 1-.091-.124a.41.41 0 0 1 .074-.414c.777-.843 1.329-1.987 1.526-3.614c.37-3.048-1.015-6.294-3.685-7.465" />
            </svg>
            <!-- Text -->
            <p class="text">Deine <span class="highlight">Streak</span> hat sich erhöht!</p>
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
        color: #f59e38;
        font-weight: bold;
    }
</style>