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
            <BaseButton v-if="confirmStore.options.useExitButton" class="close-btn" @click="closeConfirm()">
              &times;
            </BaseButton>
          </div>
          <div class="confirm-content">
            {{ confirmStore.options.content }}
          </div>
          <div v-if="confirmStore.options.useFooter" class="confirm-footer">
            <BaseButton class="btn-cancel" @click="() => { confirmStore.options.onCancel?.(); closeConfirm(); }">
              {{ confirmStore.options.cancelButtonText }}
            </BaseButton>
            <BaseButton class="btn-confirm" @click="() => { confirmStore.options.onConfirm?.(); closeConfirm(); }">
              {{ confirmStore.options.confirmButtonText }}
            </BaseButton>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>

</style>
