<script setup lang="ts">
    import { active } from 'd3';
    type AvatarProperty = 'basis' | 'hair' | 'face' | 'accessory';
    
    defineProps<{ modelValue: AvatarProperty }>();
    const emit = defineEmits<{
        'update:modelValue': [property: AvatarProperty];
    }>();
</script>

<template>
    <!-- Navbar -->
    <nav class="navbar">
        <button type="button" :class="{ active: modelValue === 'basis'}" @click="emit('update:modelValue', 'basis')">Basis</button>
        <button type="button" :class="{ active: modelValue === 'hair'}" @click="emit('update:modelValue', 'hair')">Haare</button>
        <button type="button" :class="{ active: modelValue === 'face'}" @click="emit('update:modelValue', 'face')">Gesicht</button>
        <button type="button" :class="{ active: modelValue === 'accessory'}" @click="emit('update:modelValue', 'accessory')">Accessoires</button>
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