import type { Fn } from '@bryce-loskie/utils'
import type { WatchOptions, WatchSource } from 'vue'
import { runAll, sleep } from '@bryce-loskie/utils'
import { watch } from 'vue'
import { tryOnScopeDispose } from '../misc'

class Emitter {
  bus: { onTrue: Fn[], onFalse: Fn[] }

  constructor() {
    this.bus = {
      onTrue: [],
      onFalse: [],
    }
  }

  onTrue(fn: Fn) {
    this.bus.onTrue.push(fn)
  }

  onFalse(fn: Fn) {
    this.bus.onFalse.push(fn)
  }

  emit(type: 'onTrue' | 'onFalse') {
    const fns = this.bus[type]
    runAll(fns)
  }

  dispose() {
    this.bus = {
      onTrue: [],
      onFalse: [],
    }
  }
}

export type UseWatchEffectOptions = WatchOptions<boolean> & {
  /**
   * Delay before call the reset (eg: onFalse / onClose) function
   *
   * Used to prevent flickering
   */
  resetDelay?: number
}

/**
 * ```ts
    const isShow = ref(false)

    const { onTrue, onFalse } = useWatchHook(isShow)

    onTrue(() => {
      console.log('onTrue')
    })
    ```
 */
export function useWatchEffect(source: WatchSource<boolean>, options?: UseWatchEffectOptions) {
  const emitter = new Emitter()

  const unWatch = watch(source, async (value) => {
    if (value) {
      emitter.emit('onTrue')
    }
    else {
      const resetDelay = options?.resetDelay || 0
      await sleep(resetDelay)
      emitter.emit('onFalse')
    }
  }, options)

  tryOnScopeDispose(() => {
    unWatch()
    emitter.dispose()
  })

  return {
    onTrue: (fn: Fn) => emitter.onTrue(fn),
    onFalse: (fn: Fn) => emitter.onFalse(fn),
  }
}
