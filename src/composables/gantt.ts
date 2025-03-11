/* eslint-disable unused-imports/no-unused-vars */
import type { Chart, ChartConfiguration, ChartData, ScriptableContext, TooltipItem } from 'chart.js'

type TStatus = Record<'delayed' | 'pending' | 'completed', string>

const colors: TStatus = {
  delayed: 'rgba(255, 26, 104, 1)',
  pending: 'rgba(255, 159, 64, 1)',
  completed: 'rgba(75, 192, 192, 1)',
} as const

type TGanttChartData = {
  x: [string, string]
  y: string
  name: string
  status: keyof TStatus
}

export const ganttChartData: ChartData<any> = {
  datasets: [{
    label: 'Weekly Sales',
    data: [
      { x: ['2025-03-03', '2025-03-06'], y: 'Task-1', name: 'James', status: 'completed' },
      { x: ['2025-03-06', '2025-03-12'], y: 'Task-2', name: 'Luna', status: 'completed' },
      { x: ['2025-03-09', '2025-03-12'], y: 'Task-3', name: 'David', status: 'completed' },
      { x: ['2025-03-12', '2025-03-21'], y: 'Task-4', name: 'Lucy', status: 'completed' },
      { x: ['2025-03-15', '2025-03-24'], y: 'Task-5', name: 'Lily', status: 'delayed' },
      { x: ['2025-03-18', '2025-03-30'], y: 'Task-6', name: 'Santiago', status: 'pending' },
    ],
    backgroundColor: (ctx: ScriptableContext<'bar'>) => {
      const dataPoint = ctx.raw as TGanttChartData; 
      return colors[dataPoint.status]; 
    },
    borderSkipped: false,
    borderRadius: 10,
    barPercentage: 0.5,
  }],
}

/**
 * TodayLine
 */
const todayLine: any = {
  id: 'todayLine',
  afterDatasetsDraw(chart: Chart, args: unknown, pluginOptions: unknown) {
    const {
      ctx,
      data,
      chartArea: { top, bottom, left, right },
      scales: { x, y },
    } = chart
    ctx.save()

    ctx.beginPath()
    ctx.lineWidth = 3
    ctx.strokeStyle = 'rgba(102, 102, 102, 1)'
    ctx.setLineDash([6, 6])
    ctx.moveTo(x.getPixelForValue(new Date().getTime()), top)
    ctx.lineTo(x.getPixelForValue(new Date().getTime()), bottom)
    ctx.stroke()

    ctx.setLineDash([])
  },
}

/**
 * AssignedTasks
 */
const assignedTasks = {
  id: 'assignedTasks',
  afterDatasetsDraw(chart: Chart, args: unknown, pluginOptions: unknown) {
    const {
      ctx,
      data,
      chartArea: { top, bottom, left, right },
      scales: { x, y },
    } = chart
    ctx.save()
    ctx.font = 'bolder 12px sans-serif'
    ctx.fillStyle = 'black'
    ctx.textBaseline = 'middle'
    ganttChartData.datasets[0].data.forEach((dataPoint: { name: string }, index: any) => {
      ctx.fillText(dataPoint.name, 10, y.getPixelForValue(index))
    });
    ctx.fillText('Names', 10, top - 15)
    ctx.restore()
  },
};

/**
 * Status
 */
const status = {
  id: 'status',
  afterDatasetsDraw(chart: Chart, args: unknown, pluginOptions: unknown) {
    const {
      ctx,
      data,
      options,
      chartArea: { top, bottom, left, right },
      scales: { x, y },
    } = chart

    const icons: TStatus = {
      delayed: '\uF00D',
      pending: '\uF110',
      completed: '\uF00C',
    } as const
    const angle = Math.PI / 180 
    const padding = options.layout?.padding;
    const paddingRight = typeof padding === 'object' && padding !== null ? (padding as { right: number }).right : 0; 

    ctx.save()
    ctx.font = 'bolder 12px FontAwesome'
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ganttChartData.datasets[0].data.forEach((dataPoint: { status: keyof typeof icons }, index: any) => {
      ctx.beginPath()
      ctx.fillStyle = colors[dataPoint.status]
      ctx.arc(right + (paddingRight / 2), y.getPixelForValue(index), 12, 0, angle * 360, false)
      ctx.closePath()
      ctx.fill()

      ctx.fillStyle = 'white'
      ctx.fillText(icons[dataPoint.status], right + (paddingRight / 2), y.getPixelForValue(index))

    });
    // Series
    ctx.font = 'bolder 12px sans-serif'
    ctx.fillStyle = 'black'
    ctx.fillText('Status', right + (paddingRight / 2), top - 15)
    ctx.restore()
  },
};

export const ganttChartConfig: ChartConfiguration<'bar'> = {
  type: 'bar',
  data: ganttChartData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    layout: {
      padding: {
        left: 100,
        right: 100,
      },
    },
    scales: {
      x: {
        position: 'top',
        type: 'time',
        time: {
          displayFormats: {
            day: 'd',
          },
        },
        min: '2025-03-01',
        max: '2025-03-31',
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (ctx: TooltipItem<'bar'>[]) => {
            const rawData = ctx[0].raw as TGanttChartData
            const startDate = new Date(rawData.x[0])
            const endDate = new Date(rawData.x[1])
            const formattedStartDate = startDate.toLocaleString([], {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour12: true,
            })
            const formattedEndDate = endDate.toLocaleString([], {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour12: true,
            })

            return [rawData.name, `Task Deadline: ${formattedStartDate} - ${formattedEndDate}`] 
          },
        },
      },
    },
  },
  plugins: [
    todayLine,
    assignedTasks,
    status,
  ],
}
