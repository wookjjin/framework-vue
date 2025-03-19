<script setup lang="ts">
export type ProgressMessage = string
export type ProgressType = 'CIRCLE' | 'BAR'

const {
  progressMessage = 'Please wait...',
  progressType = 'BAR',
} = defineProps<{
  progressMessage?: ProgressMessage
  progressType?: ProgressType
}>()
</script>

<template>
  <teleport to="body">
    <div class="progress-overlay">
      <div class="progress-container">
        <div v-if="progressType === 'CIRCLE'" class="progress-circle">
          <svg viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" stroke-width="5" />
          </svg>
        </div>
        <div v-else class="progress-bar">
          <div class="bar" />
        </div>
        <p class="progress-message">
          {{ progressMessage }}
        </p>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
</style>
