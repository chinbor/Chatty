import { createGlobalObservable, useLocalObservable } from 'mobx-vue-lite'
import { titleNotify } from '~/utils'

interface ConversationObservable {
  conversationList: Record<string, any>[]
  currentConversation: Record<string, any>
  currentMessageList: Record<string, any>[]
  nextReqMessageID: string
  isCompleted: boolean
  updateConversationList: (data: Record<string, any>[]) => void
  pushCurrentMessageList: (data: Record<string, any>[] | Record<string, any>) => void
  totalUnreadCount: number
  checkoutConversation: (id: string) => void
  updateCurrentConversation: (conversation: Record<string, any>) => void
  getMessageList: (id: string) => void
  resetCurrentConversation: () => void
  accountName: string
  currentConversationType: string
}

export const useConversationObservable = createGlobalObservable(() => {
  return useLocalObservable<ConversationObservable>(() => ({
    conversationList: [],
    currentConversation: {},
    currentMessageList: [],
    nextReqMessageID: '',
    isCompleted: false,
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
      const hiddenStore = useHiddenObservable()

      const result = this.conversationList.reduce<number>((count, conversation: Record<string, any>) => {
        // 当前会话不计算总未读
        if (!hiddenStore.value.hidden && this.currentConversation.conversationID === conversation.conversationID)
          return count

        return count + conversation.unreadCount
      }, 0)

      titleNotify(result)
      return result
    },
    get accountName() {
      if (!this.currentConversation || !this.currentConversation.conversationID)
        return ''

      switch (this.currentConversation.type) {
        case 'C2C':
          // @ts-expect-error: let me go
          return this.currentConversation.conversationID.replace('C2C', '')
        default:
          // @ts-expect-error: let me go
          return this.currentConversation.conversationID
      }
    },
    get currentConversationType() {
      if (!this.currentConversation || !this.currentConversation.type)
        return ''

      // @ts-expect-error: let me go
      return this.currentConversation.type
    },
    updateCurrentConversation(conversation) {
      this.currentConversation = conversation
      this.currentMessageList = []
      this.nextReqMessageID = ''
      this.isCompleted = false
    },
    resetCurrentConversation() {
      this.currentConversation = {}
    },
    getMessageList(conversationID) {
      if (this.isCompleted) {
        alert('no more data!')
        return
      }

      const userStore = useUserObservable()

      const { nextReqMessageID, currentMessageList } = this

      userStore.value.tim?.getMessageList({ conversationID, nextReqMessageID }).then((res) => {
        this.nextReqMessageID = res.data.nextReqMessageID
        this.isCompleted = res.data.isCompleted

        this.currentMessageList = [...res.data.messageList, ...currentMessageList]
      })
    },
    checkoutConversation(conversationID) {
      const userStore = useUserObservable()

      if (this.currentConversation.conversationID) {
        const prevConversationID = this.currentConversation.conversationID
        userStore.value.tim?.setMessageRead({
          conversationID: prevConversationID,
        })
      }

      userStore.value.tim?.setMessageRead({
        conversationID,
      })

      return userStore.value.tim?.getConversationProfile(conversationID).then(({ data }) => {
        this.updateCurrentConversation(data.conversation)
        this.getMessageList(conversationID)
        return Promise.resolve()
      })
    },
  }))
})
