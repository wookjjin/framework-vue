<script setup lang="ts">
import dayjs from 'dayjs'
import { ganttChartConfig, ganttChartData } from '~/composables/gantt'

const chartData = ref({
  ...ganttChartData,
})
const chartConfig = ref(ganttChartConfig)
const chartKey = ref(0)
const monthPicker = ref({
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
})
const taskName = ref('')
const rangePicker = ref()
const userName = ref('')
const selectedStatus = ref('')
const statusOptions = [
  { value: 'completed', label: 'Completed' },
  { value: 'delayed', label: 'Delayed' },
  { value: 'pending', label: 'Pending' },
]

const chartFilter = () => {
  const year = monthPicker.value.year
  const month = (monthPicker.value.month + 1).toString().padStart(2, '0')
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

const validateTask = () => {
  if (!rangePicker.value || rangePicker.value.length < 2 || !rangePicker.value[0] || !rangePicker.value[1]) {
    console.warn('시작 및 종료 날짜를 선택해주세요.')
    return false
  }
  if (!taskName.value) {
    console.warn('작업 이름을 입력해주세요.')
    return false
  }
  if (!userName.value) {
    console.warn('사용자 이름을 입력해주세요.')
    return false
  }
  if (!selectedStatus.value) {
    console.warn('상태를 선택해주세요.')
    return false
  }
  return true
}

const addTask = () => {
  if (!validateTask())
    return
  const newTask = {
    x: [dayjs(rangePicker.value[0]).format('YYYY-MM-DD'), dayjs(rangePicker.value[1]).format('YYYY-MM-DD')],
    y: taskName.value,
    name: userName.value,
    status: selectedStatus.value,
  }
  chartData.value.datasets[0].data = [...chartData.value.datasets[0].data, newTask]
  chartKey.value += 1
}

// const showTask = () => {
//   const yScale = chartConfig.value.options.scales.y
// }
</script>

<template>
  <div style="height: calc(100% - 120px);">
    <OptiGantt :key="chartKey" :data="chartData" :config="chartConfig" />
  </div>
  <div class="mb-1rem">
    <VueDatePicker
      v-model="monthPicker" format="yyyy-MM" locale="ko-KR" style="width: 200px;" month-picker
      @update:model-value="chartFilter"
    />
  </div>
  <div class="flex gap-2">
    <BaseInput v-model="taskName" placeholder="Input the Task" type="text" style="width: 200px;" />
    <VueDatePicker
      v-model="rangePicker" placeholder="Select Date" format="yyyy-MM-dd" locale="ko-KR" style="width: 400px;" range
      @update:model-value="chartFilter"
    />
    <BaseInput v-model="userName" placeholder="Input the Name" type="text" style="width: 200px;" />
    <BaseSelect v-model="selectedStatus" :options="statusOptions" style="width: 200px;" />
    <BaseButton variant="primary" @click="addTask">
      Add Task
    </BaseButton>
  </div>
</template>

<style scoped>

</style>
