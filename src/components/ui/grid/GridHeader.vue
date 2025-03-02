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
  border-radius: 6px;
}

.header-left {
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
  flex-grow: 1;
  color: #2c3e50;
}

.header-left em {
  font-weight: bold;
  font-size: 1.3rem;
  color: #4f8a5a;
  padding-right: 4px;
  font-style: normal;
}

.header-left span {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
  opacity: 0.85;
  text-shadow: 1px 1px 2px rgba(44, 62, 80, 0.15);
}

.header-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.header-right button {
  background-color: white;
  color: #4f8a5a;
  border: 2px solid #4f8a5a;
  min-width: 80px;
  height: 32px;
  padding: 4px 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #4f8a5a;
    color: white;
    box-shadow: 0 3px 6px rgba(79, 138, 90, 0.3);
  }

  &:active {
    background-color: #3b6e45;
    border-color: #3b6e45;
    box-shadow: 0 2px 4px rgba(59, 110, 69, 0.3);
  }
}
</style>
