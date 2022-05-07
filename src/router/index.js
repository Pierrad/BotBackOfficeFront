import { createRouter, createWebHistory } from 'vue-router'
import { canUserAccess } from '../services/User'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/bot/:id',
      name: 'bot',
      component: () => import('../views/Bot.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  if (to.name !== 'home') {
    const canAccess = await canUserAccess()
    if (!canAccess) {
      return '/'
    }
  }
})

export default router
