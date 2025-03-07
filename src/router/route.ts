import type { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '~/layouts/default.vue'
import UserView from '~/pages/user/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () =>
          import(/* webpackChunkName: "home" */ '~/pages/index.vue'),
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
        component: () =>
          import(/* webpackChunkName: "guide" */ '~/pages/guide/index.md'),
      },
      {
        path: 'vue',
        name: 'Vue',
        component: () =>
          import(/* webpackChunkName: "guide" */ '~/pages/guide/vue.md'),
      },
      {
        path: 'proxy',
        name: 'Proxy',
        component: () =>
          import(/* webpackChunkName: "guide" */ '~/pages/guide/proxy.md'),
      },
      {
        path: 'vite-setting',
        name: 'ViteSetting',
        component: () =>
          import(
            /* webpackChunkName: "guide" */ '~/pages/guide/vite-setting.md'
          ),
      },
      {
        path: 'router',
        name: 'Router',
        component: () =>
          import(/* webpackChunkName: "guide" */ '~/pages/guide/router.md'),
      },
      {
        path: 'pinia',
        name: 'Pinia',
        component: () =>
          import(/* webpackChunkName: "guide" */ '~/pages/guide/pinia.md'),
      },
      {
        path: 'typescript',
        name: 'Typescript',
        component: () =>
          import(/* webpackChunkName: "guide" */ '~/pages/guide/typescript.md'),
      },
      {
        path: 'life-cycle',
        name: 'LifeCycle',
        component: () =>
          import(/* webpackChunkName: "guide" */ '~/pages/guide/life-cycle.md'),
      },
      {
        path: 'tree-shaking',
        name: 'TreeShaking',
        component: () =>
          import(
            /* webpackChunkName: "guide" */ '~/pages/guide/tree-shaking.md'
          ),
      },
      {
        path: 'component',
        name: 'Component',
        component: () =>
          import(/* webpackChunkName: "guide" */ '~/pages/guide/component.md'),
      },
      {
        path: 'async',
        name: 'Async',
        component: () =>
          import(/* webpackChunkName: "guide" */ '~/pages/guide/async.md'),
      },
    ],
  },
  {
    path: '/component',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'ComponentList',
        component: () =>
          import(
            /* webpackChunkName: "component" */ '~/pages/component/index.vue'
          ),
        props: true,
      },
      {
        path: 'input',
        name: 'InputComponent',
        component: () =>
          import(
            /* webpackChunkName: "input" */ '~/pages/component/input/index.vue'
          ),
      },
      {
        path: 'grid',
        name: 'GridComponent',
        component: () =>
          import(
            /* webpackChunkName: "grid" */ '~/pages/component/grid/index.vue'
          ),
      },
      {
        path: 'progress',
        name: 'ProgressComponent',
        component: () =>
            import(
                /* webpackChunkName: "progress" */ '~/pages/component/progress/index.vue'
                ),
      },
      {
        path: 'tree',
        name: 'TreeComponent',
        component: () =>
            import(
                /* webpackChunkName: "grid" */ '~/pages/component/tree/index.vue'
                ),
      },
    ],
  },
]

export default routes
