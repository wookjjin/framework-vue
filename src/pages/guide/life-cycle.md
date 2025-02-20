### Vue 3 Composition API에서의 라이프사이클 훅
Vue 3 Composition API에서는 onXXX 형태의 라이프사이클 훅을 사용합니다.
모든 훅은 setup() 내부에서 호출해야 하며, import 후 사용합니다.

1. 주요 라이프사이클 훅

`onBeforeMount()`
- 설명: DOM이 마운트되기 직전에 호출됩니다.
- 주요 용도: DOM 접근 전 초기화 작업
___
`onMounted()`
- 설명: DOM이 마운트된 후에 호출됩니다.
- 주요 용도: DOM 조작, 비동기 데이터 로딩, 이벤트 리스너 등록
___
`onBeforeUpdate()`
- 설명: 데이터가 변경되어 DOM이 업데이트되기 직전에 호출됩니다.
- 주요 용도: 업데이트 전 데이터 상태 확인
___
`onUpdated()`
- 설명: 데이터가 변경된 후 DOM이 업데이트된 후에 호출됩니다.
- 주요 용도: 업데이트 후 DOM 상태 확인, 후처리 작업
___
`onBeforeUnmount()`
- 설명: 컴포넌트가 해제되기 직전에 호출됩니다.
- 주요 용도: 이벤트 리스너 제거, 타이머 정리
___
`onUnmounted()`
- 설명: 컴포넌트가 해제된 후에 호출됩니다.
- 주요 용도: 메모리 정리, 비동기 작업 취소

---
|훅|설명||
|------|---|---|
|onBeforeMount()|DOM이 마운트되기 직전에 호출됩니다.
|onMounted()|DOM이 마운트된 후에 호출됩니다. 초기화 작업에 적합합니다.
|onBeforeUpdate()|데이터가 변경되어 DOM이 업데이트되기 직전에 호출됩니다.
|onUpdated()|DOM이 업데이트된 후에 호출됩니다.
|onBeforeUnmount()|컴포넌트가 해제되기 직전에 호출됩니다.
|onUnmounted()|컴포넌트가 해제된 후에 호출됩니다.

2. 에시코드
```vue
<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from 'vue'

const message = ref('Hello, Vue 3!')

onBeforeMount(() => {
  console.log('onBeforeMount - DOM 마운트 전')
})

onMounted(() => {
  console.log('onMounted - DOM 마운트 후')
})

onBeforeUpdate(() => {
  console.log('onBeforeUpdate - DOM 업데이트 전')
})

onUpdated(() => {
  console.log('onUpdated - DOM 업데이트 후')
})

onBeforeUnmount(() => {
  console.log('onBeforeUnmount - 컴포넌트 해제 전')
})

onUnmounted(() => {
  console.log('onUnmounted - 컴포넌트 해제 후')
})
</script>

<template>
  <div>{{ message }}</div>
</template>
```

<img src="../../../public/life-cycle.png" />
