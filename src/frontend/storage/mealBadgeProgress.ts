import { ref } from 'vue'
import { badges } from './badges.js'
import { unlockIfReached } from './badgeUnlockedDate.js'

const STORAGE_KEY = 'meal-badge-count'

function loadMealEntryCount(): number {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw === null) return 0

        const count = Number(raw)
        return Number.isSafeInteger(count) && count >= 0 ? count : 0
    } catch {
        return 0
    }
}

export const mealEntryCount = ref(loadMealEntryCount())

function unlockReachedMealBadges(): void {
    for (const badge of badges.filter(({ id }) => id.startsWith('Meal'))) {
        unlockIfReached(badge.id, mealEntryCount.value, badge.maxNumber)
    }
}

unlockReachedMealBadges()

export function registerMealsEntered(count: number): void {
    if (!Number.isSafeInteger(count) || count <= 0) {
        throw new RangeError('Meal entry count must be a positive safe integer.')
    }

    mealEntryCount.value += count
    try {
        localStorage.setItem(STORAGE_KEY, String(mealEntryCount.value))
    } catch {
        // Keep the in-memory progress for the current session if storage is unavailable.
    }
    unlockReachedMealBadges()
}
