<script setup lang="ts">
const fetchExample = async () => {
  try {
    const response = await request.get('/example')
    console.log(response)
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    User
    <button type="button" @click="fetchExample">
      test
    </button>
  </div>
</template>

<style scoped>

</style>
