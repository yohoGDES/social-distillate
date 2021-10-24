import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Rate from '../views/Rate.vue'
import Login from '../views/Login.vue'

import { useUserStore } from '@/store/modules/user'
import { useAlertStore, AlertType, MessageType } from '@/store/modules/alerts'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/rate',
    name: 'Rate',
    component: Rate,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  const userStore = useUserStore()
  const alertStore = useAlertStore()
  if (to.meta.authRequired) {
    if (!userStore.userAuthenticated) {
      console.log('Youre not logged in')
      alertStore.addAlert({
        type: AlertType.SNACKBAR,
        messageType: MessageType.ERROR,
        message: 'You are not logged in.'
      })
      return false
    }
  }
})

export default router
