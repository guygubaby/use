import type { Component } from 'vue'
import { h, render } from 'vue'

/**
 * Mounts a component into the DOM manually.
 *
 * Usage:
 *
 * ```
 *  import Counter from '~/components/Counter.vue'
    import { mountComponent } from '@bryce-loskie/use'

    const mountCounter = () => {
      const el = mountComponent(Counter, {
        initial: 0,
      })
      document.body.appendChild(el)
    }
 *
 * ```
 */
export const mountComponent = <T extends { $props: any }>(component: Component<T>, props: T['$props']) => {
  const vnode = h(component, props)
  const container = document.createElement('div')
  render(vnode, container)
  return container.firstElementChild!
}
