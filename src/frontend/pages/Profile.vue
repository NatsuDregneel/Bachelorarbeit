<script setup lang="ts">
    import Streaks from '../components/streaks/Streaks.vue';
    import RecapNotUnlocked from '../components/recap/RecapNotUnlocked.vue';
    import RecapStreakBadges from '../components/recap/RecapStreakBadges.vue';

</script>

<template>
    <div class="profile">
        <!-- Flex Layout  -->
        <Streaks class="card" style="flex: 1;"/>
        <div class="flexRechts" style="flex: 2;">
            <RecapStreakBadges class="card" style="flex: 1;"/>
            <Badges class="card" style="flex: 1;"/>
        </div>
    </div>
</template>

<style scoped>
    .profile {
        display: flex;
        gap: 50px;
        padding: 25px;
        min-height: 90vh;
        box-sizing: border-box;
    }

    .card {
        border: solid;
        border-color: #b7b7b7;
        border-radius: 10px;
    }

    .flexRechts {
        display: flex; flex-direction: column; gap: 50px;
    }
</style>