import { reactive, ref } from 'vue'
import { badges } from './badges.js'

const STORAGE_KEY = 'badge-unlocks'

function load(): Record<string, string> {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) return JSON.parse(raw)
    } catch { /* ignore broken storage */ }
    return {}
}

// badge id -> ISO date string of the moment it was unlocked
export const unlockDates = reactive<Record<string, string>>(load())
export const badgeUnlockQueue = ref<Array<{ id: string, unlockedAt: string }>>([])

const metaBadgeIds = new Set(['badges1', 'badges2', 'badges3', 'badges4'])

export function getBadgeMilestoneProgress(id: string): number {
    const unlockedBadges = badges.filter(badge => unlockDates[badge.id])

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

function recordUnlock(id: string): void {
    const unlockedAt = new Date().toISOString()
    unlockDates[id] = unlockedAt
    badgeUnlockQueue.value.push({ id, unlockedAt })
}

function saveUnlockDates(): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockDates))
    } catch { /* ignore */ }
}

function unlockReachedMetaBadges(): void {
    let unlockedNewBadge: boolean
    do {
        unlockedNewBadge = false
        for (const id of metaBadgeIds) {
            const badge = badges.find(candidate => candidate.id === id)
            if (badge && !unlockDates[id] &&
                getBadgeMilestoneProgress(id) >= badge.maxNumber) {
                recordUnlock(id)
                unlockedNewBadge = true
            }
        }
    } while (unlockedNewBadge)

    saveUnlockDates()
}

/** stores the date only the first time the target is reached */
export function unlockIfReached(id: string, current: number, target: number): void {
    if (current < target || unlockDates[id]) return
    recordUnlock(id)
    unlockReachedMetaBadges()
}

unlockReachedMetaBadges()