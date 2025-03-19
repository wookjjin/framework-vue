<script setup lang="ts">
export interface Props {
  type: 'text' | 'password'
  label?: string
  placeholder?: string
  required?: false
  disabled?: boolean
  minlength?: string
  maxlength?: string
  readonly?: boolean
  errorMessage?: string
  helperText?: string
}

const {
  type = 'text',
  label = '',
  placeholder = '',
  disabled = false,
  minlength = undefined,
  maxlength = undefined,
  readonly = false,
  errorMessage = '',
  helperText = '',
} = defineProps<Props>()

const model = defineModel({ default: '' })
const inputInstance = ref<HTMLInputElement>()

const hasError = computed(() => !!errorMessage)
</script>

<template>
  <div class="input-wrapper" :class="{ 'input-error': hasError, 'input-disabled': disabled }">
    <label v-if="label" class="input-label" :class="{ 'is-required': required }">{{ label }}</label>
    <div class="input-container">
      <input
        ref="inputInstance" v-model="model" class="input-field" :type="type" :placeholder="placeholder"
        :disabled="disabled" :minlength="minlength" :maxlength="maxlength" :readonly="readonly"
      >
      <slot name="suffix" />
    </div>

    <div v-if="hasError" class="input-error-message">
      {{ errorMessage }}
    </div>
    <div v-else-if="helperText" class="input-helper-text">
      {{ helperText }}
    </div>
  </div>
</template>

<style scoped>

</style>
