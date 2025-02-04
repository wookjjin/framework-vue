<script setup lang="ts">
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
  <RouterView />
</template>

<style scoped>

</style>
