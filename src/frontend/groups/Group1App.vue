<script lang="ts">
    import { defineComponent, watchEffect } from 'vue'
    import Navbar from '../components/Navbar.vue'
    import StreakBanner from '../components/streaks/StreakBanner.vue';
    import RecapBanner from '../components/recap/RecapBanner.vue';
    import BadgeUnlockBanner from '../components/badges/BadgeUnlockBanner.vue';
    import { checkRecapReached } from '../storage/recap.js'
    import { unlockIfReached } from '../storage/badgeUnlockedDate.js'
    import { getActiveStreak, registerActivity } from '../storage/streak.js'
    import { registerMealsEntered } from '../storage/mealBadgeProgress.js'
    import { registerSportsEntered } from '../storage/sportBadgeProgress.js'

    unlockIfReached('login', 1, 1)
    watchEffect(() => checkRecapReached(getActiveStreak())) 

    export default defineComponent({
        components: {
            Navbar,
            StreakBanner,
            RecapBanner,
            BadgeUnlockBanner,
        },
        methods: {
            onMealAdded(n: number) {
                registerActivity()
                registerMealsEntered(n)
            },
            onExerciseAdded(n: number) {
                registerActivity()
                registerSportsEntered(n)
            },
        }
    })

</script>

<template>
    <Navbar class="navbar"/>
    <StreakBanner/>
    <RecapBanner/>
    <BadgeUnlockBanner/>
    <router-view v-slot="{ Component }: { Component: any }">
    <keep-alive>
        <component :is="Component" @meal-added="onMealAdded" @exercise-added="onExerciseAdded" />
    </keep-alive>
    </router-view>
</template>

<style scoped>
.navbar {
    margin-left: 25px; 
    margin-right: 25px;
}
</style>