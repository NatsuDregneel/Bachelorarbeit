<script setup lang="ts">
    import { computed } from 'vue'
    import { createAvatar } from '@dicebear/core'
    import { personas } from '@dicebear/collection'
    import { avatarDraft, avatarState, updateDraft, saveAvatar } from '../../storage/avatar.js'
    import { hairOptions, hairColors, beardOptions  } from '../../storage/avatarCustomization.js'

    const hex = (c: string) => c.replace('#', '')

    function isLocked(lockedBy?: string): boolean {
        return !!lockedBy && !avatarState.unlockedItems.includes(lockedBy)
    }

    // All 20 previews at once. This computed reads skin, hair color and clothing,
    // but not the chosen hair, so clicking a hairstyle does not re-render all tiles.
    const previews = computed<Record<string, string>>(() => {
        const result: Record<string, string> = {}
        for (const o of hairOptions) {
            result[o.value] = createAvatar(personas, {
                seed: avatarDraft.seed,
                skinColor: [hex(avatarDraft.skinColor)],
                body: [avatarDraft.clothing as any],
                clothingColor: [hex(avatarDraft.clothesColor)],
                hair: [o.value as any],
                hairColor: [hex(avatarDraft.hairColor)],
                facialHair: avatarDraft.facialHair ? [avatarDraft.facialHair as any] : undefined,
                backgroundColor: ['eeeffd'],
            }).toDataUri()
        }
        return result
    })

    const beardPreviews = computed<Record<string, string>>(() => {
    const result: Record<string, string> = {}
    for (const o of beardOptions) {
        result[o.id] = createAvatar(personas, {
            seed: avatarDraft.seed,
            skinColor: [hex(avatarDraft.skinColor)],
            body: [avatarDraft.clothing as any],
            clothingColor: [hex(avatarDraft.clothesColor)],
            hair: [avatarDraft.hair as any],
            hairColor: [hex(avatarDraft.hairColor)],
            facialHair: o.value ? [o.value as any] : undefined,
            facialHairProbability: o.value ? 100 : 0,
            backgroundColor: ['eeeffd'],
        }).toDataUri()
        }
        return result
    })

    // the rainbow swatch is a color picker
    function pickCustom(e: Event): void {
        updateDraft({ hairColor: (e.target as HTMLInputElement).value.replace('#', '') })
    }
</script>

<template>
    <div class="basis">
        <h3>Haarfarbe</h3>
        <div class="swatches">
            <button v-for="c in hairColors" :key="c" class="swatch"
                :class="{ selected: avatarDraft.hairColor === c }"
                :style="{ backgroundColor: '#' + c }"
                :aria-label="'Haarfarbe ' + c"
                @click="updateDraft({ hairColor: c })" />
            <label class="swatch rainbow">
                <input type="color" @input="pickCustom($event)" />
            </label>
        </div>

        <h3>Frisur</h3>
        <div class="tiles">
            <div v-for="o in hairOptions" :key="o.id" class="tile-wrap">
                <button class="tile"
                    :class="{ selected: avatarDraft.hair === o.value }"
                    :disabled="isLocked(o.lockedBy)"
                    @click="updateDraft({ hair: o.value })">
                    <img :src="previews[o.value]" :alt="o.label" />
                    <span v-if="isLocked(o.lockedBy)" class="lock">🔒</span>
                </button>
                <span class="tile-label">{{ o.label }}</span>
            </div>
        </div>

        <h3>Bart</h3>
        <div class="tiles beard">
            <div v-for="o in beardOptions" :key="o.id" class="tile-wrap">
                <button class="tile"
                    :class="{ selected: avatarDraft.facialHair === o.value }"
                    :disabled="isLocked(o.lockedBy)"
                    @click="updateDraft({ facialHair: o.value })">
                    <img :src="beardPreviews[o.id]" :alt="o.label" />
                    <span v-if="isLocked(o.lockedBy)" class="lock">🔒</span>
                </button>
                <span class="tile-label">{{ o.label }}</span>
            </div>
        </div>

        <div class="actions">
            <button class="save" @click="saveAvatar">Save</button>
        </div>
    </div>
</template>

<style scoped>
    .basis { display: flex; flex-direction: column; gap: 15px; width: 100%; min-height: 100%; }

    h3 { margin: 0; font-size: 24px; text-align: left; color: #000; }

    .swatches { display: flex; flex-wrap: wrap; gap: 15px; }

    .swatch {
        width: 40px; height: 40px;
        border: 2px solid transparent; border-radius: 8px;
        cursor: pointer; padding: 0;
    }
    .swatch.selected { border-color: #5b65dc; }

    .rainbow {
        background: conic-gradient(red, yellow, lime, cyan, blue, magenta, red);
        position: relative; overflow: hidden;
    }

    .rainbow input {
        position: absolute; inset: 0; width: 100%; height: 100%;
        opacity: 0; cursor: pointer;
    }

    .tiles { display: flex; flex-wrap: wrap; gap: 15px; }

    .tile-wrap { display: grid; justify-items: center; gap: 6px; }

    .tile {
        position: relative; width: 87px; height: 87px; padding: 0;
        border: 2px solid #000; border-radius: 10px;
        background: #eeeffd; overflow: hidden; cursor: pointer;
    }
    .tile.selected { border-color: #5b65dc; }

    .tile:disabled { cursor: not-allowed; }

    /* head instead of torso: crop to the top of the avatar (zoom value is an estimate) */
    .tile img {
        width: 100%; height: 100%;
        object-fit: cover; object-position: top;
        transform: scale(1.5); transform-origin: 50% 30%;
    }

    .lock {
        position: absolute; inset: 0; display: flex;
        align-items: center; justify-content: center;
        background: rgba(255, 255, 255, 0.6); font-size: 28px;
    }
    .tile-label { font-size: 12px; }

    .actions { display: flex; justify-content: flex-end; margin-top: auto; }

    .save {
        background: #5b65dc; color: #fff; font-size: 20px;
        border: 2px solid #000; border-radius: 10px;
        padding: 6px 30px; cursor: pointer;
    }

    .beard .tile img { transform-origin: 50% 45%; }
</style>