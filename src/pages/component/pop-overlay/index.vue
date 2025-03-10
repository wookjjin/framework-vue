<script setup lang='ts'>
import { useConfirm } from '~/utils'

const isShow = ref(false)
const user = ref()

const openConfirmOverlay = () => {
  useConfirm({
    title: 'Confirm',
    content: 'Really?',
    confirmButtonText: 'YES',
    cancelButtonText: 'NO',
    onConfirm: () => {
      console.log('확인 클릭')
    },
    onCancel: () => {
      console.log('취소 클릭')
    },
  })
}

const getUserDetail = async () => {
  try {
    const response = await request.get('/user-detail')
    return response.data.result
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

const getUserData = () => {
  return {
    userName: user.value.userName,
    age: user.value.age,
    address: user.value.address,
  }
}

const saveUserInfo = async (data: { userName: string, age: number, address: string }) => {
  try {
    const response = await request.post('/user', data)
    return response
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

const openPopOverlay = async () => {
  try {
    const userData = await getUserDetail()
    user.value = userData
    isShow.value = true
  }
  catch (error) {
    console.error(error)
  }
}

const handleConfrim = async () => {
  const data = getUserData()
  try {
    const response = await saveUserInfo(data)
    console.log(response)

    isShow.value = false
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="overlay-sample-list-contaner">
    <BaseButton @click="openPopOverlay">
      Open Popoverlay
    </BaseButton>
    <BaseButton @click="openConfirmOverlay">
      Open ConfirmOverlay
    </BaseButton>
  </div>
  <PopOverlay v-model:is-show="isShow" @confirm="handleConfrim">
    <template #content>
      <div>
        <BaseInput v-model="user.userName" label="Name" type="text" placeholder="name" />
        <BaseInput v-model="user.age" label="Age" type="text" placeholder="age" />
        <BaseInput v-model="user.address" label="Address" type="text" placeholder="address" />
      </div>
    </template>
  </PopOverlay>
</template>

<style scoped>
.overlay-sample-list-contaner {
  display: flex;
  gap: 10px;
}
</style>
