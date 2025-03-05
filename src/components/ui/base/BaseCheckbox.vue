<script setup lang="ts">
// 공통 인터페이스 정의
interface Option {
  value: string | number
  label: string
  disabled?: boolean
}
const props = withDefaults(defineProps<{
  options: Option[]
  disabled?: boolean
  error?: boolean
  max?: number
}>(), {
  modelValue: () => [],
  disabled: false,
  error: false,
  max: Infinity,
})

const emit = defineEmits<{
  (e: 'change', value: (string | number)[]): void
}>()

const model = defineModel<(string | number)[]>({ default: [] })

const handleCheckboxToggle = (option: Option) => {
  if (props.disabled || option.disabled)
    return

  const currentValues = [...model.value]
  const index = currentValues.indexOf(option.value)

  if (index > -1) {
    currentValues.splice(index, 1)
  }
  else {
    if (currentValues.length < props.max) {
      currentValues.push(option.value)
    }
  }

  model.value = currentValues
  emit('change', currentValues)
}
</script>

<template>
  <div
    class="base-checkbox-group" :class="{
      'is-disabled': disabled,
      'has-error': error,
    }"
  >
    <div
      v-for="option in options" :key="option.value" class="checkbox-option"
      :class="{
        'is-disabled': option.disabled || props.disabled,
      }"
      @click="handleCheckboxToggle(option)"
    >
      <div class="checkbox-input-wrapper">
        <div
          class="checkbox-input" :class="{
            'is-selected': modelValue.includes(option.value),
          }"
        />
      </div>
      <label class="checkbox-label">{{ option.label }}</label>
    </div>
  </div>
</template>

<style scoped>

</style>
