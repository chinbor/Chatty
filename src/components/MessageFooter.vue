<script setup lang="ts">
import { getFullDate } from '~/utils'

const props = defineProps({
  message: {
    type: Object as PropType<Record<string, any>>,
    required: true,
  },
})

const date = computed(() => {
  return getFullDate(new Date(props.message.time * 1000))
})
</script>

<template>
  <div class="mt5px text-12px text-[var(--onu-colors-gray500)]">
    {{ date }}
  </div>
</template>
