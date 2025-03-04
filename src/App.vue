<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { computed } from 'vue'
import Progress from '~/components/ui/progress/Progress.vue'
import { isDark, preferredDark } from '~/composables/dark'
import { useLoadingStore } from './stores/progress'

const loadingStore = useLoadingStore()

useHead({
  title: 'Framework Vue',
  meta: [
    { name: 'description', content: 'Vue 개발 가이드' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})
</script>

<template>
  <Progress v-if="loadingStore.isLoading" />
  <RouterView />
</template>

<style scoped>

</style>
