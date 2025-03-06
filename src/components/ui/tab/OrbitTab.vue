<script setup lang="ts">
import { DragScroll } from '~/composables/drag-scroll';
import type { ITabProps, TabsInjection } from '~/types'
import { TabsSymbol } from '~/types'

const props = withDefaults(defineProps<ITabProps>(), {
  defaultActiveId: '',
})

const emit = defineEmits<{
  (e: 'update:activeId', id: string): void,
  (e: 'change', id: string): void
}>()

const activeTabId = ref(props.defaultActiveId || (props.tabItems.length > 0 ? props.tabItems[0].id : ''))
const tabHeader = ref<HTMLElement | null>(null)
const dragScroll = ref<DragScroll| null>(null)

const activateTab = (id: string) => {
  activeTabId.value = id
}

const onPointerDown = (event: PointerEvent) => dragScroll.value?.onPointerDown(event);
const onPointerMove = (event: PointerEvent) => dragScroll.value?.onPointerMove(event);
const onPointerUp = () => dragScroll.value?.onPointerUp();

watch(activeTabId, (newValue) => {
  emit('update:activeId', newValue)
  emit('change', newValue)
})

onMounted(() => {
  if (tabHeader.value) {
    dragScroll.value = new DragScroll(tabHeader.value);
  }
});

onUnmounted(() => {
  dragScroll.value = null;
});

provide<TabsInjection>(TabsSymbol, {
  activeTabId: readonly(activeTabId),
  activateTab,
})
</script>

<template>
  <div class="tabs-container">
    <div ref="tabHeader" class="tabs-header" @pointerdown="onPointerDown" @pointermove="onPointerMove"
      @pointerup="onPointerUp" @pointerleave="onPointerUp">
      <button v-for="tab in tabItems" :key="tab.id" class="tab-button" :class="{ active: activeTabId === tab.id }"
        @click="activateTab(tab.id)">
        {{ tab.title }}
      </button>
    </div>
    <div class="tab-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
