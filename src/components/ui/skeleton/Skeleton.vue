<script setup lang="ts">
const {
  text = false,
  size = 'medium',
  width = '100%',
  height = '100%',
  isRound = false,
  circle = false,
  repeat = 1,
  animation = 'pulse',
  gap = '0.5rem',
  className = '',
} = defineProps<{
  text?: boolean // 텍스트 스켈레톤 여부
  size?: 'small' | 'medium' | 'large' // 스켈레톤 크기
  width?: string // 너비
  height?: string // 높이
  isRound?: boolean // 둥근 모서리 여부
  circle?: boolean // 원형 여부
  repeat?: number // 반복 횟수
  animation?: 'pulse' | 'wave' | 'none' // 애니메이션 종류
  gap?: string // 반복 요소 간격
  className?: string // 추가 클래스
}>()

// size에 따른 실제 높이 값을 계산
const getHeight = (size: string, isText: boolean): string => {
  if (isText) {
    switch (size) {
      case 'small': return '0.75rem'
      case 'medium': return '1rem'
      case 'large': return '1.25rem'
      default: return '1rem'
    }
  }
  else {
    return height
  }
}

// 실제 계산된 높이
const computedHeight = getHeight(size, text)

// 스켈레톤 아이템 생성
const items = Array.from({ length: repeat }, (_, index) => index)
</script>

<template>
  <div class="skeleton-container" :class="className" :style="{ gap }">
    <div
      v-for="(item, index) in items" :key="index" class="skeleton" :class="[
        `skeleton--${size}`,
        `skeleton--${animation}`,
        {
          'skeleton--text': text,
          'skeleton--round': isRound,
          'skeleton--circle': circle,
        },
      ]" :style="{
        width,
        height: text ? computedHeight : height,
        borderRadius: isRound ? '0.5rem' : circle ? '50%' : '0',
      }"
    />
  </div>
</template>

<style scoped>
</style>
