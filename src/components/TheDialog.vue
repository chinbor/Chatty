<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number || String,
    default: 300,
  },
})

const emits = defineEmits({
  'update:modelValue': (value: boolean) => typeof value,
})
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="modelValue" class="fixed w100% h100% top-0 left-0 bg-[rgba(0,0,0,.5)]">
        <div border="~ rounded [var(--onu-colors-gray500)]" class="pt30px pb30px w200px absolute bg-[var(--onu-colors-gray50)] f-c-c left-50% top-20% translate-x-[-50%] translate-y-[-50%]" :style="{ width: `${width}px` }">
          <div class="i-carbon-close absolute w25px h25px right-0 top-0 cursor-pointer" @click="() => emits('update:modelValue', !modelValue)" />
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>
