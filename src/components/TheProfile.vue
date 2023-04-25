<script setup lang="ts">
const { t } = useI18n()
const userStore = useUserObservable()
const showDialog = ref(false)
const avatar = ref('')
const nickname = ref('')

function handlerClick() {
  avatar.value = userStore.value.currentUserProfile.avatar
  nickname.value = userStore.value.currentUserProfile.nick
  showDialog.value = true
}

async function confirm() {
  if (!avatar.value.trim().length) {
    alert('头像地址不能为空')
    return
  }

  if (!nickname.value.trim().length) {
    alert('昵称不能为空')
    return
  }

  if (!~avatar.value.indexOf('http')) {
    alert('请输入正确的url地址')
    return
  }

  try {
    await userStore.value.tim?.updateMyProfile({
      avatar: avatar.value,
      nick: nickname.value,
    })

    userStore.value.currentUserProfile.avatar = avatar.value
    userStore.value.currentUserProfile.nick = nickname.value

    showDialog.value = false
  }
  catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div relative>
    <!-- TODO: 修改资料的操作 -->
    <TheAvatar :src="userStore.currentUserProfile.avatar" :title="userStore.currentUserProfile.nick || userStore.currentUserProfile.userID" @click="handlerClick" />
  </div>
  <TheDialog v-model="showDialog">
    <h1 class="font-bold">
      {{ t('room.profile.edit') }}
    </h1>
    <TheInput v-model="avatar" :placeholder="t('room.profile.avatar')" mt-10px />
    <TheInput v-model="nickname" :placeholder="t('room.profile.nickname')" mt-10px />
    <button class="btn w250px mt10px" @click="confirm">
      {{ t('button.confirm') }}
    </button>
  </TheDialog>
</template>
