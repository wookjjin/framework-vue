<script setup lang="ts">
const isLoading = ref(false)

const handleLoading = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
</script>

<template>
  <div class="flex flex-col gap-20px">
    <div class="flex flex-col gap-10px">
      <span>1. Variant</span>
      <div class="flex gap-10px">
        <BaseButton variant="primary">
          Primary Button
        </BaseButton>
        <BaseButton variant="secondary">
          Secondary Button
        </BaseButton>
        <BaseButton variant="outline">
          Outline Button
        </BaseButton>
        <BaseButton variant="text">
          Text Button
        </BaseButton>
      </div>
    </div>
    <div class="flex flex-col gap-10px">
      <span>2. Size</span>
      <div class="flex gap-10px">
        <BaseButton size="small" variant="primary">
          Small Button
        </BaseButton>
        <BaseButton size="medium" variant="primary">
          Medium Button
        </BaseButton>
        <BaseButton size="large" variant="primary">
          Large Button
        </BaseButton>
      </div>
    </div>
    <div class="flex flex-col gap-10px">
      <span>3. States</span>
      <div class="flex gap-10px">
        <BaseButton disabled variant="primary">
          Disabled Button
        </BaseButton>
        <BaseButton :loading="isLoading" @click="handleLoading">
          Loading Button
        </BaseButton>
        <BaseButton variant="primary">
          Large Button
        </BaseButton>
      </div>
    </div>
    <div class="flex flex-col gap-10px">
      <span>4. Icon</span>
      <div class="flex gap-10px">
        <BaseButton variant="primary">
          <template #prefix>
            <img key="loc" src="/icon/location--fff.svg" width="20px" height="20px">
          </template>
          Icon Button
        </BaseButton>
        <BaseButton variant="primary">
          <template #suffix>
            <img key="loc" src="/icon/location--fff.svg" width="20px" height="20px">
          </template>
          Icon Button
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
