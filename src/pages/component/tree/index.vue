<script setup lang="ts">
import type { TreeNode } from '~/components/ui/tree/Tree.vue'
import Tree from '~/components/ui/tree/Tree.vue'

const oneDimensionalData = ref<TreeNode[]>([
  {
    parentId: null,
    id: 'P01',
    label: '부모 1',
    checked: false,
    expanded: true,
  },
  {
    parentId: 'P01',
    id: 'C01',
    label: '자식 1',
    checked: false,
    expanded: true,
  },
  {
    parentId: 'C01',
    id: 'C01-1',
    label: '자식 1-1',
    checked: false,
    expanded: true,
  },
  {
    parentId: 'C01',
    id: 'C01-2',
    label: '자식 1-2',
    checked: false,
    expanded: true,
  },
  {
    parentId: null,
    id: 'P02',
    label: '부모 2',
    checked: false,
    expanded: true,
  },
  {
    parentId: 'P02',
    id: 'C02',
    label: '자식 2',
    checked: false,
    expanded: true,
  },
  {
    parentId: 'C02',
    id: 'C02-1',
    label: '자식 2-1',
    checked: false,
    expanded: true,
  },
  {
    parentId: 'C02-1',
    id: 'C02-1-1',
    label: '자식 2-1-1',
    checked: false,
    expanded: true,
  },
  {
    parentId: 'C02',
    id: 'C02-2',
    label: '자식 2-2',
    checked: false,
    expanded: true,
  },
])

const twoDimensionalData = ref<TreeNode[]>([
  {
    id: 1,
    label: '루트 노드',
    checked: false,
    expanded: true,
    children: [
      {
        id: 2,
        label: '자식 노드 1',
        checked: false,
        expanded: false,
        children: [
          {
            id: 3,
            label: '자식 노드 1-1',
            checked: false,
            expanded: false,
            children: [
              {
                id: 5,
                label: '자식 노드 1-1-1',
                checked: false,
                expanded: false,
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 4,
        label: '자식 노드 2',
        checked: false,
        expanded: false,
        children: [],
      },
    ],
  },
])
</script>

<template>
  <div class="tree-examples-container">
    <div class="tree-box">
      <span>1차원 배열</span>
      <Tree v-model:tree-data="oneDimensionalData" show-checkbox />
    </div>
    <div class="tree-box">
      <span>2차원 배열</span>
      <Tree v-model:tree-data="twoDimensionalData" show-checkbox />
    </div>
  </div>
</template>

<style scoped>
.tree-examples-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 20px;
  padding: 20px;
}

.tree-box {
  width: 300px;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  overflow: auto;
  background-color: #f9f9f9;
}
</style>
