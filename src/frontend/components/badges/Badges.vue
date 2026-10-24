<script setup lang="ts">
    import { ref } from 'vue';
    import ShareBtn from '../ShareBtn.vue';
    import BadgeInfo from './BadgeInfo.vue';
    import BadgeNavbar from './BadgeNavbar.vue';
    import BadgesOpen from './BadgesOpen.vue';
    import BadgesUnlocked from './BadgesUnlocked.vue';

    const BadgeProperty = ref<'open' | 'unlocked'>('open');
</script>

<template>
    <div class="badges">
        <!-- Streak Header -->
        <div class="header">
            <span style="font-size: 30px; font-weight: bold;">Abzeichen</span>
            <BadgeNavbar v-model="BadgeProperty" />
            <div class="buttons">
                <ShareBtn />
                <BadgeInfo />
            </div>
        </div>
        <div>
            <!-- Badges -->
             <BadgesOpen v-if="BadgeProperty === 'open'" />
             <BadgesUnlocked v-if="BadgeProperty === 'unlocked'" />
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
}

.badges {
    display: grid; 
    justify-items: center;
    gap: 25px;
    border: solid;
    border-color: #b7b7b7;
    padding: 25px;
}

.buttons {
        display: flex; 
        gap: 25px;
        align-items: center;
        justify-content: flex-end;
        justify-self: end;
    }
</style>