import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false)
  let timer: NodeJS.Timeout | null = null
  let minDelayTimer: NodeJS.Timeout | null = null

  const minDelay = 300 // 최소 지연 시간 (ms)
  const displayTime = 500 // 최소 표시 시간 (ms)

  const startLoading = () => {
    if (timer)
      clearTimeout(timer)
    if (minDelayTimer)
      clearTimeout(minDelayTimer)

    minDelayTimer = setTimeout(() => {
      isLoading.value = true
    }, minDelay)
  }

  const stopLoading = () => {
    if (minDelayTimer)
      clearTimeout(minDelayTimer)

    if (isLoading.value) {
      timer = setTimeout(() => {
        isLoading.value = false
      }, displayTime)
    }
    else {
      isLoading.value = false
    }
  }

  return { isLoading: computed(() => isLoading.value), startLoading, stopLoading }
})
