import TIM from 'tim-js-sdk'
import { genTestUserSig } from '~/utils'

export function createTim(userID: string, appID: number, secretKey: string) {
  const tim = TIM.create({
    SDKAppID: appID,
  })

  // https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#setLogLevel
  tim.setLogLevel(0)

  const userSig = genTestUserSig(userID, appID, secretKey)

  return {
    tim,
    userSig,
  }
}

export function useTimEventListeners() {
  const store = useUserObservable()

  if (!store.value.tim)
    return

  const sdkReady = () => {
  }

  const sdkNotReady = () => {
  }

  const kickedOut = () => {
  }

  const timError = () => {
  }

  const messageReceived = () => {
  }

  const conversationListUpdated = () => {
  }

  const netStateChange = () => {
  }

  store.value.tim.on(TIM.EVENT.SDK_READY, sdkReady)
  store.value.tim.on(TIM.EVENT.SDK_NOT_READY, sdkNotReady)
  store.value.tim.on(TIM.EVENT.KICKED_OUT, kickedOut)
  store.value.tim.on(TIM.EVENT.ERROR, timError)
  store.value.tim.on(TIM.EVENT.MESSAGE_RECEIVED, messageReceived)
  store.value.tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, conversationListUpdated)
  store.value.tim.on(TIM.EVENT.NET_STATE_CHANGE, netStateChange)
}
