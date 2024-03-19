import { useSelectorQuery } from '@uni-helper/uni-use'
import { computed, nextTick, onMounted, ref } from 'vue'

interface Options {
  lazy?: boolean
}

export function useElementBounding(elementSelector: string, options: Options = { lazy: true }) {
  const { getBoundingClientRect } = useSelectorQuery()

  const rect = ref<UniApp.NodeInfo>({
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

    rect.value = await getBoundingClientRect(elementSelector)
  }

  onMounted(refresh)

  const top = computed(() => rect.value.top || 0)
  const left = computed(() => rect.value.left || 0)
  const width = computed(() => rect.value.width || 0)
  const height = computed(() => rect.value.height || 0)
  const bottom = computed(() => rect.value.bottom || 0)
  const right = computed(() => rect.value.right || 0)
  const dataset = computed(() => rect.value.dataset || {})

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
