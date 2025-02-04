import type { RouteRecordRaw } from 'vue-router'

import HomeView from '~/pages/index.vue'
import UserDetail from '~/pages/user/detail.vue'

import UserView from '~/pages/user/index.vue'

const MarkdownPage = () => import('~/pages/guide/index.md')
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
    component: MarkdownPage,
  },
]

export default routes
