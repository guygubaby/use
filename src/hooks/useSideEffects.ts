import type { Fn } from '@bryce-loskie/utils'
import { runAll } from '@bryce-loskie/utils'
import { tryOnScopeDispose } from '../misc'

export interface DisposableArray extends Array<Fn> {
  /**
   * Dispose all side effects
   */
  dispose: () => void
}

export interface UseSideEffectsOptions {
  /**
   * If true, will automatically dispose when scope is destroyed
   */
  autoDispose?: boolean
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
export function useSideEffects(options: UseSideEffectsOptions = {}) {
  const effects: Fn[] = []

  const { autoDispose = true } = options

  const dispose = () => {
    runAll(effects)
    effects.length = 0
  }

  tryOnScopeDispose(() => {
    autoDispose && dispose()
  })

  Object.defineProperty(effects, 'dispose', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: dispose,
  })

  return effects as DisposableArray
}
