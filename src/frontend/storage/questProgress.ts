import { ref, computed } from 'vue'
import { storageKey } from './storageKey.js'

const DAILY_STORAGE_KEY = storageKey('daily-meal-quest-progress')
const EXPERIMENT_STORAGE_KEY = storageKey('experiment-meal-quest-progress')
const DAILY_SPORT_STORAGE_KEY = storageKey('daily-sport-quest-progress')
const DAILY_SHARE_STORAGE_KEY = storageKey('daily-share-quest-progress')
const EXPERIMENT_SPORT_STORAGE_KEY = storageKey('experiment-sport-quest-progress')
const EXPERIMENT_AVATAR_STORAGE_KEY = storageKey('experiment-avatar-quest-progress')
const EXPERIMENT_SHARE_STORAGE_KEY = storageKey('experiment-share-quest-progress')

function localDateKey(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

function loadDailyCount(storageKey: string): number {
    try {
        const saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null')
        if (saved?.date !== localDateKey(new Date())) return 0
        return Number.isSafeInteger(saved.count) && saved.count >= 0 ? saved.count : 0
    } catch {
        return 0
    }
}

function loadExperimentCount(storageKey: string): number {
    try {
        const count = Number(localStorage.getItem(storageKey))
        return Number.isSafeInteger(count) && count >= 0 ? count : 0
    } catch {
        return 0
    }
}

function loadProgress(storageKey: string, maxProgress: number): number {
    try {
        const value = Number(localStorage.getItem(storageKey))
        return Number.isSafeInteger(value) && value > 0 ? Math.min(value, maxProgress) : 0
    } catch {
        return 0
    }
}

export const dailyMealQuestProgress = ref(loadDailyCount(DAILY_STORAGE_KEY))
export const experimentMealQuestProgress = ref(loadExperimentCount(EXPERIMENT_STORAGE_KEY))
export const dailySportQuestProgress = ref(loadDailyCount(DAILY_SPORT_STORAGE_KEY))
export const dailyShareQuestProgress = ref(loadDailyCount(DAILY_SHARE_STORAGE_KEY))
export const experimentSportQuestProgress = ref(loadExperimentCount(EXPERIMENT_SPORT_STORAGE_KEY))
export const experimentAvatarQuestProgress = ref(loadProgress(EXPERIMENT_AVATAR_STORAGE_KEY, 3))
export const experimentShareQuestProgress = ref(loadProgress(EXPERIMENT_SHARE_STORAGE_KEY, 12))
export const completedQuestQueue = ref<string[]>([])
export const questBannerPending = ref(false)
let progressDate = localDateKey(new Date())

function enqueueOnCompletion(id: string, previous: number, current: number, target: number): void {
    if (previous < target && current >= target) {
        questBannerPending.value = true
        completedQuestQueue.value.push(id)
    }
}

export function refreshDailyMealQuestProgress(): void {
    const today = localDateKey(new Date())
    if (today === progressDate) return

    progressDate = today
    dailyMealQuestProgress.value = 0
    dailySportQuestProgress.value = 0
    dailyShareQuestProgress.value = 0
    try {
        const resetProgress = JSON.stringify({ date: today, count: 0 })
        localStorage.setItem(DAILY_STORAGE_KEY, resetProgress)
        localStorage.setItem(DAILY_SPORT_STORAGE_KEY, resetProgress)
        localStorage.setItem(DAILY_SHARE_STORAGE_KEY, resetProgress)
    } catch {
        // Keep the in-memory progress for the current session if storage is unavailable.
    }
}

export function registerMealQuestProgress(count: number): void {
    if (!Number.isSafeInteger(count) || count <= 0) {
        throw new RangeError('Meal entry count must be a positive safe integer.')
    }

    refreshDailyMealQuestProgress()
    const previousDaily = dailyMealQuestProgress.value
    const previousExperiment = experimentMealQuestProgress.value
    dailyMealQuestProgress.value += count
    experimentMealQuestProgress.value += count
    enqueueOnCompletion('daily-meals', previousDaily, dailyMealQuestProgress.value, 2)
    enqueueOnCompletion('experiment-meals', previousExperiment, experimentMealQuestProgress.value, 24)

    try {
        localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify({
            date: progressDate,
            count: dailyMealQuestProgress.value,
        }))
        localStorage.setItem(EXPERIMENT_STORAGE_KEY, String(experimentMealQuestProgress.value))
    } catch {
        // Keep the in-memory progress for the current session if storage is unavailable.
    }
}

export function registerSportQuestProgress(count: number): void {
    if (!Number.isSafeInteger(count) || count <= 0) {
        throw new RangeError('Sport entry count must be a positive safe integer.')
    }

    refreshDailyMealQuestProgress()
    const previousDaily = dailySportQuestProgress.value
    const previousExperiment = experimentSportQuestProgress.value
    dailySportQuestProgress.value += count
    experimentSportQuestProgress.value += count
    enqueueOnCompletion('daily-sport', previousDaily, dailySportQuestProgress.value, 1)
    enqueueOnCompletion('experiment-sport', previousExperiment, experimentSportQuestProgress.value, 3)

    try {
        localStorage.setItem(DAILY_SPORT_STORAGE_KEY, JSON.stringify({
            date: progressDate,
            count: dailySportQuestProgress.value,
        }))
        localStorage.setItem(EXPERIMENT_SPORT_STORAGE_KEY, String(experimentSportQuestProgress.value))
    } catch {
        // Keep the in-memory progress for the current session if storage is unavailable.
    }
}

export function registerAvatarQuestProgress(): void {
    if (experimentAvatarQuestProgress.value >= 3) return

    const previous = experimentAvatarQuestProgress.value
    experimentAvatarQuestProgress.value++
    enqueueOnCompletion('experiment-avatar', previous, experimentAvatarQuestProgress.value, 3)
    try {
        localStorage.setItem(EXPERIMENT_AVATAR_STORAGE_KEY, String(experimentAvatarQuestProgress.value))
    } catch {
        // Keep the in-memory progress for the current session if storage is unavailable.
    }
}

export function registerShareQuestProgress(): void {
    refreshDailyMealQuestProgress()

    const previousDaily = dailyShareQuestProgress.value
    if (previousDaily < 1) {
        dailyShareQuestProgress.value = 1
        enqueueOnCompletion('daily-share', previousDaily, dailyShareQuestProgress.value, 1)
    }

    const previousExperiment = experimentShareQuestProgress.value
    if (previousExperiment < 12) {
        experimentShareQuestProgress.value++
        enqueueOnCompletion('experiment-share', previousExperiment, experimentShareQuestProgress.value, 12)
    }

    try {
        if (previousDaily < 1) {
            localStorage.setItem(DAILY_SHARE_STORAGE_KEY, JSON.stringify({
                date: progressDate,
                count: dailyShareQuestProgress.value,
            }))
        }
        if (previousExperiment < 12) {
            localStorage.setItem(EXPERIMENT_SHARE_STORAGE_KEY, String(experimentShareQuestProgress.value))
        }
    } catch {
        // Keep the in-memory progress for the current session if storage is unavailable.
    }
}
