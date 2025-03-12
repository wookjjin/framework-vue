<script setup lang="ts">
import { computed, ref } from 'vue'

interface MenuItem {
  id: number
  label: string
  parentId: number | null
  path: string
  children?: MenuItem[]
}

const flatMenu = ref<MenuItem[]>([
  { id: 1, label: 'Home', path: '/', parentId: null },
  { id: 2, label: 'Products', path: '/product', parentId: null },
  { id: 3, label: 'Laptops', path: '/laptops', parentId: 2 },
  { id: 4, label: 'Phones', path: '/phones', parentId: 2 },
  { id: 5, label: 'Contact', path: '/contact', parentId: null },
])

const buildTree = (menu: MenuItem[]): MenuItem[] => {
  const map = new Map<number, MenuItem>()
  const roots: MenuItem[] = []

  menu.forEach((item) => {
    map.set(item.id, { ...item, children: [] })
  })

  menu.forEach((item) => {
    if (item.parentId !== null && map.has(item.parentId)) {
      map.get(item.parentId)!.children!.push(map.get(item.id)!)
    }
    else {
      roots.push(map.get(item.id)!)
    }
  })

  return roots
}

const menuTree = computed(() => buildTree(flatMenu.value))
</script>

<template>
  <nav class="top-bar-nav">
    <ul>
      <TopBarNavItem v-for="item in menuTree" :key="item.id" :item="item" />
    </ul>
  </nav>
</template>

<style scoped>
.top-bar-nav {
  background-color: #333;
  padding: 10px;
}

.top-bar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}
</style>
