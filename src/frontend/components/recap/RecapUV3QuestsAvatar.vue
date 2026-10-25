<script setup lang="ts">
    import { computed } from 'vue'
    import { createAvatar } from '@dicebear/core'
    import { personas } from '@dicebear/collection'
    import { avatarState } from '../../storage/avatar.js'
    import type { AvatarLook } from '../../storage/avatar.js'
    import {
        beardOptions, clothingOptions, eyesOptions, glassesOptions, hairOptions,
        headwearOptions, mouthOptions, noseOptions,
    } from '../../storage/avatarCustomization.js'
    import type { AvatarCustomization } from '../../storage/avatarCustomization.js'

    function lockedItemsFor(
        options: AvatarCustomization[],
        key: keyof AvatarLook,
    ): Array<{ id: string; changes: Partial<AvatarLook> }> {
        return options
            .filter(option => option.lockedBy)
            .map(option => ({ id: option.id, changes: { [key]: option.value } }))
    }

    const lockedItems = [
        ...lockedItemsFor(clothingOptions, 'clothing'),
        ...lockedItemsFor(hairOptions, 'hair'),
        ...lockedItemsFor(beardOptions, 'facialHair'),
        ...lockedItemsFor(eyesOptions, 'eyes'),
        ...lockedItemsFor(noseOptions, 'nose'),
        ...lockedItemsFor(mouthOptions, 'mouth'),
        ...lockedItemsFor(glassesOptions, 'glasses'),
        ...lockedItemsFor(headwearOptions, 'headwear'),
    ]

    const shuffledItems = [...lockedItems]
    for (let index = shuffledItems.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        ;[shuffledItems[index], shuffledItems[randomIndex]] =
            [shuffledItems[randomIndex], shuffledItems[index]]
    }
    const selectedItems = shuffledItems.slice(0, 4)

    function renderAvatar(changes: Partial<AvatarLook>): string {
        const look = { ...avatarState, ...changes }
        const hex = (color: string) => color.replace('#', '')

        return createAvatar(personas, {
            seed: look.seed,
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
            backgroundColor: ['eeeffd'],
        }).toDataUri()
    }

    const itemPreviews = computed(() =>
        selectedItems.map(item => ({ id: item.id, image: renderAvatar(item.changes) })))
</script>

<template>
    <div class="recap-content">
        <!-- Linke Seite -->
        <div class="left">
            <div class="card">
                <span class="title">Zeit in Bereichen</span>
                <p class="content">90,2%</p>
            </div>
            <div class="card">
                <span class="title">Maximaler Wert</span>
                <p class="content">229mg/dl</p>
            </div>
            <div class="card">
                <span class="title">Anzahl Unterzuckerungen</span>
                <p class="content">4</p>
            </div>
        </div>
        <!-- Rechte Seite -->
        <div class="right">
            <section class="rankings">
                <div class="ranking-cards">
                    <div class="card">
                        <span class="title">Erledigte Quests</span>
                        <p class="list"><span>Tägliche:</span><span>7</span></p>
                        <p class="list"><span>Experiment:</span><span>2</span></p>
                    </div>
                    <div class="card">
                        <span class="title">Freigeschaltete Avatar-Items</span>
                        <div class="content">
                            <div class="items">
                                <img v-for="item in itemPreviews" :key="item.id"
                                    class="item-image" :src="item.image" alt="" />
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <span class="title">Zeitraum der Phase</span>
                        <p class="content">02.11 - 06.11</p>
                    </div>
                </div>
            </section>
            <section class="rankings">
                <div class="ranking-cards">
                    <div class="card">
                        <span class="title">Mahlzeiten</span>
                        <p class="list"><span>Anzahl:</span><span>9</span></p>
                        <p class="list"><span>ØAnzahl/Tag:</span><span>2,25</span></p>
                        <p class="list"><span>ØKohlenhydrate:</span><span>40g</span></p>
                        <p class="list"><span>Lieblingszeit:</span><span>10:00</span></p>
                    </div>
                    <div class="card">
                        <span class="title">Sporteinheiten</span>
                        <p class="list"><span>Anzahl:</span><span>2</span></p>
                        <p class="list"><span>ØDauer:</span><span>60min</span></p>
                        <p class="list"><span>ØIntensität:</span><span>50%</span></p>
                        <p class="list"><span>Lieblingszeit:</span><span>12:00</span></p>
                    </div>
                    <div class="card">
                        <span class="title">Bolus</span>
                        <p class="list"><span>Anzahl:</span><span>9</span></p>
                        <p class="list"><span>ØAnzahl/Tag:</span><span>2,25</span></p>
                        <p class="list"><span>Lieblingszeit:</span><span>10:30</span></p>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>
    .recap-content {
        display: grid;
        grid-template-columns: 1fr 3fr;
        grid-template-rows: repeat(3, minmax(0, 1fr));
        column-gap: 25px;
        row-gap: 25px;
        width: 100%;
        box-sizing: border-box;
    }

    .card {
        display: flex;
        flex-direction: column;
        background-color: #eeeffd;
        padding: 10px;
        border-radius: 10px;
        flex: 1;
    }

    .title {
        font-size: 15px;
        font-weight: bold;
    }

    .content {
        font-size: 20px;
        text-align: center;
    }

    .left {
        display: flex;
        grid-column: 1;
        grid-row: 1 / 4;
        flex-direction: column;
        gap: 25px;
    }

    .right {
        display: contents;
    }

    .rankings {
        display: flex;
        min-height: 0;
    }

    .rankings:first-child {
        grid-column: 2;
        grid-row: 1;
    }

    .rankings:last-child {
        grid-column: 2;
        grid-row: 2 / 4;
    }

    .ranking-cards {
        display: flex;
        width: 100%;
        gap: 25px;
        min-height: 0;
    }

    .ranking-cards .card {
        box-sizing: border-box;
    }

    .list {
        display: flex;
        align-items: center;
        font-size: 15px;
    }

    .list span:first-child {
        flex: 1;
    }

    .list span:last-child {
        flex: 1;
        text-align: end;
    }

    .items { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
    .item-image { width: 48px; height: 48px; border-radius: 10px; background: #fff; }
</style>