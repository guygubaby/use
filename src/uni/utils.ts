function loadScript(src: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

interface ILoadSdkOptions {
  wxSdk?: boolean
  wxSdkVersion?: string
  uniAppSdk?: boolean
  uniAppSdkVersion?: string
}

/**
 * 加载 uni-app 的 webview 所需要的 sdk
 *
 * 加载完成之后可以使用一些 uni-app 的 webview 的 api
 *
 * eg: `uni.webView.redirectTo` 等方法
 */
export async function loadWebViewSdk(options?: ILoadSdkOptions) {
  const {
    wxSdk = false,
    wxSdkVersion = '1.3.2',
    uniAppSdk = false,
    uniAppSdkVersion = '1.5.2',
  } = options || {}

  const scriptList: string[] = []

  if (wxSdk) {
    scriptList.push(`https://res.wx.qq.com/open/js/jweixin-${wxSdkVersion}.js`)
  }

  if (uniAppSdk) {
    scriptList.push(`https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.${uniAppSdkVersion}.js`)
  }

  for (const script of scriptList) {
    await loadScript(script)
  }
}
