import type { Fn } from '@bryce-loskie/utils'
import { getCurrentScope, onScopeDispose } from 'vue'

export function tryOnScopeDispose(fn: Fn): boolean {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }

  return false
}
