import type { Fn } from '@bryce-loskie/utils'
import { noop, runOnce, sleep } from '@bryce-loskie/utils'
import type { Slot, WatchSource } from 'vue'
import { ref, watch } from 'vue'
import { tryOnScopeDispose } from '../misc'

export function useLazyRender(show: WatchSource<boolean | undefined>,
  delay = 0,
  fallback?: Slot | (() => JSX.Element)) {
  let unwatch: Fn = noop
  const inited = ref(false)

  const init = () => {
    unwatch()
    if (delay > 0) {
      sleep(delay).then(() => {
        inited.value = true
      })
    }
    else {
      inited.value = true
    }
  }

  const initOnce = runOnce(init)

  unwatch = watch(
    show,
    (val) => {
      if (!val)
        return
      initOnce()
    },
    {
      immediate: true,
    },
  )

  tryOnScopeDispose(unwatch)

  return (render: () => JSX.Element) => () => inited.value ? render() : fallback?.()
}
