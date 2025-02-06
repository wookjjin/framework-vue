import type { RouteRecordRaw } from 'vue-router'

import HomeView from '~/pages/index.vue'
import UserDetail from '~/pages/user/detail.vue'

import UserView from '~/pages/user/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    children: [
      { path: '', component: HomeView },
      {
        path: 'user',
        name: 'User',
        component: UserView,
      },
      {
        path: 'user/:id',
        component: UserDetail,
      },
    ],
  },
  {
    path: '/guide',
    children: [
      {
        path: '',
        name: 'Guide',
        component: () => import('~/pages/guide/index.md'),
      },
      {
        path: 'vue',
        name: 'Vue',
        component: () => import('~/pages/guide/vue.md'),
      },
      {
        path: 'proxy',
        name: 'Proxy',
        component: () => import('~/pages/guide/proxy.md'),
      },
    ],
  },
]

export default routes
