import type { Fn } from '@bryce-loskie/utils'
import { runAll } from '@bryce-loskie/utils'
import type { WatchOptions, WatchSource } from 'vue'
import { watch } from 'vue'
import { tryOnScopeDispose } from '../misc'

class Emitter {
  bus: { onTrue: Fn[]; onFalse: Fn[] }

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

/**
 * ```ts
    const isShow = ref(false)

    const { onTrue, onFalse } = useWatchHook(isShow)

    onTrue(() => {
      console.log('onTrue')
    })
    ```
 */
export function useWatchEffect(source: WatchSource<boolean>, options?: WatchOptions<boolean> | undefined) {
  const emitter = new Emitter()

  const unWatch = watch(source, (value) => {
    const key = value ? 'onTrue' : 'onFalse'
    emitter.emit(key)
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
