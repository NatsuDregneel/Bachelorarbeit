import { createRouter, createWebHashHistory } from 'vue-router'
import ExperimentalEnvironment from '../pages/ExperimentalEnvironment.vue'
import Group2Profile from '../pages/Group2Profile.vue'
import { hasUnsavedChanges, resetDraft } from '../storage/avatar.js'
import { askToLeave } from '../util/leaveConfirm.js'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', name: 'experiment', component: ExperimentalEnvironment },
        { path: '/profile', name: 'profile', component: Group2Profile }
    ],
})

router.beforeEach(async (to, from) => {
    if (to.fullPath === from.fullPath || !hasUnsavedChanges.value) return true

    const leave = await askToLeave()
    if (!leave) return false   // stay on the page

    resetDraft()               // discard the changes
    return true
})

export default router