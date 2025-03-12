<script setup lang="ts">
import dayjs from 'dayjs'
import { ganttChartConfig, ganttChartData } from '~/composables/gantt'

const chartData = ref({
  ...ganttChartData,

})

const chartConfig = ref(ganttChartConfig)
const chartKey = ref(0)
const chartFilter = (e: Event) => {
  const target = e.target as HTMLInputElement
  const date = dayjs(target.value)

  const year = date.year()
  const month = (date.month() + 1).toString().padStart(2, '0')
  const lastDay = (y: number, m: number) => {
    return new Date(y, m, 0).getDate()
  }
  const startDate = `${year}-${month}-01`
  const endDate = `${year}-${month}-${lastDay(year, Number.parseInt(month))}`

  if (chartConfig.value.options?.scales?.x) {
    chartConfig.value.options.scales.x.min = startDate
    chartConfig.value.options.scales.x.max = endDate
    chartKey.value += 1
  }
}
</script>

<template>
  <div style="height: calc(100% - 120px);">
    <OptiGantt :key="chartKey" :data="chartData" :config="chartConfig" />
  </div>
  <div>
    <BaseInput type="month" style="width: 200px;" @change="chartFilter" />
  </div>
</template>

<style scoped>

</style>
