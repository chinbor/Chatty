import type { Router } from 'vue-router'

export default (_: any, { router }: { router: Router }) => {
  router.beforeEach((to) => {
    document.title = to.meta.title ? `Chatty - ${to.meta.title}` : 'Chatty'

    // TODO: 需要进行权限的判断
    // 1. 是否输入 sdk & secret
    // 2. 是否进行了登录？
    if (to.meta?.permission === false)
      return

    return { name: 'login', query: { redirect: to.fullPath } }
  })
}
