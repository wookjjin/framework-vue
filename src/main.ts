import type { UserModule } from './types/index.ts'
import { ViteSSG } from 'vite-ssg'
import routes from '~/router/route.ts'
import App from './App.vue'
import 'virtual:uno.css'
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
