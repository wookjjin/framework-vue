<script setup lang="ts">
interface TreeNode {
  id: number;
  label: string;
  checked: boolean;
  expanded?: boolean;
  children?: TreeNode[];
}

const props = defineProps<{
  depth?: number;
  showCheckbox?: boolean;
}>();

// defineModel을 사용하여 부모로부터 트리 데이터를 받아옴
const treeData = defineModel<TreeNode[]>("treeData", { required: true });

// 최대 5뎁스까지만 허용
const maxDepth = 5;

// 트리 토글 기능 (펼치기/접기)
const toggleNode = (node: TreeNode) => {
  if (node.children) {
    node.expanded = !node.expanded;
  }
};

// 체크박스 상태 변경
const toggleCheckbox = (node: TreeNode, checked: boolean) => {
  node.checked = checked;

  // 하위 노드의 체크 상태를 부모 노드와 동기화
  if (node.children) {
    node.children.forEach((child) => toggleCheckbox(child, checked));
  }
};

// 현재 depth에 따른 들여쓰기 스타일 계산
const getIndentation = (depth: number) => {
  return { paddingLeft: `${depth * 16}px` }; // depth * 16px 만큼 들여쓰기
};
</script>

<template>
  <ul v-if="treeData.length">
    <li v-for="node in treeData" :key="node.id">
      <!-- 트리 노드 -->
      <div class="tree-node" :style="getIndentation(props.depth ?? 1)">
        <input
          v-if="showCheckbox"
          type="checkbox"
          v-model="node.checked"
          @change="toggleCheckbox(node, node.checked)"
        />
        <span @click="toggleNode(node)">
          {{ node.label }}
        </span>
        <span
          v-if="node.children?.length"
          class="ml-2"
          @click="toggleNode(node)"
        >
          {{ node.expanded ? "▼" : "▶" }}
        </span>
      </div>

      <!-- 하위 노드 렌더링 (5뎁스 제한) -->
      <Tree
        v-if="node.children && node.expanded && (props.depth ?? 1) < maxDepth"
        v-model:treeData="node.children"
        :depth="(props.depth ?? 1) + 1"
        :show-checkbox="showCheckbox"
      />
    </li>
  </ul>
</template>

<style scoped>
.tree-node {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  input {
    appearance: auto;
  }
}
.tree-node span {
  user-select: none;
}
</style>
