import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'

createApp(App).mount('#app')
App.use(router)
