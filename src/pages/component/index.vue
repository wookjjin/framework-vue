<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// 알파벳 순서대로 메뉴 리스트
const componentMenus = [
  { name: 'Button', id: 'button' },
  { name: 'Chart', id: 'chart' },
  { name: 'Checkbox', id: 'checkbox' },
  { name: 'Grid', id: 'grid' },
  { name: 'Gantt', id: 'gantt' },
  { name: 'Input', id: 'input' },
  { name: 'Kanban', id: 'kanban' },
  { name: 'PopOverlay', id: 'pop-overlay' },
  { name: 'Progress', id: 'progress' },
  { name: 'Radio', id: 'radio' },
  { name: 'Select', id: 'select' },
  { name: 'Skeleton', id: 'skeleton' },
  { name: 'Tab', id: 'tab' },
  { name: 'Tag', id: 'tag' },
  { name: 'Toast', id: 'toast' },
  { name: 'Tree', id: 'tree' },
  { name: 'Top Bar', id: 'top-bar' },
]

// 알파벳별로 그룹화
const groupedMenus = computed(() => {
  return componentMenus.reduce((acc, menu) => {
    const firstLetter = menu.name[0].toUpperCase() // 첫 글자 가져오기
    if (!acc[firstLetter]) {
      acc[firstLetter] = []
    }
    acc[firstLetter].push(menu)
    return acc
  }, {} as Record<string, { name: string, id: string }[]>)
})

// 라우터 이동 함수
const goToComponent = (id: string) => {
  router.push(`/component/${id}`)
}
</script>

<template>
  <div class="menu-container">
    <div class="menu-wrapper">
      <h2 class="menu-title">
        Get Start
      </h2>
      <div class="menu-list">
        <div v-for="(menus, letter) in groupedMenus" :key="letter" class="menu-group">
          <h3 class="menu-letter">
            {{ letter }}
          </h3>
          <ul>
            <li v-for="menu in menus" :key="menu.id" class="menu-item" @click="goToComponent(menu.id)">
              {{ menu.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f4f4f4;
  overflow-y: auto;
}

.menu-wrapper {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
  max-height: 80vh;
  overflow-y: auto;
}

.menu-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
}

/* 알파벳 카테고리 스타일 */
.menu-group {
  text-align: left;
  margin-bottom: 12px;
}

.menu-letter {
  font-size: 20px;
  font-weight: bold;
  color: #555;
  margin-bottom: 8px;
  padding-left: 8px;
}

.menu-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-item {
  background: #f5f5f5;
  padding: 14px;
  margin-bottom: 4px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.menu-item:hover {
  background: #a8d5ba;
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 4px 6px rgba(0, 123, 255, 0.2);
}

.menu-item:active {
  transform: scale(0.95);
}
</style>
