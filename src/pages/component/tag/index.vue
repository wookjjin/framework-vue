<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col gap-20px">
    <div class="flex flex-col gap-10px">
      <span>1. Base</span>
      <div>
        <BaseTag class="ml-4" color="#f56c6c" text="Small" size="small" />
        <BaseTag class="ml-4" color="#67c23a" text="Medium" size="medium" />
        <BaseTag class="ml-4" color="#409eff" text="Large" size="large" />
        <BaseTag class="ml-4" text="Color" color="#e88080" />
        <BaseTag class="ml-4" text="Closable" closable />
        <BaseTag class="ml-4" text="Icon">
          <template #icon>
            <img src="/icon/dog--fff.svg" width="14px" height="14px">
          </template>
        </BaseTag>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
