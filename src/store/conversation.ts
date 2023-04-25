import { createGlobalObservable, useLocalObservable } from 'mobx-vue-lite'
import { titleNotify } from '~/utils'

interface ConversationObservable {
  conversationList: Record<string, any>[]
  currentConversation: Record<string, any>
  currentMessageList: Record<string, any>[]
  updateConversationList: (data: Record<string, any>[]) => void
  pushCurrentMessageList: (data: Record<string, any>[] | Record<string, any>) => void
  totalUnreadCount: number
}

const hiddenStore = useHiddenObservable()

export const useConversationObservable = createGlobalObservable(() => {
  return useLocalObservable<ConversationObservable>(() => ({
    conversationList: [],
    currentConversation: {},
    currentMessageList: [],
    updateConversationList(data: Record<string, any>[]) {
      this.conversationList = data
    },
    pushCurrentMessageList(data) {
      if (!this.currentConversation.conversationID)
        return

      if (Array.isArray(data)) {
        const result = data.filter(item => item.conversationID === this.currentConversation.conversationID)
        this.currentMessageList = [...this.currentMessageList, ...result]
      }
      else if (data.conversationID === this.currentConversation.conversationID) {
        this.currentMessageList = [...this.currentMessageList, data]
      }
    },
    get totalUnreadCount() {
      const result = this.conversationList.reduce((count, conversation: Record<string, any>) => {
        // 当前会话不计算总未读
        if (!hiddenStore.value.hidden && this.currentConversation.conversationID === conversation.conversationID)
          return count

        return count + conversation.unreadCount
      }, 0)

      titleNotify(result)
      return result
    },
  }))
})
