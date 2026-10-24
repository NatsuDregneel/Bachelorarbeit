import Group2App from '../groups/Group2App.vue'
import router from '../router/group2Router.js'
import createVueApp from '../util/createVueApp.js'

createVueApp('group2', Group2App, [router])