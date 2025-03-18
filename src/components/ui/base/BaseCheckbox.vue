<script setup lang="ts">
interface CheckboxProps {
  label?: string
  trueValue?: boolean
  falseValue?: boolean
  id?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  label: '',
  trueValue: true,
  falseValue: false,
  id: () => useId(),
  disabled: false,
})

const emit = defineEmits(['change'])
const model = defineModel()

const checkboxValue = computed({
  get() {
    return model.value === props.trueValue
  },
  set(checked) {
    model.value = checked ? props.trueValue : props.falseValue
  },
})

// 체크박스 변경 핸들러
const handleChange = () => {
  if (props.disabled)
    return

  const newValue = checkboxValue.value ? props.falseValue : props.trueValue
  model.value = newValue

  emit('change', newValue)

  console.log('체크박스 값 변경:', !checkboxValue.value, model.value)
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
