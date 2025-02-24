import type { RouteRecordRaw } from 'vue-router'

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
      {
        path: 'typescript',
        name: 'Typescript',
        component: () => import(/* webpackChunkName: "guide" */ '~/pages/guide/typescript.md'),
      },
      {
        path: 'life-cycle',
        name: 'LifeCycle',
        component: () => import(/* webpackChunkName: "guide" */ '~/pages/guide/life-cycle.md'),
      },
      {
        path: 'tree-shaking',
        name: 'TreeShaking',
        component: () => import(/* webpackChunkName: "guide" */ '~/pages/guide/tree-shaking.md'),
      },
      {
        path: 'component',
        name: 'Component',
        component: () => import(/* webpackChunkName: "guide" */ '~/pages/guide/component.md'),
      },
    ],
  },
]

export default routes
