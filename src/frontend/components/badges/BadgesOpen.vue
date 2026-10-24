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
    <p v-else style="text-align: center;">Du hast eine unglaubliche Leistung gezeigt und alle Abzeichen sind bereits freigeschaltet! </p>
</template>

<style scoped>
    .badge-grid {
        --badge-row-height: 270px;
        --badge-row-gap: 50px;

        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
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
