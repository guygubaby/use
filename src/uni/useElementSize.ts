import { computed, getCurrentInstance, nextTick, onMounted, ref } from 'vue'

interface Options {
  lazy?: boolean
}

export function useElementSize(elementSelector: string, options: Options = { lazy: true }) {
  const instance = getCurrentInstance()

  type RectInfo = UniApp.NodeInfo | undefined

  const rect = ref<RectInfo>({
    width: 0,
    height: 0,
  })

  const queryFn = async (selector: string) => {
    const selectorQuery = uni.createSelectorQuery().in(instance)
    return new Promise<RectInfo>((resolve) => {
      selectorQuery
        .select(selector)
        .boundingClientRect((data) => {
          resolve((data || undefined) as RectInfo)
        })
        .exec()
    })
  }

  const refresh = async () => {
    if (options.lazy)
      await nextTick()

    try {
      rect.value = await queryFn(elementSelector)
    }
    catch (error) {
      console.warn('failed to query bounding client rect', error)
    }
  }

  onMounted(refresh)

  const width = computed(() => rect.value?.width || 0)
  const height = computed(() => rect.value?.height || 0)

  return {
    width,
    height,
    refresh,
  }
}
