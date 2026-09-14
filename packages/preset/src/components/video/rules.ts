import type { Rule } from '@unocss/core'

export const videoRules = [
  [
    /^q-video$/,
    () => ({
      position: 'relative',
      overflow: 'hidden'
    })
  ],
  [
    /^q-video--ratio$/,
    () => ({
      // Ratio
    })
  ],
  [
    /^q-video--responsive$/,
    function* (_, { symbols }) {
      yield { height: '0' }
      yield {
        [symbols.selector]: (sel) => `${sel} iframe`,
        position: 'absolute',
        top: '0',
        left: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} object`,
        position: 'absolute',
        top: '0',
        left: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} embed`,
        position: 'absolute',
        top: '0',
        left: '0'
      }
    }
  ]
] as Rule[]
