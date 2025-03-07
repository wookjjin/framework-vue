<script setup lang="ts">
import type { barChartData, barChartOptions } from '~/composables/chart'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

defineProps<{
  data: typeof barChartData
  options: typeof barChartOptions
}>()

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const barChart = ref()

</script>

<template>
  <Bar ref="barChart" :data="data" :options="options" />
</template>

<style scoped>

</style>
