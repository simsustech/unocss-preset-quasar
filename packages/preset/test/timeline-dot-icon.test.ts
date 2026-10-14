// A QTimeline dot sizes an *icon slot*, not a glyph. The reference's
// `.q-timeline__dot .q-icon` is a 31x38 box (`width: 100%` of the
// `__entry--icon` dot, `height: 38px`) whose 16px `font-size` and 38px
// `line-height` centre a 1em glyph of the icon font inside it; the `> img` /
// `> svg` companion spells that 1em out for a glyph the font does not draw.
//
// A *class icon* — the mask glyph `presetIcons` gives Quasar (instantiated in
// src/index.ts) — is the element itself, drawn at `mask-size: 100% 100%`. The
// 31x38 slot therefore stretched it over the 30x30 `::before` circle and hid
// the marker. The reference cannot express that case (it never renders a class
// icon), so the correction rides a companion selector that wins on specificity
// (ADR 0019) while the reference rule stays byte-identical (ADR 0013 — the
// parity ratchet owns its declarations).
//
// `.q-timeline__title` is an `h6`, and the reference's 20px/500 title comes
// from a global bare-`h6` block this preset declines to emit (an accepted
// divergence, recorded in fixtures/parity-baseline.json -> resets.missing).
// Without it the UA default `0.67em` (9.38px/700) applied — a title smaller
// than its own 12px uppercase subtitle — so the title restates an MD3 role,
// the same mechanism the subtitle already uses for `--q-body-small-size`.
//
// A literal `selector{...}` match cannot read the companion rule: it is emitted
// as a comma list, and `.q-timeline__dot .q-icon` is a prefix of both of its
// selectors.
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'

type EmittedRule = { selectors: string[]; body: string }

/** Every rule of the sheet as its trimmed selector list plus its body. */
function rules(css: string): EmittedRule[] {
  return [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)].map((match) => ({
    selectors: (match[1] as string)
      .split(',')
      .map((selector) => selector.trim()),
    body: match[2] as string
  }))
}

/** Declarations of every rule whose selector list contains `needle`. */
function bodies(css: string, needle: string): string {
  return rules(css)
    .filter((rule) =>
      rule.selectors.some((selector) => selector.includes(needle))
    )
    .map((rule) => rule.body)
    .join(';')
}

/** Declarations of the rule that carries `selector` verbatim. */
function exact(css: string, selector: string): string {
  return rules(css)
    .filter((rule) => rule.selectors.includes(selector))
    .map((rule) => rule.body)
    .join(';')
}

async function sheet(): Promise<string> {
  const gen = await createGenerator({
    presets: [QuasarPreset({ styles: QuasarStyleEntries })]
  })
  return (await gen.generate('q-timeline')).css
}

describe('QTimeline dot glyph', () => {
  it('sizes a class icon to the reference 1em glyph inside the slot', async () => {
    const block = bodies(await sheet(), 'q-icon[class^="i-"]')
    expect(block).toContain('width:1em')
    expect(block).toContain('height:1em')
    // The circle's centre is 4px + 30px/2 = 19px below the dot's top edge, so
    // centred in the reference's 38px slot the glyph's top edge is (38-1em)/2.
    expect(block).toContain('margin-top:calc((38px - 1em) / 2)')
    expect(block).toContain('margin-inline:auto')
  })

  it('leaves the reference icon slot byte-identical', async () => {
    const block = exact(await sheet(), '.q-timeline__dot .q-icon')
    expect(block).toContain('width:100%')
    expect(block).toContain('height:38px')
    expect(block).toContain('font-size:16px')
    // A trait the parity ratchet compares per declaration would read as a
    // mismatch in a target-0 module, so the slot must not be rewritten.
    expect(block).not.toContain('1em')
  })

  it('also matches a class icon that is not the first class in the list', async () => {
    // Quasar renders `class="q-icon i-mdi-x row items-center justify-center"`,
    // so `[class^="i-"]` alone would miss every icon Quasar draws itself.
    const rule = rules(await sheet()).find((entry) =>
      entry.selectors.includes('.q-timeline__dot .q-icon[class^="i-"]')
    )
    expect(rule, 'the companion rule').toBeDefined()
    expect(rule!.selectors).toContain('.q-timeline__dot .q-icon[class*=" i-"]')
  })

  it('gives the entry title a typographic role, not the UA h6 default', async () => {
    const block = bodies(await sheet(), 'q-timeline__title')
    expect(block).toContain('font-size:var(--q-title-small-size)')
    expect(block).toContain('font-weight:var(--q-title-small-weight)')
    // The current margins stay; the role is added beside them.
    expect(block).toContain('margin-top:0')
    expect(block).toContain('margin-bottom:16px')
  })
})
