import { reactive, ref } from 'vue'
import { badges } from './badges.js'
import { storageKey } from './storageKey.js'

const STORAGE_KEY = storageKey('badge-unlocks')

/** Loads the badge unlock dates from localStorage */
function load(): Record<string, string> {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) return JSON.parse(raw)
    } catch { /* ignore broken storage */ }
    return {}
}

// badge id -> ISO date string of the moment it was unlocked
export const unlockDates = reactive<Record<string, string>>(load())
// flag for badges that have been unlocked, so that the banner can be shown
export const badgeUnlockQueue = ref<Array<{ id: string, unlockedAt: string }>>([])
// flag to show the badge banner
export const badgeBannerPending = ref(false)

// Set for meta badges (badge badges) that are unlocked when a certain number of other badges are unlocked
const metaBadgeIds = new Set(['badges1', 'badges2', 'badges3', 'badges4'])

/** Returns the progress of meta badges (badge badges) */
export function getBadgeMilestoneProgress(id: string): number {
    const unlockedBadges = badges.filter(badge => unlockDates[badge.id])

    // switch on id to check which meta badge (badge badge) to check for progress
    switch (id) {
        case 'badges1':
            return unlockedBadges.filter(({ id: badgeId }) => !metaBadgeIds.has(badgeId)).length
        case 'badges2':
            return unlockedBadges.filter(({ id: badgeId, tier }) =>
                !metaBadgeIds.has(badgeId) && tier === 'bronze').length
        case 'badges3':
            return unlockedBadges.filter(({ id: badgeId, tier }) =>
                !metaBadgeIds.has(badgeId) && tier === 'silver').length
        case 'badges4':
            return unlockedBadges.filter(({ id: badgeId }) => badgeId !== id).length
        default:
            return 0
    }
}

/** Saves the unlock date of a badge */
function recordUnlock(id: string): void {
    const unlockedAt = new Date().toISOString()
    unlockDates[id] = unlockedAt
    badgeBannerPending.value = true
    badgeUnlockQueue.value.push({ id, unlockedAt })
}

/** Saves the unlock dates to localStorage */
function saveUnlockDates(): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockDates))
    } catch { /* ignore */ }
}

/* checks if any meta badges (badge badges) can be unlocked and unlocks it if so */
function unlockReachedMetaBadges(): void {
    let unlockedNewBadge: boolean
    do {
        unlockedNewBadge = false
        // Check each meta badge (badge badge) to see if it can be unlocked
        for (const id of metaBadgeIds) {
            const badge = badges.find(candidate => candidate.id === id)
            // unlock the meta badge (badge badge) if possible and not already unlocked
            if (badge && !unlockDates[id] &&
                getBadgeMilestoneProgress(id) >= badge.maxNumber) {
                recordUnlock(id)
                unlockedNewBadge = true
            }
        }
    } while (unlockedNewBadge)
    
    // Save the unlock dates
    saveUnlockDates()
}

/** Checks if a badge can be unlocked and unlocks it if so */
export function unlockIfReached(id: string, current: number, target: number): void {
    if (current < target || unlockDates[id]) return
    recordUnlock(id)
    unlockReachedMetaBadges()
}

unlockReachedMetaBadges()