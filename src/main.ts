import type { UserModule } from './types/index.ts'
import { ViteSSG } from 'vite-ssg'
import { setupMockServer } from '~/composables/mock.ts'
import routes from '~/router/route.ts'
import App from './App.vue'
import '@unocss/reset/normalize.css'
import '~/styles/main.css'
import '~/styles/markdown.css'

import 'virtual:uno.css'

if (import.meta.env.MODE === 'development') {
  setupMockServer() // 개발 환경에서만 mock 서버 활성화
}

// `export const createApp` is required instead of the original `createApp(App).mount('#app')`
export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { routes },
  // function to have custom setups
  (ctx) => {
    // install plugins etc.
    Object.values(
      import.meta.glob<{ install: UserModule }>('./modules/*.ts', {
        eager: true,
      }),
    ).forEach(i => i.install?.(ctx))
  },
)
