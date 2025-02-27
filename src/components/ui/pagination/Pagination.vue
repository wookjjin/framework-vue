<script setup lang="ts">
export type LimitOption<T> = T extends {
  label: string,
  value: string | number
}
  ? { label: string, value: string | number }
  : { cmmCdv: string, cmmCdvNm: string }

const props = withDefaults(
  defineProps<{
    totalCount: number
    pageVisibleCount?: number
    limitOptions?: LimitOption<any>[]
    useLimitList?: boolean
  }>(),
  {
    totalCount: 20,
    pageVisibleCount: 10,
    limitOptions: () => [
      { label: '10개씩 보기', value: 10 },
      { label: '30개씩 보기', value: 30 },
      { label: '50개씩 보기', value: 50 },
    ],
    useLimitList: false,
  }
)

const emits = defineEmits<{
  (event: 'pageChangeEvent', page: number): void
  (event: 'limitChangeEvent', limit: string | number): void
}>()

const currentPage = defineModel('currentPage', {
  default: 1,
})
const currentPageLimit = defineModel('currentPageLimit', {
  default: 10,
})

const totalPageCount = computed(() => Math.ceil(props.totalCount / currentPageLimit.value))

const startPage = computed(() => {
  return Math.floor((currentPage.value - 1) / props.pageVisibleCount) * props.pageVisibleCount + 1
})

const endPage = computed(() => {
  return Math.min(startPage.value + props.pageVisibleCount - 1, totalPageCount.value)
})

const visiblePages = computed(() => {
  return Array.from({ length: endPage.value - startPage.value + 1 }, (_, i) => startPage.value + i)
})

const pageChangeEvent = (page: number) => {
  if (page < 1 || page > totalPageCount.value) return
  currentPage.value = page
  emits('pageChangeEvent', page)
}
</script>

<template>
  <div v-if="totalPageCount > 1" class="pagination-container">
    <button type="button" class="page-button first" :disabled="currentPage === 1" @click="pageChangeEvent(1)">
      <span class="icon">
        ⏮
      </span>
    </button>
    <button type="button" class="page-button prev" :disabled="currentPage === 1"
      @click="pageChangeEvent(currentPage - 1)">
      <span class="icon">
        ◀
      </span>
    </button>

    <button v-for="page in visiblePages" :key="page" type="button" class="page-button"
      :class="{ active: page === currentPage }" @click="pageChangeEvent(page)">
      {{ page }}
    </button>

    <button type="button" class="page-button next" :disabled="currentPage === totalPageCount"
      @click="pageChangeEvent(currentPage + 1)">
      <span class="icon">
        ▶
      </span>
    </button>
    <button type="button" class="page-button last" :disabled="currentPage === totalPageCount"
      @click="pageChangeEvent(totalPageCount)">
      <span class="icon">
        ⏭
      </span>
    </button>
  </div>
</template>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 12px 0;
}

.page-button {
  min-width: 24px;
  height: 24px;
  padding: 0;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background: #f5f5f5;
  color: #333;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-button .icon {
  font-size: 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-button.active {
  background: #4f8a5a;
  color: white;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(76, 175, 80, 0.3);
}

.page-button:hover:not(:disabled) {
  background: #4f8a5a;
  color: white;
}

.page-button:active:not(:disabled) {
  transform: scale(0.95);
}

.page-button:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

@media (max-width: 480px) {
  .page-button {
    min-width: 28px;
    height: 28px;
    font-size: 12px;
  }

  .page-button .icon {
    font-size: 14px;
  }
}
</style>