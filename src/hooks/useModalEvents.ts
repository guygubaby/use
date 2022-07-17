import type { Ref, WatchOptions } from 'vue'
import { useWatchHook } from './useWatchHook'

export const useModalEvents = (visible: Ref<boolean>, options?: WatchOptions<boolean> | undefined) => {
  const { onTrue: onOpen, onFalse: onClose } = useWatchHook(visible, options)

  return {
    onOpen,
    onClose,
  }
}
