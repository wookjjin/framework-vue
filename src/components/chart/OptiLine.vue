<script setup lang="ts">
import type { lineChartData, lineChartOptions } from '~/composables/chart'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'vue-chartjs'

defineProps<{
  data: typeof lineChartData
  options: typeof lineChartOptions
}>()

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const lineChart = ref()
</script>

<template>
  <Line ref="lineChart" :data="data" :options="options" />
</template>

<style scoped>

</style>
