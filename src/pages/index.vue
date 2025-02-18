<script setup lang="ts">
const router = useRouter()
const goGuide = () => {
  router.push('/guide')
}
</script>

<template>
  <div>
    <button type="button" @click="goGuide">
      Guide 바로가기 >
    </button>
  </div>
</template>

<style scoped>

</style>
