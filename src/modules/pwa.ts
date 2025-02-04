import type { Router } from 'vue-router'

export function registerPWA(router: Router) {
  router.isReady().then(async () => {
    const { registerSW } = await import('virtual:pwa-register')
    registerSW({ immediate: true })
  })
}
