<script setup lang="ts">
import { useTimEventListeners } from '~/tim'

defineOptions({
  name: 'Home',
})

useTimEventListeners()
</script>

<template>
  <div text-center>
    welcome
  </div>
</template>

<route lang="yaml">
meta:
  title: Room
  permission: true
</route>
