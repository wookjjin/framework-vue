<script setup lang="ts">
export interface TreeNode {
  parentId?: number | string | null
  id: number | string
  label: string
  checked: boolean
  expanded?: boolean
  children?: TreeNode[]
}

const {
  showCheckbox = true,
} = defineProps<{
  showCheckbox?: boolean
}>()

// defineModel을 사용하여 부모로부터 트리 데이터를 받아옴
const treeData = defineModel<TreeNode[]>('treeData', { required: true })

// 체크박스 상태 변경
const toggleCheckbox = (node: TreeNode, checked: boolean) => {
  node.checked = checked
  // 하위 노드의 체크 상태를 부모 노드와 동기화
  if (node.children) {
    node.children.forEach(child => toggleCheckbox(child, checked))
  }
}

// 트리 토글 기능 (펼치기/접기)
const toggleNode = (node: TreeNode) => {
  if (node.children?.length) {
    node.expanded = !node.expanded
  }
  else {
    node.checked = !node.checked
    toggleCheckbox(node, node.checked)
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
    }
    else {
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
        <BaseCheckbox
          v-if="showCheckbox" v-model="node.checked" type="checkbox"
          @change="toggleCheckbox(node, node.checked)"
        />
        <span @click="toggleNode(node)">
          {{ node.label }}
        </span>
        <span
          v-if="node.children?.length" class="toggle-icon" :class="{ rotated: node.expanded }"
          @click="toggleNode(node)"
        >
          ▶
        </span>
      </div>

      <transition name="fade">
        <ul v-if="node.children && node.expanded" class="tree-children">
          <Tree v-model:tree-data="node.children" :show-checkbox="showCheckbox" />
        </ul>
      </transition>
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

/* 트리 노드 애니메이션 */
.fade-enter-active,
.fade-leave-active {
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
  overflow: hidden;
}

.fade-enter-from,
.fade-leave-to {
  max-height: 0;
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  max-height: 500px;
  opacity: 1;
}

.toggle-icon {
  display: inline-block;
  transition: transform 0.3s ease-in-out;
}

.toggle-icon.rotated {
  transform: rotate(90deg);
}
</style>
