import type { Rule } from '@unocss/core'

export const videoRules = [
  [
    /^q-video$/,
    function* (_, { symbols }) {
      yield {
        // Reference `.q-video { border-radius: inherit; position: relative;
        // overflow: hidden }` — the video inherits the corner of whatever hosts
        // it (a card, a ratio box) instead of forcing its own.
        'border-radius': 'inherit',
        position: 'relative',
        overflow: 'hidden'
      }
      // Reference `.q-video embed`, `.q-video iframe`, `.q-video object`: the
      // embedded document fills the box.
      for (const tag of ['iframe', 'object', 'embed']) {
        yield {
          [symbols.selector]: (sel) => `${sel} ${tag}`,
          width: '100%',
          height: '100%'
        }
      }
      // Reference `body.quasar-style-unstyled .q-video`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
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
