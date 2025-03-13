<script setup lang='ts'>
import type { KanbanColumn, KanbanTask } from '~/components/ui/kanban/Kanban.vue'
import Kanban from '~/components/ui/kanban/Kanban.vue'

const kanbanColumns = ref<KanbanColumn[]>([
  {
    key: 'A',
    title: 'A-GROUP',
  },
  {
    key: 'B',
    title: 'B-GROUP',
  },
  {
    key: 'C',
    title: 'C-GROUP',
  },
])

const kanbanTasks = ref<KanbanTask[]>([
  { key: 'A', id: '1', title: 'Task A-1', status: 'WAIT', description: 'A 그룹의 첫 번째 작업' },
  { key: 'A', id: '2', title: 'Task A-2', status: 'READY', description: 'A 그룹의 두 번째 작업' },
  { key: 'B', id: '3', title: 'Task B-1', status: 'READY', description: 'B 그룹의 첫 번째 작업' },
  { key: 'B', id: '4', title: 'Task B-2', status: 'PROGRESS', description: 'B 그룹의 두 번째 작업' },
  { key: 'C', id: '5', title: 'Task C-1', status: 'COMPLETE', description: 'C 그룹의 첫 번째 작업' },
])
</script>

<template>
  <div>
    <div>
      <Kanban
        v-model:columns="kanbanColumns"
        v-model:tasks="kanbanTasks"
        use-add-group
        use-add-task
      />
    </div>
  </div>
</template>

<style scoped>
</style>
