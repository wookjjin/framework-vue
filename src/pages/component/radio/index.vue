<script setup lang="ts">
const selectedRadioValue1 = ref(1)
const selectedRadioValue2 = ref(1)
const selectedRadioValue3 = ref()
const options = [{ value: 1, label: '옵션 1' }, { value: 2, label: '옵션 2', disabled: true }, { value: 3, label: '옵션 3' }]
</script>

<template>
  <div class="flex flex-col gap-20px">
    <div class="flex flex-col gap-10px">
      <span>1. Base</span>
      <div class="flex gap-10px">
        <BaseRadio v-model="selectedRadioValue1" :options="options" name="my-radio-group" />
      </div>
    </div>
    <div class="flex flex-col gap-10px">
      <span>2. Disabled</span>
      <div class="flex gap-10px">
        <BaseRadio v-model="selectedRadioValue2" disabled :options="options" name="my-radio-group" />
      </div>
    </div>
    <div class="flex flex-col gap-10px">
      <span>3. Error</span>
      <div class="flex gap-10px">
        <BaseRadio v-model="selectedRadioValue3" error :options="options" name="my-radio-group" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
