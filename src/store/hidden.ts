import { createGlobalObservable, useLocalObservable } from 'mobx-vue-lite'

interface HiddenObservable {
  hidden: boolean
  current: number
  intervalID: NodeJS.Timer | number
  startTimer: () => void
  stopTimer: () => void
}

export const useHiddenObservable = createGlobalObservable(() => {
  return useLocalObservable<HiddenObservable>(() => ({
    current: Date.now(),
    intervalID: 0,
    // HACK: to solve the focus issues
    get hidden() {
      // @ts-expect-error: let me go
      // eslint-disable-next-line unused-imports/no-unused-vars
      const temp = this.current

      if (typeof document.hasFocus !== 'function')
        return document.hidden

      return !document.hasFocus()
    },
    startTimer() {
      this.intervalID = setInterval(() => {
        this.current = Date.now()
      }, 500)
    },
    stopTimer() {
      clearInterval(this.intervalID)
      this.intervalID = 0
    },
  }))
})
