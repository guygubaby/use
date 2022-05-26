import { describe, expect, it, vi } from 'vitest'
import { useSideEffects } from '../src/index'

describe('start test useSideEffects', () => {
  it('should be defined', () => {
    expect(useSideEffects).toBeDefined()
  })

  it('should works', () => {
    const sideEffects = useSideEffects()
    const fakeFn = vi.fn()
    sideEffects.add(fakeFn)
    sideEffects.dispose()
    expect(fakeFn).toHaveBeenCalled()
  })
})
