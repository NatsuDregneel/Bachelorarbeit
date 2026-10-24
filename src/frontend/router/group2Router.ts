import { createRouter, createWebHashHistory } from 'vue-router'
import ExperimentalEnvironment from '../pages/ExperimentalEnvironment.vue'
import Group2Profile from '../pages/Group2Profile.vue'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', name: 'experiment', component: ExperimentalEnvironment },
        { path: '/profile', name: 'profile', component: Group2Profile }
    ],
})