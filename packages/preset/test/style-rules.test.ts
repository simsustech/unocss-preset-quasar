// Style-owned rules: the declarations a style needs that tokens cannot express.
// The baseline entry ships them as authored — its scope *is* `body`, so it needs
// no class — while every other entry's yields are forced onto
// `body.quasar-style-{name}`, every member of a comma group included. A partly
// scoped group is what let one style's resets fire under another (the qmarkdown
// mega-group), so the group case is asserted member by member.
import { describe, expect, it } from 'vitest'
import { createGenerator } from 'unocss'
import { symbols } from '@unocss/core'
import type { Rule } from '@unocss/core'
import { MaterialDesign3, QuasarPreset } from '../src/index.js'
import type { QuasarStyleEntry } from '../src/index.js'

/** md3's tokens with one value moved, so the entry is separable from md3. */
const fixtureTokens = {
  ...MaterialDesign3.tokens,
  sizing: { ...MaterialDesign3.tokens.sizing, spaceMd: '99px' }
}

const fixture = (rules: Rule[]): QuasarStyleEntry => ({
  name: 'fixture',
  tokens: fixtureTokens,
  rules
})

/** Declarations with no selector of their own: they belong to the util's. */
const PLAIN: Rule = [
  /^q-btn$/,
  function* () {
    yield { '--fixture-token': '1' }
  }
]

/** A grouped selector, with a comma inside `:not(…)` that must not split. */
const GROUPED: Rule = [
  /^q-card$/,
  function* () {
    yield {
      [symbols.selector]: (selector: string) =>
        `${selector} .a:not(:empty), ${selector} .b`,
      '--fixture-group': '1'
    }
  }
]

async function sheetOf(styles: QuasarStyleEntry[]): Promise<string> {
  const gen = await createGenerator({ presets: [QuasarPreset({ styles })] })
  const { css } = await gen.generate('q-btn q-card', { preflights: true })
  return css
}

describe('a style entry carries its own rules', () => {
  it('ships the baseline entry’s rules unscoped', async () => {
    const css = await sheetOf([fixture([PLAIN])])
    expect(css).toContain('--fixture-token')
    expect(css).not.toContain('body.quasar-style-fixture .q-btn')
    // …and it really is the baseline: its tokens are the unscoped body block.
    expect(css).toMatch(/(?:^|\n)body \{[^}]*--q-space-md: 99px/)
  })

  it('scopes a non-baseline entry’s rules to its body class', async () => {
    const css = await sheetOf([MaterialDesign3, fixture([PLAIN])])
    expect(css).toContain('body.quasar-style-fixture .q-btn{')
    expect(css).toContain('--fixture-token:1')
  })

  it('prefixes every member of a grouped selector', async () => {
    const css = await sheetOf([MaterialDesign3, fixture([GROUPED])])
    const group =
      css.match(
        /body\.quasar-style-fixture \.q-card \.a:not\(:empty\)[^{}]*/
      )?.[0] ?? ''
    expect(group).not.toBe('')
    expect(group).toContain('body.quasar-style-fixture .q-card .b')
    // The second member must not appear in its unprefixed form: that is the bug
    // a partial prefix produces.
    expect(group).not.toMatch(/(^|,)\s*\.q-card \.b/)
  })

  it('ships neither rules nor tokens for an entry that is not listed', async () => {
    const css = await sheetOf([MaterialDesign3])
    expect(css).not.toContain('--fixture-token')
    expect(css).not.toContain('--fixture-group')
    expect(css).not.toContain('body.quasar-style-fixture .q-btn')
    expect(css).not.toContain('--q-space-md: 99px')
  })
})
