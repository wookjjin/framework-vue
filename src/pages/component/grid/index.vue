<script setup lang='ts'>
import type { Column } from '~/components/ui/grid/GridBody.vue'
import type { TotalCount } from '~/components/ui/grid/GridHeader.vue'
import GridBody from '~/components/ui/grid/GridBody.vue'
import GridFooter from '~/components/ui/grid/GridFooter.vue'
import GridHeader from '~/components/ui/grid/GridHeader.vue'
import { maskPhoneNumber } from '~/utils'

const totalCount = ref<TotalCount>(1000)

const columns = ref<Column[]>([
  {
    key: 'name',
    label: 'Name',
    align: 'center',
    sortable: true,
  },
  {
    key: 'age',
    label: 'Age',
    align: 'center',
  },
  {
    key: 'rank',
    label: 'Rank',
    align: 'center',
  },
  {
    key: 'genderCode',
    label: 'GenderCode',
    align: 'center',
    visible: false,
  },
  {
    key: 'gender',
    label: 'Gender',
    align: 'center',
  },
  {
    key: 'department',
    label: 'Dept.',
    align: 'center',
  },
  {
    key: 'residence',
    label: 'Residence',
    align: 'center',
  },
  {
    key: 'cellPhone',
    label: 'cellPhone',
    align: 'center',
  },
])

interface MockRow {
  name: string
  age: number
  rank: string
  genderCode: string
  gender: string
  department: string
  residence: string
  cellPhone: string | number
}

const mockRows = ref<MockRow[]>([
  {
    name: '박세진',
    age: 0,
    rank: '선임',
    genderCode: 'male',
    gender: '남',
    department: '컨버전스사업팀',
    residence: '서울특별시 **동',
    cellPhone: '01012345678',
  },
  {
    name: '김진욱',
    age: 0,
    rank: '사원',
    genderCode: 'male',
    gender: '남',
    department: '컨버전스사업팀',
    residence: '인천광역시 **동',
    cellPhone: '01012345678',
  },
  {
    name: '채정훈',
    age: 0,
    rank: '사원',
    genderCode: 'male',
    gender: '남',
    department: 'Data플랫폼사업팀',
    residence: '경기도 의정부시 **동',
    cellPhone: '01012345678',
  },
])

const columnClickEvent = (column: Column) => {
  console.log('column result >>>', column)
}

const rowClickEvent = (row: MockRow) => {
  console.log('row result >>>', row)
}
</script>

<template>
  <div class="grid-container">
    <div class="grid-wrapper">
      <GridHeader :total-count="totalCount" total-label="Total" />
      <GridBody :columns="columns" :rows="mockRows" @column-click-event="columnClickEvent"
        @row-click-event="rowClickEvent">
        <template #cellPhone="{ row }">
          <span>
            {{ maskPhoneNumber(row.cellPhone) }}
          </span>
        </template>
      </GridBody>
      <GridFooter />
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: block;
  text-align: center;
  margin: 0 auto;
  width: 1000px;
}

.grid-wrapper {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
}
</style>
