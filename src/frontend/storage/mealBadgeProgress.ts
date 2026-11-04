import { ref } from 'vue'
import { badges } from './badges.js'
import { unlockIfReached } from './badgeUnlockedDate.js'
import { storageKey } from './storageKey.js'

const STORAGE_KEY = storageKey('meal-badge-count')

/** Loads the amount of meals from localStorage */
function loadMealEntryCount(): number {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw === null) return 0

        const count = Number(raw)
        // Check if the count is a safe integer and non-negative
        return Number.isSafeInteger(count) && count >= 0 ? count : 0
    } catch {
        return 0
    }
}

// Number of meals added by the user, stored in localStorage
export const mealEntryCount = ref(loadMealEntryCount())

/** Checks if a meal badge can be unlocked and unlocks it if so */
function unlockReachedMealBadges(): void {
    for (const badge of badges.filter(({ id }) => id.startsWith('Meal'))) {
        unlockIfReached(badge.id, mealEntryCount.value, badge.maxNumber)
    }
}

unlockReachedMealBadges()

/** Increases the counter of entered meals and then checks the meal badges */
export function registerMealsEntered(count: number): void {
    // Check if the count is a positive safe integer
    if (!Number.isSafeInteger(count) || count <= 0) {
        throw new RangeError('Meal entry count must be a positive safe integer.')
    }

    mealEntryCount.value += count
    // save to localStorage
    try {
        localStorage.setItem(STORAGE_KEY, String(mealEntryCount.value))
    } catch {
        // Keep the in-memory progress for the current session if storage is unavailable.
    }
    
    // Check whether the new meals unlock a badge
    unlockReachedMealBadges()
}
