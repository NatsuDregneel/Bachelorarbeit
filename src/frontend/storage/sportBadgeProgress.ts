import { ref } from 'vue'
import { badges } from './badges.js'
import { unlockIfReached } from './badgeUnlockedDate.js'

const STORAGE_KEY = 'sport-badge-count'

function loadSportEntryCount(): number {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw === null) return 0

        const count = Number(raw)
        return Number.isSafeInteger(count) && count >= 0 ? count : 0
    } catch {
        return 0
    }
}

export const sportEntryCount = ref(loadSportEntryCount())

function unlockReachedSportBadges(): void {
    for (const badge of badges.filter(({ id }) => /^Sport[1-4]$/.test(id))) {
        unlockIfReached(badge.id, sportEntryCount.value, badge.maxNumber)
    }
}

unlockReachedSportBadges()

export function registerSportsEntered(count: number): void {
    if (!Number.isSafeInteger(count) || count <= 0) {
        throw new RangeError('Sport entry count must be a positive safe integer.')
    }

    sportEntryCount.value += count
    try {
        localStorage.setItem(STORAGE_KEY, String(sportEntryCount.value))
    } catch {
        // Keep the in-memory progress for the current session if storage is unavailable.
    }
    unlockReachedSportBadges()
}
