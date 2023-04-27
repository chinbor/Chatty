<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  message: {
    type: Object as PropType<Record<string, any>>,
    required: true,
  },
})

const userStore = useUserObservable()
const hiddenStore = useHiddenObservable()

// HACK: to refresh props.message.status
const status = computed(() => {
  // @ts-expect-error: let me do it
  const _temp = hiddenStore.value.current

  return props.message.status
})

async function reSend() {
  try {
    // @ts-expect-error: let me do
    await userStore.value.tim?.resendMessage(props.message)
  }
  catch (err) {
    // @ts-expect-error: let me do
    alert(err.message)
  }
}
</script>

<template>
  <div v-if="status === 'unSend'" i-svg-spinners-270-ring mr-5px />
  <div v-else-if="status === 'fail'" i-mdi-information-outline class="bg-[#f35f5f] cursor-pointer" mr-5px @click="reSend" />
  <div v-else />
</template>
