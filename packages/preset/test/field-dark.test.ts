// Field dark-mode overrides.
//
// Reference: 9 dark-scoped rules for q-field. Wind4-compiled
// `color-mix(in oklab, var(--dark-X) var(--un-Y-opacity), transparent)`
// defaults to full opacity, so it collapses to the direct `var(--q-X)` token.
// Literal values (#fff) are kept.
//
// Dark yields are added INLINE to existing generators (not as duplicate-regex
// entries) because mergeDuplicateRules' delegateSelectors does not correctly
// isolate scoped yields from plain declarations when merging same-regex entries.

import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset } from '../src/index.js'

async function cssFor(tokens: string): Promise<string> {
  const gen = await createGenerator({ presets: [QuasarPreset({})] })
  const r = await gen.generate(tokens, { preflights: false })
  return r.css
}

describe('QField dark mode', () => {
  it('emits all 9 dark overrides with translated tokens', async () => {
    const css = await cssFor(
      'q-field__control q-field__input q-field__native q-field__prefix q-field__suffix q-field__append'
    )
    // Selector presence for all 9 dark rules.
    expect(css).toContain('.body--dark .q-field__control')
    expect(css).toContain('.body--dark .q-field--filled')
    expect(css).toContain('.body--dark .q-field--standard .q-field__control')
    expect(css).toContain('.body--dark .q-field__append > .q-icon')
    expect(css).toContain('.body--dark .q-field__input')
    expect(css).toContain('.body--dark .q-field__native')
    expect(css).toContain('.body--dark .q-field__prefix')
    expect(css).toContain('.body--dark .q-field__suffix')
    expect(css).toContain(
      '.body--dark .q-field--standout.q-field--dark.q-field--highlighted'
    )
    // Token translation: color-mix collapsed to var(--q-X).
    expect(css).toContain('color:var(--q-primary)')
    expect(css).toContain('background-color:var(--q-surface-container-highest)')
    expect(css).toContain('color:var(--q-on-surface-variant)')
    // Literal values kept.
    expect(css).toContain('color:#fff')
  })
})
