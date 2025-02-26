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

const isShow = ref(false)

const openPopup = () => {
  isShow.value = true
}
</script>

<template>
  <div>
    User
    <button type="button" @click="fetchExample">
      test
    </button>
    <div>
      <button type="button" @click="openPopup">
        open
      </button>
    </div>
  </div>
  <CommonDialog v-model:is-open="isShow" />
</template>

<style scoped>

</style>
