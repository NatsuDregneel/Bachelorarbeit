<script setup lang="ts">
    import Badge from './Badge.vue';
    import { unlockedBadges } from '../../storage/badgesList.js';
</script>

<template>
    <div v-if="unlockedBadges.length > 0" class="badge-grid">
        <Badge v-for="badge in unlockedBadges" :key="badge.id"
            :title="badge.title"
            :description="badge.description"
            :current="badge.currentNumber"
            :target="badge.maxNumber"
            :color="badge.color"
            :unlocked-at="badge.unlockedAt"
        />
    </div>
    <p v-else style="text-align: center;">Es wurden noch keine Abzeichen freigeschaltet.</p>
</template>

<style scoped>
    .badge-grid {
        --badge-row-height: 270px;
        --badge-row-gap: 50px;

        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        grid-auto-rows: var(--badge-row-height);
        gap: var(--badge-row-gap) 50px;
        justify-items: center;
        width: 100%;
        align-items: stretch;
        max-height: var(--badge-row-height);
        overflow-y: auto;
        scrollbar-gutter: stable;
    }
</style>
