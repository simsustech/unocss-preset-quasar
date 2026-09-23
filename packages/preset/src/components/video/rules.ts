import type { Rule } from '@unocss/core'

export const videoRules = [
  [
    /^q-video$/,
    function* (_, { symbols }) {
      // .q-video
      yield {
        // Reference `.q-video { border-radius: inherit; position: relative;
        // overflow: hidden }` — the video inherits the corner of whatever hosts
        // it (a card, a ratio box) instead of forcing its own.
        'border-radius': 'inherit',
        position: 'relative',
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} iframe`,
        width: '100%',
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} object`,
        width: '100%',
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} embed`,
        width: '100%',
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--ratio`
        // Ratio
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--responsive`,
        height: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--responsive iframe`,
        position: 'absolute',
        top: '0',
        left: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--responsive object`,
        position: 'absolute',
        top: '0',
        left: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--responsive embed`,
        position: 'absolute',
        top: '0',
        left: '0'
      }
    }
  ]
] as Rule[]
