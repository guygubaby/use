import { sleep } from '@bryce-loskie/utils'
import { ref, shallowRef } from 'vue'
import { useModalEvents } from './useModalEvents'

export interface Options {
  resetCurrentItemDelay?: number
}

export function useOperateModal<T = any>(options?: Options) {
  const delayToResetCurrentItem = options?.resetCurrentItemDelay ?? 300

  const isShowOperateModal = ref(false)
  const currentItem = shallowRef<T>()

  const { onClose } = useModalEvents(isShowOperateModal)

  onClose(async () => {
    if (delayToResetCurrentItem)
      await sleep(delayToResetCurrentItem)

    currentItem.value = undefined
  })

  const handleCreate = () => {
    currentItem.value = undefined
    isShowOperateModal.value = true
  }

  const handleEdit = (item: T) => {
    currentItem.value = item
    isShowOperateModal.value = true
  }

  return {
    isShowOperateModal,
    currentItem,
    handleCreate,
    handleEdit,
  }
}
