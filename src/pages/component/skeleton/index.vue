<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col gap-20px">
    <div class="flex flex-col gap-10px">
      <p class="text-6">
        1. Simple
      </p>
      <Skeleton />
    </div>

    <!-- 텍스트 스켈레톤 -->
    <div class="flex flex-col gap-10px">
      <p class="text-6">
        2. Text
      </p>
      <Skeleton text :repeat="3" />
    </div>

    <!-- 원형 스켈레톤 -->
    <div class="flex flex-col gap-10px">
      <p class="text-6">
        3. Round
      </p>
      <Skeleton circle width="50px" height="50px" />
    </div>

    <!-- 웨이브 애니메이션 -->
    <div class="flex flex-col gap-10px">
      <p class="text-6">
        4. Animation
      </p>
      pulse:
      <Skeleton animation="pulse" is-round />
      wave:
      <Skeleton animation="wave" is-round />
      none:
      <Skeleton animation="none" is-round />
    </div>

    <div class="flex flex-col gap-10px">
      <!-- 여러 스켈레톤 항목 (카드 형태) -->
      <p class="text-6">
        5. Card
      </p>
      <div class="flex flex-col gap-1em">
        <Skeleton is-round height="200px" />
        <Skeleton text :repeat="3" animation="pulse" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
