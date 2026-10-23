<script setup lang="ts">
    import { ref } from 'vue';
    import ShareBtn from '../ShareBtn.vue';
    import RecapInfoBtn from './RecapInfoBtn.vue';
    import RecapNavbar from './RecapNavbar.vue';
    import RecapUV1StreakBadges from './RecapUV1StreakBadges.vue';
    import RecapUV2StreakBadges from './RecapUV2StreakBadges.vue';
    import RecapUV3StreakBadges from './RecapUV3StreakBadges.vue';

    const selectedPhase = ref<'uv1' | 'uv2' | 'uv3'>('uv1');

</script>

<template>
    <div class="recap"> 
        <!-- Experiment Rückblick Header -->
        <div class="header">
            <span class="title">Experiment R&uumlblick</span>
            <RecapNavbar v-model="selectedPhase" />
            <div class="buttons">
                <ShareBtn />
                <RecapInfoBtn />
            </div>
        </div>
        <!-- Experiment Rückblick -->
        <RecapUV1StreakBadges v-if="selectedPhase === 'uv1'" />
        <RecapUV2StreakBadges v-else-if="selectedPhase === 'uv2'" />
        <RecapUV3StreakBadges v-else />
    </div>
</template>

<style scoped>
    .header {
        display: grid;
        grid-template-columns: 1.5fr auto 1fr;
        align-items: center;
        width: 100%;
    }

    .recap {
        display: grid; 
        justify-items: center;
        align-items: start;
        border: solid;
        border-color: #b7b7b7;
        padding: 25px;
    }

    .buttons {
        display: flex; 
        gap: 25px;
        align-items: center;
        justify-content: flex-end;
        justify-self: end;
    }

    .title {
        font-size: 30px;
        font-weight: bold;
    }
</style>