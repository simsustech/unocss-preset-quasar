// The QEditor toolbar button size (plan 2026-10-07-qeditor-toolbar-button-size).
//
// QEditor renders its 10 toolbar buttons as
// `q-btn--flat q-btn--rectangle q-btn--dense` — `--rectangle`, never `--round`
// — at a 10px font-size. The preset's global 48dp floor (`.q-btn` /
// `.q-btn--dense` `min-height: var(--q-control-height)`, 48px) and md2's 64px
// `.q-btn` `min-width` (its spec's `min_width_px`) therefore sized every one of
// them 20.6x48 in md3 and 64x48 in md2, wrapping the toolbar to 73px on desktop
// and 305px on a 390px phone.
//
// The reference bundle sizes a dense button from its own metric instead:
// `.q-btn--dense{padding:var(--q-btn-dense-padding);min-height:2em;}` with
// `.q-btn{...min-width:var(--q-btn-min-width);...}` — `auto` on md3 and
// unstyled. At the toolbar's 10px font-size `2em` is 20px, so the editor rules
// restate that pair on `.q-editor__toolbar .q-btn`: the em tracks the button's
// own font-size (an inline `20px` would drift with `--q-btn-font-size`), and the
// selector is scoped to the toolbar so the 48dp touch-target floor keeps
// applying everywhere else. The second case below pins that floor, because the
// carve-out is only correct if it leaves the global rules alone.
//
// The sibling consumer-side spec is
// `quasar-testing-harness/tests/q-editor-toolbar.spec.ts` (computed box in a
// browser); this one pins the emitted rule text without a browser.
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'

async function sheet(): Promise<string> {
  const gen = await createGenerator({
    presets: [QuasarPreset({ styles: QuasarStyleEntries })]
  })
  return (await gen.generate('q-editor q-btn')).css
}

describe('q-editor toolbar button size', () => {
  it('states the reference dense metric on the toolbar button', async () => {
    const css = await sheet()
    expect(css).toMatch(/\.q-editor__toolbar \.q-btn\{[^}]*min-height:2em/)
    expect(css).toMatch(/\.q-editor__toolbar \.q-btn\{[^}]*min-width:auto/)
  })

  it('leaves the global 48dp button floor intact', async () => {
    const css = await sheet()
    // The floor this carve-out must not remove (control-height.test.ts:34-39).
    expect(css).toMatch(
      /\.q-btn--dense\{[^}]*min-height:var\(--q-control-height\)/
    )
    expect(css).toMatch(/\.q-btn\{[^}]*min-height:var\(--q-control-height\)/)
  })
})
