<script setup lang="ts">
export interface KanbanColumn<T = Record<string, any>> {
  key: keyof T
  title: string
  editable?: boolean
}

export interface KanbanTask {
  [key: string]: any
}

export interface KanbanProps {
  useAddGroup?: boolean
  addGroupButtonName?: string
  newGroupName?: string
  useAddTask?: boolean
  addTaskButtonName?: string
  newTaskName?: string
}

/* ---------------- Kanban Properties ------------------- */
const {
  useAddGroup = false,
  addGroupButtonName = '+ Add Group',
  newGroupName = 'New Group',
  useAddTask = false,
  addTaskButtonName = '+ Add Task',
  newTaskName = 'New Task',
} = defineProps<KanbanProps>()

const emits = defineEmits<{
  (event: 'dragEnd', columns: KanbanColumn[], tasks: KanbanTask[]): void
  (event: 'columnDetailEvent', columns: KanbanColumn): void
  (event: 'columnRemoveEvent', columns: KanbanColumn): void
  (event: 'taskClickEvent', task: KanbanTask): void
  (event: 'taskRemoveEvent', task: KanbanTask): void
}>()

/* ---------------- Model Value ------------------- */
const columns = defineModel<KanbanColumn[]>('columns', {
  default: [
    {
      key: 'DEFAULT',
      title: 'COLUMN MODEL VALUE REQUIRED',
    },
  ],
  required: true,
})
const tasks = defineModel<KanbanTask[]>('tasks', { default: [] })
const tasksByColumn = computed<Record<string, KanbanTask[]>>(() => {
  return columns.value.reduce((acc, column) => {
    acc[column.key] = tasks.value.filter(row => row.key === column.key)
    return acc
  }, {} as Record<string, KanbanTask[]>)
})
const draggingColumn = ref<number | null>(null)
const dragOverColumn = ref<number | null>(null)
const draggingTask = ref<KanbanTask | null>(null)
const dragOverColumnKey = ref<string | null>(null)
const dropTaskId = ref<string | null>(null)

const getTaskCount = (columnKey: string): number => {
  return tasksByColumn.value[columnKey]?.length || 0
}

/* ---------------- functions ------------------- */
const addColumn = () => {
  const newKey = `Group-${columns.value.length + 1}`
  columns.value.push({
    key: newKey,
    title: `${newGroupName} ${columns.value.length + 1}`,
  })
}

const addTask = (column: KanbanColumn) => {
  const taskCount = getTaskCount(column.key) + 1
  const newTask: KanbanTask = {
    id: `${Date.now()}`,
    key: column.key,
    title: `${newTaskName} ${column.key} - ${taskCount}`,
  }
  tasks.value.push(newTask)
}

const useEditable = (column: KanbanColumn) => {
  column.editable = !column.editable
}

const columnDetailEvent = (targetColumn: KanbanColumn) => {
  console.log('detail-target-column :: ', targetColumn)
  emits('columnDetailEvent', targetColumn)
}

const columnRemoveEvent = (targetColumn: KanbanColumn) => {
  console.log('remove-target-column::', targetColumn)
  emits('columnRemoveEvent', targetColumn)
}

const taskClickEvent = (targetTask: KanbanTask) => {
  console.log('click-target-task ::', targetTask)
  emits('taskClickEvent', targetTask)
}

const taskRemoveEvent = (targetTask: KanbanTask) => {
  console.log('remove-target-task ::', targetTask)
  emits('taskRemoveEvent', targetTask)
}

/* ---------------- drag feature ------------------- */
const onGroupDragStart = (index: number) => {
  draggingColumn.value = index
}

const onGroupDragOver = (index: number) => {
  dragOverColumn.value = index
}

const onGroupDrop = () => {
  if (draggingColumn.value === null || dragOverColumn.value === null)
    return
  const draggedItem = columns.value.splice(draggingColumn.value, 1)[0]
  columns.value.splice(dragOverColumn.value, 0, draggedItem)
  draggingColumn.value = null
  dragOverColumn.value = null
  console.log('drag-end-event-result-by-columns::', columns.value)
  console.log('drag-end-event-result-by-tasks::', tasks.value)
  emits('dragEnd', columns.value, tasks.value)
}

const onTaskDragStart = (task: KanbanTask) => {
  draggingTask.value = task
}

const onTaskDragOver = (columnKey: string, taskId: string | null) => {
  dragOverColumnKey.value = columnKey
  dropTaskId.value = taskId
}

const onTaskDrop = () => {
  if (!draggingTask.value || !dragOverColumnKey.value)
    return

  // 드래그된 Task 의 현재 인덱스 찾기
  const sourceIndex = tasks.value.findIndex(t => t.id === draggingTask.value?.id)
  if (sourceIndex === -1)
    return

  // 기존 위치에서 Task 제거
  const [movedTask] = tasks.value.splice(sourceIndex, 1)

  // 새로운 Column 으로 이동
  movedTask.key = dragOverColumnKey.value

  // 놓여지는 위치에 특정 Task ID 가 있는 경우, 해당 위치의 다음 인덱스로 추가
  if (dropTaskId.value) {
    const dropIndex = tasks.value.findIndex(t => t.id === dropTaskId.value)
    if (dropIndex !== -1) {
      tasks.value.splice(dropIndex + 1, 0, movedTask) // dropTaskId 다음 위치에 추가
    }
    else {
      tasks.value.push(movedTask) // ID 가 없으면 끝에 추가
    }
  }
  else {
    // 해당 Column 에 Task 가 하나도 없는 경우도 정상 처리
    tasks.value.push(movedTask)
  }

  draggingTask.value = null
  dragOverColumnKey.value = null
  dropTaskId.value = null

  emits('dragEnd', columns.value, tasks.value)
}
</script>

<template>
  <div class="kanban-board-container">
    <div class="kanban-board">
      <ul
        v-for="(column, index) in columns" :key="`kanban-group-${column.key}`" class="kanban-column" draggable="true"
        @dragstart.stop="onGroupDragStart(index)" @dragover.prevent="onGroupDragOver(index)" @drop="onGroupDrop"
      >
        <slot :name="`column-${column.key}`">
          <div class="kanban-header">
            <input v-model="column.title" :disabled="!column.editable">
            <div class="kanban-icons">
              <slot name="icons">
                <svg
                  xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="icon" @click="useEditable(column)"
                >
                  <path
                    stroke-linecap="round" stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="icon" @click="columnDetailEvent(column)"
                >
                  <path
                    stroke-linecap="round" stroke-linejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="icon" @click="columnRemoveEvent(column)"
                >
                  <path
                    stroke-linecap="round" stroke-linejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </slot>
            </div>
          </div>
          <div
            v-if="tasksByColumn[column.key]?.length === 0" class="kanban-empty"
            @dragover.prevent="onTaskDragOver(column.key, null)" @drop="onTaskDrop"
          >
            Empty List
          </div>
        </slot>
        <li
          v-for="task in tasksByColumn[column.key]" :key="task.id" class="kanban-card" draggable="true"
          @dragstart.stop="onTaskDragStart(task)" @dragover.prevent="onTaskDragOver(column.key, task.id)"
          @drop="onTaskDrop"
        >
          <slot :name="`task-${column.key}`" :task="task">
            <div class="kanban-task">
              <span>{{ task.title }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="icon" @click.stop="taskRemoveEvent(task)"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
          </slot>
        </li>
        <li v-if="useAddTask" class="kanban-add-task" @click="addTask(column)">
          {{ addTaskButtonName }}
        </li>
      </ul>
      <div v-if="useAddGroup" class="kanban-add-column" @click="addColumn">
        {{ addGroupButtonName }}
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
