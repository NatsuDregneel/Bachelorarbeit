<script setup lang="ts">
    // Determine the group from the page name, e.g. ".../group2.html" (same approach as storageKey.ts)
    const isGroup1 = location.pathname.includes('group1')
    const isGroup2 = location.pathname.includes('group2')
</script>

<template>
    <div class="recap">
        <!-- Experiment Rückblick Header -->
        <div class="header">
            <span style="font-size: 30px; font-weight: bold;">Experiment-Rückblick</span>
        </div>
        <!-- Experiment Rückblick freischalten Text -->
        <div style="width: 600px;">
            <!-- Group 1: unlocked by reaching a streak of 12 days -->
            <p v-if="isGroup1" style="font-size: 20px;">
                Dein <span style="font-weight: bold;">Experiment-Rückblick</span> wird freigeschaltet, sobald die
                Experimentphase abgeschlossen ist und du über den Verlauf der Phase eine aktive
                <span class="highlighted">Streak</span> gehalten hast.
            </p>
            <!-- Group 2: unlocked by completing all experiment quests -->
            <p v-if="isGroup2" style="font-size: 20px;">
                Dein <span style="font-weight: bold;">Experiment-Rückblick</span> wird freigeschaltet, sobald die
                Experimentphase abgeschlossen ist und du alle <span class="highlighted">Experiment-Quests</span> abgeschlossen hast.
            </p>
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.recap {
    display: grid;
    justify-items: center;
    border: solid;
    border-color: #b7b7b7;
    padding: 25px;
}

.highlighted {
    color: #f59e38;
    font-weight: 700;
}
</style>