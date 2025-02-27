<script setup lang="ts">
const input = ref({
  baseValue: 'Base',
  disabledValue: 'Disabled',
  readonlyValue: 'Readonly',
  errorValue: 'Error Message',
  helperValue: 'Helper Message',
})
</script>

<template>
  <div class="flex flex-col gap-20px">
    <div class="flex flex-col gap-10px">
      <span>1. Base</span>
      <div class="flex gap-10px">
        <BaseInput v-model="input.baseValue" type="text" label="Base Input" placeholder=">_0" />
        <BaseInput v-model="input.disabledValue" type="text" label="Disabled Input" placeholder=">_0" disabled />
        <BaseInput v-model="input.readonlyValue" type="text" label="Base Input" placeholder=">_0" readonly />
      </div>
    </div>
    <div class="flex flex-col gap-10px">
      <span>2. Message</span>
      <div class="flex gap-10px">
        <BaseInput type="text" label="Placeholder Input" placeholder=">_0" />
        <BaseInput type="text" label="Error Input" :error-message="input.errorValue" />
        <BaseInput type="text" label="Helper Message Input" :helper-text="input.helperValue" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
