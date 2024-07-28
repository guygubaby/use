import { computed, getCurrentInstance, nextTick, onMounted, ref } from 'vue'

interface Options {
  lazy?: boolean
}

export function useElementBounding(elementSelector: string, options: Options = { lazy: true }) {
  const instance = getCurrentInstance()

  type RectInfo = UniApp.NodeInfo | undefined

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

  const rect = ref<UniApp.NodeInfo | undefined>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    bottom: 0,
    right: 0,
    dataset: {},
  })

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

  const top = computed(() => rect.value?.top || 0)
  const left = computed(() => rect.value?.left || 0)
  const width = computed(() => rect.value?.width || 0)
  const height = computed(() => rect.value?.height || 0)
  const bottom = computed(() => rect.value?.bottom || 0)
  const right = computed(() => rect.value?.right || 0)
  const dataset = computed(() => rect.value?.dataset || {})

  return {
    top,
    left,
    width,
    height,
    bottom,
    right,
    dataset,

    refresh,
  }
}
