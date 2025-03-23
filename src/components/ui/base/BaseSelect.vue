<script setup lang="ts">
export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

const {
  options = [],
  label = '',
  placeholder = '선택해주세요',
  disabled = false,
  error = false,
} = defineProps<{
  options: SelectOption[]
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: boolean
}>()

const emit = defineEmits<{
  (e: 'change', value: string | number): void
}>()

const isOpen = ref(false)
const model = defineModel()
const selectRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const dropDirection = ref<'down' | 'up'>('down')

const selectedOption = computed(() =>
  options.find(option => option.value === model.value),
)

const updateDropdownPosition = () => {
  if (!selectRef.value || !dropdownRef.value)
    return

  const selectRect = selectRef.value.getBoundingClientRect()

  // 화면 아래쪽 여유 공간 계산
  const spaceBelow = window.innerHeight - selectRect.bottom

  // 화면 위쪽 여유 공간 계산
  const spaceAbove = selectRect.top

  // 아래쪽 공간이 드롭다운 높이보다 작고 위쪽 공간이 더 크면 위로 표시
  if (spaceAbove > spaceBelow) {
    dropDirection.value = 'up'
  }
  else {
    dropDirection.value = 'down'
  }
}

const selectOption = (option: SelectOption) => {
  if (!option.disabled && !disabled) {
    model.value = option.value
    emit('change', option.value)
    isOpen.value = false
  }
}

const toggleDropdown = () => {
  if (!disabled) {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
      nextTick(() => {
        updateDropdownPosition()
      })
    }
  }
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const selectElement = target.closest('.base-select')
  if (!selectElement) {
    isOpen.value = false
  }
}

const handleResize = () => {
  if (isOpen.value) {
    updateDropdownPosition()
  }
}

const handleScroll = () => {
  if (isOpen.value) {
    updateDropdownPosition()
  }
}

const addClickOutsideListener = () => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll)
}

const removeClickOutsideListener = () => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll)
}

onMounted(addClickOutsideListener)
onUnmounted(removeClickOutsideListener)
</script>

<template>
  <div
    ref="selectRef" class="base-select" :class="{
      'is-open': isOpen,
      'is-disabled': disabled,
      'has-error': error,
      'direction-up': dropDirection === 'up',
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
      <div v-if="isOpen" ref="dropdownRef" class="select-dropdown" :class="{ 'dropdown-up': dropDirection === 'up' }">
        <div
          v-for="option in options" :key="option.value" class="select-option" :class="{
            'is-selected': option.value === model,
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
