import { reactive, ref } from 'vue'

const STORAGE_KEY = 'streak-state'

interface StreakState {
    count: number
    lastDay: string | null
}

function load(): StreakState {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) return JSON.parse(raw)
    } catch { /* ignore broken storage */ }
    return { count: 0, lastDay: null }
}

// local date as YYYY-MM-DD (not UTC, so "day" matches the user's day)
export function dayKey(d: Date): string {
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${d.getFullYear()}-${m}-${day}`
}

function parseDay(key: string): Date {
    const [y, m, d] = key.split('-').map(Number)
    return new Date(y, m - 1, d)
}

/** days of the running streak, or null if there is none */
export function getStreakRange(now: Date = new Date()): { start: Date, end: Date } | null {
    if (!streakState.lastDay || streakState.count === 0) return null

    // streak is broken if the last activity was before yesterday
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    if (streakState.lastDay !== dayKey(now) && streakState.lastDay !== dayKey(yesterday)) {
        return null
    }

    const end = parseDay(streakState.lastDay)
    const start = new Date(end)
    start.setDate(start.getDate() - (streakState.count - 1))
    return { start, end }
}

/** streak length that is still valid today */
export function getActiveStreak(): number {
    return getStreakRange() ? streakState.count : 0
}

export const streakState = reactive<StreakState>(load())
export const streakIncreaseVersion = ref(0)

/** call when the user adds a meal or exercise */
export function registerActivity(now: Date = new Date()): void {
    const today = dayKey(now)
    if (streakState.lastDay === today) return   // already counted today

    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)

    const previousCount = streakState.count
    streakState.count = streakState.lastDay === dayKey(yesterday)
        ? streakState.count + 1   // continued
        : 1                       // first day or streak was broken
    streakState.lastDay = today
    if (streakState.count > previousCount) streakIncreaseVersion.value++

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(streakState))
    } catch { /* ignore */ }
}