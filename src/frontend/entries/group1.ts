import Group1App from '../groups/Group1App.vue'
import router from '../router/group1Router.js'
import createVueApp from '../util/createVueApp.js'

createVueApp('group1', Group1App, [router])