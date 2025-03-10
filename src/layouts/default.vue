<script setup lang="ts">
const isNavOpen = ref(false)
</script>

<template>
  <div class="layout">
    <HeaderComponent v-model="isNavOpen" />
    <div class="content-container">
      <!-- 사이드 네비게이션 -->
      <aside class="nav-sidebar" :class="{ 'nav-open': isNavOpen }">
        <NavComponent />
      </aside>

      <!-- 메인 콘텐츠 영역 -->
      <main class="main-content" :class="{ 'nav-open': isNavOpen }">
        <RouterView />
      </main>
    </div>

    <FooterComponent />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  overflow: hidden;
}

.content-container {
  display: flex;
  flex: 1;
  position: relative;
  height: calc(100vh - 120px);
  overflow-y: auto;
  }

.nav-sidebar {
  width: 250px;
  background-color: var(--primary-green);
  transition: transform 0.3s ease;
  transform: translateX(-100%);
  position: fixed;
  height: calc(100% - 120px);
  top: 60px;
  left: 0;
  z-index: 90;
  padding-top: 70px;
}

.nav-sidebar.nav-open {
  transform: translateX(0);
}

.main-content {
  width: 100%;
  height: 100%;
  padding: 20px;
  margin-left: 0;
  background-color: var(--bg-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: margin-left, width;
  position: relative;
  overflow: auto;
}

.main-content.nav-open {
  padding: 20px 20px 20px 270px;
}
</style>
