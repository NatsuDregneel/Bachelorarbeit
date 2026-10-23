<script setup lang="ts">
    type RecapPhase = 'uv1' | 'uv2' | 'uv3';

    defineProps<{ modelValue: RecapPhase }>();
    const emit = defineEmits<{
        'update:modelValue': [phase: RecapPhase];
    }>();
</script>

<template>
    <!-- Navbar -->
    <nav class="navbar">
        <button type="button" :class="{ active: modelValue === 'uv1' }" @click="emit('update:modelValue', 'uv1')">Phase UV1</button>
        <button type="button" :class="{ active: modelValue === 'uv2' }" @click="emit('update:modelValue', 'uv2')">Phase UV2</button>
        <button type="button" :class="{ active: modelValue === 'uv3' }" @click="emit('update:modelValue', 'uv3')">Phase UV3</button>
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