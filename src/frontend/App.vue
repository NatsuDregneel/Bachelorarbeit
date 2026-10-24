<script lang="ts">
    import { defineComponent, watchEffect } from 'vue'
    import Navbar from './components/Navbar.vue'
    import StreakBanner from './components/streaks/StreakBanner.vue';
    import RecapBanner from './components/recap/RecapBanner.vue';
    import { checkRecapReached } from './storage/recap.js'
    import { getActiveStreak } from './storage/streak.js'

    watchEffect(() => checkRecapReached(getActiveStreak())) 

    export default defineComponent({
        components: {
            Navbar,
            StreakBanner,
            RecapBanner
        }
    })
</script>

<template>
    <Navbar class="navbar"/>
    <StreakBanner/>
    <RecapBanner/>
    <router-view v-slot="{ Component }: { Component: any }">
    <keep-alive>
        <component :is="Component" />
    </keep-alive>
</router-view>
</template>

<style scoped>
.navbar {
    margin-left: 25px; 
    margin-right: 25px;
}
</style>