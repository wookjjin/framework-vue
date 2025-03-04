<script setup lang='ts'>
import { useToastStore } from '~/stores/toast'

export type ToastType = 'SUCCESS' | 'ERROR' | 'WARNING' | 'DEFAULT' | 'CUSTOM'
export type ToastMessage = string

const toastStore = useToastStore()

</script>

<template>
  <teleport to="body">
    <div class="toast-container">
      <transition-group name="toast">
        <div v-for="toast in toastStore.toasts" :key="toast.id" class="toast" :class="toast.type.toLowerCase()">
          {{ toast.message }}
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<style scoped>
</style>
