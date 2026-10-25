<script setup lang="ts">
    import { active } from 'd3';

    type BadgeProperty = 'open' | 'unlocked';

    defineProps<{ modelValue: BadgeProperty }>();
    const emit = defineEmits<{
        'update:modelValue': [property: BadgeProperty];
    }>();
</script>

<template>
    <!-- Navbar -->
    <nav class="navbar">
        <button type="button" :class="{ active: modelValue === 'open'}" @click="emit('update:modelValue', 'open')">Offen</button>
        <button type="button" :class="{ active: modelValue === 'unlocked'}" @click="emit('update:modelValue', 'unlocked')">Erhalten</button>
    </nav>
</template>

<style scoped>
    .navbar {
        display: flex;
        justify-content: center;
        gap: 25px;
        padding: 10px;
        border-radius: 20px;
    }

    .navbar button {
        background: transparent;
        border: none;
        border-bottom: solid transparent;
        cursor: pointer;
        font-size: 20px;
        color: #000000;
        display: block;
        padding: 10px;
        position: relative;
    }

    .navbar button:hover,
    .navbar button.active {
        color: #5b65dc;
    }

    .navbar button.active {
        border-bottom-color: currentColor;
    }
</style>