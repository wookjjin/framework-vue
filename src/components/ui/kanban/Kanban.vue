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
  emits('columnDetailEvent', targetColumn)
}

const columnRemoveEvent = (targetColumn: KanbanColumn) => {
  columns.value = columns.value.filter(col => col.key !== targetColumn.key)
  tasks.value = tasks.value.filter(task => task.key !== targetColumn.key)
  emits('columnRemoveEvent', targetColumn)
}

const taskClickEvent = (targetTask: KanbanTask) => {
  emits('taskClickEvent', targetTask)
}

const taskRemoveEvent = (targetTask: KanbanTask) => {
  tasks.value = tasks.value.filter(task => task.id !== targetTask.id)
  emits('taskRemoveEvent', targetTask)
}

/* ---------------- drag feature with type distinction ------------------- */
const onGroupDragStart = (e: DragEvent, index: number) => {
  e.dataTransfer?.setData('type', 'group')
  draggingColumn.value = index
}

const onGroupDragOver = (index: number) => {
  dragOverColumn.value = index
}

const onGroupDrop = (e: DragEvent) => {
  const type = e.dataTransfer?.getData('type')
  if (type !== 'group')
    return
  if (draggingColumn.value === null || dragOverColumn.value === null)
    return
  const draggedItem = columns.value.splice(draggingColumn.value, 1)[0]
  columns.value.splice(dragOverColumn.value, 0, draggedItem)
  draggingColumn.value = null
  dragOverColumn.value = null
  emits('dragEnd', columns.value, tasks.value)
}

const onTaskDragStart = (e: DragEvent, task: KanbanTask) => {
  e.dataTransfer?.setData('type', 'task')
  draggingTask.value = task
}

const onTaskDragOver = (columnKey: string, taskId: string | null) => {
  dragOverColumnKey.value = columnKey
  dropTaskId.value = taskId
}

const onTaskDrop = (e: DragEvent) => {
  const type = e.dataTransfer?.getData('type')
  if (type !== 'task')
    return
  if (!draggingTask.value || !dragOverColumnKey.value)
    return

  const sourceIndex = tasks.value.findIndex(t => t.id === draggingTask.value?.id)
  if (sourceIndex === -1)
    return

  const [movedTask] = tasks.value.splice(sourceIndex, 1)
  movedTask.key = dragOverColumnKey.value

  if (dropTaskId.value) {
    const dropIndex = tasks.value.findIndex(t => t.id === dropTaskId.value)
    if (dropIndex !== -1) {
      tasks.value.splice(dropIndex, 0, movedTask)
    }
    else {
      tasks.value.push(movedTask)
    }
  }
  else {
    const lastIndex = tasks.value.findLastIndex(t => t.key === dragOverColumnKey.value)
    tasks.value.splice(lastIndex + 1, 0, movedTask)
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
        v-for="(column, index) in columns"
        :key="`kanban-group-${column.key}`"
        class="kanban-column"
        draggable="true"
        @dragstart.stop="e => onGroupDragStart(e, index)"
        @dragover.prevent="onGroupDragOver(index)"
        @drop="onGroupDrop"
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
        </slot>
        <template v-if="!tasksByColumn[column.key].length">
          <div
            class="kanban-empty-drop-zone"
            :class="{ 'active-drop-zone': dragOverColumnKey === column.key && dropTaskId === null }"
            @dragover.prevent="onTaskDragOver(column.key, null)"
            @drop="onTaskDrop"
          >
            No Task
          </div>
        </template>
        <li
          v-for="task in tasksByColumn[column.key]"
          :key="task.id"
          class="kanban-card"
          draggable="true"
          @dragstart.stop="e => onTaskDragStart(e, task)"
          @dragover.prevent="onTaskDragOver(column.key, task.id)"
          @drop="onTaskDrop"
          @click="() => taskClickEvent(task)"
        >
          <slot :name="`task-${column.key}`" :task="task">
            <div class="kanban-task">
              <span>{{ task.title }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="task-delete-icon" @click.stop="taskRemoveEvent(task)"
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
