<script setup lang="ts">
interface MenuItem {
  id: number
  label: string
  parentId: number | null
  path: string
  children?: MenuItem[]
}

const {
  item = {
    id: 0,
    label: '',
    parentId: '',
    path: '',
    children: [],
  },
} = defineProps<{
  item: MenuItem
}>()

const router = useRouter()
const isOpen = ref(false)

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <li
    class="nav-item"
    @mouseenter="isOpen = true"
    @mouseleave="isOpen = false"
  >
    <div class="nav-label" @click="!item.children?.length ? navigateTo(item.path) : null">
      {{ item.label }}
      <span v-if="item.children?.length">▼</span>
    </div>
    <ul
      v-if="item.children?.length && isOpen" class="dropdown"
      @mouseenter="isOpen = true"
      @mouseleave="isOpen = false"
    >
      <TopBarNavItem v-for="child in item.children" :key="child.id" :item="child" />
    </ul>
  </li>
</template>

<style scoped>
.nav-item {
  position: relative;
  padding: 10px 15px;
  cursor: pointer;
  color: white;
}

.nav-label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #444;
  list-style: none;
  padding: 5px 0;
  min-width: 150px;
  display: block;
}

.dropdown li {
  padding: 8px 15px;
}
</style>
