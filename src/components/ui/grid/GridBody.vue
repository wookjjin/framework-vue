<script setup lang="ts">
export interface Column {
  key: string | number
  label: string
  visible?: boolean
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
}

const props = withDefaults(defineProps<{
  columns: Column[]
  rows: Record<string, any>[]
}>(), {
  rows: () => [],
})

const emits = defineEmits<{
  (event: 'columnClickEvent', column: Column): void
  (event: 'rowClickEvent', row: Record<string, any>): void
  (event: 'sortChange', columnKey: string, direction: 'asc' | 'desc' | null): void
}>()

const visibleColumns = computed(() => props.columns.filter(column => column.visible !== false))

const activeSort = ref<{ key: string, direction: 'asc' | 'desc' | null }>({ key: '', direction: null })

const columnClickEvent = (column: Column) => {
  emits('columnClickEvent', column)
  if (activeSort.value.key === column.key) {
    if (activeSort.value.direction === 'asc') {
      activeSort.value.direction = 'desc'
    }
    else if (activeSort.value.direction === 'desc') {
      activeSort.value.key = ''
      activeSort.value.direction = null
    }
    else {
      activeSort.value.direction = 'asc'
    }
  }
  else {
    activeSort.value.key = column.key as string
    activeSort.value.direction = 'asc'
  }
  emits('sortChange', activeSort.value.key, activeSort.value.direction)
}

const rowClickEvent = (row: Record<string, any>) => {
  emits('rowClickEvent', row)
}
</script>

<template>
  <div class="grid-body-container">
    <table>
      <thead>
        <tr>
          <th
            v-for="column in visibleColumns" :key="column.key" :style="{ textAlign: column.align || 'left' }"
            @click="columnClickEvent(column)"
          >
            <span class="column-header">
              {{ column.label }}
              <span
                class="sort-icon"
                :class="{ active: (activeSort.key === column.key) && column.sortable }"
              >
                <span v-if="activeSort.key === column.key">
                  <span v-if="activeSort.direction === 'asc'">
                    ▲
                  </span>
                  <span v-else-if="activeSort.direction === 'desc'">
                    ▼
                  </span>
                </span>
              </span>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="`grid-row-${index}`">
          <td
            v-for="column in visibleColumns" :key="column.key" :style="{ textAlign: column.align || 'left' }"
            @click="rowClickEvent(row)"
          >
            <slot :name="column.key" :row="row">
              <span>
                {{ row[column.key] }}
              </span>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.grid-body-container {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  background-color: #f1f5f9;
}

th {
  padding: 12px;
  text-align: left;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  border-bottom: 2px solid #007bff;
}

.column-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.sort-icon {
  font-size: 10px;
  width: 8px;
  display: inline-block;
  text-align: center;
  visibility: hidden;
}

.sort-icon.active {
  visibility: visible;
}

th span:hover {
  cursor: pointer;
  color: #007bff;
}

td {
  padding: 10px;
  text-align: center;
  font-size: 0.95rem;
  color: #555;
  position: relative;
}

tbody tr {
  border-bottom: 1px solid #99c2ff;
  transition: transform 0.2s ease-in-out
}

tbody tr:hover {
  cursor: pointer;
  background-color: #f1f5f9;
  transform: scale(1.02);
}

tbody tr:hover td {
  color: #0056b3;
}

tbody tr:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {

  th,
  td {
    padding: 8px;
    font-size: 0.9rem;
  }
}
</style>
