import { describe, it, expect } from 'vitest'
import { darkRules } from '../src/rules/dark.js'

function matchRule(selector: string): Record<string, string> | undefined {
  for (const entry of darkRules) {
    const regex = entry[0]
    const matcher = entry[1]
    if (
      regex instanceof RegExp &&
      regex.test(selector) &&
      typeof matcher === 'function'
    ) {
      // Rule matcher ignores context for these static rules
      return (matcher as unknown as () => Record<string, string>)()
    }
  }
  return undefined
}

describe('darkRules', () => {
  it('q-dark sets color to --q-dark-on-surface', () => {
    const css = matchRule('q-dark')
    expect(css).toBeDefined()
    expect(css!.color).toBe('var(--q-dark-on-surface)')
  })

  it('q-dark sets background-color to --q-dark-surface', () => {
    const css = matchRule('q-dark')
    expect(css).toBeDefined()
    expect(css!.backgroundColor).toBe('var(--q-dark-surface)')
  })

  it('returns undefined for unknown selectors', () => {
    expect(matchRule('not-a-real-class')).toBeUndefined()
  })
})
