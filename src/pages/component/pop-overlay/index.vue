<script setup lang='ts'>
import { useConfirm } from '~/utils'

const isShow = ref(false)

const openPopOverlay = () => {
  isShow.value = true
}

const openConfirmOverlay = () => {
  useConfirm({
    title: 'Confirm',
    content: 'Really?',
    confirmButtonText: 'YES',
    cancelButtonText: 'NO',
    onConfirm: () => {
      console.log('확인 클릭')
    },
    onCancel: () => {
      console.log('취소 클릭')
    },
  })
}
</script>

<template>
  <div class="overlay-sample-list-contaner">
    <BaseButton @click="openPopOverlay">
      Open Popoverlay
    </BaseButton>
    <BaseButton @click="openConfirmOverlay">
      Open ConfirmOverlay
    </BaseButton>
  </div>
  <PopOverlay v-model:is-open="isShow" />
</template>

<style scoped>
.overlay-sample-list-contaner {
  display: flex;
  gap: 10px;
}
</style>
