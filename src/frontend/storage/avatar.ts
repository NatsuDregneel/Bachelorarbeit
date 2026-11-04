import { reactive, computed, ref } from 'vue'
import { storageKey } from './storageKey.js'
import { registerAvatarQuestProgress } from './questProgress.js'
import {
    skinColors, clothesColors, clothingOptions, hairOptions, hairColors,
    beardOptions, eyesOptions, noseOptions, mouthOptions, glassesOptions, headwearOptions
} from './avatarCustomization.js'

const STORAGE_KEY = storageKey('avatar-state')

/** saved avatar state */
export interface AvatarLook {
    seed: string
    skinColor: string      // hex without '#'
    clothing: string       // DiceBear value of the body
    clothesColor: string   // hex without '#'
    hair: string
    hairColor: string      // hex without '#'
    facialHair: string     // '' = no beard
    eyes: string
    nose: string
    mouth: string
    glasses: string        // '' = none
    headwear: string       // '' = none
}

interface StoredAvatar extends AvatarLook {
    unlockedItems: string[]   // ids of locked options the user has earned
}

/** Sets the default values for the avatar state */
const defaults: StoredAvatar = {
    seed: 'player',
    skinColor: skinColors[0],
    clothing: clothingOptions[0].value,
    clothesColor: clothesColors[0],
    hair: hairOptions[0].value,
    hairColor: hairColors[0],
    facialHair: beardOptions[0].value,
    eyes: eyesOptions[0].value,
    nose: noseOptions[0].value,
    mouth: mouthOptions[0].value,
    glasses: glassesOptions[0].value,
    headwear: headwearOptions[0].value,
    unlockedItems: [],
}

// checks hexcodes
const HEX = /^[0-9a-f]{6}$/i

/** Returns a hex color string if its valid */
function validHex(value: unknown, fallback: string): string {
    return typeof value === 'string' && HEX.test(value) ? value : fallback
}

/** Returns a valid option value or the fallback */
function validOption(options: { value: string }[], value: unknown, fallback: string): string {
    return options.some(o => o.value === value) ? (value as string) : fallback
}

/** Loads the saved avatar state from localStorage, or an empty state if none is saved or the data is broken */
function load(): StoredAvatar {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
            const saved = JSON.parse(raw)
            return {
                ...defaults,
                ...saved,
                // discard values that are not valid (any more)
                skinColor: validHex(saved.skinColor, defaults.skinColor),
                clothesColor: validHex(saved.clothesColor, defaults.clothesColor),
                hairColor: validHex(saved.hairColor, defaults.hairColor),
                clothing: validOption(clothingOptions, saved.clothing, defaults.clothing),
                hair: validOption(hairOptions, saved.hair, defaults.hair),
                facialHair: validOption(beardOptions, saved.facialHair, defaults.facialHair),
                eyes: validOption(eyesOptions, saved.eyes, defaults.eyes),
                nose: validOption(noseOptions, saved.nose, defaults.nose),
                mouth: validOption(mouthOptions, saved.mouth, defaults.mouth),
                glasses: validOption(glassesOptions, saved.glasses, defaults.glasses),
                headwear: validOption(headwearOptions, saved.headwear, defaults.headwear),
                unlockedItems: Array.isArray(saved.unlockedItems) ? saved.unlockedItems : [],
            }
        }
    } catch { /* ignore broken storage */ }
    return { ...defaults, unlockedItems: [] }
}

/** Saves the current avatar state to localStorage */
function persist(): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(avatarState))
    } catch { /* ignore */ }
}

// Saved avatar
export const avatarState = reactive<StoredAvatar>(load())
export const avatarSaveCount = ref(0)

// Working draft of the avatar, that was not saved yet 
export const avatarDraft = reactive<AvatarLook>({
    seed: avatarState.seed,
    skinColor: avatarState.skinColor,
    clothing: avatarState.clothing,
    clothesColor: avatarState.clothesColor,
    hair: avatarState.hair,
    hairColor: avatarState.hairColor,
    facialHair: avatarState.facialHair,
    eyes: avatarState.eyes,
    nose: avatarState.nose,
    mouth: avatarState.mouth,
    glasses: avatarState.glasses,
    headwear: avatarState.headwear,
})

/** Updates the avatar draft with selected changes */
export function updateDraft(changes: Partial<AvatarLook>): void {
    Object.assign(avatarDraft, changes)
}

/** Assigns the avatar draft to the saved avatar */
export function saveAvatar(): void {
    const changed = hasUnsavedChanges.value
    Object.assign(avatarState, avatarDraft)
    persist()
    // increase save count to re-render avatar
    avatarSaveCount.value++
    if (changed) registerAvatarQuestProgress()
}

/** Unlocks a new avatar customization */
export function unlockItem(id: string): void {
    if (avatarState.unlockedItems.includes(id)) return
    avatarState.unlockedItems.push(id)
    persist()
}

// The keys of the avatar look, used to compare the draft with the saved avatar
const lookKeys = Object.keys(avatarDraft) as (keyof AvatarLook)[]

/** Returns true if there are unsaved avatar changes */
export const hasUnsavedChanges = computed(() =>
    lookKeys.some(k => avatarDraft[k] !== avatarState[k]))

/** Resets the avatar draft to the saved avatar */
export function resetDraft(): void {
    for (const k of lookKeys) avatarDraft[k] = avatarState[k]
}

/** Native browser warning when the tab is closed or reloaded with unsaved changes */
window.addEventListener('beforeunload', (e) => {
    if (hasUnsavedChanges.value) {
        e.preventDefault()
        e.returnValue = ''
    }
})