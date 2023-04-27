<script setup lang="ts">
import type { PropType } from 'vue'
import TIM from 'tim-js-sdk'

const props = defineProps({
  message: {
    type: Object as PropType<Record<string, any>>,
    required: true,
  },
})

const isMine = computed(() => {
  return props.message.flow === 'out'
})

const messagePosition = computed(() => {
  if (isMine.value)
    return 'right'

  else
    return 'left'
})
</script>

<template>
  <div flex :class="messagePosition === 'right' ? 'flex-row-reverse' : ''" my20px>
    <div>
      <TheAvatar :src="message.avatar" />
    </div>
    <div class="mx10px flex flex-col" :class="messagePosition === 'right' ? 'items-end' : ''">
      <div class="flex items-center">
        <MessageStatusIcon v-if="isMine" :message="message" />
        <TextElement
          v-if="message.type === TIM.TYPES.MSG_TEXT"
          :is-mine="isMine"
          :payload="message.payload"
          :message="message"
        />
      </div>
      <MessageFooter :message="message" />
    </div>
  </div>
</template>
