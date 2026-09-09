import { describe, it, expect } from 'vitest'
import { elevationRuleList } from '../src/core/elevation/rules.js'

function matchRule(
  selector: string
): Record<string, string | number> | undefined {
  for (const entry of elevationRuleList) {
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

describe('elevationRuleList', () => {
  it('shadow-none sets box-shadow none', () => {
    const css = matchRule('shadow-none')
    expect(css).toBeDefined()
    expect(css!.boxShadow).toBe('none')
  })

  it('no-shadow also sets box-shadow none', () => {
    const css = matchRule('no-shadow')
    expect(css).toBeDefined()
    expect(css!.boxShadow).toBe('none')
  })

  it('elevation-1 uses --q-elevation-level1 token', () => {
    const css = matchRule('elevation-1')
    expect(css).toBeDefined()
    expect(css!.boxShadow).toBe('var(--q-elevation-level1)')
  })

  it('q-elevation-3 also uses token (q- prefix optional)', () => {
    const css = matchRule('q-elevation-3')
    expect(css).toBeDefined()
    expect(css!.boxShadow).toBe('var(--q-elevation-level3)')
  })

  it('elevation-5 uses level5 token', () => {
    const css = matchRule('elevation-5')
    expect(css).toBeDefined()
    expect(css!.boxShadow).toBe('var(--q-elevation-level5)')
  })

  it('z-marginals sets z-index 2000', () => {
    const css = matchRule('z-marginals')
    expect(css).toBeDefined()
    expect(css!.zIndex).toBe(2000)
  })

  it('z-notify sets z-index 9500', () => {
    const css = matchRule('z-notify')
    expect(css).toBeDefined()
    expect(css!.zIndex).toBe(9500)
  })

  it('z-fullscreen sets z-index 6000', () => {
    const css = matchRule('z-fullscreen')
    expect(css).toBeDefined()
    expect(css!.zIndex).toBe(6000)
  })

  it('z-inherit sets z-index inherit', () => {
    const css = matchRule('z-inherit')
    expect(css).toBeDefined()
    expect(css!.zIndex).toBe('inherit')
  })

  it('returns undefined for unknown selectors', () => {
    expect(matchRule('not-a-real-class')).toBeUndefined()
  })
})
