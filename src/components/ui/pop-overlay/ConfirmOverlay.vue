<script setup lang='ts'>
import { useConfirmStore } from '~/stores/confirm'

const confirmStore = useConfirmStore()

const closeConfirm = () => {
  confirmStore.closeConfirm()
}
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="confirmStore.isVisible" class="confirm-overlay">
        <div class="confirm-container">
          <div v-if="confirmStore.options.useHeader" class="confirm-header">
            {{ confirmStore.options.title }}
            <button v-if="confirmStore.options.useExitButton" @click="closeConfirm()">
              x
            </button>
          </div>
          <div class="confirm-content">
            {{ confirmStore.options.content }}
          </div>
          <div v-if="confirmStore.options.useFooter" class="confirm-footer">
            <button class="btn-cancel" @click="() => { confirmStore.options.onCancel?.(); closeConfirm(); }">
              {{ confirmStore.options.cancelButtonText }}
            </button>
            <button class="btn-confirm" @click="() => { confirmStore.options.onConfirm?.(); closeConfirm(); }">
              {{ confirmStore.options.confirmButtonText }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>

</style>
