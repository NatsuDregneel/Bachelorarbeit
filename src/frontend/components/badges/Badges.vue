<script setup lang="ts">
    import { ref } from 'vue';
    import ShareBtn from '../ShareBtn.vue';
    import BadgeInfo from './BadgeInfo.vue';
    import BadgeNavbar from './BadgeNavbar.vue';
    import BadgesOpen from './BadgesOpen.vue';
    import BadgesUnlocked from './BadgesUnlocked.vue';
    import { unlockedBadges, displayBadges } from '../../storage/badgesList.js';

    const BadgeProperty = ref<'open' | 'unlocked'>('open');
</script>

<template>
    <div class="badges">
        <!-- Streak Header -->
        <div class="header">
            <span style="font-size: 30px; font-weight: bold;">Abzeichen</span>
            <BadgeNavbar v-model="BadgeProperty" />
            <div class="buttons">
                <ShareBtn :text="`Ich habe ${unlockedBadges.length} von ${displayBadges.length} Abzeichen in der Gamifizierten AID-Umgebung freigeschaltet!`" />
                <BadgeInfo />
            </div>
        </div>
        <div class="badge-content">
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
    grid-template-rows: auto minmax(0, 1fr);
    justify-items: center;
    gap: 25px;
    height: 100%;
    min-height: 0;
    overflow: hidden;
    border: solid;
    border-color: #b7b7b7;
    padding: 25px;
    box-sizing: border-box;
}

.badge-content {
    width: 100%;
    min-height: 0;
    overflow-y: auto;
}

.buttons {
        display: flex; 
        gap: 25px;
        align-items: center;
        justify-content: flex-end;
        justify-self: end;
    }
</style>