<script setup lang="ts">
const options = ref([
  {
    value: 'Vue',
    label: 'Vue',
  },
  {
    value: 'React',
    label: 'React',
  },
  {
    value: 'Svelte',
    label: 'Svelte',
  },
])

const selected = ref({
  value1: '',
  value2: '',
  value3: '',
})
</script>

<template>
  <div class="flex flex-col gap-20px">
    <div class="flex flex-col gap-10px">
      <span>1. Base</span>
      <div class="flex gap-10px">
        <BaseSelect v-model="selected.value1" placeholder="Base" :options="options" />
        <BaseSelect v-model="selected.value2" placeholder="Disabled" :options="options" disabled />
        <BaseSelect v-model="selected.value3" placeholder="Error" :options="options" error />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
