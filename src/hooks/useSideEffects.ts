import type { Fn } from '@bryce-loskie/utils'
import { runAll } from '@bryce-loskie/utils'
import { tryOnScopeDispose } from '@vueuse/core'

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

  /**
   * Add a side effect to the list of side effects
   * @param effect - The side effect to add
   */
  const push = (effect: Fn) => {
    effects.push(effect)
  }

  /**
   * Dispose all side effects
   */
  const dispose = () => {
    runAll(effects)
    effects.length = 0
  }

  tryOnScopeDispose(dispose)

  return {
    push,
    dispose,
  }
}
