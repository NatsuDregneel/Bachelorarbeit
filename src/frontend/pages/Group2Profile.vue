<script setup lang="ts">
    import RecapNotUnlocked from '../components/recap/RecapNotUnlocked.vue';
    import RecapQuestsAvatar from '../components/recap/RecapQuestsAvatar.vue';
    import { recapAvailable } from '../storage/recap.js';
    import Avatar from '../components/avatar/Avatar.vue';
    import Quests from '../components/quests/Quests.vue';

</script>

<template>
    <div class="profile">
        <!-- Flex Layout  -->
        <div class="card" style="flex: 1;">
            <Quests />
        </div>
        <div class="flexRechts" style="flex: 2;">
            <RecapQuestsAvatar v-if="recapAvailable" class="card" style="flex: 1;"/>
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