/* eslint-disable regexp/optimal-quantifier-concatenation */
/* eslint-disable regexp/no-misleading-capturing-group */

import { useConfirmStore } from '../stores/confirm'
import { useLoadingStore } from '../stores/progress'
import { useToastStore } from '../stores/toast'

// 숫자 천단위 (,) 표시 util 함수수
export const formatNumber = (value: number | string): string => {
  return Number(value).toLocaleString()
}

// 전화번호 (-) 하이픈 처리 util 함수수
export const formatTellNumber = (phone: string | number) => {
  const cleaned = phone.toString().replace(/\D/g, '')

  if (/^01\d{8,9}$/.test(cleaned)) {
    return cleaned.replace(/^(01\d)(\d{3,4})(\d{4})$/, '$1-$2-$3')
  }
  else if (/^02\d{7,8}$/.test(cleaned)) {
    return cleaned.replace(/^(02)(\d{3,4})(\d{4})$/, '$1-$2-$3')
  }
  else if (/^0\d{9,10}$/.test(cleaned)) {
    return cleaned.replace(/^(\d{3})(\d{3,4})(\d{4})$/, '$1-$2-$3')
  }
  else if (/^1\d{7}$/.test(cleaned)) {
    return cleaned.replace(/^(\d{4})(\d{4})$/, '$1-$2')
  }
  return cleaned
}

// 개인정보 보안 전화번호 Masking 처리 util 함수
export const maskPhoneNumber = (phone: string | number) => {
  const formatted = formatTellNumber(phone)

  if (/^01\d-\d{3,4}-\d{4}$/.test(formatted)) {
    return formatted.replace(/(\d{2,3}-\d{3,4})-\d{4}$/, '$1-****')
  }
  else if (
    /^02-\d{3,4}-\d{4}$/.test(formatted)
    || /^\d{3}-\d{3,4}-\d{4}$/.test(formatted)
  ) {
    return formatted.replace(/^(\d{2,3})-(\d{1,2})\d+-(\d{4})$/, '$1-**$3')
  }
  else if (/^1\d{3}-\d{4}$/.test(formatted)) {
    return formatted.replace(/(\d{4})-\d{4}$/, '$1-****')
  }

  return formatted
}

// progress bar 테스트 용도 추후 삭제 무관
export async function fetchWithLoading(fetchFunction: () => Promise<any>) {
  const loadingStore = useLoadingStore()
  loadingStore.startLoading()
  try {
    const response = await fetchFunction()
    return response
  }
  finally {
    setTimeout(() => loadingStore.stopLoading(), 1000)
  }
}

export const bakeToast = {
  success: (message: string) => {
    useToastStore().addToast(message, 'SUCCESS')
  },
  error: (message: string) => {
    useToastStore().addToast(message, 'ERROR')
  },
  warning: (message: string) => {
    useToastStore().addToast(message, 'WARNING')
  },
  default: (message: string) => {
    useToastStore().addToast(message, 'DEFAULT')
  },
}

export const useConfirm = (options: Partial<ReturnType<typeof useConfirmStore>['options']>) => {
  const store = useConfirmStore()
  store.openConfirm(options)
}
