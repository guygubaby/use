import type { Fn } from '@bryce-loskie/utils'
import { tryOnScopeDispose } from '@vueuse/core'

/**
 * Hooks for cleaning up after a component unmount or scope dispose.
 * @returns [cleanup, munuallyCleanup]
 */
export const useCleanup = () => {
  const cleanups: Fn[] = []

  const dispose = () => {
    cleanups.forEach(fn => fn())
    cleanups.length = 0
  }

  tryOnScopeDispose(dispose)

  return [cleanups, dispose] as const
}
