import { sleep } from '@bryce-loskie/utils'
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { useWatchEffect } from '../src'

describe('test useWatchEffect', () => {
  it('should works', async () => {
    const isShow = ref(false)

    const fn1 = vi.fn()
    const fn2 = vi.fn()

    const { onTrue, onFalse } = useWatchEffect(isShow)

    onTrue(fn1)

    onFalse(fn2)

    expect(fn1).toBeCalledTimes(0)

    await sleep(10)

    isShow.value = true

    await sleep(10)

    expect(fn1).toBeCalledTimes(1)

    expect(fn2).toBeCalledTimes(0)

    await sleep(10)

    isShow.value = false

    await sleep(10)

    expect(fn1).toBeCalledTimes(1)

    expect(fn2).toBeCalledTimes(1)
  })
})
