<script setup lang="ts">
interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  options: SelectOption[]
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: boolean
}>(), {
  label: '',
  placeholder: '선택해주세요',
  disabled: false,
  error: false,
})

const emit = defineEmits<{
  (e: 'change', value: string | number): void
}>()

const isOpen = ref(false)
const model = defineModel()

const selectedOption = computed(() =>
  props.options.find(option => option.value === model.value),
)

const selectOption = (option: SelectOption) => {
  if (!option.disabled && !props.disabled) {
    model.value = option.value
    emit('change', option.value)
    isOpen.value = false
  }
}

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const selectElement = target.closest('.base-select')
  if (!selectElement) {
    isOpen.value = false
  }
}

const addClickOutsideListener = () => {
  document.addEventListener('click', handleClickOutside)
}

const removeClickOutsideListener = () => {
  document.removeEventListener('click', handleClickOutside)
}
onMounted(addClickOutsideListener)
onUnmounted(removeClickOutsideListener)
</script>

<template>
  <div
    class="base-select" :class="{
      'is-open': isOpen,
      'is-disabled': disabled,
      'has-error': error,
    }" @click.stop="toggleDropdown"
  >
    <label v-if="label" class="select-label">{{ label }}</label>
    <!-- 선택된 값 표시 영역 -->
    <div class="select-display" :class="{ 'is-placeholder': !selectedOption }">
      {{ selectedOption ? selectedOption.label : placeholder }}
      <div class="select-arrow" />
    </div>

    <!-- 드롭다운 옵션 리스트 -->
    <transition name="dropdown">
      <div v-if="isOpen" class="select-dropdown">
        <div
          v-for="option in options" :key="option.value" class="select-option" :class="{
            'is-selected': option.value === modelValue,
            'is-disabled': option.disabled || disabled,
          }" @click.stop="selectOption(option)"
        >
          {{ option.label }}
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>

</style>
