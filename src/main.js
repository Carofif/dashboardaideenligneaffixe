import '@/scss/main.scss'
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Buefy from 'buefy'
import router from './router'
import store from './store'
import './registerServiceWorker'
import App from './App.vue'
import AsideMenuList from '@/components/AsideMenuList'
import { auth } from '@/plugins/firebase'

router.afterEach(() => {
  store.commit('asideMobileStateToggle', false)
})

Vue.config.productionTip = false
Vue.component('AsideMenuList', AsideMenuList)
Vue.use(Buefy)

let app = ''

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})