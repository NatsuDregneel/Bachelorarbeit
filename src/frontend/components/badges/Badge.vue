<script setup lang="ts">
    import { computed } from 'vue'

    const props = defineProps<{
        title: string
        description: string
        current: number
        target: number
        color: string
        unlockedAt?: string   // ISO date, only set once the badge is earned
    }>()

    const unlockedText = computed(() =>
        props.unlockedAt
            ? `Freigeschaltet am ${new Date(props.unlockedAt).toLocaleDateString('de-DE')}`
            : '')
</script>

<template>
    <div class="badge">
        <svg xmlns="http://www.w3.org/2000/svg" width="75px" height="75px" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path :fill="color" d="M12 18c4.41 0 8-3.59 8-8s-3.59-8-8-8s-8 3.59-8 8s3.59 8 8 8" />
            <path :fill="color" d="M7 17.48V21c0 .35.18.67.47.85s.66.2.97.04l3.55-1.78l3.55 1.78a.997.997 0 0 0 1.45-.89v-3.52c-1.43.96-3.15 1.52-5 1.52s-3.57-.56-5-1.52Z" />
        </svg>
        <span class="badgeTitel">{{ title }}</span>
        <span class="badgeText">{{ description }}</span>
        <span v-if="unlockedAt" class="badgeText unlocked">{{ unlockedText }}</span>
        <span v-else class="badgeText">{{ Math.min(current, target) }}/{{ target }}</span>
    </div>
</template>

<style scoped>
    .badge {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        width: 100%;
        height: 100%;
        text-align: center;
    }

    .badgeTitel {
        font-size: 20px;
        line-height: 1.3;
        min-height: 2.6em;      /* space for two lines */
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .badgeText {
        max-width: 120px;
    }

    .unlocked {
        color: #5b65dc;
        font-size: 12px;
    }

    /* progress or unlock date always sits at the bottom of the row */
    .badge > :last-child {
        margin-top: auto;
    }
</style>