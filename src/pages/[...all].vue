<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <h4>
    {{ t('not-found') }}
  </h4>
</template>

<route lang="yaml">
meta:
  title: 404
  layout: 404
  permission: false
</route>
