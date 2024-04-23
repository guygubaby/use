import { useSelectorQuery } from '@uni-helper/uni-use'
import { computed, nextTick, onMounted, ref } from 'vue'

interface Options {
  lazy?: boolean
}

export function useElementSize(elementSelector: string, options: Options = { lazy: true }) {
  const { getBoundingClientRect } = useSelectorQuery()

  const rect = ref<UniApp.NodeInfo | undefined>({
    width: 0,
    height: 0,
  })

  const refresh = async () => {
    if (options.lazy)
      await nextTick()

    try {
      rect.value = await getBoundingClientRect(elementSelector)
    }
    catch (error) {
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
