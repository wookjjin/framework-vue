import type { ChartData, ChartOptions } from 'chart.js'

export const barChartData: ChartData<'bar'> = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ['rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)'],
      borderWidth: 1,
    },
  ],
}

export const barChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
}

export const lineChartData: ChartData<'line'> = {
  datasets: [],
}

export const lineChartOptions: ChartOptions<'line'> = {
  responsive: true,
}

export const doughnutChartData: ChartData<'doughnut'> = {
  datasets: [],
}

export const doughnutChartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
}
