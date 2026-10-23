<script setup lang="ts">
    import { ref } from 'vue';
    
     // Variable die die Informationen anzeigt oder versteckt
    const showInfo = ref (false);
    
</script>

<template>
    <!-- Streak Info Button that opens a Infopanel-->
     <div class="info">
        <button @click="showInfo= !showInfo">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                    <path d="M0 0h32v32H0z" fill="none" />
                    <path fill="currentColor" d="M17 22v-8h-4v2h2v6h-3v2h8v-2zM16 8a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 16 8" />
                    <path fill="currentColor" d="M16 30a14 14 0 1 1 14-14a14 14 0 0 1-14 14m0-26a12 12 0 1 0 12 12A12 12 0 0 0 16 4" />
                </svg>
            </button>
            <p v-if="showInfo" style="font-size: 15px;">Dein <strong>Experiment Rückblick</strong> zeigt dir einige deiner Werte und Statistiken, die du während deiner Zeit in der Studie gesammelt hast. Dazu gehören z.B. <strong>Time in Range</strong>, <strong>Maximaler Glukosewert</strong> und weitere.</p>
        </div>
</template>

<style scoped>
.info {
    position: relative;
    display: inline-block;
}

.info button {
    background-color: #fff;
    border: none;
    cursor: pointer;
}

.info p {
    position: absolute;
    margin-top: 10px;
    right: 0;
    top: 100%;
    background-color: #eeeffd;
    font-size: 15px;
    text-align: left;
    padding: 10px;
    border-radius: 10px;
    width: 165px;
    z-index: 9;
}

.info button:hover {
    color: #5b65dc;
}
</style>