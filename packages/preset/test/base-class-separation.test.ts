import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { spinnerRules } from '../src/components/spinner/rules.js'

/**
 * BEM is `B__E--M`: only `__` (element) and `--` (modifier) descend from a
 * base. A single hyphen does not — `q-spinner-mat` and `q-spinner-puff` are
 * their own bases (separate components), not children of `q-spinner`. The
 * rewrite collapses each component to one rule per base, so this pins the two
 * things that keep bases independent:
 *
 *   1. each base keeps its own exact matcher (`/^q-spinner-mat$/`), and
 *   2. generating one base never emits a sibling base's styling — the rules do
 *      not bleed across bases.
 *
 * The match is boundary-aware: `.q-spinner` is a substring of `.q-spinner-mat`,
 * so a plain `includes` would misread a sibling for the base itself.
 */
describe('base classes stay separate (BEM: B__E--M)', () => {
  const bases = ['q-spinner', 'q-spinner-mat', 'q-spinner-puff']

  /** Does the CSS style `base` as a whole class (not merely a longer name)? */
  const stylesBase = (css: string, base: string): boolean =>
    new RegExp(`\\.${base}(?![a-z0-9-])`).test(css)

  const generate = async (content: string): Promise<string> => {
    const gen = await createGenerator({ presets: [], rules: spinnerRules })
    const { css } = await gen.generate(content, { preflights: false })
    return css
  }

  it('gives every single-hyphen base its own exact matcher', () => {
    for (const base of bases) {
      const hasRule = spinnerRules.some(
        (entry) => entry[0] instanceof RegExp && entry[0].source === `^${base}$`
      )
      expect(hasRule, `no /^${base}$/ rule`).toBe(true)
    }
  })

  it('emits a base only when that base is the candidate', async () => {
    for (const base of bases) {
      const css = await generate(base)
      // Some bases rewrite to a child (`.q-spinner-puff circle`), so assert the
      // base selector itself rather than a bare `.base{`.
      expect(stylesBase(css, base), `generating ${base} should style it`).toBe(
        true
      )
      for (const sibling of bases) {
        if (sibling === base) continue
        expect(
          stylesBase(css, sibling),
          `${base} must not emit styling for ${sibling}`
        ).toBe(false)
      }
    }
  })
})
