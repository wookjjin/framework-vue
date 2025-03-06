import { defineStore } from 'pinia'

export interface Confirm {
  useHeader?: boolean
  useExitButton?: boolean
  title?: string
  content?: string
  useFooter?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export const useConfirmStore = defineStore('confirm', () => {
  const isVisible = ref<boolean>(false)

  const options = reactive<Confirm>({
    useHeader: true,
    useExitButton: true,
    title: 'Confirm Header',
    content: 'Confirm content',
    useFooter: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    onConfirm: undefined as (() => void) | undefined,
    onCancel: undefined as (() => void) | undefined,
  })

  const openConfirm = (newOptions: Partial<typeof options>) => {
    Object.assign(options, newOptions)
    isVisible.value = true
  }

  const closeConfirm = () => {
    isVisible.value = false
  }

  return {
    isVisible,
    options,
    openConfirm,
    closeConfirm,
  }
})
