<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const componentMenus = [
  {
    name: 'Input',
    id: 'input',
  },
  {
    name: 'Grid',
    id: 'grid',
  },
]

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
      <ul class="menu-list">
        <li v-for="menu in componentMenus" :key="menu.id" class="menu-item" @click="goToComponent(menu.id)">
          {{ menu.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f4f4f4;
}

.menu-wrapper {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 320px;
}

.menu-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
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
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #a8d5ba;
    color: #fff;
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0, 123, 255, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>
