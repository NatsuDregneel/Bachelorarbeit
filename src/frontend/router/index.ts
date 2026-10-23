import { createRouter, createWebHashHistory } from 'vue-router'
import ExperimentalEnvironment from '../pages/ExperimentalEnvironment.vue'
import Profile from '../pages/Profile.vue'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', name: 'experiment', component: ExperimentalEnvironment },
        { path: '/profile', name: 'profile', component: Profile }
    ],
})