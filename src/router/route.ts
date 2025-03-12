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
        path: 'template',
        name: 'Template',
        component: () =>
          import(/* webpackChunkName: "guide" */ '~/pages/guide/template.md'),
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
        path: 'radio',
        name: 'RadioComponent',
        component: () =>
          import(
            /* webpackChunkName: "radio" */ '~/pages/component/radio/index.vue'
          ),
      },
      {
        path: 'checkbox',
        name: 'CheckboxComponent',
        component: () =>
          import(
            /* webpackChunkName: "checkbox" */ '~/pages/component/checkbox/index.vue'
          ),
      },
      {
        path: 'button',
        name: 'ButtonComponent',
        component: () =>
          import(
            /* webpackChunkName: "button" */ '~/pages/component/button/index.vue'
          ),
      },
      {
        path: 'select',
        name: 'SelectComponent',
        component: () =>
          import(
            /* webpackChunkName: "select" */ '~/pages/component/select/index.vue'
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
        path: 'tab',
        name: 'TabComponent',
        component: () =>
          import(
            /* webpackChunkName: "tab" */ '~/pages/component/tab/index.vue'
          ),
      },
      {
        path: 'pop-overlay',
        name: 'PopOverlayComponent',
        component: () =>
          import(
            /* webpackChunkName: "pop-overlay" */ '~/pages/component/pop-overlay/index.vue'
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
      {
        path: 'toast',
        name: 'ToastComponent',
        component: () =>
          import(
            /* webpackChunkName: "toast" */ '~/pages/component/toast/index.vue'
          ),
      },
      {
        path: 'tag',
        name: 'TagComponent',
        component: () =>
          import(
            /* webpackChunkName: "tag" */ '~/pages/component/tag/index.vue'
          ),
      },
      {
        path: 'chart',
        name: 'ChartComponent',
        component: () =>
          import(
            /* webpackChunkName: "chart" */ '~/pages/component/chart/index.vue'
          ),
      },
      {
        path: 'skeleton',
        name: 'SkeletonComponent',
        component: () =>
          import(
            /* webpackChunkName: "skeleton" */ '~/pages/component/skeleton/index.vue'
          ),
      },
      {
        path: 'kanban',
        name: 'KanbanComponent',
        component: () =>
          import(
            /* webpackChunkName: "kanban" */ '~/pages/component/kanban/index.vue'
          ),
      },
      {
        path: 'gantt',
        name: 'GanttComponent',
        component: () =>
          import(
            /* webpackChunkName: "gantt" */ '~/pages/component/gantt/index.vue'
          ),
      },
      {
        path: 'top-bar',
        name: 'TopBarComponent',
        component: () =>
          import(
            /* webpackChunkName: "top-bar" */ '~/pages/component/top-bar/index.vue'
          ),
      },
    ],
  },
]

export default routes
