import { computed } from 'vue'
import { badges, tierColors } from './badges.js'
import { unlockDates } from './badgeUnlockedDate.js'

// all badges with their color and (if earned) the unlock date
export const displayBadges = computed(() =>
    badges.map(b => ({
        ...b,
        color: tierColors[b.tier],
        unlockedAt: unlockDates[b.id] as string | undefined,
    })))

export const openBadges = computed(() =>
    displayBadges.value.filter(b => !b.unlockedAt))

// newest first
export const unlockedBadges = computed(() =>
    displayBadges.value
        .filter(b => b.unlockedAt)
        .sort((a, b) => (b.unlockedAt ?? '').localeCompare(a.unlockedAt ?? '')))