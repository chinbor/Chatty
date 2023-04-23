<script setup lang="ts">
const { modelValue } = defineModels<{
  modelValue: string
}>()
</script>

<template>
  <input
    v-model="modelValue"
    v-bind="$attrs"
    p="x-4 y-2"
    w="250px"
    text="center"
    bg="transparent"
    border="~ rounded [var(--onu-colors-gray500)]"
    outline="none active:none"
  >
</template>
