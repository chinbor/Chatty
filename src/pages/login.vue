<script setup lang="ts">
// const SDKAPPID = 1400508677
// const SECRETKEY = '6b2354cf28dff1e6a6dd8d7c9952bd994923782df98453d0c7cae748a0418c0f'
defineOptions({
  name: 'Login',
})
const appID = ref('')
const secretKey = ref('')
const userID = ref('')
const isShowSelect = ref(false)
const userStore = useUserObservable()
const { t } = useI18n()
const router = useRouter()

function back() {
  isShowSelect.value = false
}

async function go() {
  if (!isShowSelect.value) {
    if (!appID.value) {
      alert(`${t('input.appid_no_empty')}`)
      return
    }

    if (!secretKey.value) {
      alert(`${t('input.secret_no_empty')}`)
      return
    }

    isShowSelect.value = true
    return
  }

  if (!/^[a-zA-Z][a-zA-Z0-9_]{3,23}$/.test(userID.value)) {
    alert(`${t('input.username_tip')}`)
    return
  }

  await userStore.value.login({
    userID: userID.value,
    appID: Number(appID.value),
    secretKey: secretKey.value,
  })

  router.push('/')
}
</script>

<template>
  <div v-show="!isShowSelect" class="f-c-c gap-30px pt-100px">
    <h1>{{ t('title1') }}</h1>
    <TheInput
      v-model="appID"
      :placeholder="t('input.appid')"
      autocomplete="false"
      type="text"
    />
    <TheInput
      v-model="secretKey"
      :placeholder="t('input.secret')"
      autocomplete="false"
      type="password"
      @keydown.enter="go"
    />
  </div>
  <div v-show="isShowSelect" class="f-c-c gap-30px mt-100px">
    <h1>{{ t('title2') }}</h1>
    <TheInput
      v-model="userID"
      :placeholder="t('input.username')"
      autocomplete="false"
      type="text"
    />
  </div>
  <button v-if="isShowSelect" btn mt-30px mr-10px @click="back">
    {{ t('button.back') }}
  </button>
  <button btn mt-30px @click="go">
    {{ t('button.go') }}
  </button>
</template>

<route lang="yaml">
meta:
  title: Login
  permission: false
</route>
