import { describe, it, expect } from 'vitest'
import { visibilityRules } from '../src/core/visibility/rules.js'

function matchRule(
  selector: string
): Record<string, string | number> | undefined {
  for (const entry of visibilityRules) {
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

describe('visibilityRules', () => {
  it('no-margin sets margin to 0', () => {
    const css = matchRule('no-margin')
    expect(css).toBeDefined()
    expect(css!.margin).toBe(0)
  })

  it('no-padding sets padding to 0', () => {
    const css = matchRule('no-padding')
    expect(css).toBeDefined()
    expect(css!.padding).toBe(0)
  })

  it('ellipsis sets text-overflow and overflow', () => {
    const css = matchRule('ellipsis')
    expect(css).toBeDefined()
    expect(css!['text-overflow']).toBe('ellipsis')
    expect(css!['white-space']).toBe('nowrap')
    expect(css!.overflow).toBe('hidden')
  })

  it('disabled sets cursor not-allowed and opacity', () => {
    const css = matchRule('disabled')
    expect(css).toBeDefined()
    expect(css!.cursor).toBe('not-allowed')
    expect(css!.opacity).toBe(0.6)
  })

  it('transparent sets background-color transparent', () => {
    const css = matchRule('transparent')
    expect(css).toBeDefined()
    expect(css!['background-color']).toBe('transparent')
  })

  it('invisible sets visibility hidden', () => {
    const css = matchRule('invisible')
    expect(css).toBeDefined()
    expect(css!.visibility).toBe('hidden')
    expect(css!.transition).toBe('none')
    expect(css!.animation).toBe('none')
  })

  it('z-top sets z-index 7000', () => {
    const css = matchRule('z-top')
    expect(css).toBeDefined()
    expect(css!['z-index']).toBe(7000)
  })

  it('z-max sets z-index 9998', () => {
    const css = matchRule('z-max')
    expect(css).toBeDefined()
    expect(css!['z-index']).toBe(9998)
  })

  it('returns undefined for unknown selectors', () => {
    expect(matchRule('not-a-real-class')).toBeUndefined()
  })
})
