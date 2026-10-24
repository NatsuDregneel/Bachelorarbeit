import { computed, reactive, ref } from 'vue'
import { dayKey } from './streak.js'
import { storageKey } from './storageKey.js'

const STORAGE_KEY = storageKey('recap-state')
export const RECAP_STREAK_TARGET = 12

interface RecapState {
    reachedDay: string | null   // day (YYYY-MM-DD) on which the streak reached the target
}

function load(): RecapState {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) return JSON.parse(raw)
    } catch { /* ignore broken storage */ }
    return { reachedDay: null }
}

export const recapState = reactive<RecapState>(load())

// reactive "today", so the button also appears when midnight passes while the page is open
const today = ref(dayKey(new Date()))
window.setInterval(() => { today.value = dayKey(new Date()) }, 60_000)

/** remembers the day the target was reached (only the first time) */
export function checkRecapReached(streak: number): void {
    if (recapState.reachedDay || streak < RECAP_STREAK_TARGET) return
    recapState.reachedDay = dayKey(new Date())
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(recapState))
    } catch { /* ignore */ }
}

// target reached, but the day is not over yet
export const recapPending = computed(() =>
    recapState.reachedDay !== null && today.value === recapState.reachedDay)

// target reached on an earlier day: the button may appear
export const recapAvailable = computed(() =>
    recapState.reachedDay !== null && today.value > recapState.reachedDay)