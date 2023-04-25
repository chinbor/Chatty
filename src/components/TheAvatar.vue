<script setup lang="ts">
import avatar from '~/assets/images/avatar.svg'

const props = defineProps({
  src: {
    type: String,
  },
})

const avatarSrc = computed(() => {
  const src = props.src

  if (!src)
    return avatar

  if (/^(https:|http:|\/\/)/.test(src))
    return src

  return avatar
})
</script>

<template>
  <div w="50px" h="50px" rounded overflow-hidden bg="[var(--onu-colors-gray500)]">
    <img :src="avatarSrc" alt="avatar" w="100%" h="100%">
  </div>
</template>
