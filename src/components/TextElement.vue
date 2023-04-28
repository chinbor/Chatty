<script setup lang="ts">
import type { PropType } from 'vue'
import TIM from 'tim-js-sdk'
import { decodeText } from '~/utils'

const props = defineProps({
  isMine: {
    type: Boolean,
    required: true,
  },
  payload: {
    type: Object as PropType<Record<string, any>>,
    required: true,
  },
  message: {
    type: Object as PropType<Record<string, any>>,
    required: true,
  },
})

const hiddenStore = useHiddenObservable()

// HACK: to refresh props.message.status
const readByPeer = computed(() => {
  // @ts-expect-error: let me do it
  const _temp = hiddenStore.value.current

  if (props.message.status !== 'success')
    return false

  if (props.message.conversationType === TIM.TYPES.CONV_C2C && props.message.isPeerRead)
    return '已读'

  if (props.message.conversationType === TIM.TYPES.CONV_C2C && !props.message.isPeerRead)
    return '未读'

  return ''
})

const contents = computed(() => {
  return decodeText(props.payload)
})
</script>

<template>
  <div class="flex items-center">
    <div v-if="isMine && readByPeer" class="text-[var(--onu-colors-gray600)] text-12px mr-5px">
      {{ readByPeer }}
    </div>
    <div class="max-w-350px p10px bg-[var(--onu-colors-gray200)] rounded text-left whitespace-pre-wrap line-height-20px">
      <template v-for="(content, index) in contents" :key="index">
        <template v-if="content.type === 'text'">
          {{ content.text }}
        </template>
        <span v-else :key="index" class="inline-block" :class="`i-mdi-${content.name}`" w20px h20px align-bottom />
      </template>
    </div>
  </div>
</template>
