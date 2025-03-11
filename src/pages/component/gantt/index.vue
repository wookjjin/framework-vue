<script setup lang="ts">
import { ganttChartConfig, ganttChartData } from '~/composables/gantt'

const chartData = ref({
  ...ganttChartData,
  // labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

})

const chartConfig = ref(ganttChartConfig)
</script>

<template>
  <OptiGantt :data="chartData" :config="chartConfig" />
</template>

<style scoped>

</style>
