<script setup lang="ts">
const conversationStore = useConversationObservable()

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
</script>

<template>
  <div v-if="showCurrentConversation" flex-1 flex-col flex>
    <div h="50px" border="b-1px [var(--onu-colors-gray500)]">
      <div class="px-20px text-left text-[var(--onu-colors-gray800)] text-18px line-height-50px font-bold">
        {{ name }}
      </div>
    </div>
    <div class="body flex-1">
      <!-- TODO: content area -->
    </div>
    <div border="t-1px [var(--onu-colors-gray500)]">
      <TheSendBox />
    </div>
  </div>
</template>
