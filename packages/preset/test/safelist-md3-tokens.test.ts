import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'
import { md3TokenSafelist, quasarSafelist } from '../src/safelist.js'
import { md3Tokens } from '../src/core/colors/md3-tokens.js'

/**
 * The MD3 role classes must exist without any source naming them.
 *
 * Quasar takes a colour *name* and applies the matching class at runtime:
 * `color="error"` puts `text-error` on the element, and nothing in the app's
 * source says `text-error`. UnoCSS only emits candidates it can extract, so
 * without a safelist entry that class had no rule and the declaration fell back
 * to the component's own variable. Measured in petboarding (2026-10-14): a flat
 * `q-btn` asked for `color="error"` painted `--q-primary`, and the same
 * mechanism is why the alert chips' teal glyph sat on a red fill.
 *
 * The palette block already carries its family (`bg-negative`, `text-primary`,
 * …). This is the role half of the same contract.
 */

/** The roles that are only ever a fill, mirrored from `src/safelist.ts`. */
const FILL_ONLY = new Set([
  'surface',
  'background',
  'inverse-surface',
  'shadow',
  'scrim'
])
const generateCss = async () => {
  const gen = await createGenerator({
    presets: [QuasarPreset({ styles: QuasarStyleEntries })]
  })
  return (await gen.generate('', { preflights: true })).css
}

describe('md3 token safelist', () => {
  it('gives every role a text class, minus the pure fills', () => {
    const pureFills = md3Tokens.filter(
      (token) => token.startsWith('surface-') || FILL_ONLY.has(token)
    )
    const textClasses = md3TokenSafelist.filter((cls) =>
      cls.startsWith('text-')
    )
    expect(textClasses).toHaveLength(md3Tokens.length - pureFills.length)
  })

  it('gives every role a bg class, minus the inks', () => {
    const inks = md3Tokens.filter((token) => token.startsWith('on-'))
    const bgClasses = md3TokenSafelist.filter((cls) => cls.startsWith('bg-'))
    expect(bgClasses).toHaveLength(md3Tokens.length - inks.length)
  })

  it('never paints text with a surface role, nor a fill with an ink', async () => {
    const css = await generateCss()
    // The two combinations `markdown-dark.test.ts` refuses by name; emitting
    // the family cartesian is what put them in the sheet. Anchor on the
    // declaration: `background-color:var(--q-surface-…)` contains
    // `color:var(--q-surface-…)` and is legitimate — a surface as a *fill* is
    // the card's own recipe.
    expect(css).not.toMatch(/(?:[;{])color:var\(--q-surface-[a-z-]+\)/)
    expect(css).not.toMatch(/(?:[;{])background-color:var\(--q-on-[a-z-]+\)/)
  })

  it('does not overlap the Quasar palette block', () => {
    const palette = new Set(quasarSafelist)
    expect(md3TokenSafelist.filter((cls) => palette.has(cls))).toEqual([])
  })

  it('emits every role class with an empty source', async () => {
    const css = await generateCss()
    const missing = md3TokenSafelist.filter((cls) => !css.includes(`.${cls}{`))
    expect(missing).toEqual([])
  })

  it('resolves a role class to its own token, not the component default', async () => {
    const css = await generateCss()
    // The three the theme audit leans on: a status fill, a status ink, and the
    // surface ramp step the rows sit on.
    expect(css).toContain('.text-error{')
    expect(css).toMatch(/\.text-error\{[^}]*var\(--q-error\)/)
    expect(css).toMatch(
      /\.bg-surface-container-high\{[^}]*var\(--q-surface-container-high\)/
    )
    expect(css).toMatch(
      /\.text-on-surface-variant\{[^}]*var\(--q-on-surface-variant\)/
    )
  })

  it('emits the class after the component rule it has to beat', async () => {
    const css = await generateCss()
    // ADR 0019: a token class never wins on specificity against `.q-btn--flat`,
    // so it has to win on order — a component asked for `color="error"` only
    // renders the token if this holds.
    expect(css.indexOf('.text-error{')).toBeGreaterThan(
      css.indexOf('.q-btn--flat{')
    )
  })
})
