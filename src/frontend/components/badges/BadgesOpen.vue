<script setup lang="ts">
    import Badge from './Badge.vue';
    import { openBadges } from '../../storage/badgesList.js';
</script>

<template>
    <div v-if="openBadges.length > 0" class="badge-grid">
        <Badge v-for="badge in openBadges" :key="badge.id"
            :title="badge.title"
            :description="badge.description"
            :current="badge.currentNumber"
            :target="badge.maxNumber"
            :color="badge.color"
        />
    </div>
    <p v-else style="text-align: center;">Es wurden noch keine Abzeichen freigeschaltet.</p>
</template>

<style scoped>
    .badge-grid {
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 30px 10px;
        justify-items: center;
        width: 100%;
        align-items: stretch;
    }
</style>
