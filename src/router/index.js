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
