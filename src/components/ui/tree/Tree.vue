<script setup lang="ts">
export interface TreeNode {
  parentId?: number | string | null
  id: number | string
  label: string
  checked: boolean
  expanded?: boolean
  children?: TreeNode[]
}

withDefaults(defineProps<{
  showCheckbox?: boolean
}>(), {
  showCheckbox: true,
})

// defineModel을 사용하여 부모로부터 트리 데이터를 받아옴
const treeData = defineModel<TreeNode[]>('treeData', { required: true })

// 트리 토글 기능 (펼치기/접기)
const toggleNode = (node: TreeNode) => {
  if (node.children) {
    node.expanded = !node.expanded
  }
}

// 체크박스 상태 변경
const toggleCheckbox = ( node: TreeNode, checked: boolean) => {
  node.checked = checked
  // 하위 노드의 체크 상태를 부모 노드와 동기화
  if (node.children) {
    node.children.forEach(child => toggleCheckbox( child, checked))
  }
}


const convertTreeData = (treeNodes: TreeNode[]) => {
  const nodeMap = new Map<string | number, TreeNode>()
  const tree: TreeNode[] = []
  treeNodes.forEach((node) => {
    node.children = node.children ?? []
    nodeMap.set(node.id, node)
  })
  treeNodes.forEach((node) => {
    if (node.parentId !== null && node.parentId !== undefined && nodeMap.has(node.parentId)) {
      nodeMap.get(node.parentId)!.children!.push(node)
    } else {
      tree.push(node)
    }
  })

  return tree
}

onMounted(() => {
  if (Array.isArray(treeData.value) && treeData.value.length > 0) {
    if (treeData.value[0]?.parentId !== undefined) {
      treeData.value = JSON.parse(JSON.stringify(convertTreeData(treeData.value)))
    }
  }
})
</script>

<template>
  <ul v-if="treeData.length">
    <li v-for="node in treeData" :key="node.id" class="tree-item">
      <div class="tree-node">
        <input
          v-if="showCheckbox"
          v-model="node.checked"
          type="checkbox"
          @change="toggleCheckbox(node, node.checked)"
        >
        <span @click="toggleNode(node)">
          {{ node.label }}
        </span>
        <span
          v-if="node.children?.length"
          class="toggle-icon"
          @click="toggleNode(node)"
        >
          {{ node.expanded ? "▼" : "▶" }}
        </span>
      </div>

      <ul v-if="node.children && node.expanded" class="tree-children">
        <Tree v-model:tree-data="node.children" :show-checkbox="showCheckbox" />
      </ul>
    </li>
  </ul>
</template>

<style scoped>
.tree-node {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 5px 10px;
}

.node-line {
  opacity: 0.5;
  margin-right: 5px;
}

ul {
  padding-left: 16px;
}

.tree-item {
  list-style-type: none;
  position: relative;
}

.toggle-icon {
  margin-left: 8px;
  font-size: 12px;
  cursor: pointer;
}

.tree-children {
  padding-left: 12px;
}

/* 체크박스 커스텀 스타일 */
input[type="checkbox"] {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease-in-out;
}

/* 체크박스 호버 효과 */
input[type="checkbox"]:hover {
  border-color: #888;
}

/* 체크박스 체크 시 스타일 */
input[type="checkbox"]:checked {
  background-color: #007bff;
  border-color: #007bff;
}

input[type="checkbox"]:checked::after {
  content: '✔';
  color: white;
  font-size: 12px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 체크박스 포커스 스타일 */
input[type="checkbox"]:focus {
  outline: none;
  box-shadow: 0 0 3px #007bff;
}
</style>