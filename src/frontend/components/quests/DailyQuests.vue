<script setup lang="ts">
    import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue'
    import { createAvatar } from '@dicebear/core'
    import { personas } from '@dicebear/collection'
    import { avatarDraft, avatarState, unlockItem } from '../../storage/avatar.js'
    import type { AvatarLook } from '../../storage/avatar.js'
    import {
        beardOptions, clothingOptions, eyesOptions, glassesOptions, hairOptions,
        headwearOptions, mouthOptions, noseOptions,
    } from '../../storage/avatarCustomization.js'
    import { storageKey } from '../../storage/storageKey.js'
    import {
        dailyMealQuestProgress, dailySportQuestProgress, refreshDailyMealQuestProgress,
    } from '../../storage/questProgress.js'

    type QuestReward = {
        id: string
        label: string
        key: keyof AvatarLook
        value: string
    }

    type AvatarOption = {
        id: string
        label: string
        value: string
        lockedBy?: string
        key: keyof AvatarLook
    }

    const allAvatarOptions: AvatarOption[] = [
        ...clothingOptions.map(option => ({ ...option, key: 'clothing' as const })),
        ...hairOptions.map(option => ({ ...option, key: 'hair' as const })),
        ...beardOptions.map(option => ({ ...option, key: 'facialHair' as const })),
        ...eyesOptions.map(option => ({ ...option, key: 'eyes' as const })),
        ...noseOptions.map(option => ({ ...option, key: 'nose' as const })),
        ...mouthOptions.map(option => ({ ...option, key: 'mouth' as const })),
        ...glassesOptions.map(option => ({ ...option, key: 'glasses' as const })),
        ...headwearOptions.map(option => ({ ...option, key: 'headwear' as const })),
    ]
    const lockedOptions = allAvatarOptions.filter(
        (option): option is AvatarOption & { lockedBy: string } => !!option.lockedBy,
    )

    const DAILY_REWARDS_KEY = storageKey('daily-avatar-quest-rewards')

    function localDateKey(date: Date): string {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    function selectDailyRewards(): Array<QuestReward | undefined> {
        const today = localDateKey(new Date())
        const available = lockedOptions.filter(option =>
            !avatarState.unlockedItems.includes(option.lockedBy))

        try {
            const saved = JSON.parse(localStorage.getItem(DAILY_REWARDS_KEY) ?? 'null')
            if (saved?.date === today && Array.isArray(saved.ids)) {
                const restored: Array<(typeof lockedOptions)[number] | undefined> =
                    (saved.ids as unknown[]).map((id: unknown) =>
                    lockedOptions.find(option => option.lockedBy === id))
                if (restored.length === 3 && restored.every(Boolean) &&
                    new Set(saved.ids).size === restored.length) {
                    return restored.map(option => ({
                        id: option!.lockedBy,
                        label: option!.label,
                        key: option!.key,
                        value: option!.value,
                    }))
                }
            }
        } catch {
            // Generate new rewards if stored reward data is invalid.
        }

        const shuffled = [...available]
        for (let index = shuffled.length - 1; index > 0; index--) {
            const randomIndex = Math.floor(Math.random() * (index + 1))
            ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]]
        }

        const selected = shuffled.slice(0, 3)
        try {
            localStorage.setItem(DAILY_REWARDS_KEY, JSON.stringify({
                date: today,
                ids: selected.map(option => option.lockedBy),
            }))
        } catch {
            // Keep the selected rewards in memory if storage is unavailable.
        }

        return [
            ...selected.map(option => ({
                id: option.lockedBy,
                label: option.label,
                key: option.key,
                value: option.value,
            })),
            ...Array.from({ length: 3 - selected.length }, () => undefined),
        ]
    }

    const dailyRewards = ref(selectDailyRewards())
    const quests = computed(() => [
        {
            id: 'daily-meals',
            label: 'Trage deine zugenommenen Mahlzeiten ein',
            current: dailyMealQuestProgress.value,
            target: 2,
            reward: dailyRewards.value[0],
        },
        {
            id: 'daily-exercise',
            label: 'Mache Sport und trage es ein',
            current: dailySportQuestProgress.value,
            target: 1,
            reward: dailyRewards.value[1],
        },
        {
            id: 'daily-share-progress',
            label: 'Teile deinen Fortschritt',
            current: 0,
            target: 1,
            reward: dailyRewards.value[2],
        },
    ])

    watchEffect(() => {
        for (const quest of quests.value) {
            if (quest.reward && quest.current >= quest.target) unlockItem(quest.reward.id)
        }
    })

    function percent(current: number, target: number): number {
        return target > 0 ? (Math.min(current, target) / target) * 100 : 0
    }

    function rewardImage(reward: QuestReward): string {
        return createAvatar(personas, {
            seed: avatarDraft.seed,
            skinColor: [avatarDraft.skinColor.replace('#', '')],
            body: [(reward.key === 'clothing' ? reward.value : avatarDraft.clothing) as any],
            clothingColor: [avatarDraft.clothesColor.replace('#', '')],
            hair: [
                (reward.key === 'headwear'
                    ? reward.value || avatarDraft.hair
                    : (avatarDraft.headwear || (reward.key === 'hair' ? reward.value : avatarDraft.hair))) as any,
            ],
            hairColor: [avatarDraft.hairColor.replace('#', '')],
            facialHair: (reward.key === 'facialHair' ? reward.value : avatarDraft.facialHair)
                ? [(reward.key === 'facialHair' ? reward.value : avatarDraft.facialHair) as any]
                : undefined,
            facialHairProbability: (reward.key === 'facialHair' ? reward.value : avatarDraft.facialHair) ? 100 : 0,
            eyes: [
                (reward.key === 'glasses'
                    ? reward.value || avatarDraft.eyes
                    : (avatarDraft.glasses || (reward.key === 'eyes' ? reward.value : avatarDraft.eyes))) as any,
            ],
            nose: [(reward.key === 'nose' ? reward.value : avatarDraft.nose) as any],
            mouth: [(reward.key === 'mouth' ? reward.value : avatarDraft.mouth) as any],
            backgroundColor: ['eeeffd'],
        }).toDataUri()
    }

    // hours until local midnight, refreshed every minute
    const now = ref(new Date())
    let timer: number | undefined
    onMounted(() => {
        timer = window.setInterval(() => {
            now.value = new Date()
            refreshDailyMealQuestProgress()
            dailyRewards.value = selectDailyRewards()
        }, 60_000)
    })
    onUnmounted(() => window.clearInterval(timer))

    const hoursLeft = computed(() => {
        const end = new Date(now.value)
        end.setHours(24, 0, 0, 0)
        return Math.max(0, Math.ceil((end.getTime() - now.value.getTime()) / 3_600_000))
    })
</script>

<template>
    <section class="section">
        <div class="head">
            <span class="section-title">Tägliche Quests</span>
            <span class="timer">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"
                    fill="none" stroke="#f29d38" stroke-width="2" stroke-linecap="round">
                    <circle cx="12" cy="13" r="8" />
                    <path d="M12 9v4l2.5 2.5" />
                    <path d="M9.5 2h5" />
                    <path d="M12 2v3" />
                </svg>
                <span><b>{{ hoursLeft }}</b> {{ hoursLeft === 1 ? 'Stunde' : 'Stunden' }}</span>
            </span>
        </div>

        <div v-for="q in quests" :key="q.id" class="quest-row">
            <div class="row">
                <span class="label">{{ q.label }}</span>
                <div class="bar" role="progressbar"
                    :aria-valuenow="Math.min(q.current, q.target)" aria-valuemin="0" :aria-valuemax="q.target">
                    <div class="fill" :style="{ width: percent(q.current, q.target) + '%' }"></div>
                    <span class="count">{{ Math.min(q.current, q.target) }}/{{ q.target }}</span>
                </div>
            </div>
            <div class="reward"
                :class="{ unlocked: q.reward && avatarState.unlockedItems.includes(q.reward.id) }">
                <template v-if="q.reward">
                    <span class="icon">
                        <img :src="rewardImage(q.reward)" :alt="`Avatar mit ${q.reward.label}`" />
                    </span>
                    <span><b class="accent">Avatar</b> {{ q.reward.label }}<br />
                        {{ avatarState.unlockedItems.includes(q.reward.id) ? 'freigeschaltet' : 'bei Abschluss' }}</span>
                </template>
                <span v-else>Keine gesperrten Items verfügbar</span>
            </div>
        </div>
    </section>
</template>

<style scoped>
    .section { display: grid; gap: 22px; }

    .head { display: flex; justify-content: space-between; align-items: center; }
    .section-title { font-size: 22px; }

    .timer {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #f29d38;
        font-size: 20px;
    }

    .quest-row { display: grid; grid-template-columns: minmax(0, 310px) 1fr; align-items: center; gap: 20px; }
    .row { display: grid; gap: 8px; }
    .label { font-size: 16px; }
    .reward {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        font-size: 15px;
        color: #777;
    }
    .reward.unlocked { color: #5b65dc; }
    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56px;
        height: 56px;
        flex: 0 0 56px;
        box-sizing: border-box;
        border: 2px solid #5b65dc;
        border-radius: 10px;
        overflow: hidden;
    }
    .icon img { width: 100%; height: 100%; object-fit: cover; }
    .accent { color: #5b65dc; }

    .bar {
        position: relative;
        width: 100%;
        max-width: 310px;
        height: 20px;
        box-sizing: border-box;
        border: 2px solid #000;
        border-radius: 10px;
        background: #eeeffd;
        overflow: hidden;
    }

    /* fill color is my choice, the design only shows empty bars */
    .fill {
        position: absolute;
        inset: 0 auto 0 0;
        background: #b9bdf5;
        transition: width 0.3s ease;
    }

    .count {
        position: relative;
        display: block;
        text-align: center;
        font-size: 13px;
        line-height: 16px;
    }

    @media (max-width: 600px) {
        .quest-row { grid-template-columns: 1fr; }
    }
</style>