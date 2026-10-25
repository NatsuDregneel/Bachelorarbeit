<script setup lang="ts">
    import { computed } from 'vue';
    import { createAvatar } from '@dicebear/core';
    import { personas } from '@dicebear/collection';
    import { avatarState, avatarDraft } from '../../storage/avatar.js';

    const props = defineProps<{ size?: number; preview?: boolean }>();

    const hex = (c: string) => c.replace('#', '')

    const dataUri = computed(() => {
        const look = props.preview ? avatarDraft : avatarState
        return createAvatar(personas, {
            seed: avatarState.seed,
            skinColor: [hex(look.skinColor)],
            body: [look.clothing as any],
            clothingColor: [hex(look.clothesColor)],
            hair: [(look.headwear || look.hair) as any],
            hairColor: [hex(look.hairColor)],
            facialHair: look.facialHair ? [look.facialHair as any] : undefined,
            facialHairProbability: look.facialHair ? 100 : 0,
            eyes: [(look.glasses || look.eyes) as any],
            nose: [look.nose as any],
            mouth: [look.mouth as any],
            backgroundColor: ['transparent'],
            radius: 50,
        }).toDataUri()
    })      
</script>

<template>
    <img :src="dataUri" :width="props.size ?? 150" :height="props.size ?? 150" alt="Avatar" />
</template>