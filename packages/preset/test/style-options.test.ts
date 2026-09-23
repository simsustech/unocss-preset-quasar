// Which styles ship is explicit: `styles` lists the entries (the first one is
// the baseline), `style` is shorthand for a one-entry list, and a call that
// names neither is refused rather than guessed at. Expectations come from the
// entries' own token literals (`theme/index.ts`) and from what the reference
// emits per style — never from the resolution code under test.
import { describe, expect, it } from 'vitest'
import { createGenerator } from 'unocss'
import {
  MaterialDesign2,
  MaterialDesign3,
  QuasarPreset,
  QuasarStyleEntries
} from '../src/index.js'
import type { QuasarPresetOptions, QuasarStyleEntry } from '../src/index.js'

/** The preflight text a configured preset emits — where style tokens live. */
async function preflightFor(options: QuasarPresetOptions): Promise<string> {
  const gen = await createGenerator({ presets: [QuasarPreset(options)] })
  const { css } = await gen.generate('', { preflights: true })
  return css
}

/**
 * The baseline token block: the `body { … }` block that carries the style's
 * component tokens. Matched on `--q-btn-radius` rather than on position — the
 * component preflights run before ours and may state blocks of their own.
 */
function baselineTokens(css: string): string {
  const match = css.match(/(?:^|\n)body \{[^}]*--q-btn-radius[^}]*\}/)
  expect(match, 'a body block with style tokens').not.toBeNull()
  return match?.[0] ?? ''
}

describe('style configuration is explicit', () => {
  it('refuses a call that configures no style', () => {
    expect(() => QuasarPreset({})).toThrow(/no style configured/)
  })

  it('refuses an empty styles list', () => {
    // `[]` is a configuration mistake, not "all defaults": a consumer who typed
    // the key meant to list something.
    expect(() => QuasarPreset({ styles: [] })).toThrow(/no style configured/)
  })

  it('names the entry it cannot use', () => {
    // SAFETY: the shape check is the boundary that has to reject a JS consumer's
    // entry, so handing it a partial object is the point of this test.
    const broken = { name: 'broken' } as unknown as QuasarStyleEntry
    expect(() => QuasarPreset({ styles: [broken] })).toThrow(/broken/)
  })
})

describe('style is shorthand for a one-entry styles list', () => {
  it('emits the same sheet either way', async () => {
    expect(await preflightFor({ style: MaterialDesign2 })).toBe(
      await preflightFor({ styles: [MaterialDesign2] })
    )
  })

  it('lets styles win when both are given', async () => {
    const css = await preflightFor({
      styles: [MaterialDesign2],
      style: MaterialDesign3
    })
    const baseline = baselineTokens(css)
    // md2's own radius literal (`--q-btn-radius: var(--q-radius-sm)`), not md3's
    // `var(--q-radius-xl)`: the baseline is `styles[0]`.
    expect(baseline).toContain('--q-btn-radius: var(--q-radius-sm)')
    expect(baseline).not.toContain('var(--q-radius-xl)')
  })
})

describe('unlisted styles ship nothing', () => {
  it('omits the switch blocks of styles that are not listed', async () => {
    const md3Only = await preflightFor({ styles: [MaterialDesign3] })
    expect(md3Only).not.toContain('body.quasar-style-md2 {')
    expect(md3Only).not.toContain('body.quasar-style-unstyled {')
  })

  it('emits a switch block per listed style', async () => {
    const all = await preflightFor({ styles: QuasarStyleEntries })
    expect(all).toContain('body.quasar-style-md2 {')
    expect(all).toContain('body.quasar-style-unstyled {')
  })
})
