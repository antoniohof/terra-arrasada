import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Explore from './views/Explore.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        auth: false,
        top: {
          show: true
        }
      }
    },
    {
      path: '/explore',
      name: 'explore',
      component: Explore,
      meta: {
        auth: false,
        top: {
          show: true
        }
      }
    }
  ]
})
