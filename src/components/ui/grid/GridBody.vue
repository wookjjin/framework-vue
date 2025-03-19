<script setup lang="ts">
export interface Column<T = Record<string, any>> {
  key: keyof T | string
  label: string
  visible?: boolean
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
}

const {
  columns = [],
  rows = [],
  useCheckbox = false,
} = defineProps<{
  columns: Column<any>[]
  rows: any[]
  useCheckbox?: boolean
}>()

const emits = defineEmits<{
  (event: 'columnClickEvent', column: Column): void
  <T>(event: 'rowClickEvent', row: T): void
  (event: 'sortChangeEvent',
    columnKey: string, direction: 'asc' | 'desc' | 'default'): void
  <T>(event: 'update:selectedRows', selectedRows: T[]): void
}>()

const selectedRows = ref<any[]>([])

const visibleColumns = computed<Column<any>[]>(() => {
  const cols = columns.map(column => ({
    ...column,
    align: column.align ?? 'left',
  }))

  return useCheckbox
    ? ([{ key: 'checkbox', label: '', align: 'center' } as Column<any>, ...cols])
    : cols
})

const activeSort = ref<{ key: string, direction: 'asc' | 'desc' | 'default' }>({
  key: '',
  direction: 'default',
})

const isAllChecked = computed(() => {
  if (rows.length === 0)
    return false
  return selectedRows.value.length === rows.length
})

const isIndeterminate = computed(() => {
  return selectedRows.value.length > 0 && selectedRows.value.length < rows.length
})

const toggleAllSelection = () => {
  if (isAllChecked.value) {
    selectedRows.value = []
  }
  else {
    selectedRows.value = [...rows]
  }
  emits('update:selectedRows', selectedRows.value)
}

const toggleRowSelection = (row: Record<string, any>) => {
  const index = selectedRows.value.findIndex(selectedRow => selectedRow === row)
  if (index > -1) {
    selectedRows.value.splice(index, 1)
  }
  else {
    selectedRows.value.push(row)
  }
  emits('update:selectedRows', selectedRows.value)
}

const columnClickEvent = (column: Column) => {
  emits('columnClickEvent', column)
}

const sortColumnEvent = (column: Column) => {
  if (!column.sortable)
    return

  if (activeSort.value.key === column.key) {
    if (activeSort.value.direction === 'asc') {
      activeSort.value.direction = 'desc'
    }
    else if (activeSort.value.direction === 'desc') {
      activeSort.value.direction = 'default'
    }
    else {
      activeSort.value.direction = 'asc'
    }
  }
  else {
    activeSort.value.key = column.key as string
    activeSort.value.direction = 'asc'
  }
  emits('sortChangeEvent', activeSort.value.key, activeSort.value.direction)
}

const rowClickEvent = <T extends Record<string, any>>(row: T) => {
  emits<T>('rowClickEvent', row)
}

const birdRotation = ref<number>(0)

const handleMouseMove = (event: MouseEvent) => {
  const container = event.currentTarget as HTMLElement
  const rect = container.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const centerX = rect.width / 2

  birdRotation.value = mouseX < centerX ? 180 : 0
}
</script>

<template>
  <div class="grid-body-container" @mousemove="handleMouseMove">
    <div>
      <table>
        <thead>
          <tr>
            <th v-if="useCheckbox">
              <input
                type="checkbox" :checked="isAllChecked" :indeterminate="isIndeterminate"
                @change="toggleAllSelection"
              >
            </th>
            <th
              v-for="column in visibleColumns" :key="`grid-column-${String(column.key)}`"
              :style="{ textAlign: column.align || 'left' }" @click.stop="columnClickEvent(column)"
            >
              <span class="column-header" @click.stop="sortColumnEvent(column)">
                <span class="column-label">{{ column.label }}</span>
                <span class="sort-icon" :class="{ active: activeSort.key === column.key && column.sortable }">
                  <span v-if="activeSort.key === column.key">
                    <span v-if="activeSort.direction === 'asc'">▲</span>
                    <span v-else-if="activeSort.direction === 'desc'">▼</span>
                  </span>
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody v-if="rows.length">
          <tr v-for="(row, index) in rows" :key="`grid-row-${index}`">
            <td v-if="useCheckbox" class="checkbox-cell">
              <input type="checkbox" :checked="selectedRows.includes(row)" @change="toggleRowSelection(row)">
            </td>
            <td
              v-for="column in visibleColumns" :key="`grid-column-${String(column.key)}`"
              :style="{ textAlign: column.align || 'left' }" @click.stop="rowClickEvent(row)"
            >
              <slot :name="column.key" :row="row">
                <span>{{ row[column.key] }}</span>
              </slot>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr class="no-data">
            <td :colspan="visibleColumns.length + (useCheckbox ? 1 : 0)">
              <div class="no-data-container">
                <img
                  src="/icon/dog-bird.svg"
                  width="72px"
                  height="72px"
                  :style="{ transform: `rotateY(${birdRotation}deg)` }"
                >
                <p>
                  Empty Data
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.grid-body-container {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  max-width: 100%;
  overflow-x: auto;
  min-height: 500px;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 6px;
  overflow: hidden;
}

thead {
  background-color: #d4e9dc;
}

th {
  height: 30px;
  padding: 12px;
  cursor: pointer;
  user-select: none;
  position: relative;
  text-align: center;
  border-bottom: 2px solid #a8d5ba;
}

.column-header {
  display: flex;
  font-weight: 600;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  padding-left: 5px;
  padding-right: 5px;
}

.column-label {
  flex: 1;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sort-icon {
  flex: 1;
  font-size: 10px;
  width: 12px;
  display: inline-block;
  text-align: center;
  padding-left: 12px;
  position: absolute;
  right: 5px;
  visibility: hidden;
  flex-shrink: 0;
}

.sort-icon.active {
  visibility: visible;
}

th:hover {
  cursor: pointer;
  color: #2c3e50;
}

th:hover .column-label {
  color: #2c3e50;
}

th:hover .sort-icon {
  color: #2c3e50;
}

th span:hover {
  cursor: pointer;
  color: #a8d5ba;
}

td {
  padding: 10px;
  text-align: center;
  font-size: 0.95rem;
  color: #555;
  position: relative;
}

tbody tr {
  border-bottom: 1px solid #a8d5ba;
  transition: transform 0.2s ease-in-out
}

tbody tr:not(.no-data):hover {
  cursor: pointer;
  background-color: #f1f5f9;
  box-shadow: inset 2px 0 0 #4f8a5a, inset -2px 0 0 #4f8a5a;
  color: #a8d5ba;
}

.checkbox-cell {
  cursor: default !important;
  background-color: transparent !important;
}

tbody tr:last-child {
  border-bottom: none;
}

input[type="checkbox"] {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #4f8a5a;
  border-radius: 4px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  background-color: white;
  transition: all 0.2s ease-in-out;
  vertical-align: middle;
}

input[type="checkbox"]:checked {
  background-color: #4f8a5a;
  border-color: #4f8a5a;
}

input[type="checkbox"]:checked::after {
  content: "✔";
  font-size: 12px;
  color: white;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

input[type="checkbox"]:indeterminate {
  background-color: #4f8a5a;
  border-color: #4f8a5a;
}

input[type="checkbox"]:indeterminate::after {
  content: "—";
  font-size: 14px;
  color: white;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

input[type="checkbox"]:disabled {
  background-color: #ddd;
  border-color: #bbb;
  cursor: not-allowed;
}

.no-data {
  height: 100%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #777;
}

.no-data-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1.2rem;
  font-weight: bold;
  color: #777;
}

img {
  transition: transform 0.3s ease-in-out;
}

.no-data td {
  padding: 0;
  height: 500px;
  text-align: center;
}

@media (max-width: 768px) {

  th,
  td {
    padding: 8px;
    font-size: 0.9rem;
  }
}
</style>
