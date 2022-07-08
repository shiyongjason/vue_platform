import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/common.scss'

import PExample from '@/components/PExample/index.vue'
import PAttrTable from '@/components/PAttrTable/index.vue'
import PEventTable from '@/components/PEventTable/index.vue'
// 全局引入自定义
import zfMinUI from '@/packages'

import 'prismjs/themes/prism.css'

Vue.component('PExample', PExample)
Vue.component('PAttrTable', PAttrTable)
Vue.component('PEventTable', PEventTable)
Vue.use(zfMinUI)

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
