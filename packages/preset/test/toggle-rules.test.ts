import { describe, it, expect } from 'vitest'
import { symbols } from '@unocss/core'
import { toggleRules } from '../src/components/toggle/rules.js'

/**
 * Helper: collect all yielded declaration objects from a generator-based rule
 * matched by the given class name.
 */
function collectYielded(rules: any[], className: string): any[] {
  for (const entry of rules) {
    const regex = entry[0]
    const matcher = entry[1]
    if (
      regex instanceof RegExp &&
      regex.test(className) &&
      typeof matcher === 'function'
    ) {
      const gen = matcher([className], { symbols }) as Generator
      return [...gen]
    }
  }
  return []
}

describe('toggleRules', () => {
  it('registers a rule for q-toggle__thumb', () => {
    const matched = toggleRules.some(
      (entry) => entry[0] instanceof RegExp && entry[0].test('q-toggle__thumb')
    )
    expect(matched).toBe(true)
  })

  it('yields a [symbols.selector] entry that transforms to .q-toggle__thumb:after', () => {
    const yielded = collectYielded(toggleRules, 'q-toggle__thumb')
    expect(yielded.length).toBeGreaterThan(0)

    const afterEntry = yielded.find(
      (obj) => obj && typeof obj[symbols.selector] === 'function'
    )
    expect(afterEntry).toBeDefined()

    const transformed = afterEntry[symbols.selector]('.q-toggle__thumb')
    expect(transformed).toBe('.q-toggle__thumb:after')
  })

  it('produces the thumb circle declarations on the :after selector', () => {
    const yielded = collectYielded(toggleRules, 'q-toggle__thumb')
    const afterEntry = yielded.find(
      (obj) => obj && typeof obj[symbols.selector] === 'function'
    )
    expect(afterEntry).toBeDefined()
    expect(afterEntry.content).toBe('""')
    expect(afterEntry.position).toBe('absolute')
    expect(afterEntry.background).toBe('#fff')
    expect(afterEntry['box-shadow']).toContain('rgba')
  })

  it('reproduces full compound selector for truthy :after override', () => {
    // .q-toggle__inner--truthy .q-toggle__thumb:after — regex on owning class,
    // symbols.selector reproduces the full descendant selector
    const yielded = collectYielded(toggleRules, 'q-toggle__inner--truthy')
    const compoundEntry = yielded.find(
      (obj) =>
        obj &&
        typeof obj[symbols.selector] === 'function' &&
        obj[symbols.selector]('.q-toggle__inner--truthy').includes(
          '.q-toggle__thumb:after'
        )
    )
    expect(compoundEntry).toBeDefined()
    expect(compoundEntry['background-color']).toBe('currentColor')
  })

  it('reproduces full selector with pseudo-class for focus ring', () => {
    // .q-toggle:not(.disabled) .q-toggle__thumb:before — regex on q-toggle,
    // symbols.selector reproduces the full selector including :not(.disabled)
    const yielded = collectYielded(toggleRules, 'q-toggle')
    const focusEntry = yielded.find(
      (obj) =>
        obj &&
        typeof obj[symbols.selector] === 'function' &&
        obj[symbols.selector]('.q-toggle').includes(':not(.disabled)') &&
        obj[symbols.selector]('.q-toggle').includes('.q-toggle__thumb:before')
    )
    expect(focusEntry).toBeDefined()
  })
})
