import { ref } from 'vue'
import { badges } from './badges.js'
import { unlockIfReached } from './badgeUnlockedDate.js'
import { storageKey } from './storageKey.js'

const STORAGE_KEY = storageKey('sport-badge-count')

/** Loads the amount of sport exercises from localStorage */
function loadSportEntryCount(): number {
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

// Number of sport exercises added by the user, stored in localStorage
export const sportEntryCount = ref(loadSportEntryCount())

/** Checks if a sport badge can be unlocked and unlocks it if so */
function unlockReachedSportBadges(): void {
    for (const badge of badges.filter(({ id }) => /^Sport[1-4]$/.test(id))) {
        unlockIfReached(badge.id, sportEntryCount.value, badge.maxNumber)
    }
}

unlockReachedSportBadges()

/** Increases the counter of entered sport exercises and then checks the sport badges */
export function registerSportsEntered(count: number): void {
    // Check if the count is a positive safe integer
    if (!Number.isSafeInteger(count) || count <= 0) {
        throw new RangeError('Sport entry count must be a positive safe integer.')
    }

    sportEntryCount.value += count
    // Save the updated count to localStorage
    try {
        localStorage.setItem(STORAGE_KEY, String(sportEntryCount.value))
    } catch {
        // Keep the in-memory progress for the current session if storage is unavailable.
    }
    unlockReachedSportBadges()
}
