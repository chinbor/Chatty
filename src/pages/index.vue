<script setup lang="ts">
import { useTimEventListeners } from '~/tim'

defineOptions({
  name: 'Home',
})

const { t } = useI18n()

useTimEventListeners()

const userStore = useUserObservable()
</script>

<template>
  <div pt-8vh fcc>
    <div v-if="!userStore.isSDKReady" text-center h400px fcc>
      <i i-svg-spinners-270-ring inline-block text-xl mr-10px />{{ t('room.loading') }}
    </div>
    <div v-else w80vw h80vh max-w-1280px flex border="~ rounded [var(--onu-colors-gray500)]">
      <TheSidebar />
      <TheConversation />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  title: Room
  permission: true
</route>
