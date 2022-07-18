import type { Ref, WatchOptions } from 'vue'
import { useWatchEffect } from './useWatchEffect'

export const useModalEvents = (visible: Ref<boolean>, options?: WatchOptions<boolean> | undefined) => {
  const { onTrue: onOpen, onFalse: onClose } = useWatchEffect(visible, options)

  return {
    onOpen,
    onClose,
  }
}
