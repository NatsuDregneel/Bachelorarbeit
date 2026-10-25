<script setup lang="ts">
    import { ref } from 'vue';
    import AvatarNavbar from './AvatarNavbar.vue';
    import ShareBtn from '../ShareBtn.vue';
    import AvatarInfo from './AvatarInfo.vue';
    import AvatarImg from './AvatarImg.vue';
    import AvatarBasis from './AvatarBasis.vue';
    import AvatarHair from './AvatarHair.vue';
    import AvatarFace from './AvatarFace.vue';
    import AvatarAccessories from './AvatarAccessories.vue';

    const AvatarProperty = ref<'basis' | 'hair' | 'face' | 'accessory'>('basis');
</script>

<template>
    <div class="avatar">
        <!-- header row -->
        <span class="title">Avatar</span>
        <div class="header">
            <AvatarNavbar v-model="AvatarProperty" />
            <div class="buttons">
                <ShareBtn />
                <AvatarInfo />
            </div>
        </div>

        <!-- content row -->
        <div class="avatar-preview">
            <AvatarImg :size="300" preview />
        </div>
        <div class="avatar-options">
            <AvatarBasis v-if="AvatarProperty === 'basis'" />
            <AvatarHair v-if="AvatarProperty === 'hair'" />
            <AvatarFace v-if="AvatarProperty === 'face'" />
            <AvatarAccessories v-if="AvatarProperty === 'accessory'" />
        </div>
    </div>
</template>

<style scoped>
    .avatar {
        display: grid;
        grid-template-columns: minmax(220px, 1fr) 2.5fr;
        grid-template-rows: auto minmax(0, 1fr);
        column-gap: 25px;
        min-height: 340px;
        border: solid;
        border-color: #b7b7b7;
        border-radius: 10px;
        overflow: hidden;            /* cuts the avatar off at the bottom edge */
        box-sizing: border-box;
    }

    /* row 1, column 1 */
    .title {
        grid-column: 1;
        grid-row: 1;
        padding: 25px 0 0 25px;
        font-size: 30px;
    }

    /* row 1, column 2: tabs and buttons, above the options */
    .header {
        grid-column: 2;
        grid-row: 1;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        min-width: 0;
        padding: 25px 25px 0 0;
    }

    /* row 2, column 1 */
    .avatar-preview {
        grid-column: 1;
        grid-row: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 25px;
    }

    /* row 2, column 2 */
    .avatar-options {
        grid-column: 2;
        grid-row: 2;
        min-width: 0;
        min-height: 0;
        overflow-y: auto;
        padding: 15px 25px 25px 0;
    }

    .buttons {
        display: flex;
        gap: 25px;
        align-items: center;
    }
</style>