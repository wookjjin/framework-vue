<script setup lang="ts">
import { barChartData, barChartOptions, doughnutChartData, doughnutChartOptions, lineChartData, lineChartOptions } from '~/composables/chart'

/**
 * Bar Chart
 */
const customBarData = ref({
  ...barChartData,
  datasets: [
    {
      ...barChartData.datasets[0],
      data: [10, 15, 8, 12, 5, 7],
    },
  ],
})

const customBarOptions = ref(barChartOptions)

const updateBarChartData = () => {
  customBarData.value = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
      ],
      borderWidth: 1,
    }],
  }
}

/**
 * Line Chart
 */
const customLineData = ref({
  ...lineChartData,
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 39, 10, 40, 39, 80, 40],
    },
  ],
})

const customLineOptions = ref(lineChartOptions)

const updateLineChartData = () => {
  customLineData.value = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
    ],
    datasets: [{
      label: 'Data One',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    }],
  }
}

/**
 * Doughnut Chart
 */

const customDoughnutData = ref({
  ...doughnutChartData,
  labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 20, 80, 10],
    },
  ],
})

const customDoughnutOptions = ref(doughnutChartOptions)

const updateDoughnutChartData = () => {
  customDoughnutData.value = {
    labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs', 'Svelte'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#7288ff'],
        data: [40, 20, 80, 10, 30],
      },
    ],
  }
}
</script>

<template>
  <div>
    <div class="flex flex-col">
      <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 1em;">
        1. Bar Chart
      </h1>
      <div>
        <BaseButton @click="updateBarChartData">
          Update Bar Data
        </BaseButton>
        <OptiBar :data="customBarData" :options="customBarOptions" />
      </div>
    </div>
    <div class="flex flex-col">
      <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 1em;">
        2. Line Chart
      </h1>
      <div>
        <BaseButton @click="updateLineChartData">
          Update Line Data
        </BaseButton>
        <OptiLine :data="customLineData" :options="customLineOptions" />
      </div>
    </div>
    <div class="flex flex-col">
      <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 1em;">
        3. Doughnut Chart
      </h1>
      <div>
        <BaseButton @click="updateDoughnutChartData">
          Update Bar Data
        </BaseButton>
        <OptiDoughnut :data="customDoughnutData" :options="customDoughnutOptions" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
