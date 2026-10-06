import { describe, it, expect } from 'vitest'
import { colorRules } from '../src/core/colors/rules.js'

// pi-lens-ignore: rule-id
function matchRule(selector: string): Record<string, string> | undefined {
  for (const entry of colorRules) {
    const regex = entry[0]
    const matcher = entry[1]
    if (
      regex instanceof RegExp &&
      regex.test(selector) &&
      typeof matcher === 'function'
    ) {
      const result = matcher([selector], {
        symbols: { selector: (s: string) => s }
      } as any) as any
      if (result && typeof result.next === 'function') {
        const yielded = [...result]
        if (yielded.length > 0) return yielded[0] as Record<string, string>
      }
      return result as Record<string, string>
    }
  }
  return undefined
}

describe('colorRules', () => {
  it('text-primary sets color to --q-primary', () => {
    const css = matchRule('text-primary')
    expect(css).toBeDefined()
    expect(css!.color).toBe('var(--q-primary)')
  })

  it('bg-primary sets background-color to --q-primary', () => {
    const css = matchRule('bg-primary')
    expect(css).toBeDefined()
    expect(css!['background-color']).toBe('var(--q-primary)')
  })

  it('text-secondary sets color to --q-secondary', () => {
    const css = matchRule('text-secondary')
    expect(css).toBeDefined()
    expect(css!.color).toBe('var(--q-secondary)')
  })

  it('text-accent sets color to --q-accent', () => {
    const css = matchRule('text-accent')
    expect(css).toBeDefined()
    expect(css!.color).toBe('var(--q-accent)')
  })

  it('bg-surface sets background-color to --q-surface', () => {
    const css = matchRule('bg-surface')
    expect(css).toBeDefined()
    expect(css!['background-color']).toBe('var(--q-surface)')
  })

  it('text-on-primary sets color to --q-on-primary', () => {
    const css = matchRule('text-on-primary')
    expect(css).toBeDefined()
    expect(css!.color).toBe('var(--q-on-primary)')
  })

  it('bg-error sets background-color to --q-error', () => {
    const css = matchRule('bg-error')
    expect(css).toBeDefined()
    expect(css!['background-color']).toBe('var(--q-error)')
  })

  it('text-outline-variant sets color to --q-outline-variant', () => {
    const css = matchRule('text-outline-variant')
    expect(css).toBeDefined()
    expect(css!.color).toBe('var(--q-outline-variant)')
  })

  it('returns undefined for unknown selectors', () => {
    expect(matchRule('not-a-real-class')).toBeUndefined()
  })

  it('pairs a dark `bg-primary` with on-primary for a white label', () => {
    // Quasar's `color="primary"` prop paints `bg-primary text-white`; in dark
    // mode the primary is a light tint, so white measured 1.71:1 on the fill
    // (audit 2026-10-06: the 404 CTA and the pagination button).
    const yields: Record<string, unknown>[] = []
    for (const entry of colorRules) {
      if (!(entry[0] instanceof RegExp) || !entry[0].test('bg-primary'))
        continue
      const result = (entry[1] as any)(['bg-primary'], {
        symbols: { selector: (s: string) => s }
      })
      if (result && typeof result.next === 'function') yields.push(...result)
    }
    // The symbol-keyed yield carries the selector as its key, not a `selector`
    // property — read it off the values.
    const pairing = yields.find((y) => y.color === 'var(--q-on-primary)')
    expect(pairing, 'an on-primary pairing yield exists').toBeDefined()
    const selectorFor = Object.values(pairing!).find(
      (value) => typeof value === 'function'
    ) as (s: string) => string
    expect(selectorFor('.bg-primary')).toBe(
      '.body--dark .bg-primary.text-white'
    )
  })
})
