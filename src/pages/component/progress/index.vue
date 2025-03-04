<script setup lang='ts'>
import { ref } from 'vue'
import Progress from '~/components/ui/progress/Progress.vue'
import { fetchWithLoading } from '~/utils'

const isActiveToCircle = ref<boolean>(false)
const isActiveToBar = ref<boolean>(false)

const showCircleProgress = () => {
  isActiveToCircle.value = true
  setTimeout(() => {
    isActiveToCircle.value = false
  }, 2000)
}

const showBarProgress = () => {
  isActiveToBar.value = true
  setTimeout(() => {
    isActiveToBar.value = false
  }, 2000)
}

const fetchData = async () => {
  await fetchWithLoading(async () => {
    return new Promise(resolve => setTimeout(() => resolve('Data Loaded'), 2000))
  })
}
</script>

<template>
  <div class="progress-sample-page">
    <h1>Progress Loader Demo</h1>

    <div class="progress-container">
      <div class="progress-card">
        <h2>CIRCLE Loader</h2>
        <button @click="showCircleProgress">
          Show Circle Loader
        </button>
        <Progress v-if="isActiveToCircle" progress-type="CIRCLE" />
      </div>
      <div class="progress-card">
        <h2>BAR Loader</h2>
        <button @click="showBarProgress">
          Show Bar Loader
        </button>
        <Progress v-if="isActiveToBar" progress-type="BAR" />
      </div>
      <div class="progress-card">
        <h2>Async / Await Test</h2>
        <button @click="fetchData">
          Trigger Async Request
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-sample-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color, #f8f9fa);
  font-family: 'Arial', sans-serif;
}

h1 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color, #333);
  margin-bottom: 20px;
}

.progress-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.progress-card {
  background: #ffffff;
  padding: 16px;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  text-align: center;
  width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  border: 1px solid var(--border-color, #ddd);
  transition: all 0.2s ease-in-out;
}

.progress-card:hover {
  border-color: var(--focus-color, #64a19d);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

button {
  width: 100%;
  background-color: var(--dark-green, #4CAF50);
  color: white;
  border: 1px solid var(--border-color, #ddd);
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

button:hover {
  background-color: var(--focus-color, #45a049);
  border-color: var(--focus-color, #45a049);
}

button:active {
  transform: scale(0.98);
}

.progress-card Progress {
  margin-top: 6px;
}

@media (max-width: 600px) {
  .progress-container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
