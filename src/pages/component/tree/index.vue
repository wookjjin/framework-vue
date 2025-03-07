<script setup lang="ts">
import Tree from "~/components/ui/tree/Tree.vue";
const treeData = ref([
  {
    id: 1,
    label: "루트 노드",
    checked: false,
    expanded: true,
    children: [
      {
        id: 2,
        label: "자식 노드 1",
        checked: false,
        expanded: false,
        children: [
          {
            id: 3,
            label: "자식 노드 1-1",
            checked: false,
            expanded: false,
            children: [
              {
                id: 5,
                label: "자식 노드 1-1-1",
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
        label: "자식 노드 2",
        checked: false,
        expanded: false,
        children: [],
      },
    ],
  },
]);
</script>

<template>
  <div>
    <Tree v-model:treeData="treeData" show-checkbox />
  </div>
</template>

<style scoped></style>
