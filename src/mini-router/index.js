import { createRouter } from './router'

const routes = [
  {
    path: '/home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/about',
    component: () => import('../views/about/index.vue')
  },
  {
    path: '*',
    component: () => import('../views/not-found/index.vue')
  }
]

const router = createRouter({
  routes
})

export default router
