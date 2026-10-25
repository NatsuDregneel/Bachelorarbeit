<script setup lang="ts">
    import { computed } from 'vue'
    import { createAvatar } from '@dicebear/core'
    import { personas } from '@dicebear/collection'
    import { avatarDraft, avatarState, updateDraft, saveAvatar } from '../../storage/avatar.js'
    import type { AvatarLook } from '../../storage/avatar.js'
    import { eyesOptions, noseOptions, mouthOptions } from '../../storage/avatarCustomization.js'

    const hex = (c: string) => c.replace('#', '')

    const sections = [
        { key: 'eyes', title: 'Augen', options: eyesOptions },
        { key: 'nose', title: 'Nase', options: noseOptions },
        { key: 'mouth', title: 'Mund', options: mouthOptions },
    ] as const

    function isLocked(lockedBy?: string): boolean {
        return !!lockedBy && !avatarState.unlockedItems.includes(lockedBy)
    }

    function choose(key: 'eyes' | 'nose' | 'mouth', value: string): void {
        updateDraft({ [key]: value } as Partial<AvatarLook>)
    }

    function render(look: AvatarLook): string {
        return createAvatar(personas, {
            seed: look.seed,
            skinColor: [hex(look.skinColor)],
            body: [look.clothing as any],
            clothingColor: [hex(look.clothesColor)],
            hair: [look.hair as any],
            hairColor: [hex(look.hairColor)],
            facialHair: look.facialHair ? [look.facialHair as any] : undefined,
            facialHairProbability: look.facialHair ? 100 : 0,
            eyes: [look.eyes as any],
            nose: [look.nose as any],
            mouth: [look.mouth as any],
            backgroundColor: ['eeeffd'],
        }).toDataUri()
    }

    // previews[row][value]; all tiles depend on the whole draft, about 16 small SVGs
    const previews = computed(() =>
        Object.fromEntries(sections.map(s => [
            s.key,
            Object.fromEntries(s.options.map(o =>
                [o.value, render({ ...avatarDraft, [s.key]: o.value } as AvatarLook)])),
        ])) as Record<string, Record<string, string>>)
</script>

<template>
    <div class="basis">
        <template v-for="s in sections" :key="s.key">
            <h3>{{ s.title }}</h3>
            <div class="tiles">
                <div v-for="o in s.options" :key="o.id" class="tile-wrap">
                    <button class="tile"
                        :class="{ selected: avatarDraft[s.key] === o.value }"
                        :disabled="isLocked(o.lockedBy)"
                        @click="choose(s.key, o.value)">
                        <img :src="previews[s.key][o.value]" :alt="o.label" />
                        <span v-if="isLocked(o.lockedBy)" class="lock">🔒</span>
                    </button>
                    <span class="tile-label">{{ o.label }}</span>
                </div>
            </div>
        </template>

        <div class="actions">
            <button class="save" @click="saveAvatar">Save</button>
        </div>
    </div>
</template>

<style scoped>
    .basis { display: flex; flex-direction: column; gap: 15px; width: 100%; min-height: 100%; }
    h3 { margin: 0; font-size: 24px; text-align: left; color: #000; }

    .tiles { display: flex; flex-wrap: wrap; gap: 15px; }
    .tile-wrap { display: grid; justify-items: center; gap: 6px; }
    .tile {
        position: relative; width: 87px; height: 87px; padding: 0;
        border: 2px solid #000; border-radius: 10px;
        background: #eeeffd; overflow: hidden; cursor: pointer;
    }
    .tile.selected { border-color: #5b65dc; }
    .tile:disabled { cursor: not-allowed; }
    /* zoom to the face (zoom and focus point are estimates, tune them) */
    .tile img {
        width: 100%; height: 100%;
        object-fit: cover; object-position: top;
        transform: scale(2); transform-origin: 50% 38%;
    }
    .lock {
        position: absolute; inset: 0; display: flex;
        align-items: center; justify-content: center;
        background: rgba(255, 255, 255, 0.6); font-size: 28px;
    }
    .tile-label { font-size: 12px; text-align: center; }

    .actions { display: flex; justify-content: flex-end; margin-top: auto; }
    .save {
        background: #5b65dc; color: #fff; font-size: 20px;
        border: 2px solid #000; border-radius: 10px;
        padding: 6px 30px; cursor: pointer;
    }
</style>