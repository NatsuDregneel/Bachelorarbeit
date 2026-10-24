import { reactive } from 'vue'

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

/** stores the date only the first time the target is reached */
export function unlockIfReached(id: string, current: number, target: number): void {
    if (current < target || unlockDates[id]) return
    unlockDates[id] = new Date().toISOString()
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockDates))
    } catch { /* ignore */ }
}