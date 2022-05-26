import type { Fn } from '@bryce-loskie/utils'
import { runAll } from '@bryce-loskie/utils'
import { tryOnScopeDispose } from '@vueuse/core'

export interface DisposableArray extends Array<Fn> {
  /**
   * Dispose all side effects
   */
  dispose: () => void
}

/**
 * This hook will automatically clean up
 * any sideEffects that are pushed into it
 * when the scope is destroyed.
 * Or you can manually clean up by calling `xxx.dispose`
 *
 * ```typescript
 *  const sideEffects = useSideEffects()
 *
    sideEffects.push(() => {
      console.log('foo')
    })

    sideEffects.dispose()
 * ```
 */
export const useSideEffects = () => {
  const effects: Fn[] = []

  const dispose = () => {
    runAll(effects)
    effects.length = 0
  }

  tryOnScopeDispose(dispose)

  Object.defineProperty(effects, 'dispose', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: dispose,
  })

  return effects as DisposableArray
}
