<script setup lang="ts">
import TabOne from './TabContentOne.vue'
import TabThree from './TabContentThree.vue'
import TabTwo from './TabContentTwo.vue'

const tabs = [
  { title: '탭 1', id: 'tab1', content: TabOne },
  { title: '탭 2', id: 'tab2', content: TabTwo },
  { title: '탭 3', id: 'tab3', content: TabThree },
  { title: '탭 4', id: 'tab4', content: '네 번째 탭' },
  { title: '탭 5', id: 'tab5', content: '다섯 번째 탭' },
  { title: '탭 6', id: 'tab6', content: '여섯 번째 탭' },
  { title: '탭 7', id: 'tab7', content: '여섯 번째 탭' },
]
</script>

<template>
  <div>
    <h2>파스텔 그린 테마 탭 컴포넌트</h2>

    <OrbitTab default-active-id="tab1" :tab-items="tabs">
      <OrbitTabPanel v-for="tab in tabs" :id="tab.id" :key="tab.id">
        <template v-if="typeof tab.content === 'object'">
          <component :is="tab.content" />
        </template>
        <template v-else>
          {{ tab.content }}
        </template>
      </OrbitTabPanel>
    </OrbitTab>
  </div>
</template>

<style scoped>

</style>
