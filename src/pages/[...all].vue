<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <main p="x4 y10" text="center [var(--onu-colors-gray700)]">
    <div text-4xl>
      <div i-carbon-warning inline-block />
    </div>
    <h4>
      {{ t('not-found') }}
    </h4>
    <div>
      <button text-sm btn m="3 t8" @click="router.back()">
        {{ t('button.back') }}
      </button>
    </div>
  </main>
</template>

<route lang="yaml">
meta:
  title: 404
  permission: false
</route>
