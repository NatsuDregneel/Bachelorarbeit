<script setup lang="ts"></script>

<template>
    <div class="recap">
        <!-- Experiment Rückblick Header -->
        <div class="header">
            <span style="font-size: 30px; font-weight: bold;">Experiment R&uumlblick</span>
        </div>
        <!-- Experiment Rückblick freischalten Text -->
        <div style="width: 600px;">
            <p style="font-size: 20px;">Dein <span style="font-weight: bold;">Experiment Rückblick</span> wird freigeschaltet sobald die Experimentenphase abgeschlossen ist und du über den Verlauf der Phase eine aktive <span class="highlighted">Streak</span> gehalten hast.</p>
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