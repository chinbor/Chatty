<script setup lang="ts">
const { t } = useI18n()

const activeName = ref('conversations')

const activeConversations = computed(() => {
  return activeName.value === 'conversations'
})

function handleClick(type: string) {
  activeName.value = type
}
</script>

<template>
  <div flex border="r-1px [var(--onu-colors-gray500)]" w="30%">
    <div w="80px" flex="~ col items-center" border="r-1px [var(--onu-colors-gray500)]">
      <!-- 头像 -->
      <div cursor-pointer w50px h50px my-10px rounded fcc bg="[var(--onu-colors-gray500)]">
        <TheSvgIcon name="avatar" class="w40px h40px" />
      </div>
      <!-- 会话列表 -->
      <div flex-1 w="100%" flex="~ col items-center">
        <div w="100%" h="70px" fcc cursor-pointer :title="t('room.conversations')" :class="{ 'tab-active': activeConversations }" @click="handleClick('conversations')">
          <div i-mdi-chat-processing-outline w35px h35px />
        </div>
      </div>
      <!-- 登出 -->
      <div w="100%" h="70px" fcc :title="t('room.logout')" cursor-pointer>
        <div w35px h35px i-ri-logout-circle-line />
      </div>
    </div>
    <div flex-1 />
  </div>
</template>
