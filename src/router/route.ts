import type { RouteRecordRaw } from 'vue-router'

import UserDetail from '~/pages/user/detail.vue'

import UserView from '~/pages/user/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '~/pages/index.vue'),
      },
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
        component: () => import(/* webpackChunkName: "guide" */ '~/pages/guide/index.md'),
      },
      {
        path: 'vue',
        name: 'Vue',
        component: () => import(/* webpackChunkName: "guide" */ '~/pages/guide/vue.md'),
      },
      {
        path: 'proxy',
        name: 'Proxy',
        component: () => import(/* webpackChunkName: "guide" */ '~/pages/guide/proxy.md'),
      },
      {
        path: 'vite-setting',
        name: 'ViteSetting',
        component: () => import(/* webpackChunkName: "guide" */ '~/pages/guide/vite-setting.md'),
      },
      {
        path: 'router',
        name: 'Router',
        component: () => import(/* webpackChunkName: "guide" */ '~/pages/guide/router.md'),
      },
      {
        path: 'pinia',
        name: 'Pinia',
        component: () => import(/* webpackChunkName: "guide" */ '~/pages/guide/pinia.md'),
      },
    ],
  },
]

export default routes
