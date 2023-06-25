// 可以考虑使用cdn的方式进行优化
import TIM from 'tim-js-sdk'
import { useConversationObservable } from '~/store/conversation'
import { genTestUserSig } from '~/utils'

export function createTim(userID: string, appID: number, secretKey: string) {
  const tim = TIM.create({
    SDKAppID: appID,
  })

  // https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#setLogLevel
  tim.setLogLevel(4)

  const userSig = genTestUserSig(userID, appID, secretKey)

  return {
    tim,
    userSig,
  }
}

function kickedOutReason(type: string) {
  switch (type) {
    case TIM.TYPES.KICKED_OUT_MULT_ACCOUNT:
      return 'Logged out due to multi-instance login, please log in again'
    case TIM.TYPES.KICKED_OUT_MULT_DEVICE:
      return 'Logged out due to multi-device login, please log in again'
    case TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED:
      return 'Please login again due to expired userSig'
    default:
      return 'Logged out for unknown reasons, please log in again'
  }
}

function checkoutNetState(state: string) {
  switch (state) {
    case TIM.TYPES.NET_STATE_CONNECTED:
      return 'Connected to the network'
    case TIM.TYPES.NET_STATE_CONNECTING:
      return 'The current network is unstable'
    case TIM.TYPES.NET_STATE_DISCONNECTED:
      return 'The current network is unavailable'
    default:
      return 'unknown network reason'
  }
}

export function useTimEventListeners() {
  const userStore = useUserObservable()
  const conversationStore = useConversationObservable()

  if (!userStore.value.tim)
    return

  const sdkReady = async ({ name }: { name: string }) => {
    const isSDKReady = name === TIM.EVENT.SDK_READY
    userStore.value.isSDKReady = isSDKReady

    if (!isSDKReady)
      return

    try {
      const { data: profile } = await userStore.value.tim?.getMyProfile()

      userStore.value.updateUserProfile(profile)
    }
    catch (err) {
      console.error(err)
    }
  }

  const kickedOut = (e: { data: { type: string } }) => {
    const msg = kickedOutReason(e.data.type)

    const isConfirm = confirm(msg)

    if (isConfirm)
      userStore.value.logout()
  }

  const timError = (e: { data: { message: string } }) => {
    if (e.data.message !== 'Network Error')
      alert(e.data.message)
  }

  const messageReceived = (e: { data: Record<string, any> | Record<string, any>[] }) => {
    conversationStore.value.pushCurrentMessageList(e.data)
  }

  const conversationListUpdated = (e: { data: Record<string, any>[] }) => {
    conversationStore.value.updateConversationList(e.data)
  }

  const netStateChange = (e: { data: { state: any } }) => {
    const msg = checkoutNetState(e.data.state)
    alert(msg)
  }

  userStore.value.tim.on(TIM.EVENT.SDK_READY, sdkReady)
  userStore.value.tim.on(TIM.EVENT.SDK_NOT_READY, sdkReady)
  userStore.value.tim.on(TIM.EVENT.KICKED_OUT, kickedOut)
  userStore.value.tim.on(TIM.EVENT.ERROR, timError)
  userStore.value.tim.on(TIM.EVENT.MESSAGE_RECEIVED, messageReceived)
  userStore.value.tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, conversationListUpdated)
  userStore.value.tim.on(TIM.EVENT.NET_STATE_CHANGE, netStateChange)
}
