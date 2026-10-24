<script setup lang="ts">
    const emit =defineEmits<{ (event: 'openRecap'): void }>()
</script>

<template>
    <div class="recap">
        <!-- Experiment Rückblick Header -->
        <div class="header">
            <span style="font-size: 30px; font-weight: bold;">Experiment Rückblick</span>
        </div>
        <!-- Experiment Rückblick freischalten Text -->
        <div class="button-container">
            <button class="button" @click="emit('openRecap')">Experiment Rückblick freischalten</button>
        </div>
    </div>
</template>

<style scoped>
    .header {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .button {
        background-color: #eeeffd;
        padding: 10px;
        border: none;
        border-radius: 10px;
        font-size: 20px;
        cursor: pointer;
    }

    .recap {
        display: grid; 
        justify-items: center;
        border: solid;
        border-color: #b7b7b7;
        padding: 25px;
    }
</style>