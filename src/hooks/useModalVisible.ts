import { assert } from '@bryce-loskie/utils'
import type { ComponentInternalInstance } from 'vue'
import { computed, getCurrentInstance, useAttrs } from 'vue'

type ModalInstance = ComponentInternalInstance & {
  emitsOptions?: Record<string, null>
}

export function useModalVisible() {
  const instance = getCurrentInstance() as ModalInstance
  assert(!!instance, 'useModalVisible can only be called inside xxx-modal component setup function')

  instance.emitsOptions && (instance.emitsOptions['update:modelValue'] = null)

  const attrs = useAttrs()

  const modalVisible = computed<boolean>({
    get() {
      return !!attrs.modelValue
    },
    set(val) {
      instance.emit('update:modelValue', val)
    },
  })

  return modalVisible
}
