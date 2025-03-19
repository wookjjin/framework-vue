<script setup lang="ts">
interface TagProps {
  text: string | number
  color?: string
  shape?: 'round' | 'square'
  closable?: boolean
  size?: 'small' | 'medium' | 'large'
}

const {
  text = 'Tag',
  color = '#70c0e8',
  shape = 'round',
  closable = false,
  size = 'medium',
} = defineProps<TagProps>()

const emit = defineEmits(['close'])

const sizeStyles = {
  small: { padding: '4px 8px', fontSize: '12px', borderRadius: '8px' },
  medium: { padding: '6px 12px', fontSize: '14px', borderRadius: '12px' },
  large: { padding: '8px 16px', fontSize: '16px', borderRadius: '16px' },
}

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <span
    class="tag" :style="{
      backgroundColor: color,
      borderRadius: shape === 'round' ? sizeStyles[size].borderRadius : '4px',
      padding: sizeStyles[size].padding,
      fontSize: sizeStyles[size].fontSize,
    }"
  >
    <slot name=" icon" />
    <span class="tag-text">{{ text }}</span>
    <BaseButton v-if="closable" class="tag-close-btn" @click="handleClose">×</BaseButton>
  </span>
</template>

<style scoped>

</style>
