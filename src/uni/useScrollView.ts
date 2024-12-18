import { pMinDelay } from '@bryce-loskie/utils'
import { ref } from 'vue'

interface IOptions<T> {
  onRefresh?: () => Promise<T> | T
  enableToLower?: boolean
  onScrollToLower?: () => Promise<T> | T
}

export interface IScrollProps {
  enableBackToTop: boolean
  refresherEnabled: boolean
  refresherThreshold: number
  showScrollbar: boolean
  refresherBackground: string
  lowerThreshold?: number
}

/**
 * Usage
 *
 * @example
 * ```typescript
 * const { isRefreshingRef, refresherrefresh, scrollProps, scrolltolower } = useScrollView({
 *     enableToLower: true,
 *     onRefresh: async () => {
 *       // refresh logic
 *     },
 *     onScrollToLower() {
 *       // fetch more data
 *     },
 *   })
 *
 *   <scroll-view
 *     scroll-y
 *     v-bind="scrollProps"
 *     :refresher-triggered="isRefreshingRef"
 *     refresherrefresh="refresherrefresh" // 前面加 @ 会报错
 *     scrolltolower="scrolltolower"  // 前面加 @ 会报错
 *   >
 *     <!-- your content -->
 *   </scroll-view>
 * ```
 */
export function useScrollView<T = any>(options: IOptions<T>) {
  const isRefreshingRef = ref(false)
  const isFetchingRef = ref(false)

  const handleRefetch = () => {
    return Promise.resolve(options.onRefresh?.())
  }

  const handleScrollToLower = () => {
    return Promise.resolve(options.onScrollToLower?.())
  }

  const scrolltolower = async () => {
    isFetchingRef.value = true
    await pMinDelay(handleScrollToLower(), 500)
    isFetchingRef.value = false
  }

  const refresherrefresh = async () => {
    isRefreshingRef.value = true
    await pMinDelay(handleRefetch(), 500)
    isRefreshingRef.value = false
  }

  const scrollProps: IScrollProps = {
    enableBackToTop: true,
    refresherEnabled: true,
    refresherThreshold: 100,
    showScrollbar: true,
    refresherBackground: 'transparent',
  }

  if (options.enableToLower) {
    scrollProps.lowerThreshold = 100
  }
  else {
    delete scrollProps.lowerThreshold
  }

  return {
    isRefreshingRef,
    isFetchingRef,

    scrollProps,

    refresherrefresh,
    scrolltolower,
  }
}
