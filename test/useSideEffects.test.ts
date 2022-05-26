import { describe, expect, it, vi } from 'vitest'
import { useSideEffects } from '../src/index'

describe('start test useSideEffects', () => {
  it('should be defined', () => {
    expect(useSideEffects).toBeDefined()
  })

  it('should works', () => {
    const sideEffects = useSideEffects()
    const fakeFn = vi.fn()
    sideEffects.push(fakeFn)
    expect(sideEffects.length).toBe(1)
    sideEffects.dispose()
    expect(sideEffects.length).toBe(0)
    expect(fakeFn).toHaveBeenCalled()
    const changeDispose = () => {
      sideEffects.dispose = () => {}
    }
    expect(changeDispose).toThrowErrorMatchingInlineSnapshot('"Cannot assign to read only property \'dispose\' of object \'[object Array]\'"')
  })
})
