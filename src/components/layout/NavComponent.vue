<script setup lang="ts">

</script>

<template>
  <nav class="navigation">
    <ul class="nav-list">
      <li class="nav-item">
        <router-link to="/" class="nav-link">
          홈
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/component" class="nav-link">
          컴포넌트
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navigation {
  height: 100%;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 5px;
}

.nav-link {
  display: block;
  padding: 12px 20px;
  text-decoration: none;
  color: var(--text-color);
  transition: background-color 0.2s ease, color 0.2s ease;
  border-radius: 4px;
  margin: 0 8px;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: var(--light-green);
  color: var(--dark-green);
}
</style>
