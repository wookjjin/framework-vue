<script setup lang="ts">
interface Option {
  value: string | number
  label: string
  disabled?: boolean
}

const {
  disabled = false,
  error = false,
} = defineProps<{
  options: Option[]
  disabled?: boolean
  error?: boolean
}>()

const emit = defineEmits<{
  (e: 'change', value: string | number): void
}>()

const model = defineModel()

const handleRadioSelect = (option: Option) => {
  if (!disabled && !option.disabled) {
    model.value = option.value
    emit('change', option.value)
  }
}
</script>

<template>
  <div
    class="base-radio-group" :class="{
      'is-disabled': disabled,
      'has-error': error,
    }"
  >
    <div
      v-for="option in options" :key="option.value" class="radio-option" :class="{
        'is-disabled': option.disabled || disabled,
      }" @click="handleRadioSelect(option)"
    >
      <div class="radio-input-wrapper">
        <div
          class="radio-input" :class="{
            'is-selected': model === option.value,
          }"
        />
      </div>
      <label class="radio-label">{{ option.label }}</label>
    </div>
  </div>
</template>

<style scoped>

</style>
