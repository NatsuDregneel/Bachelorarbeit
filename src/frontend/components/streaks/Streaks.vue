<script setup lang="ts">
    import { computed } from 'vue';
    import ShareBtn from '../ShareBtn.vue';
    import StreakInfo from './StreakInfo.vue';
    import CurrentStreak from './CurrentStreak.vue';
    import StreakCalendar from './StreakCalendar.vue';
    import { getActiveStreak } from '../../storage/streak.js';

    const activeStreak = computed(() => getActiveStreak());
</script>

<template>
    <div class="streak">
        <!-- Streak Header -->
        <div style="display: flex;">
            <span class="title" style="flex: 4;">T&aumlgliche Streak</span>
            <!-- Streak Header Buttons -->
            <div style="flex: 1;" class="buttons">
                <ShareBtn />
                <StreakInfo />
            </div>
        </div>
        <div>
            <!-- Current Streak Anzeige-->
            <CurrentStreak />
            <p v-if="activeStreak > 0" class="helptext">
                Du hast eine aktive <span class="highlight">Streak</span>! Bleib dran und trage jeden Tag eine <strong>Mahlzeit</strong>, <strong>Sporteinheit</strong> oder <strong>Bolus</strong> ein, um deine <span class="highlightedorange">Streak</span> am Laufen zu halten!
            </p>
            <p v-else class="helptext">
                Du hast noch keine aktive <span class="highlight">Streak</span>, trage eine <strong>Mahlzeit</strong>, <strong>Sporteinheit</strong> oder <strong>Bolus</strong> ein, um deine <span class="highlightedorange">Streak</span> zu starten!
            </p>
        </div>
        <div class="calendar">
            <!-- Streak Kalender -->
             <p class="calendarTitle">Streak &Uumlbersicht</p>
            <StreakCalendar />
        </div>
    </div>
</template>

<style scoped>
    .streak {
        display: flex;
        flex-direction: column;
        padding: 25px;
        gap: 90px;
    }

    .calendar {
        margin-top: auto;
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

    .helptext {
        font-size: 20px;
        text-align: center;
    }

    .highlight,
    .highlightedorange {
        color: #f59e38;
        font-weight: bold;
    }

    .calendarTitle {
        text-align: center; 
        font-size: 25px; 
        font-weight: bold;
    }
</style>