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
