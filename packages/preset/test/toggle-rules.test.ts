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
      const gen = matcher([className], { symbols })
      // Generator rules yield; plain rules return a single declaration object.
      if (gen && typeof gen[Symbol.iterator] === 'function') return [...gen]
      return gen ? [gen] : []
    }
  }
  return []
}

/** Every declared value string in a rule's yielded objects. */
function allValues(rules: any[], className: string): string[] {
  return collectYielded(rules, className).flatMap((obj) =>
    Object.values(obj).filter((v): v is string => typeof v === 'string')
  )
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
    // Token-driven since the MD3 rewrite: the concrete colour (md3 outline /
    // on-primary, md2 #fff / currentColor) lives in the per-style token.
    expect(afterEntry.background).toBe('var(--q-toggle-thumb-bg)')
    // The reference hardcodes the md2 elevation stack on the handle and keeps
    // the per-style token unused, so the literal is what parity requires.
    expect(afterEntry['box-shadow']).toBe(
      '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)'
    )
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
    expect(compoundEntry['background-color']).toBe(
      'var(--q-toggle-thumb-bg-active)'
    )
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

/**
 * Regression guard for the reported bug: the MD3 toggle rendered as an MD2
 * toggle because the rules hardcoded Quasar's MD2 em geometry (inner 1.4em at
 * 40px, track 0.35em, handle 0.5em) instead of reading the style tokens.
 *
 * Spec (specs/reference/normalized/md3-switches.json): chassis 52x32, handle
 * 16px at rest / 24px active, 2px outline, handle outline -> on-primary.
 */
describe('toggleRules MD3 token wiring', () => {
  it('drives the chassis box from tokens, not md2 em literals', () => {
    const inner = collectYielded(toggleRules, 'q-toggle__inner')[0]
    expect(inner['font-size']).toBe('var(--q-toggle-font-size)')
    expect(inner.width).toBe('var(--q-toggle-inner-width)')
    expect(inner['min-width']).toBe('var(--q-toggle-inner-width)')
    expect(inner.padding).toBe('var(--q-toggle-inner-padding)')
  })

  it('drives the track geometry and outline from tokens', () => {
    const track = collectYielded(toggleRules, 'q-toggle__track')[0]
    expect(track.height).toBe('var(--q-toggle-track-height)')
    expect(track['border-radius']).toBe('var(--q-toggle-track-border-radius)')
    expect(track.background).toBe('var(--q-toggle-track-bg)')
    expect(track.border).toBe('var(--q-toggle-track-outline)')
    // The md3 2px ring must sit inside the 32px chassis.
    expect(track['box-sizing']).toBe('border-box')
  })

  it('drives the 16px resting handle off tokens and centres it by calc', () => {
    const thumb = collectYielded(toggleRules, 'q-toggle__thumb')[0]
    expect(thumb.width).toBe('var(--q-toggle-thumb-size)')
    expect(thumb.height).toBe('var(--q-toggle-thumb-size)')
    expect(thumb.left).toBe('var(--q-toggle-thumb-offset)')
    expect(thumb.top).toBe('calc(50% - var(--q-toggle-thumb-size) / 2)')
  })

  it('grows the handle to the active token size when on', () => {
    const yielded = collectYielded(toggleRules, 'q-toggle__inner--truthy')
    const thumbEntry = yielded.find(
      (obj) =>
        obj &&
        typeof obj[symbols.selector] === 'function' &&
        obj[symbols.selector]('.q-toggle__inner--truthy') ===
          '.q-toggle__inner--truthy .q-toggle__thumb'
    )
    expect(thumbEntry).toBeDefined()
    expect(thumbEntry.width).toBe('var(--q-toggle-thumb-size-active)')
    expect(thumbEntry.height).toBe('var(--q-toggle-thumb-size-active)')
    expect(thumbEntry.left).toBe('var(--q-toggle-thumb-offset-active)')
    expect(thumbEntry.top).toBe(
      'calc(50% - var(--q-toggle-thumb-size-active) / 2)'
    )
  })

  it('switches the track fill and outline for the on state via tokens', () => {
    const yielded = collectYielded(toggleRules, 'q-toggle__inner--truthy')
    const trackEntry = yielded.find(
      (obj) =>
        obj &&
        typeof obj[symbols.selector] === 'function' &&
        obj[symbols.selector]('.q-toggle__inner--truthy') ===
          '.q-toggle__inner--truthy .q-toggle__track'
    )
    expect(trackEntry).toBeDefined()
    expect(trackEntry.background).toBe('var(--q-toggle-track-bg-active)')
    expect(trackEntry.opacity).toBe('var(--q-toggle-track-opacity-active)')
    expect(trackEntry.border).toBe('var(--q-toggle-track-outline-active)')
  })

  it('takes every size in the base rules from the reference sheet', () => {
    // The base toggle geometry is a straight port of the reference bundle, which
    // states the handle and track sizes relative to the control's font-size
    // (`0.5em` handle, `1.625em` track). The per-style tokens still drive the
    // values that differ between md2 and md3 — the handle size while the switch
    // is on, its offsets, and the icon colour — so those stay tokenised.
    const ported = new Set([
      '1em',
      '0.5em',
      '1.625em',
      '0.25em',
      '0.15em',
      '32px',
      '24px',
      '2px',
      '1px',
      '1.5em'
    ])
    for (const cls of [
      'q-toggle__inner',
      'q-toggle__track',
      'q-toggle__thumb'
    ]) {
      for (const value of allValues(toggleRules, cls)) {
        const looksLikeSize = /^[\d.]+(px|em|rem)$/.test(String(value))
        if (!looksLikeSize) continue
        expect(ported.has(String(value)), `${cls}: ${value}`).toBe(true)
      }
    }
  })
})
