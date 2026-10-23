/** 
 * This file is part of LoopInsighT1, an open source tool to
 * simulate closed-loop glycemic control in type 1 diabetes.
 * Distributed under the MIT software license.
 * See https://lt1.org for further information.
 */

import * as Vue from 'vue'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'
import { createI18n } from 'vue-i18n'
import { plugins } from 'node_modules/chart.js/dist/core/index.js'

/**
 * utility function for creation of Vue app
 * @param{string} id - name of DOM element to mount app (without #)
 * @param{Vue.Component} component - main Vue component
 */
export default function(id: string, component: Vue.Component, plugins: Vue.Plugin[] = []): Vue.ComponentPublicInstance {
    // create Vue app
    const app = Vue.createApp(component)
    app.use(VCalendar, {})

    // add multi-language support
    const locale = (document.getElementsByTagName("html")[0].lang || 
        navigator.language.split('-')[0]).substring(0, 2) || "en"
    const i18n = createI18n({
        globalInjection: true,
        inheritLocale: true,
        locale: locale,
    })
    document.getElementsByTagName("html")[0].lang = locale
    app.use(i18n)

    // add tooltip support
    app.use(FloatingVue)

    // add plugins for routing
    for (const plugin of plugins) {
        app.use(plugin)
    }

    // mount
    return app.mount('#'+id)

}
