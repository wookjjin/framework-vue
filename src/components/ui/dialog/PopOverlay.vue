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
}
withDefaults(defineProps<Props>(), {
  title: 'Dialog',
  showClose: true,
  showHeader: true,
  showFooter: true,
  confirmText: '확인',
  cancelText: '취소',
  closeOnOverlayClick: true,
  width: '500px',
})

const emit = defineEmits(['confirm', 'cancel', 'close'])

const isOpen = defineModel('isOpen', {
  default: false,
})

const close = () => {
  isOpen.value = false
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
  if (e.key === 'Escape' && isOpen.value) {
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
    <Transition name="dialog-fade">
      <div v-if="isOpen" class="dialog-backdrop" @click="closeOnOverlayClick && close">
        <div class="dialog" @click.stop>
          <header v-if="$slots.header || showHeader" class="dialog-header">
            <slot name="header">
              <h2 class="dialog-title">
                {{ title }}
              </h2>
              <button v-if="showClose" class="dialog-close" @click="close">
                &times;
              </button>
            </slot>
          </header>

          <main class="dialog-body">
            <slot name="content" />
          </main>

          <footer v-if="$slots.footer || showFooter" class="dialog-footer">
            <slot name="footer">
              <button v-if="cancelText" class="dialog-btn dialog-btn-cancel" @click="handleCancel">
                {{ cancelText }}
              </button>
              <button v-if="confirmText" class="dialog-btn dialog-btn-confirm" @click="handleConfirm">
                {{ confirmText }}
              </button>
            </slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.dialog {
  background-color: var(--bg-color);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(74, 109, 90, 0.2);
  width: v-bind('width');
  max-width: 90%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
}

.dialog-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
}

.dialog-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--disabled-color);
  padding: 0;
  line-height: 1;
}

.dialog-close:hover {
  color: var(--text-color);
}

.dialog-body {
  padding: 20px;
  overflow-y: auto;
  flex-grow: 1;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding: 16px 20px;
  border-top: 1px solid var(--border-color);
  gap: 12px;
}

.dialog-btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s;
}

.dialog-btn-cancel {
  background-color: var(--light-green);
  color: var(--text-color);
}

.dialog-btn-cancel:hover {
  background-color: var(--border-color);
}

.dialog-btn-confirm {
  background-color: var(--primary-green);
  color: white;
}

.dialog-btn-confirm:hover {
  background-color: var(--dark-green);
}

.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
</style>
