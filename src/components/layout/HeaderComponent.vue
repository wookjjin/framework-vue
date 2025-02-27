<script setup lang="ts">
const isNavOpen = defineModel()
const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value
}
</script>

<template>
  <header class="header">
    <div class="logo">
      <button type="button" class="hamburger-btn" @click="toggleNav">
        <span :class="{ open: isNavOpen }" />
        <!-- <img src="/icon/hamburger.svg"> -->
      </button>
      <h1>( •̀ ω •́ )y</h1>
    </div>
    <div class="header-content">
      <!-- 추가 헤더 내용 -->
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background-color: var(--primary-green);
  border-bottom: 1px solid var(--light-green);
  position: relative;
  z-index: 80;
  color: var(--text-color);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
}

.hamburger-btn {
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.hamburger-btn span {
  display: block;
  position: relative;
  width: 25px;
  height: 3px;
  background-color: var(--text-color);
  transition: all 0.3s ease;
}

.hamburger-btn span::before,
.hamburger-btn span::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 3px;
  background-color: var(--text-color);
  transition: all 0.3s ease;
}

.hamburger-btn span::before {
  transform: translateY(-8px);
}

.hamburger-btn span::after {
  transform: translateY(8px);
}

.hamburger-btn span.open {
  background-color: transparent;
}

.hamburger-btn span.open::before {
  transform: rotate(45deg);
}

.hamburger-btn span.open::after {
  transform: rotate(-45deg);
}
</style>
