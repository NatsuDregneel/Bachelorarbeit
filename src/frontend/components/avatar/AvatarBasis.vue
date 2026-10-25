<script setup lang="ts">
    import { createAvatar } from '@dicebear/core'
    import { personas } from '@dicebear/collection'
    import { avatarDraft, avatarState, updateDraft, saveAvatar } from '../../storage/avatar.js'
    import { skinColors, clothesColors, clothingOptions } from '../../storage/avatarCustomization.js'

    function isLocked(lockedBy?: string): boolean {
        return !!lockedBy && !avatarState.unlockedItems.includes(lockedBy)
    }

    const hex = (c: string) => c.replace('#', '')

    function clothingPreview(value: string): string {
        return createAvatar(personas, {
            seed: avatarDraft.seed,
            skinColor: [hex(avatarDraft.skinColor)],
            body: [value as any],
            clothingColor: [hex(avatarDraft.clothesColor)],
            hair: [(avatarDraft.headwear || avatarDraft.hair) as any],
            facialHair: avatarDraft.facialHair ? [avatarDraft.facialHair as any] : undefined,
            facialHairProbability: avatarDraft.facialHair ? 100 : 0,
            eyes: [(avatarDraft.glasses || avatarDraft.eyes) as any],
            nose: [avatarDraft.nose as any],
            mouth: [avatarDraft.mouth as any],
            backgroundColor: ['ffffff'],
        }).toDataUri()
    }

    // the rainbow swatch is a color picker
    function pickCustom(e: Event, key: 'skinColor' | 'clothesColor'): void {
        const hex = (e.target as HTMLInputElement).value.replace('#', '')
        updateDraft({ [key]: hex })
    }
</script>

<template>
    <div class="basis">
        <h3>Hautfarbe</h3>
        <div class="swatches">
            <button v-for="c in skinColors" :key="c" class="swatch"
                :class="{ selected: avatarDraft.skinColor === c }"
                :style="{ backgroundColor: '#' + c }"
                :aria-label="'Hautfarbe ' + c"
                @click="updateDraft({ skinColor: c })" />
            <label class="swatch rainbow">
                <input type="color" @input="pickCustom($event, 'skinColor')" />
            </label>
        </div>

        <h3>Kleidung</h3>
        <div class="tiles">
            <div v-for="o in clothingOptions" :key="o.id" class="tile-wrap">
                <button class="tile"
                    :class="{ selected: avatarDraft.clothing === o.value }"
                    :disabled="isLocked(o.lockedBy)"
                    @click="updateDraft({ clothing: o.value })">
                    <img :src="clothingPreview(o.value)" :alt="o.label" />
                    <span v-if="isLocked(o.lockedBy)" class="lock">🔒</span>
                </button>
                <span class="tile-label">{{ o.label }}</span>
            </div>
        </div>

        <div class="swatches">
            <button v-for="c in clothesColors" :key="c" class="swatch"
                :class="{ selected: avatarDraft.clothesColor === c }"
                :style="{ backgroundColor: '#' + c }"
                :aria-label="'Kleidungsfarbe ' + c"
                @click="updateDraft({ clothesColor: c })" />
            <label class="swatch rainbow">
                <input type="color" @input="pickCustom($event, 'clothesColor')" />
            </label>
        </div>

        <div class="actions">
            <button class="save" @click="saveAvatar">Save</button>
        </div>
    </div>
</template>

<style scoped>
    .basis { display: grid; gap: 15px; width: 100%; }
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
    .tile img { width: 100%; height: 100%; object-fit: cover; object-position: bottom; }
    .lock {
        position: absolute; inset: 0; display: flex;
        align-items: center; justify-content: center;
        background: rgba(255, 255, 255, 0.6); font-size: 28px;
    }
    .tile-label { font-size: 12px; }

    .actions { display: flex; justify-content: flex-end; }
    .save {
        background: #5b65dc; color: #fff; font-size: 20px;
        border: 2px solid #000; border-radius: 10px;
        padding: 6px 30px; cursor: pointer;
    }
</style>