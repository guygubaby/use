export const isH5 = uni.getSystemInfoSync().uniPlatform === 'web'

export const isApp = uni.getSystemInfoSync().uniPlatform === 'app'

export const isWechatMiniProgram = uni.getSystemInfoSync().platform === 'mp-weixin'
