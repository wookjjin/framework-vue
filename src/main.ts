import type { UserModule } from './types/index.ts'
import { ViteSSG } from 'vite-ssg'
import { setupMockServer } from '~/composables/mock.ts'
import routes from '~/router/route.ts'
import App from './App.vue'
import { useLoadingStore } from './stores/progress.ts'
import '@unocss/reset/normalize.css'
import '~/styles/main.css'

import '~/styles/markdown.css'
import 'virtual:uno.css'

if (import.meta.env.MODE === 'development') {
  setupMockServer() // 개발 환경에서만 mock 서버 활성화
}

// `export const createApp` is required instead of the original `createApp(App).mount('#app')`
export const createApp = ViteSSG(
  App,
  { routes },
  (ctx) => {
    const { router, isClient } = ctx

    if (isClient) {
      router.beforeEach((to, from, next) => {
        const loadingStore = useLoadingStore()
        next()
        loadingStore.startLoading()
      })

      router.afterEach(() => {
        const loadingStore = useLoadingStore()
        loadingStore.stopLoading()
      })
    }

    Object.values(
      import.meta.glob<{ install: UserModule }>('./modules/*.ts', {
        eager: true,
      }),
    ).forEach(i => i.install?.(ctx))
  },
)
