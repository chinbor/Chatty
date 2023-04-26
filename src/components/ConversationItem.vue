<script setup lang="ts">
import type { PropType } from 'vue'
import { getDate, getTime, isToday } from '~/utils'

const props = defineProps({
  conversation: {
    type: Object as PropType<Record<string, any>>,
    required: true,
  },
})

const { t } = useI18n()

const hiddenStore = useHiddenObservable()
const conversationStore = useConversationObservable()
const userStore = useUserObservable()

const showUnreadCount = computed(() => {
  if (hiddenStore.value.hidden)
    return props.conversation.unreadCount > 0

  return conversationStore.value.currentConversation.conversationID !== props.conversation.conversationID && props.conversation.unreadCount > 0
})

const date = computed(() => {
  if (!props.conversation.lastMessage || !props.conversation.lastMessage.lastTime)
    return ''

  const date = new Date(props.conversation.lastMessage.lastTime * 1000)

  if (isToday(date))
    return getTime(date)

  return getDate(date)
})

async function deleteConversation(e: Event) {
  e.stopPropagation()

  try {
    await userStore.value.tim?.deleteConversation(props.conversation.conversationID)
    conversationStore.value.resetCurrentConversation()
    alert(t('room.delete_success'))
  }
  catch (err) {
    alert(t('room.delete_fail'))
  }
}

function selectConversation() {
  if (conversationStore.value.currentConversation.conversationID !== props.conversation.conversationID)
    conversationStore.value.checkoutConversation(props.conversation.conversationID)
}
</script>

<template>
  <div class="conversation-item px20px py15px cursor-pointer relative overflow-hidden duration-200 hover:bg-[var(--onu-colors-gray200)]" :class="{ 'bg-[var(--onu-colors-gray200)]': conversation.conversationID === conversationStore.currentConversation.conversationID }" @click="selectConversation">
    <div class="i-carbon-close close absolute w20px h20px right-[-20px] top-0px cursor-pointer transition-all hover:bg-[#f35f5f]" @click="deleteConversation" />
    <div flex>
      <TheAvatar :src="conversation.userProfile.avatar" />
      <div flex-1 ml-10px>
        <div class="flex line-height-21px">
          <div class="flex-1 text-left text-truncate w-0" :title="conversation.userProfile.nick || conversation.userProfile.userID">
            {{ conversation.userProfile.nick || conversation.userProfile.userID }}
          </div>
          <div class="w-40px pl-10px text-12px text-white">
            <span v-if="showUnreadCount" class="badge inline-block bg-[#f35f5f] h18px line-height-18px px6px rounded-10px">
              {{ conversation.unreadCount > 99 ? '99+' : conversation.unreadCount }}
            </span>
          </div>
        </div>
        <div class="flex pt10px text-12px">
          <div class="text-left text-truncate flex-1 w0px text-[var(--onu-colors-gray600)]" :title="conversation.lastMessage.messageForShow">
            {{ conversation.lastMessage.messageForShow }}
          </div>
          <div class="pl10px text-[var(--onu-colors-gray500)]">
            {{ date }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.conversation-item:hover .close {
  right: 3px;
}
</style>
