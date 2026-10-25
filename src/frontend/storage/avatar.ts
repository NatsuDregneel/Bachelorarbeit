import { reactive, computed, ref } from 'vue'
import { storageKey } from './storageKey.js'
import { registerAvatarQuestProgress } from './questProgress.js'
import {
    skinColors, clothesColors, clothingOptions, hairOptions, hairColors,
    beardOptions, eyesOptions, noseOptions, mouthOptions, glassesOptions, headwearOptions
} from './avatarCustomization.js'

const STORAGE_KEY = storageKey('avatar-state')

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

// defaults: the leftmost option of every row
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

const HEX = /^[0-9a-f]{6}$/i

function validHex(value: unknown, fallback: string): string {
    return typeof value === 'string' && HEX.test(value) ? value : fallback
}

function validOption(options: { value: string }[], value: unknown, fallback: string): string {
    return options.some(o => o.value === value) ? (value as string) : fallback
}

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

function persist(): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(avatarState))
    } catch { /* ignore */ }
}

// saved avatar
export const avatarState = reactive<StoredAvatar>(load())
export const avatarSaveCount = ref(0)

// working copy used by the creator
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

export function updateDraft(changes: Partial<AvatarLook>): void {
    Object.assign(avatarDraft, changes)
}

export function saveAvatar(): void {
    const changed = hasUnsavedChanges.value
    Object.assign(avatarState, avatarDraft)
    persist()
    avatarSaveCount.value++
    if (changed) registerAvatarQuestProgress()
}

/** called by the quest system later, e.g. unlockItem('clothing-small') */
export function unlockItem(id: string): void {
    if (avatarState.unlockedItems.includes(id)) return
    avatarState.unlockedItems.push(id)
    persist()
}

// all fields of the look; the draft has exactly these keys
const lookKeys = Object.keys(avatarDraft) as (keyof AvatarLook)[]

/** true as soon as the draft differs from the saved avatar */
export const hasUnsavedChanges = computed(() =>
    lookKeys.some(k => avatarDraft[k] !== avatarState[k]))

/** throws the draft away and goes back to the saved avatar */
export function resetDraft(): void {
    for (const k of lookKeys) avatarDraft[k] = avatarState[k]
}

// native browser warning when the tab is closed or reloaded with unsaved changes;
// browsers show their own generic text here, it cannot be customized
window.addEventListener('beforeunload', (e) => {
    if (hasUnsavedChanges.value) {
        e.preventDefault()
        e.returnValue = ''
    }
})