<script setup lang="ts">
const { t } = useI18n()
const conversationStore = useConversationObservable()
const hiddenStore = useHiddenObservable()
const userStore = useUserObservable()
const showBackToBottom = ref(false)
const messageListRef = ref<HTMLDivElement | null>(null)
const preScrollHeight = ref(0)

const name = computed(() => {
  if (conversationStore.value.currentConversation.type === 'C2C') {
    let _name = conversationStore.value.currentConversation.userProfile.nick || conversationStore.value.accountName
    const list = conversationStore.value.currentMessageList
    const len = list.length
    for (let i = len - 1; i >= 0; i--) {
      if (list[i].flow === 'in' && list[i].nick && _name !== list[i].nick) {
        _name = list[i].nick
        break
      }
    }

    return _name
  }

  return conversationStore.value.accountName
})

const showCurrentConversation = computed(() => {
  return !!conversationStore.value.currentConversation.conversationID
})

function scrollToBottom() {
  nextTick(() => {
    if (!messageListRef.value)
      return

    messageListRef.value.scrollTop = messageListRef.value?.scrollHeight
    preScrollHeight.value = messageListRef.value?.scrollHeight
    showBackToBottom.value = false
  })
}

function keepMessageListOnBottom() {
  if (!messageListRef.value)
    return

  if (preScrollHeight.value - messageListRef.value.clientHeight - messageListRef.value.scrollTop < 20) {
    nextTick(() => {
      // @ts-expect-error: let me do it
      messageListRef.value.scrollTop = messageListRef.value?.scrollHeight
    })

    showBackToBottom.value = false
  }
  else {
    showBackToBottom.value = true
  }

  preScrollHeight.value = messageListRef.value?.scrollHeight
}

function onScroll(e: UIEvent) {
  if (!messageListRef.value)
    return

  if (preScrollHeight.value - messageListRef.value.clientHeight - (e.target! as HTMLElement).scrollTop < 20)
    showBackToBottom.value = false
}

function loadMore() {
  conversationStore.value.getMessageList(conversationStore.value.currentConversation.conversationID)
}

onUpdated(() => {
  keepMessageListOnBottom()
})

watch(() => conversationStore.value.currentConversation.unreadCount, (newVal) => {
  // console.log('currentUnreadCount--hidden', hiddenStore.value.hidden)
  // console.log('currentUnreadCount--unreadCount', newVal)
  if (!hiddenStore.value.hidden && newVal > 0) {
    userStore.value.tim?.setMessageRead({
      conversationID: conversationStore.value.currentConversation.conversationID,
    })
  }
})

watch(() => hiddenStore.value.hidden, (newVal) => {
  // console.log('hidden---unreadCount', conversationStore.value.currentConversation.unreadCount)
  // console.log('hidden---hidden', newVal)
  if (!newVal && conversationStore.value.currentConversation.unreadCount > 0) {
    userStore.value.tim?.setMessageRead({
      conversationID: conversationStore.value.currentConversation.conversationID,
    })
  }
})
</script>

<template>
  <div v-if="showCurrentConversation" flex-1 flex-col flex>
    <div h="50px" border="b-1px [var(--onu-colors-gray500)]">
      <div class="px-20px text-left text-[var(--onu-colors-gray800)] text-18px line-height-50px font-bold">
        {{ name }}
      </div>
    </div>
    <div class="flex-1 relative flex flex-col h100% overflow-hidden">
      <div ref="messageListRef" class="w100% box-border overflow-y-auto px-20px" @scroll="onScroll">
        <div v-if="!conversationStore.isCompleted" class="text-12px pt10px text-[var(--onu-colors-blue700)] cursor-pointer hover:opacity-70" @click="loadMore">
          {{ t('room.more') }}
        </div>
        <div v-else text-12px pt10px flex justify-center>
          {{ t('room.no_more') }}
        </div>
        <MessageItem v-for="message in conversationStore.currentMessageList" :key="message.ID" :message="message" />
      </div>
      <div v-show="showBackToBottom" class="bg-[var(--onu-colors-gray200)] hover:text-[var(--onu-colors-blue700)] absolute cursor-pointer px5px py2px m-auto bottom-5px text-12px left-[50%] translate-x-[-50%]" border="1px [var(--onu-colors-gray500)] rounded" @click="scrollToBottom">
        {{ t('room.back_to_bottom') }}
      </div>
    </div>
    <div border="t-1px [var(--onu-colors-gray500)]">
      <TheSendBox @scroll-to-bottom="scrollToBottom" />
    </div>
  </div>
</template>
