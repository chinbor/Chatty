<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div text-center pt200px pb-50px text-18px>
    Maybe I can introduce myself here😂...
  </div>
  <button class="btn" @click="$router.back()">
    {{ t('button.back') }}
  </button>
</template>

<route lang="yaml">
meta:
  title: About
  permission: false
</route>
