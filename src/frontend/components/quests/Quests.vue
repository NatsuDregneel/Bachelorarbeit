<script setup lang="ts">
    import { computed } from 'vue'
    import ShareBtn from '../ShareBtn.vue';
    import QuestInfo from './QuestInfo.vue';
    import DailyQuests from './DailyQuests.vue'
    import ExperimentQuests from './ExperimentQuests.vue'
    import {
        dailyMealQuestProgress, dailyShareQuestProgress, dailySportQuestProgress,
        experimentAvatarQuestProgress, experimentMealQuestProgress, experimentShareQuestProgress,
        experimentSportQuestProgress,
    } from '../../storage/questProgress.js'

    const completedDailyQuests = computed(() =>
        Number(dailyMealQuestProgress.value >= 2) +
        Number(dailySportQuestProgress.value >= 1) +
        Number(dailyShareQuestProgress.value >= 1))
    const completedExperimentQuests = computed(() =>
        Number(experimentMealQuestProgress.value >= 24) +
        Number(experimentSportQuestProgress.value >= 3) +
        Number(experimentAvatarQuestProgress.value >= 3) +
        Number(experimentShareQuestProgress.value >= 12))
    const shareText = computed(() =>
        `Ich habe ${completedDailyQuests.value} Tägliche Quests und ` +
        `${completedExperimentQuests.value} Experiment-Quests in der Gamifizierten AID-Umgebung abgeschlossen!`)

</script>

<template>
    <div class="quests">
        <!-- Streak Header -->
        <div style="display: flex;">
            <span class="title" style="flex: 4;">Quests</span>
            <!-- Streak Header Buttons -->
            <div style="flex: 1;" class="buttons">
                <ShareBtn :text="shareText" />
                <QuestInfo />
            </div>
        </div>
        <div class="sections">
            <DailyQuests />
            <ExperimentQuests />
        </div>
    </div>
</template>

<style scoped>
    .quests {
        display: flex;
        flex-direction: column;
        padding: 25px;
        gap: 90px;
    }


    .title {
        font-size: 30px;
        font-weight: bold;
    }

    .buttons {
        display: flex; 
        gap: 25px;
        align-items: center;
        justify-content: flex-end;
    }

    .sections { display: grid; gap: 40px; }
</style>