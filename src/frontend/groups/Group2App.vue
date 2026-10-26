<script lang="ts">
    import { defineComponent } from 'vue'
    import Navbar from '../components/Navbar.vue';
    import AvatarSaveQuestion from '../components/avatar/AvatarSaveQuestion.vue'
    import AvatarSavedBanner from '../components/avatar/AvatarSavedBanner.vue'
    import RecapBanner from '../components/recap/RecapBanner.vue'
    import QuestCompleteBanner from '../components/quests/QuestCompleteBanner.vue'
    import { registerMealQuestProgress, registerSportQuestProgress } from '../storage/questProgress.js'
    import { registerShareQuestProgress } from '../storage/questProgress.js'

    export default defineComponent({
        components: {
            Navbar,
            AvatarSaveQuestion,
            AvatarSavedBanner,
            RecapBanner,
            QuestCompleteBanner,
        },
        provide() {
            return { onShare: registerShareQuestProgress }
        },
        methods: {
            onMealAdded(n: number) {
                registerMealQuestProgress(n)
            },
            onExerciseAdded(n: number) {
                registerSportQuestProgress(n)
            },
        }
    })


</script>

<template>
    <AvatarSaveQuestion />
    <AvatarSavedBanner />
    <RecapBanner />
    <QuestCompleteBanner />
    <Navbar class="navbar"/>
    <router-view v-slot="{ Component }: { Component: any }">
        <KeepAlive>
            <component :is="Component" @meal-added="onMealAdded" @exercise-added="onExerciseAdded" />
        </KeepAlive>
    </router-view>
</template>

<style scoped>
    .navbar {
    margin-left: 25px; 
    margin-right: 25px;
    }
</style>