<script setup lang="ts">
interface CheckboxProps {
  label?: string
  trueValue?: boolean
  falseValue?: boolean
  id?: string
  disabled?: boolean
}

const {
  label = '',
  trueValue = true,
  falseValue = false,
  id = useId(),
  disabled = false,
} = defineProps<CheckboxProps>()

const emit = defineEmits(['change'])
const model = defineModel()

const checkboxValue = computed({
  get() {
    return model.value === trueValue
  },
  set(checked) {
    model.value = checked ? trueValue : falseValue
  },
})

// 체크박스 변경 핸들러
const handleChange = () => {
  if (disabled)
    return

  const newValue = checkboxValue.value ? falseValue : trueValue
  model.value = newValue

  emit('change', newValue)
}
</script>

<template>
  <div class="checkbox-option" :class="{ 'is-disabled': disabled }">
    <div class="checkbox-input-wrapper" @click="handleChange">
      <div class="checkbox-input" :class="{ 'is-selected': checkboxValue }" />
    </div>
    <label :for="id" class="checkbox-label" @click="handleChange">{{ label }}</label>
  </div>
</template>

<style scoped>
</style>
