<script setup lang="ts">
import Popper from 'vue3-popper'

const { t } = useI18n()
const messageContent = ref('')
const textRef = ref<null | HTMLTextAreaElement>(null)
const rowHeight = ref(0)
const isSmile = ref(false)

function inputChange() {

}

function handleEnter() {
  // console.log('handleEnter')
}

async function handleLine() {
  // NOTE: 未选中时，selectionStart跟selectionEnd相等，我们需要处理选中时触发 ctrl+enter，此时应该为选中的结尾的下一行！！
  const end = textRef.value!.selectionEnd

  messageContent.value = `${messageContent.value.substring(0, end)}\n${messageContent.value.substring(end)}`

  await nextTick()

  textRef.value!.selectionStart = end + 1
  textRef.value!.selectionEnd = end + 1

  textRef.value!.scrollTop = textRef.value!.scrollTop + rowHeight.value
}

onMounted(() => {
  if (textRef.value?.clientHeight)
    rowHeight.value = textRef.value?.clientHeight / 4
})

function beforeOpen() {
  isSmile.value = true
}

function beforeClose() {
  isSmile.value = false
}
</script>

<template>
  <div class="box-border pt6px px20px pb20px overflow-hidden">
    <div class="text-22px flex">
      <!-- 表情包 -->
      <Popper
        placement="top"
        @open:popper="beforeOpen"
        @close:popper="beforeClose"
      >
        <div :title="t('room.emojis')" class="cursor-pointer hover:i-mdi-emoticon-happy-outline duration-200" :class="isSmile ? 'i-mdi-emoticon-happy-outline' : 'i-mdi-emoticon-sad-outline'" />
        <template #content>
          <div bg-red>
            This is the Popper content
          </div>
        </template>
      </Popper>
    </div>
    <div class="pt-10px relative">
      <textarea
        ref="textRef"
        v-model="messageContent"
        rows="4"
        resize="false"
        class="w100% box-border outline-none border-none text-16px bg-transparent"
        @input="inputChange"
        @keydown.enter.exact.prevent="handleEnter"
        @keyup.ctrl.enter.prevent.exact="handleLine"
      />
      <button class="absolute btn bottom-[-5px] right-0" :title="t('room.sendTips')">
        {{ t('button.send') }}
      </button>
    </div>
  </div>
</template>
