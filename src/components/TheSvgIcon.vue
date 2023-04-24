<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  name: {
    type: String as PropType<string>,
    required: true,
  },
  color: {
    type: String as PropType<string>,
  },
})
// real icon name
const symbolId = computed(() => `#icon-${props.name}`)
</script>

<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<style scoped>
.svg-icon {
  color: v-bind(color);
  /* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */
  fill: currentColor;
}
</style>
