import { nextFrame, raf } from '@bryce-loskie/utils/dom'
import { ref, unref, watch } from 'vue'
import type { MaybeRef } from '../types'

export enum FpsEnum {
  Fps30 = 30,
  Fps60 = 60,
}

/**
 * Defer load hook for performance optimization.
 * @param totalPriorityRef Total priority ref to use
 * @param fps Your desired fps, default is 30, can be a value of `FpsEnum`
 * @returns Should render function with the param of `priority`, when the priority is higher than tick, this function will return true
 */
export const useDefer = (totalPriorityRef: MaybeRef<number>, fps: FpsEnum = FpsEnum.Fps30) => {
  const tick = ref(0)
  const flushFunc = fps === FpsEnum.Fps30 ? nextFrame : raf

  const startTick = () => {
    const total = unref(totalPriorityRef)
    if (tick.value >= total)
      return

    tick.value++
    flushFunc(startTick)
  }

  watch(
    () => unref(totalPriorityRef),
    (o, n, onCleanup) => {
      startTick()
      onCleanup(() => {
        tick.value = 0
      })
    },
    {
      immediate: true,
      flush: 'post',
    },
  )

  // render when priority is greater than tick
  const shouldRender = (priority: number) => tick.value >= priority

  return shouldRender
}
