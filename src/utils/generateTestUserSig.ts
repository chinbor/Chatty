// const SECRETKEY = '6b2354cf28dff1e6a6dd8d7c9952bd994923782df98453d0c7cae748a0418c0f'
// const SDKAPPID = 1400508677
export function genTestUserSig(userID: string, appID: number, secretKey: string): string {
  /**
   * 签名过期时间，建议不要设置的过短
   * <p>
   * 时间单位：秒
   * 默认时间：7 x 24 x 60 x 60 = 604800 = 7 天
   */
  const EXPIRETIME = 604800

  // @ts-expect-error: let me go
  const generator = new window.LibGenerateTestUserSig(appID, secretKey, EXPIRETIME)
  const userSig = generator.genTestUserSig(userID)

  return userSig
}
