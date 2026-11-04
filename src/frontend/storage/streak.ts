import { reactive, ref } from 'vue'
import { badges } from './badges.js'
import { unlockIfReached } from './badgeUnlockedDate.js'
import { storageKey } from './storageKey.js'

const STORAGE_KEY = storageKey('streak-state')

/** Saved state for streak information */
interface StreakState {
    count: number
    lastDay: string | null
}

/** Loads the saved streak from localStorage, or an empty streak if none is saved or the data is broken */
function load(): StreakState {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) return JSON.parse(raw)
    } catch { /* ignore broken storage */ }
    return { count: 0, lastDay: null }
}

/** Returns the key for a day in the format YYYY-MM-DD */
export function dayKey(d: Date): string {
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${d.getFullYear()}-${m}-${day}`
}

/** Converts a day key ("YYYY-MM-DD") back into a Date at local midnight */
function parseDay(key: string): Date {
    const [y, m, d] = key.split('-').map(Number)
    return new Date(y, m - 1, d)
}

/* Returns the first and last day of the active streak */
export function getStreakRange(now: Date = new Date()): { start: Date, end: Date } | null {
    // no streak
    if (!streakState.lastDay || streakState.count === 0) return null

    // stop streak if last day is not today or yesterday
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    if (streakState.lastDay !== dayKey(now) && streakState.lastDay !== dayKey(yesterday)) {
        return null
    }

    // calculate start and end of streak
    const end = parseDay(streakState.lastDay)
    const start = new Date(end)
    start.setDate(start.getDate() - (streakState.count - 1))
    return { start, end }
}

/* returns the length of the current active streak */
export function getActiveStreak(): number {
    return getStreakRange() ? streakState.count : 0
}

// current streak loaded from localStorage
export const streakState = reactive<StreakState>(load())
// increased when streak is increased, used to trigger UI updates for banner
export const streakIncreaseVersion = ref(0)
// visibility for streak banner
export const streakBannerVisible = ref(false)

/** Checks if a streak badge can be unlocked and unlocks it if so */
function unlockReachedStreakBadges(now: Date = new Date()): void {
    const streak = getStreakRange(now) ? streakState.count : 0
    for (const badge of badges.filter(({ id }) => /^Streak[1-4]$/.test(id))) {
        unlockIfReached(badge.id, streak, badge.maxNumber)
    }
}

unlockReachedStreakBadges()

/** Called when a meal or exercise is added, updates the streak and checks the streak badges */
export function registerActivity(now: Date = new Date()): void {
    //Check if streak was updated today
    const today = dayKey(now)
    if (streakState.lastDay === today) return
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)

    // update streak based on yesterday and today
    const previousCount = streakState.count
    streakState.count = streakState.lastDay === dayKey(yesterday)
        ? streakState.count + 1   // increase streak by 1
        : 1                       // reset streak to 1 if last day was not yesterday
    streakState.lastDay = today
    // show streak banner if streak increased
    if (streakState.count > previousCount) streakIncreaseVersion.value++

    // save to localStorage
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(streakState))
    } catch { /* ignore */ }
    unlockReachedStreakBadges(now)
}