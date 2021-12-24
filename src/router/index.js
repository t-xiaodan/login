import { createRouter, createWebHistory } from 'vue-router'
import Login from "../components/Login/index.vue"
import Home from "../components/Home/index.vue"

const routes = [
  {
    path: '/login',
    component: Login,
    //路由守卫
    beforeEnter: (to, from, next) => {
      if (!document.cookie) {
        next()
        return
      }
      next("/")
    }
  },
  {
    path: '/',
    component: Home,
    //路由守卫
    beforeEnter: (to, from, next) => {
      if (document.cookie) {
        next()
        return
      }
      next("/login")
    }

  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
