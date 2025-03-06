<script setup lang="ts">
const isShow = ref(false)

const openDialog = () => {
  isShow.value = true
}
</script>

<template>
  <div>
    <BaseButton @click="openDialog">
      Open
    </BaseButton>
  </div>
  <PopOverlay v-model:is-open="isShow" />
</template>

<style scoped>

</style>
