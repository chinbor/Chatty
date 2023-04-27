export const emojiMap: Record<string, string> = {
  '[起飞]': 'airplane-takeoff',
  '[闹钟]': 'alarm',
  '[联系人]': 'account-box',
  '[学士]': 'account-school-outline',
  '[广告]': 'advertisements',
  '[警告]': 'alert-octagram',
  '[计算器]': 'alarm-panel',
  '[苹果]': 'apple',
  '[外星人]': 'alien',
  '[云朵]': 'apple-icloud',
  '[机器人]': 'robot-outline',
  '[手机]': 'cellphone-iphone',
  '[电脑]': 'desktop-mac',
  '[樱桃]': 'fruit-cherries',
  '[菠萝]': 'fruit-pineapple',
  '[葡萄]': 'fruit-grapes',
  '[郁金香]': 'flower-tulip-outline',
  '[西瓜]': 'fruit-watermelon',
  '[梨]': 'fruit-pear',
  '[棒球]': 'baseball',
  '[摩托车]': 'atv',
  '[篮球]': 'basketball',
  '[蝙蝠]': 'bat',
  '[浴缸]': 'bathtub-outline',
  '[光碟]': 'beam',
  '[蜂鸟]': 'bird',
  '[自行车]': 'bicycle',
  '[骨头]': 'bone',
  '[炸弹]': 'bomb',
  '[座椅]': 'bench-back',
  '[床]': 'bed-outline',
  '[蓝牙]': 'bluetooth',
  '[保龄球]': 'bowling',
  '[碗]': 'bowl-mix',
  '[弓箭]': 'bow-arrow',
  '[月亮]': 'brightness-2',
  '[公交车]': 'bus-side',
  '[喇叭]': 'bullhorn-outline',
  '[音乐]': 'music',
  '[火箭]': 'rocket-launch-outline',
  '[地球]': 'earth',
  '[女性]': 'face-woman',
  '[男性]': 'face-man',
}

export const emojiNames = [
  '[起飞]',
  '[闹钟]',
  '[联系人]',
  '[学士]',
  '[广告]',
  '[警告]',
  '[计算器]',
  '[苹果]',
  '[外星人]',
  '[云朵]',
  '[机器人]',
  '[手机]',
  '[电脑]',
  '[樱桃]',
  '[菠萝]',
  '[葡萄]',
  '[郁金香]',
  '[西瓜]',
  '[梨]',
  '[棒球]',
  '[摩托车]',
  '[篮球]',
  '[蝙蝠]',
  '[浴缸]',
  '[光碟]',
  '[蜂鸟]',
  '[自行车]',
  '[骨头]',
  '[炸弹]',
  '[座椅]',
  '[床]',
  '[蓝牙]',
  '[保龄球]',
  '[碗]',
  '[弓箭]',
  '[月亮]',
  '[公交车]',
  '[喇叭]',
  '[音乐]',
  '[火箭]',
  '[地球]',
  '[女性]',
  '[男性]',
]

export function decodeText(payload: Record<string, any>) {
  const renderDom = []
  let temp = payload.text
  let left = -1
  let right = -1
  while (temp !== '') {
    left = temp.indexOf('[')
    right = temp.indexOf(']')
    switch (left) {
      case 0:
        if (right === -1) {
          renderDom.push({
            type: 'text',
            text: temp,
          })
          temp = ''
        }
        else {
          const _emoji = temp.slice(0, right + 1)
          if (emojiMap[_emoji]) {
            renderDom.push({
              type: 'emoji',
              name: emojiMap[_emoji],
            })
            temp = temp.substring(right + 1)
          }
          else {
            renderDom.push({
              type: 'text',
              text: '[',
            })
            temp = temp.slice(1)
          }
        }
        break
      case -1:
        renderDom.push({
          type: 'text',
          text: temp,
        })
        temp = ''
        break
      default:
        renderDom.push({
          type: 'text',
          text: temp.slice(0, left),
        })
        temp = temp.substring(left)
        break
    }
  }
  return renderDom
}
