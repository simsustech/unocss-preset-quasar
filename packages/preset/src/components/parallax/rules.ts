import type { Rule } from '@unocss/core'

export const parallaxRules = [
  [
    /^q-parallax$/,
    function* (_, { symbols }) {
      yield {
        position: 'relative',
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__media`,
        position: 'absolute',
        inset: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        position: 'relative'
      }
      // The media's child, not a `__image` sibling: Quasar renders
      // `.q-parallax__media > img|video` and positions it itself — the
      // component's JS writes `translate3d(-50%, <y>px, 0)`, which only lands
      // inside the clipped box while the element is absolutely positioned.
      // Without this the image stays in flow, the transform throws it past
      // `overflow:hidden`, and the component renders blank in every style.
      // Reference: `.q-parallax__media > img, .q-parallax__media > video`.
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__media > img, ${selector}__media > video`,
        position: 'absolute',
        left: '50%',
        bottom: '0',
        'min-width': '100%',
        'min-height': '100%',
        'will-change': 'transform',
        // Flipped to `initial` by the component once the image is ready.
        display: 'none'
      }
    }
  ]
] as Rule[]
