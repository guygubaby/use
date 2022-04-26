import type { Fn } from '@bryce-loskie/utils'
import { runAll } from '@bryce-loskie/utils'
import { tryOnScopeDispose } from '@vueuse/core'

/**
 * This hook will automatically clean up
 * any side effects pushed to the cleanup stack.
 * Or you can just clean up manually.
 */
export const useCleanup = () => {
  const cleanup: Fn[] = []

  const dispose = () => {
    runAll(cleanup)
    cleanup.length = 0
  }

  tryOnScopeDispose(dispose)

  return [cleanup, dispose] as const
}
