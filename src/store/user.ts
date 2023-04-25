import { createGlobalObservable, useLocalObservable } from 'mobx-vue-lite'
import type { ChatSDK } from 'tim-js-sdk'
import { createTim } from '~/tim'
import { USER_INFO } from '~/constants'
import { router } from '~/main'

export interface LoginParams {
  userID: string
  appID: number
  secretKey: string
}

interface UserObservable {
  tim: ChatSDK | null
  isSDKReady: boolean
  login: (params: LoginParams) => Promise<any>
  reset: () => void
  logout: () => Promise<void>
  updateUserProfile: (profile: any) => void
  currentUserProfile: Record<string, any>
}

const hiddenStore = useHiddenObservable()

export const useUserObservable = createGlobalObservable(() => {
  return useLocalObservable<UserObservable>(() => ({
    tim: null,
    isSDKReady: false,
    currentUserProfile: {},
    async login(params) {
      try {
        const { userID, appID, secretKey } = params
        const { tim, userSig } = createTim(userID, appID, secretKey)

        this.tim = tim

        const result = await tim.login({
          userID,
          userSig,
        })

        // NOTE: update current and cause hidden update
        hiddenStore.value.startTimer()

        const userInfo = localStorage.getItem(USER_INFO)

        if (!userInfo) {
          localStorage.setItem(USER_INFO, JSON.stringify({
            userID,
            appID,
            secretKey,
          }))
        }

        return result
      }
      catch (err) {
        console.error(err)
      }
    },
    async logout() {
      if (!this.tim)
        return

      try {
        await this.tim.logout()

        hiddenStore.value.stopTimer()

        this.reset()

        router.replace('/login')
      }
      catch (err) {
        console.error(err)
      }
    },
    reset() {
      this.tim = null
      this.isSDKReady = false
      this.currentUserProfile = {}
      localStorage.removeItem(USER_INFO)
    },
    updateUserProfile(profile) {
      this.currentUserProfile = profile
    },
  }))
})
