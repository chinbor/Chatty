<script setup lang="ts">
const { t } = useI18n()
const userStore = useUserObservable()
const conversationStore = useConversationObservable()

const activeName = ref('conversations')

const activeConversations = computed(() => {
  return activeName.value === 'conversations'
})

function handleClick(type: string) {
  activeName.value = type
}

function logout() {
  userStore.value.logout()
}
</script>

<template>
  <div flex border="r-1px [var(--onu-colors-gray500)]" w="30%">
    <div w="80px" flex="~ col items-center" border="r-1px [var(--onu-colors-gray500)]">
      <div cursor-pointer py10px fcc>
        <TheProfile />
      </div>
      <!-- 会话列表 -->
      <div flex-1 w="100%" flex="~ col items-center">
        <div w="100%" h="70px" fcc cursor-pointer :title="t('room.conversations')" :class="{ 'tab-active': activeConversations }" @click="handleClick('conversations')">
          <div w35px h35px relative>
            <div i-mdi-chat-processing-outline w="100%" h="100%" />
            <span v-if="conversationStore.totalUnreadCount !== 0" class="absolute top-[-7px] right-[-10px] inline-block h18px px6px text-12px text-white rounded-10px line-height-18px" bg="#f35f5f">
              <template v-if="conversationStore.totalUnreadCount > 99">99+</template>
              <template v-else>{{ conversationStore.totalUnreadCount }}</template>
            </span>
          </div>
        </div>
      </div>
      <!-- 登出 -->
      <div w="100%" h="70px" fcc :title="t('room.logout')" cursor-pointer @click="logout">
        <div w35px h35px i-ri-logout-circle-line />
      </div>
    </div>
    <div flex-1>
      <div v-show="activeConversations" w="100%" h="100%" flex flex-col>
        <ConversationList />
      </div>
    </div>
  </div>
</template>
