import { describe, it, expect } from 'vitest'
import { spacingRules } from '../src/core/spacing/rules.js'

function matchRule(
  selector: string
): Record<string, string | number> | undefined {
  for (const entry of spacingRules) {
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

describe('spacingRules', () => {
  // --- Padding ---
  it('q-pa-md sets padding from the wind4 spacing step for md', () => {
    const css = matchRule('q-pa-md')
    expect(css).toBeDefined()
    expect(css!.padding).toBe('calc(var(--spacing) * 4)')
  })

  it('q-pt-xs sets padding-top', () => {
    const css = matchRule('q-pt-xs')
    expect(css).toBeDefined()
    expect(css!['padding-top']).toBe('calc(var(--spacing) * 1)')
  })

  it('q-px-md sets padding-inline (logical)', () => {
    const css = matchRule('q-px-md')
    expect(css).toBeDefined()
    expect(css!['padding-inline']).toBe('calc(var(--spacing) * 4)')
  })

  it('q-py-sm sets padding-block (logical)', () => {
    const css = matchRule('q-py-sm')
    expect(css).toBeDefined()
    expect(css!['padding-block']).toBe('calc(var(--spacing) * 2)')
  })

  it('q-pa-none sets padding to zero', () => {
    const css = matchRule('q-pa-none')
    expect(css).toBeDefined()
    expect(css!.padding).toBe('calc(var(--spacing) * 0)')
  })

  // --- Margin ---
  it('q-ma-lg sets margin from the wind4 spacing step for lg', () => {
    const css = matchRule('q-ma-lg')
    expect(css).toBeDefined()
    expect(css!.margin).toBe('calc(var(--spacing) * 6)')
  })

  it('q-mb-sm sets margin-bottom', () => {
    const css = matchRule('q-mb-sm')
    expect(css).toBeDefined()
    expect(css!['margin-bottom']).toBe('calc(var(--spacing) * 2)')
  })

  it('q-mx-md sets margin-inline (logical)', () => {
    const css = matchRule('q-mx-md')
    expect(css).toBeDefined()
    expect(css!['margin-inline']).toBe('calc(var(--spacing) * 4)')
  })

  it('q-my-lg sets margin-block (logical)', () => {
    const css = matchRule('q-my-lg')
    expect(css).toBeDefined()
    expect(css!['margin-block']).toBe('calc(var(--spacing) * 6)')
  })

  // --- Auto margins ---
  it('q-ml-auto sets margin-left auto', () => {
    const css = matchRule('q-ml-auto')
    expect(css).toBeDefined()
    expect(css!['margin-left']).toBe('auto')
  })

  it('q-mx-auto sets margin-inline auto', () => {
    const css = matchRule('q-mx-auto')
    expect(css).toBeDefined()
    expect(css!['margin-inline']).toBe('auto')
  })

  it('q-my-auto sets margin-block auto', () => {
    const css = matchRule('q-my-auto')
    expect(css).toBeDefined()
    expect(css!['margin-block']).toBe('auto')
  })

  // --- Fit / Full / Window ---
  it('fit sets width and height to 100%', () => {
    const css = matchRule('fit')
    expect(css).toBeDefined()
    expect(css!.width).toBe('100%')
    expect(css!.height).toBe('100%')
  })

  it('full-width sets width 100% and margin-inline 0', () => {
    const css = matchRule('full-width')
    expect(css).toBeDefined()
    expect(css!.width).toBe('100%')
    expect(css!['margin-inline']).toBe(0)
  })

  it('window-height sets height 100vh and margin-block 0', () => {
    const css = matchRule('window-height')
    expect(css).toBeDefined()
    expect(css!.height).toBe('100vh')
    expect(css!['margin-block']).toBe(0)
  })

  it('returns undefined for unknown selectors', () => {
    expect(matchRule('not-a-real-class')).toBeUndefined()
  })
})
