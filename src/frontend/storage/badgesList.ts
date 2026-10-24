import { computed } from 'vue'
import { badges, tierColors } from './badges.js'
import { getBadgeMilestoneProgress, unlockDates } from './badgeUnlockedDate.js'
import { mealEntryCount } from './mealBadgeProgress.js'
import { sportEntryCount } from './sportBadgeProgress.js'
import { getActiveStreak } from './streak.js'

// all badges with their color and (if earned) the unlock date
export const displayBadges = computed(() =>
    badges.map(b => ({
        ...b,
        currentNumber: b.id.startsWith('Meal')
            ? mealEntryCount.value
            : /^Sport[1-4]$/.test(b.id) ? sportEntryCount.value
            : /^Streak[1-4]$/.test(b.id) ? getActiveStreak()
            : /^badges[1-4]$/.test(b.id) ? getBadgeMilestoneProgress(b.id) : b.currentNumber,
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