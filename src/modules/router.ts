import type { Router } from 'vue-router'
import type { LoginParams } from '~/store/user'
import { USER_INFO } from '~/constants'

export default (_: any, { router }: { router: Router }) => {
  router.beforeEach(async (to) => {
    document.title = to.meta.title ? `Chatty - ${to.meta.title}` : 'Chatty'

    let userInfo: string | null | LoginParams = localStorage.getItem(USER_INFO)

    if (userInfo) {
      userInfo = JSON.parse(userInfo) as LoginParams

      const userStore = useUserObservable()

      if (to.path === '/login')
        return { name: '' }

      if (!userStore.value.tim)
        await userStore.value.login(userInfo)
    }
    else {
      if (!to.meta?.permission)
        return

      return { name: 'login' }
    }
  })
}
