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
const selectedMinTask = ref('')
const selectedMaxTask = ref('')
const statusOptions = [
  { value: 'completed', label: 'Completed' },
  { value: 'delayed', label: 'Delayed' },
  { value: 'pending', label: 'Pending' },
]
const showDropdown = ref(false)
const dropDirection = ref('down')
const dropdownRef = ref()
const selectRef = ref()
const midIndex = computed(() => Math.ceil(chartData.value.datasets[0].data.length / 2))
const firstHalf = computed(() => chartData.value.datasets[0].data.slice(0, midIndex.value).map((task: { y: string }) => ({ value: task.y, label: task.y })))
const secondHalf = computed(() => chartData.value.datasets[0].data.slice(midIndex.value).map((task: { y: string }) => ({ value: task.y, label: task.y })))
const suggestions = computed<string[]>(() =>
  Array.from(new Set(chartData.value.datasets[0].data.map((item: { name: string }) => item.name))),
)
const filteredSuggestions = ref([...suggestions.value])

const init = () => {
  selectedMinTask.value = firstHalf.value.length > 0 ? firstHalf.value[0].value : ''
  selectedMaxTask.value = secondHalf.value.length > 0 ? secondHalf.value[secondHalf.value.length - 1].value : ''
}

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

const showTask = () => {
  if (!chartConfig.value.options || !chartConfig.value.options.scales || !chartConfig.value.options.scales.y) {
    console.error('차트 설정이 올바르지 않습니다.')
    return
  }

  const yScale = chartConfig.value.options.scales.y
  yScale.min = selectedMinTask.value
  yScale.max = selectedMaxTask.value
  chartKey.value += 1
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
  init()
  showTask()
}

const updateDropdownPosition = () => {
  if (!selectRef.value || !dropdownRef.value)
    return

  const selectRect = selectRef.value.getBoundingClientRect()
  const spaceBelow = window.innerHeight - selectRect.bottom
  const spaceAbove = selectRect.top

  if (spaceAbove > spaceBelow) {
    dropDirection.value = 'up'
  }
  else {
    dropDirection.value = 'down'
  }
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
  if (showDropdown.value) {
    nextTick(() => {
      updateDropdownPosition()
    })
  }
}

const handleResize = () => {
  if (showDropdown.value) {
    updateDropdownPosition()
  }
}

const filterSuggestions = () => {
  filteredSuggestions.value = suggestions.value.filter((name: string) =>
    name.toLowerCase().includes(userName.value.toLowerCase()),
  )
}

const selectName = (name: string) => {
  userName.value = name
  showDropdown.value = false
}

const hideDropdown = () => {
  setTimeout(() => (showDropdown.value = false), 200) // blur 시 딜레이 추가
}
onMounted(() => {
  init()
  window.addEventListener('resize', handleResize)
})
</script>

<template>
  <div style="height: calc(100% - 120px);">
    <OptiGantt :key="chartKey" :data="chartData" :config="chartConfig" />
  </div>
  <div class="flex gap-2 mb-1rem">
    <VueDatePicker
      v-model="monthPicker" format="yyyy-MM" locale="ko-KR" style="width: 200px;" month-picker
      @update:model-value="chartFilter"
    />
    <BaseSelect v-model="selectedMinTask" :options="firstHalf" style="width: 200px;" @change="showTask" />
    <BaseSelect v-model="selectedMaxTask" :options="secondHalf" style="width: 200px;" @change="showTask" />
  </div>
  <div class="flex gap-2">
    <BaseInput v-model="taskName" placeholder="Input the Task" type="text" style="width: 200px;" />
    <VueDatePicker
      v-model="rangePicker" placeholder="Select Date" format="yyyy-MM-dd" locale="ko-KR"
      style="width: 400px;" range
    />
    <div
      ref="selectRef" class="base-select" style="width: 200px;" :class=" { 'direction-up': dropDirection === 'up' }
      " @click.stop="toggleDropdown"
    >
      <BaseInput
        v-model="userName" placeholder="Input the Name" type="text" style="width: 200px;"
        @blur="hideDropdown" @input="filterSuggestions"
      />

      <transition name="dropdown">
        <div
          v-if="showDropdown && filteredSuggestions.length" ref="dropdownRef" class="select-dropdown"
          :class="{ 'dropdown-up': dropDirection === 'up' }"
        >
          <div
            v-for="name in filteredSuggestions" :key="name" class="select-option" :class="{
            // 'is-selected': option.value === model,
            // 'is-disabled': option.disabled || disabled,
            }" @click.stop="selectName(name)"
          >
            {{ name }}
          </div>
        </div>
      </transition>
    </div>
    <BaseSelect v-model="selectedStatus" :options="statusOptions" style="width: 200px;" />
    <BaseButton variant="primary" @click="addTask">
      Add Task
    </BaseButton>
  </div>
</template>

<style scoped>

</style>
