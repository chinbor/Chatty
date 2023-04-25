function addZeroPrefix(number: number) {
  return number < 10 ? `0${number}` : number
}

export function titleNotify(count: number) {
  const hasNewMessage = count > 0
  if (hasNewMessage) {
    if (document.title.search(/\((.*?)\)/) >= 0)
      document.title = document.title.replace(/\((.*?)\)/, `(${count > 99 ? '99+' : count})`)

    else
      document.title = `(${count})${document.title}`
  }
  else {
    document.title = document.title.replace(/\((.*?)\)/, '')
  }
}

export function getTime(date: Date, withSecond = false) {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return withSecond ? `${addZeroPrefix(hour)}:${addZeroPrefix(minute)}:${addZeroPrefix(second)}` : `${hour}:${addZeroPrefix(minute)}`
}

export function getDate(date: Date, splitor = '-') {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}${splitor}${addZeroPrefix(month)}${splitor}${addZeroPrefix(day)}`
}

export function isToday(date: Date) {
  return date.toDateString() === new Date().toDateString()
}
