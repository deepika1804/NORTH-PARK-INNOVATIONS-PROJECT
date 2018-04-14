import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Location from '@/components/screen2'
import Weather from '@/components/screen3'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/Screen2',
      name: 'location',
      component: Location
    },{
      path: '/Screen3',
      name:'weather',
      component:Weather
    }
  ]
})
