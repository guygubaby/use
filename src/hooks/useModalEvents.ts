import type { Ref } from 'vue'
import type { UseWatchEffectOptions } from './useWatchEffect'
import { useWatchEffect } from './useWatchEffect'

export function useModalEvents(visible: Ref<boolean>, options?: UseWatchEffectOptions) {
  const { onTrue: onOpen, onFalse: onClose } = useWatchEffect(visible, options)

  return {
    onOpen,
    onClose,
  }
}
