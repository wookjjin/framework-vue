import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '~/pages/index.vue'
import UserView from '~/pages/user/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    children: [
      {
        path: '/user',
        name: 'User',
        component: UserView,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
