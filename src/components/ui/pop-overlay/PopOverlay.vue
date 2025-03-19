<script lang="ts" setup>
interface Props {
  title?: string
  showClose?: boolean
  showHeader?: boolean
  showFooter?: boolean
  confirmText?: string
  cancelText?: string
  closeOnOverlayClick?: boolean
  width?: string
  height?: string
}
const {
  title = 'PopOverlay',
  showClose = true,
  showHeader = true,
  showFooter = true,
  confirmText = '확인',
  cancelText = '취소',
  closeOnOverlayClick = true,
  width = '500px',
  height = '450px',
} = defineProps<Props>()

const emit = defineEmits(['confirm', 'cancel', 'close'])

const isShow = defineModel('isShow', {
  default: false,
})

const close = () => {
  isShow.value = false
  emit('close')
}

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
  close()
}

// ESC 키를 눌렀을 때 다이얼로그 닫기
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isShow.value) {
    close()
  }
}

// Add keyboard event listener
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

// Delete keyboard event listener
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <!-- 텔레포트 필요 시 -->
  <Teleport to="body">
    <Transition name="overlay-fade">
      <div v-if="isShow" class="overlay-backdrop" @click="closeOnOverlayClick && close">
        <div class="overlay" :style="{ width, height }" @click.stop>
          <header v-if="$slots.header || showHeader" class="overlay-header">
            <slot name="header">
              <h2 class="overlay-title">
                {{ title }}
              </h2>
              <BaseButton v-if="showClose" class="overlay-close" @click="close">
                &times;
              </BaseButton>
            </slot>
          </header>

          <main class="overlay-body">
            <slot name="content" />
          </main>

          <footer v-if="$slots.footer || showFooter" class="overlay-footer">
            <slot name="footer">
              <BaseButton v-if="cancelText" class="overlay-btn overlay-btn-cancel" @click="handleCancel">
                {{ cancelText }}
              </BaseButton>
              <BaseButton v-if="confirmText" class="overlay-btn overlay-btn-confirm" @click="handleConfirm">
                {{ confirmText }}
              </BaseButton>
            </slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>

</style>
