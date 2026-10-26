<script setup lang="ts">
    import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue'
    import { checkExperimentQuestsReached } from '../../storage/recap.js'
    import {
        experimentAvatarQuestProgress, experimentMealQuestProgress, experimentShareQuestProgress,
        experimentSportQuestProgress,
    } from '../../storage/questProgress.js'

    // placeholders: the progress is wired up later
    const quests = computed(() => [
        { id: 'phase-meals', label: 'Trage deine zugenommenen Mahlzeiten ein', current: experimentMealQuestProgress.value, target: 24 },
        { id: 'phase-exercise', label: 'Mache Sport und trage es ein', current: experimentSportQuestProgress.value, target: 3 },
        { id: 'phase-avatar', label: 'Gib deinem Avatar einen neuen Look', current: experimentAvatarQuestProgress.value, target: 3 },
        { id: 'phase-share-progress', label: 'Teile deinen Fortschritt', current: experimentShareQuestProgress.value, target: 12 },
    ])

    // the final quest counts all completed experiment quests
    const finalCurrent = computed(() =>
        quests.value.filter(q => q.current >= q.target).length)
    const finalTarget = computed(() => quests.value.length)
    const experimentQuestsComplete = computed(() => finalCurrent.value === finalTarget.value)

    watchEffect(() => {
        checkExperimentQuestsReached(
            experimentMealQuestProgress.value,
            experimentSportQuestProgress.value,
            experimentAvatarQuestProgress.value,
            experimentShareQuestProgress.value,
        )
    })

    function percent(current: number, target: number): number {
        return target > 0 ? (Math.min(current, target) / target) * 100 : 0
    }

    // countdown until local midnight in 11 days, refreshed every minute
    const now = ref(new Date())
    let timer: number | undefined
    onMounted(() => { timer = window.setInterval(() => { now.value = new Date() }, 60_000) })
    onUnmounted(() => window.clearInterval(timer))

    const PHASE_END = computed(() => {
        const end = new Date(now.value)
        end.setDate(end.getDate() + 11)
        end.setHours(0, 0, 0, 0)
        return end
    })

    const totalHoursLeft = computed(() =>
        Math.max(0, Math.ceil((PHASE_END.value.getTime() - now.value.getTime()) / 3_600_000)))
    const daysLeft = computed(() => Math.floor(totalHoursLeft.value / 24))
    const hoursLeft = computed(() => totalHoursLeft.value % 24)
</script>

<template>
    <section class="section">
        <div class="head">
            <span class="section-title">Experiment Quests</span>
            <span class="timer">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"
                    fill="none" stroke="#f29d38" stroke-width="2" stroke-linecap="round">
                    <circle cx="12" cy="13" r="8" />
                    <path d="M12 9v4l2.5 2.5" />
                    <path d="M9.5 2h5" />
                    <path d="M12 2v3" />
                </svg>
                <span><b>{{ daysLeft }}</b> {{ daysLeft === 1 ? 'Tag' : 'Tage' }}
                    <b>{{ hoursLeft }}</b> {{ hoursLeft === 1 ? 'Stunde' : 'Stunden' }}</span>
            </span>
        </div>

        <div v-for="q in quests" :key="q.id" class="row">
            <span class="label">{{ q.label }}</span>
            <div class="bar" role="progressbar"
                :aria-valuenow="Math.min(q.current, q.target)" aria-valuemin="0" :aria-valuemax="q.target">
                <div class="fill" :style="{ width: percent(q.current, q.target) + '%' }"></div>
                <span class="count">{{ Math.min(q.current, q.target) }}/{{ q.target }}</span>
            </div>
        </div>

        <hr />

        <div class="final">
            <div class="row">
                <span class="label">Schließe alle Experiment Quests ab</span>
                <div class="bar" role="progressbar"
                    :aria-valuenow="finalCurrent" aria-valuemin="0" :aria-valuemax="finalTarget">
                    <div class="fill" :style="{ width: percent(finalCurrent, finalTarget) + '%' }"></div>
                    <span class="count">{{ finalCurrent }}/{{ finalTarget }}</span>
                </div>
            </div>
            <div class="reward">
                <span class="reward-text"><b>Experiment Rückblick</b><br />
                    {{ experimentQuestsComplete ? 'freigeschaltet' : 'nach Abschluss freigeschaltet' }}</span>
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

    .row { display: grid; gap: 8px; }
    .label { font-size: 16px; }

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

    hr { width: 100%; margin: 0; border: 0; border-top: 1px solid #b7b7b7; }

    .final {
        display: grid;
        grid-template-columns: minmax(0, 310px) 1fr;
        align-items: end;
        gap: 20px;
    }

    .reward {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
    }

    .reward-text { text-align: center; }
</style>