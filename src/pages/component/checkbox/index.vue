<script setup lang="ts">
const selectedCheckboxValues1 = ref()
const selectedCheckboxValues2 = ref()
const selectedCheckboxValues3 = ref()
const options1 = [{ value: 1, label: '옵션 1' }, { value: 2, label: '옵션 2', disabled: true }, { value: 3, label: '옵션 3' }]
const options2 = [{ value: 1, label: '옵션 1' }, { value: 2, label: '옵션 2' }, { value: 3, label: '옵션 3' }]
</script>

<template>
  <div class="flex flex-col gap-20px">
    <div class="flex flex-col gap-10px">
      <span>1. Base & Max</span>
      <div class="flex gap-10px">
        <BaseCheckbox v-model="selectedCheckboxValues1" :options="options2" :max="2" />
      </div>
    </div>
    <div class="flex flex-col gap-10px">
      <span>2. Disabled</span>
      <div class="flex gap-10px">
        <BaseCheckbox v-model="selectedCheckboxValues2" disabled :options="options1" :max="2" />
      </div>
    </div>
    <div class="flex flex-col gap-10px">
      <span>3. Error</span>
      <div class="base-checkbox-group has-error flex-col">
        <BaseCheckbox v-model="selectedCheckboxValues3" error :options="options1" :max="2" />
        <div v-if="true" class="error-message">
          Error Message
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
