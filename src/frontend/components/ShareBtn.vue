<script setup lang="ts">
    import { ref } from 'vue';
    import { registerShareQuestProgress } from '../storage/questProgress.js'

    // Variable die das Dropdown Menu anzeigt oder versteckt
    const showSocials = ref (false);

    function shareProgress(): void {
        registerShareQuestProgress()
        showSocials.value = false
    }

</script>

<template>
    <div class="share">
        <!-- Share Button -->
        <button  @click="showSocials = !showSocials">Share</button>
        <!-- Sozial Networks wo geshared werden kann-->
        <div v-if="showSocials" class="socials">
            <a @click="shareProgress">Per E-Mail teilen</a>
            <a @click="shareProgress">Per SMS teilen</a>
            <a @click="shareProgress">Auf Whatsapp teilen</a>
        </div>
    </div> 
</template>

<style scoped>
    .share {
        position: relative;
        display: inline-block;
    }

    .share button{
        background-color: #eeeffd;
        padding: 10px;
        border: none;
        border-radius: 10px;
        font-size: 20px;
        cursor: pointer;
    }

    .share a {
        display: block;
        text-decoration: none;
        padding: 10px;
    }

    .socials {
        position: absolute;
        margin-top: 5px;
        background-color: #eeeffd;
        right: 0;
        top: 100%;
        white-space: nowrap;
        border-radius: 10px;
        z-index: 10;
    }

    .socials a {
        font-size: 15px;
        cursor: pointer;
    }

    .share button:hover {
        color: #5b65dc;
    }

    .socials a:hover {
        color: #5b65dc;
    }
</style>