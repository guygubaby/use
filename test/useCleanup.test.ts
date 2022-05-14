import { describe, expect, fn, it } from 'vitest'
import { useCleanup } from '../src/index'

describe('start test useCleanup', () => {
  it('should be defined', () => {
    expect(useCleanup).toBeDefined()
  })

  it('should works', () => {
    const [cleanups, dispose] = useCleanup()
    const fakeFn = fn()
    cleanups.push(fakeFn)
    expect(cleanups.length).toEqual(1)
    dispose()
    expect(cleanups.length).toEqual(0)
    expect(fakeFn).toHaveBeenCalled()
  })
})
