<script setup lang="ts"></script>

<template>
    <!-- Navbar -->
    <nav class="navbar">
        <router-link to="/" class="navbarText">Experimental Umgebung</router-link>
        <router-link to="/profile" class="navbarIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M0 0h16v16H0z" fill="none" />
                <g fill="currentColor">
                    <path d="M11 6a3 3 0 1 1-6 0a3 3 0 0 1 6 0" />
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </g>
            </svg>
        </router-link>
    </nav>
</template>

<style scoped>
    .navbar {
        display: flex;
        justify-content: center;
        background-color: #eeeffd;
        padding: 10px;
        border-radius: 20px;
        position: relative;
    }
    
    .navbarText {
        font-size: 20px;
        color: #000000;
        text-decoration: none;
        display: block;
        padding: 10px;
        position: relative;
        border-bottom: solid;
        cursor: pointer;
    }

    .navbarIcon {
        color: #000000;
        text-decoration: none;
        display: block;
        padding: 10px;
        position: relative;
        cursor: pointer;
    }
    .navbar a:hover {
        color: #003160;
    }

    .navbar a.router-link-exact-active {
        color: #003160;
    }

    .navbar a:last-child {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    }
</style>