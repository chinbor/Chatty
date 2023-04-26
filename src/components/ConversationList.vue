<script setup lang="ts">
const { t } = useI18n()
const showDialog = ref(false)
const userID = ref('')
const userStore = useUserObservable()
const conversationStore = useConversationObservable()

function newConversation() {
  showDialog.value = true
}

function refresh() {
  let timer: null | NodeJS.Timeout = setTimeout(async () => {
    clearTimeout(timer!)
    timer = null
    await userStore.value.tim?.getConversationList()
    alert(t('room.refresh_success'))
  }, 1000)
}

async function confirm() {
  try {
    await conversationStore.value.checkoutConversation(`C2C${userID.value}`)
    showDialog.value = false
  }
  catch (err) {
    alert(t('room.no_user'))
  }

  userID.value = ''
}
</script>

<template>
  <div class="h50px flex text-22px items-center justify-end pr-10px" border="b-1px [var(--onu-colors-gray500)]">
    <div i-mdi-plus mr-5px class="hover:rotate-360 duration-300 cursor-pointer" :title="t('button.new')" @click="newConversation" />
    <div i-mdi-refresh class="hover:rotate-360 duration-500 cursor-pointer" :title="t('button.refresh')" @click="refresh" />
  </div>
  <div class="overflow-y-auto flex-1">
    <ConversationItem v-for="item in conversationStore.conversationList" :key="item.conversationID" :conversation="item" />
  </div>
  <TheDialog v-model="showDialog">
    <h1 class="font-bold">
      {{ t('button.new') }}
    </h1>
    <TheInput v-model="userID" :placeholder="t('input.username')" mt-10px />
    <button class="btn w250px mt10px" @click="confirm">
      {{ t('button.confirm') }}
    </button>
  </TheDialog>
</template>
