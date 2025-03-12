<script setup lang="ts">
import type { ganttChartConfig, ganttChartData } from '~/composables/gantt'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import 'chartjs-adapter-date-fns'

defineProps<{
  data: typeof ganttChartData
  config: typeof ganttChartConfig
}>()

ChartJS.register(Title, Tooltip, TimeScale, Legend, BarElement, CategoryScale, LinearScale)

const ganttChart = ref()
</script>

<template>
  <Bar
    ref="ganttChart" :data="data" :plugins="config.plugins"
    :options="config.options"
  />
</template>

<style scoped>

</style>
