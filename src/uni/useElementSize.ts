import { useSelectorQuery } from '@uni-helper/uni-use'
import { computed, onMounted, ref } from 'vue'

export function useElementSize(elementSelector: string) {
  const { getBoundingClientRect } = useSelectorQuery()

  const rect = ref<UniApp.NodeInfo>({
    width: 0,
    height: 0,
  })

  onMounted(async () => {
    rect.value = await getBoundingClientRect(elementSelector)
  })

  const width = computed(() => rect.value.width || 0)
  const height = computed(() => rect.value.height || 0)

  return {
    width,
    height,
  }
}
