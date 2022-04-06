import type { Fn } from '@bryce-loskie/utils'
import { tryOnScopeDispose } from '@vueuse/core'

/**
 * This hook will automatically clean up
 * any side effects pushed to the cleanup stack.
 * Or you can just clean up manually.
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
