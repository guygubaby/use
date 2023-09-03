import type { Fn } from '@bryce-loskie/utils'
import { runAll } from '@bryce-loskie/utils'
import { tryOnScopeDispose } from '../misc'

export interface UseCleanupOptions {
  /**
   * If true, will automatically dispose when scope is destroyed
   */
  autoDispose?: boolean
}

/**
 * This hook will automatically clean up
 * any side effects pushed to the cleanup stack.
 * Or you can just clean up manually.
 */
export function useCleanup(options: UseCleanupOptions = {}) {
  const cleanup: Fn[] = []
  const { autoDispose = true } = options

  const dispose = () => {
    runAll(cleanup)
    cleanup.length = 0
  }

  tryOnScopeDispose(() => {
    autoDispose && dispose()
  })

  return [cleanup, dispose] as const
}
