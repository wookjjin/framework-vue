<script setup lang="ts">
interface Props {
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary' | 'text' | 'outline'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  rounded?: boolean
  icon?: string
  iconOnly?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
  ripple?: boolean
}

const {
  size = 'medium',
  variant = 'primary',
  disabled = false,
  loading = false,
  block = false,
  rounded = false,
  icon = '',
  iconOnly = false,
  nativeType = 'button',
  ariaLabel = '',
  ripple = true,
} = defineProps<Props>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const hovering = ref(false)
const focused = ref(false)
const rippleContainer = ref<HTMLElement | null>(null)

// 리플 이펙트 생성 함수
const createRipple = (event: MouseEvent) => {
  if (!rippleContainer.value)
    return

  const container = rippleContainer.value
  const rect = container.getBoundingClientRect()

  const size = Math.max(rect.width, rect.height) * 2
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  const ripple = document.createElement('span')
  ripple.style.width = ripple.style.height = `${size}px`
  ripple.style.left = `${x}px`
  ripple.style.top = `${y}px`
  ripple.classList.add('ripple')

  container.appendChild(ripple)

  setTimeout(() => {
    ripple.remove()
  }, 600)
}

const handleClick = (event: MouseEvent) => {
  if (disabled || loading)
    return

  emit('click', event)

  if (ripple) {
    createRipple(event)
  }
}
</script>

<template>
  <button
    class="base-button" :class="[
      size,
      variant,
      {
        'base-button--loading': loading,
        'base-button--disabled': disabled,
        'base-button--block': block,
        'base-button--rounded': rounded,
        'base-button--icon-only': iconOnly,
      },
    ]" :disabled="disabled || loading" :type="nativeType" :aria-label="ariaLabel" @click="handleClick"
    @mouseover="hovering = true" @mouseleave="hovering = false" @focus="focused = true" @blur="focused = false"
  >
    <span v-if="loading" class="base-button__loader">
      <span class="spinner" />
    </span>
    <template v-else>
      <span v-if="$slots.prefix && !iconOnly" class="base-button__prefix">
        <slot name="prefix" />
      </span>
      <span v-else-if="icon && !loading" class="base-button__icon">
        <slot name="icon">{{ icon }}</slot>
      </span>
      <span v-if="$slots.default" class="base-button__label">
        <slot />
      </span>
      <span v-if="$slots.suffix && !iconOnly" class="base-button__suffix">
        <slot name="suffix" />
      </span>
    </template>
    <span v-if="ripple && !disabled" ref="rippleContainer" class="ripple-container" />
  </button>
</template>

<style scoped>

</style>
