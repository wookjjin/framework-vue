<script setup lang="ts">
export interface Props {
  type: 'text' | 'password'
}
withDefaults(defineProps<Props>(), {
})

const model = defineModel()
</script>

<template>
  <div>
    <input
      v-model="model"
      :type="type"
    >
  </div>
</template>

<style scoped>

</style>
