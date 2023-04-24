import { createGlobalObservable, useLocalObservable } from 'mobx-vue-lite'

interface ConversationObservable {
  conversationList: Record<string, any>[]
  currentConversation: Record<string, any>
  currentMessageList: Record<string, any>[]
  updateConversationList: (data: Record<string, any>[]) => void
  pushCurrentMessageList: (data: Record<string, any>[] | Record<string, any>) => void
}

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
  }))
})
