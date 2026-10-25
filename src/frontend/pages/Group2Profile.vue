<script setup lang="ts">
    import RecapNotUnlocked from '../components/recap/RecapNotUnlocked.vue';
    import { recapAvailable } from '../storage/recap.js';
    import Avatar from '../components/avatar/Avatar.vue';

</script>

<template>
    <div class="profile">
        <!-- Flex Layout  -->
        <p class="card" style="flex: 1;">Quests</p>
        <div class="flexRechts" style="flex: 2;">
            <p v-if="recapAvailable" class="card" style="flex: 1;">Recap Available</p>
            <RecapNotUnlocked v-else class="card" style="flex: 1;"/>
            <Avatar class="card" style="flex: 1;" />
        </div>
    </div>
</template>

<style scoped>
    .profile {
        display: flex;
        gap: 50px;
        padding: 25px;
        height: max-content;
        min-height: 100vh;
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