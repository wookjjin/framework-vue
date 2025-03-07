<script setup lang='ts'>
import type { Column } from '~/components/ui/grid/GridBody.vue'
import type { TotalCount } from '~/components/ui/grid/GridHeader.vue'
import type { LimitOption } from '~/components/ui/pagination/Pagination.vue'
import GridBody from '~/components/ui/grid/GridBody.vue'
import GridHeader from '~/components/ui/grid/GridHeader.vue'
import Pagination from '~/components/ui/pagination/Pagination.vue'
import { maskPhoneNumber } from '~/utils'

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

export interface PageLimit {
  label: string
  value: number
}

export interface PageProps {
  totalPageCount: number
  pageVisibleCount: number
}

export interface PageParams {
  currentPage: number
  currentPageLimit: number
}

const pageLimitOptions = ref<LimitOption<PageLimit>[]>([
  {
    label: '10개씩 보기',
    value: 10,
  },
  {
    label: '30개씩 보기',
    value: 30,
  },
  {
    label: '50개씩 보기',
    value: 50,
  },
])

const pageVisibleCount = ref<number>(10)
const pageParams = ref<PageParams>({
  currentPage: 1,
  currentPageLimit: 10,
})

const totalCount = ref<TotalCount>(1000)
const selectedRows = ref<MockRow[]>([])

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
  {
    name: '이민우',
    age: 5,
    rank: '선임',
    genderCode: 'male',
    gender: '남',
    department: 'UX STUDIO TF',
    residence: '서울시 은평구 xx동',
    cellPhone: '01012345678',
  },
])

const columnClickEvent = (column: Column) => {
  console.log('column result >>>', column)
}

const sortChangeEvent = (targetColumn: string, sortDirection: string) => {
  console.log(`target-column ::${targetColumn} , sortDirection :: ${sortDirection}`)
}

const rowClickEvent = (row: MockRow) => {
  console.log('row result >>>', row)
}

const getSelectedRows = (selectedRows: MockRow[]) => {
  console.log('selected row result >>', selectedRows)
}

const pageChangeEvent = (page: number) => {
  console.log('current page >>>', page)
}

const limitChangeEvent = (limit: string | number) => {
  console.log('current limit >>>', limit)
}
</script>

<template>
  <div class="grid-container">
    <div class="grid-wrapper">
      <GridHeader :total-count="totalCount" total-label="Total" />
      <GridBody
        v-model:selected-rows="selectedRows" :columns="columns" :rows="mockRows" :use-checkbox="true"
        @update:selected-rows="getSelectedRows(selectedRows)" @column-click-event="columnClickEvent"
        @sort-change-event="sortChangeEvent"
        @row-click-event="rowClickEvent"
      >
        <template #cellPhone="{ row }">
          <span>
            {{ maskPhoneNumber(row.cellPhone) }}
          </span>
        </template>
      </GridBody>
      <Pagination
        :use-limit-list="true"
        :total-count="totalCount"
        :page-visible-count="pageVisibleCount"
        :limit-options="pageLimitOptions"
        :current-page="pageParams.currentPage"
        :current-page-limit="pageParams.currentPageLimit"
        @page-change-event="pageChangeEvent"
        @limit-change-event="limitChangeEvent"
      />
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
