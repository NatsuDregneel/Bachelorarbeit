import { computed, reactive, ref } from 'vue'
import { dayKey } from './streak.js'
import { storageKey } from './storageKey.js'

const STORAGE_KEY = storageKey('recap-state')
export const RECAP_STREAK_TARGET = 12

// saved state for recap information
interface RecapState {
    reachedDay: string | null   // day (YYYY-MM-DD) on which the streak reached the target
    experimentQuestsReached: boolean
}

/** Loads the saved recap state from localStorage, or an empty state if none is saved or the data is broken */
function load(): RecapState {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) return JSON.parse(raw)
    } catch { /* ignore broken storage */ }
    return { reachedDay: null, experimentQuestsReached: false }
}

// saved recap state loaded from localStorage
export const recapState = reactive<RecapState>(load())

// reactive "today", so the button also appears when midnight passes while the page is open
const today = ref(dayKey(new Date()))
window.setInterval(() => { today.value = dayKey(new Date()) }, 60_000)

/** Checks if the recap target has been reached and saves the date */
export function checkRecapReached(streak: number): void {
    if (recapState.reachedDay || streak < RECAP_STREAK_TARGET) return
    // make recap availble tomorrow
    recapState.reachedDay = dayKey(new Date())
    // save to localStorage
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(recapState))
    } catch { /* ignore */ }
}

/** Checks if the experiment quests have been completed and saves the date */
export function checkExperimentQuestsReached(
    meals: number,
    sports: number,
    avatarChanges: number,
    shares: number,
): void {
    if (recapState.reachedDay ||
        meals < 24 || sports < 3 || avatarChanges < 3 || shares < 12) return
    // make recap availble tomorrow
    recapState.reachedDay = dayKey(new Date())
    // save to localStorage
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(recapState))
    } catch { /* ignore */ }
}

// target reached, but the day is not over yet
export const recapPending = computed(() =>
    recapState.reachedDay !== null && today.value === recapState.reachedDay)

// target reached on an earlier day, so the recap is unlocked
export const recapAvailable = computed(() =>
    recapState.experimentQuestsReached ||
    (recapState.reachedDay !== null && today.value > recapState.reachedDay))