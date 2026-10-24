<script lang="ts">
    import { defineComponent } from 'vue'
    import Navbar from '../components/Navbar.vue';

    export default defineComponent({
        components: {
            Navbar
        },
        methods: {
            onMealAdded(n: number) {
                //TODO: Implementierung für Mahlzeiten Logik in Gruppe 2
            },
            onExerciseAdded(n: number) {
                //TODO: Implementierung für Sport Logik in Gruppe 2
            },
        }
    })


</script>

<template>
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