<script setup lang="ts">
    import { computed } from 'vue'
    import { getStreakRange } from '../../storage/streak.js'

    const attrs = computed(() => {
        const range = getStreakRange()
        return range
            ? [{ key: 'streak', highlight: 'orange', dates: range }]
            : []
    })
</script>

<template>
    <div class="calendar">
        <VCalendar transparent borderless expanded :attributes="attrs" />
    </div>
</template>

<style scoped>
    .calendar {
        background-color: #eeeffd;
        width: 100%;
        border-radius: 10px;
    }
</style>