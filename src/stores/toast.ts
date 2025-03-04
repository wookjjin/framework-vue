import { defineStore } from 'pinia'

export interface Toast {
  id: number
  type: 'SUCCESS' | 'ERROR' | 'WARNING' | 'DEFAULT'
  message: string
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  const addToast = (message: string, type: Toast['type'] = 'DEFAULT') => {
    const id = Date.now()
    toasts.value.push({ id, message, type })

    setTimeout(() => {
      removeToast(id)
    }, 3000)
  }

  return { toasts, addToast, removeToast }
})
