import type { Ref } from 'vue'
import { ref, unref, watch } from 'vue'

type MaybeRef<T> = Ref<T> | T

export type FlushFn = (cb: () => void) => void

function nextFrame(cb: () => void) {
  setTimeout(cb, 1000 / 32)
}

/**
 * Defer load hook for performance optimization.
 * @param totalPriorityRef Total priority ref to use
 * @returns Should render function with the param of `priority`, when the priority is higher than tick, this function will return true
 */
export function useDefer(totalPriorityRef: MaybeRef<number>, flushFunc = nextFrame) {
  const tick = ref(0)

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
