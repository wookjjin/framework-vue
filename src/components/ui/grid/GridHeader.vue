<script setup lang='ts'>
import { formatNumber } from '~/utils'

export type TotalCount = number
export type TotalLabel = string

withDefaults(defineProps<{
  totalCount?: TotalCount
  totalLabel?: TotalLabel
}>(), {
  totalCount: 0,
  totalLabel: 'Total',
})
</script>

<template>
  <div class="grid-header-container">
    <div class="header-left">
      <slot name="header-left">
        <span v-if="totalCount">
          <em> {{ totalLabel }}👀 </em> {{ formatNumber(totalCount) }}
        </span>
      </slot>
    </div>
    <div class="header-right">
      <slot name="header-right">
        <button>Slot Button</button>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.grid-header-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.header-left {
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
  flex-grow: 1;
}

.header-left em {
  font-weight: bold;
  font-size: 1.3rem;
  color: #007bff;
  padding-right: 4px;
  font-style: normal;
}

.header-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.header-right button {
  background-color: white;
  color: #007bff;
  border: 2px solid #007bff;
  min-width: 80px;
  height: 32px;
  padding: 4px 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #007bff;
    color: white;
    box-shadow: 0 3px 6px rgba(0, 123, 255, 0.3);
  }

  &:active {
    background-color: #0056b3;
    border-color: #0056b3;
    box-shadow: 0 2px 4px rgba(0, 86, 179, 0.3);
  }
}
</style>
