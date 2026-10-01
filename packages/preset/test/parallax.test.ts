import { describe, it, expect } from 'vitest'
import { symbols } from '@unocss/core'
import { parallaxRules } from '../src/components/parallax/rules.js'

/**
 * `.q-parallax` renders blank whenever the media child keeps its default
 * `position: static`: the component writes
 * `translate3d(-50%, <y>px, 0)` on the image, which only lands inside the
 * `overflow:hidden` box while the element is absolutely positioned against it.
 *
 * The rule used to target `q-parallax__image`, a class Quasar never renders
 * (the markup is `.q-parallax__media > img|video`), and carried no
 * declarations besides the comment, so nothing was emitted at all.
 */

/** A yielded value: declarations plus optional control keys such as selector. */
type Yielded = Record<string, unknown>

/** The one `/^q-parallax$/` entry, narrowed past the `Rule` union. */
const parallaxEntry = parallaxRules[0] as unknown as [
  RegExp,
  (
    match: RegExpMatchArray,
    context: { symbols: typeof symbols }
  ) => IterableIterator<Yielded>
]

const yields = [
  ...parallaxEntry[1](['q-parallax'] as unknown as RegExpMatchArray, {
    symbols
  })
]

const resolved: { selector: string; decls: Yielded }[] = yields.map(
  (yielded) => {
    const selector = yielded[symbols.selector]
    return {
      selector:
        typeof selector === 'function'
          ? (selector as (s: string) => string)('.q-parallax')
          : '.q-parallax',
      decls: yielded
    }
  }
)

describe('q-parallax media child', () => {
  it("styles Quasar's `.q-parallax__media > img|video`", () => {
    const media = resolved.find((r) => r.selector.includes('__media > img'))
    expect(media).toBeDefined()
    expect(media?.selector).toBe(
      '.q-parallax__media > img, .q-parallax__media > video'
    )
    // The declarations the reference states for that pair, plus the
    // `display:none` the component flips to `initial` once the image is ready.
    expect(media?.decls).toMatchObject({
      position: 'absolute',
      left: '50%',
      bottom: '0',
      'min-width': '100%',
      'min-height': '100%',
      'will-change': 'transform',
      display: 'none'
    })
  })

  it('never targets a sibling class Quasar does not render', () => {
    expect(resolved.map((r) => r.selector)).not.toContain('.q-parallax__image')
  })
})
