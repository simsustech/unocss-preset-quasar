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
})
