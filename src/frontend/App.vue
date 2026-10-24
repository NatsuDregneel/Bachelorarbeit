<script lang="ts">
    import { defineComponent, watchEffect } from 'vue'
    import Navbar from './components/Navbar.vue'
    import StreakBanner from './components/streaks/StreakBanner.vue';
    import { checkRecapReached } from './storage/recap.js'
    import { getActiveStreak } from './storage/streak.js'

    watchEffect(() => checkRecapReached(getActiveStreak())) 

    export default defineComponent({
        components: {
            Navbar,
            StreakBanner
        }
    })
</script>

<template>
    <Navbar class="navbar"/>
    <StreakBanner/>
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