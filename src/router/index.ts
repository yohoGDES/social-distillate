import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Rate from '../views/Rate.vue'
import Login from '../views/Login.vue'
import Error from '../views/Error.vue'
import BeverageEdit from '../views/Beverage/BeverageEdit.vue'

import { useUserStore } from '@/store/modules/user'
import { useAlertStore } from '@/store/modules/alerts'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/error',
    name: 'Error',
    component: Error
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
    path: '/beverage/edit',
    name: 'BeverageEdit',
    component: BeverageEdit,
    meta: {
      authRequired: true
    }
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
      router.push('/error')
      alertStore.alertError("You're not logged in.")
      return false
    }
    // TODO: Route permissions - check if user has perms to visit route in addition to auth.
  }
})

export default router
