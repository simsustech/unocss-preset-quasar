import { describe, it, expect } from 'vitest'
import { positionRules } from '../src/core/position/rules.js'

function matchRule(
  selector: string
): Record<string, string | number> | undefined {
  for (const entry of positionRules) {
    const regex = entry[0]
    const matcher = entry[1]
    if (
      regex instanceof RegExp &&
      regex.test(selector) &&
      typeof matcher === 'function'
    ) {
      return (matcher as () => Record<string, string | number>)()
    }
  }
  return undefined
}

describe('positionRules', () => {
  it('fixed-full uses inset: 0', () => {
    const css = matchRule('fixed-full')
    expect(css).toBeDefined()
    expect(css!.position).toBe('fixed')
    expect(css!.inset).toBe(0)
  })

  it('fixed-center centers with transform', () => {
    const css = matchRule('fixed-center')
    expect(css).toBeDefined()
    expect(css!.position).toBe('fixed')
    expect(css!.top).toBe('50%')
    expect(css!.left).toBe('50%')
    expect(css!.transform).toBe('translate(-50%, -50%)')
  })

  it('fixed-top sets top/left/right to 0', () => {
    const css = matchRule('fixed-top')
    expect(css).toBeDefined()
    expect(css!.position).toBe('fixed')
    expect(css!.top).toBe(0)
    expect(css!.left).toBe(0)
    expect(css!.right).toBe(0)
  })

  it('absolute-full uses inset: 0', () => {
    const css = matchRule('absolute-full')
    expect(css).toBeDefined()
    expect(css!.position).toBe('absolute')
    expect(css!.inset).toBe(0)
  })

  it('fullscreen has z-index 6000 and inset 0', () => {
    const css = matchRule('fullscreen')
    expect(css).toBeDefined()
    expect(css!.position).toBe('fixed')
    expect(css!.inset).toBe(0)
    expect(css!['z-index']).toBe(6000)
    expect(css!['border-radius']).toBe(0)
  })

  it('relative-position sets position relative', () => {
    const css = matchRule('relative-position')
    expect(css).toBeDefined()
    expect(css!.position).toBe('relative')
  })

  it('on-left uses margin-inline-end (logical)', () => {
    const css = matchRule('on-left')
    expect(css).toBeDefined()
    expect(css!['margin-inline-end']).toBe('12px')
  })

  it('on-right uses margin-inline-start (logical)', () => {
    const css = matchRule('on-right')
    expect(css).toBeDefined()
    expect(css!['margin-inline-start']).toBe('12px')
  })

  it('vertical-middle sets vertical-align middle', () => {
    const css = matchRule('vertical-middle')
    expect(css).toBeDefined()
    expect(css!['vertical-align']).toBe('middle')
  })

  it('q-position-engine uses custom properties', () => {
    const css = matchRule('q-position-engine')
    expect(css).toBeDefined()
    expect(css!['margin-top']).toBe('var(--q-pe-top, 0px)')
    expect(css!['will-change']).toBe('auto')
  })

  it('q-position-engine hides the popup until the JS engine places it', () => {
    const css = matchRule('q-position-engine')
    expect(css).toBeDefined()
    // Reference parity — quasar.css's own `.q-position-engine` block. The class
    // only exists on the JS engine (the one every engine without CSS anchor
    // positioning gets), and that engine reveals the popup by writing
    // `visibility: visible` *inline* together with its insets, then retrying on
    // a 10ms timer while the popup still measures 0x0. Until that write this is
    // the only declaration keeping the popup off screen, and an unplaced popup
    // paints at its static position — inside a dialog, the middle of the
    // screen. The value must stay un-`important`ed for the inline reveal to
    // win; `emission.test.ts` pins the emitted form.
    expect(css!.visibility).toBe('hidden')
  })

  it('returns undefined for unknown selectors', () => {
    expect(matchRule('not-a-real-class')).toBeUndefined()
  })
})
