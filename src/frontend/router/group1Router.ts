import { createRouter, createWebHashHistory } from 'vue-router'
import ExperimentalEnvironment from '../pages/ExperimentalEnvironment.vue'
import Group1Profile from '../pages/Group1Profile.vue'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', name: 'experiment', component: ExperimentalEnvironment },
        { path: '/profile', name: 'profile', component: Group1Profile }
    ],
})