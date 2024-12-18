import type { WatchOptions, WatchSource } from 'vue'
import { until, whenever } from '@vueuse/core'
import { onBeforeUnmount, ref } from 'vue'

export function useLazyRender<T>(renderWhen: WatchSource<T | false | null | undefined>, options?: WatchOptions<boolean> | undefined) {
  const shouldRender = ref(false)

  const stop = whenever<T>(renderWhen, (value) => {
    shouldRender.value = !!value
  }, { immediate: true, ...options })

  const init = async () => {
    await until(shouldRender).toBeTruthy()
    stop()
  }

  init()

  onBeforeUnmount(() => {
    stop()
  })

  return shouldRender
}
