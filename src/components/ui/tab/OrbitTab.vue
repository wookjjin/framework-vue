<script setup lang="ts">
import type { ITabProps, TabsInjection } from '~/types'
import { DragScroll } from '~/composables/drag-scroll'
import { TabsSymbol } from '~/types'

const {
  tabItems = [],
  defaultActiveId = '',
} = defineProps<ITabProps>()

const emit = defineEmits<{
  (e: 'update:activeId', id: string): void
  (e: 'change', id: string): void
}>()

const activeTabId = ref(defaultActiveId || (tabItems.length > 0 ? tabItems[0].id : ''))
const tabHeader = ref<HTMLElement | null>(null)
const dragScroll = ref<DragScroll | null>(null)

const activateTab = (id: string) => {
  activeTabId.value = id
}

const onPointerDown = (event: PointerEvent) => dragScroll.value?.onPointerDown(event)
const onPointerMove = (event: PointerEvent) => dragScroll.value?.onPointerMove(event)
const onPointerUp = () => dragScroll.value?.onPointerUp()

watch(activeTabId, (newValue) => {
  emit('update:activeId', newValue)
  emit('change', newValue)
})

onMounted(() => {
  if (tabHeader.value) {
    dragScroll.value = new DragScroll(tabHeader.value)
  }
})

onUnmounted(() => {
  dragScroll.value = null
})

provide<TabsInjection>(TabsSymbol, {
  activeTabId: readonly(activeTabId),
  activateTab,
})
</script>

<template>
  <div class="tabs-container">
    <div
      ref="tabHeader" class="tabs-header" @pointerdown="onPointerDown" @pointermove="onPointerMove"
      @pointerup="onPointerUp" @pointerleave="onPointerUp"
    >
      <BaseButton
        v-for="tab in tabItems" :key="tab.id" class="tab-button" :class="{ active: activeTabId === tab.id }"
        @click="activateTab(tab.id)"
      >
        {{ tab.title }}
      </BaseButton>
    </div>
    <div class="tab-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.tab-button {
  width: 160px;
  padding: 12px 24px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: var(--text-color);
  font-weight: 500;
  font-size: 16px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  outline: none;
  flex-shrink: 0;
}

.tab-button:hover {
  color: white;
}

.tab-button.active {
  background-color: var(--primary-green, #a8d5ba);
  color: white;
}

.tab-button:focus {
  box-shadow: none;
}
</style>
