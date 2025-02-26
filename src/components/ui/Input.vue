<script setup lang="ts">
export interface Props {
  type: 'text' | 'password'
  label?: string
  placeholder?: string
  width?: string
  required?: boolean
  disabled?: boolean
  clearable?: boolean
  minlength?: string
  maxlength?: string
  readonly?: boolean
}

withDefaults(defineProps<Props>(), {
})

const model = defineModel()
const inputInstance = ref<HTMLInputElement>()
</script>

<template>
  <div>
    <label :class="{ 'is-required': required }">{{ label }}</label>
    <div>
      <input
        ref="inputInstance" v-model="model" :type="type" :placeholder="placeholder" :disabled="disabled"
        :minlength="minlength" :maxlength="maxlength" :readonly="readonly"
      >
      <div v-if="clearable && model">
        <button>
          <icon name="clear__full--abb" width="24" height="24" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
