<script setup lang="ts">
defineOptions({
  name: 'Login',
})
const router = useRouter()
const appid = ref('')
const secret = ref('')
const isShowSelect = ref(false)

function go() {
  if (!isShowSelect.value) {
    isShowSelect.value = true
    return
  }

  // TODO: 先走store的登录并将相关信息存储在localstorage中
  router.push('/')
}

const { t } = useI18n()
</script>

<template>
  <div v-if="!isShowSelect" class="f-c-c gap-30px mt-100px">
    <h1>{{ t('title1') }}</h1>
    <TheInput
      v-model="appid"
      :placeholder="t('input.appid')"
      autocomplete="false"
      type="text"
    />
    <TheInput
      v-model="secret"
      :placeholder="t('input.secret')"
      autocomplete="false"
      type="password"
      @keydown.enter="go"
    />
  </div>
  <div v-else class="f-c-c gap-30px mt-100px">
    <h1>{{ t('title2') }}</h1>
    fuck
  </div>
  <button btn mt-30px @click="go">
    {{ t('button.go') }}
  </button>
</template>

<route lang="yaml">
meta:
  title: Login
  permission: false
</route>
