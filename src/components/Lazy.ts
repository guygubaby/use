import type { VNode } from 'vue'
import { Fragment, defineComponent, h, useSlots } from 'vue'
import { useLazyRender } from '../hooks'
import { createBEM } from '../utils'

const [name, bem] = createBEM('lazy')

const renderDefaultFallback = () => h('div', { class: bem('fallback') }, '')

type RenderFunc = () => VNode

/**
 * This component used to lazy render children with control.
 * Also it can render a fallback when judgement is not truthy.
 */
const Lazy = defineComponent({
  name,
  props: {
    renderWhen: {
      type: Boolean,
      required: true,
    },
    lazyRender: {
      type: Boolean,
      default: true,
    },
    delay: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    let renderFunc: unknown

    const slots = useSlots()

    /**
     * If renderWhen prop is true when initial, just render default slot
     * Otherwise, use fallback / loading as placeholder, and lazy render it
     */
    if (props.renderWhen) {
      renderFunc = () => h(Fragment, slots.default?.())
    }
    else {
      const fallback = slots.fallback || slots.loading || renderDefaultFallback
      const lazyRender = useLazyRender(
        () => props.renderWhen || !props.lazyRender,
        props.delay,
        fallback,
      )
      renderFunc = lazyRender(() => h(Fragment, slots.default?.()))
    }

    return () => (renderFunc as RenderFunc)()
  },
})

export default Lazy
