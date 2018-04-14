// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import {sync} from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store'


Vue.config.productionTip = false

Vue.use(Vuetify)

var vueCircle = require('vue2-circle-progress')
var vueIcon = require('vue-icons/icon')
Vue.use(vueCircle)

sync(store,router)

Vue.component("vue-circle",vueCircle)
Vue.component("icon", require("vue-icons/icon"))
Vue.component("icon-stack", require("vue-icons/icon-stack"))


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
