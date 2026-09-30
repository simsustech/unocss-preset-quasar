// 48dp touch targets (plan step 6).
//
// The audit probed 375px and found `48x40`, `64x40`, `72x40`, `56x40` buttons
// and ~250 sub-48 controls: the base button height is `btnMinHeight: 2.857em`
// (40px at the 14px md3 button font) and `.q-field__control` reads the shared
// `--q-comp-md` (40px). Both are *height* declarations, and they must reach
// 48dp through a dedicated token — never by raising `--q-comp-md`, which is
// also `font-size` for banners, list items and radios (raising it would jump
// body text to 48px).
//
// Variants used to be sub-48 control heights (round 3em = 42px, dense 2.4em =
// 33.6px — the header's Menu button is a dense round one). Round buttons now
// take this same floor as their width (buttons-spec circle test), so the floor
// is what makes them square boxes — and with a 50% radius, circles.
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'

async function sheet(): Promise<string> {
  const gen = await createGenerator({
    presets: [QuasarPreset({ styles: QuasarStyleEntries })]
  })
  return (await gen.generate('q-btn q-field')).css
}

describe('48dp control height', () => {
  it('states a dedicated control-height token at 48px', async () => {
    expect(await sheet()).toMatch(/--q-control-height:\s*48px/)
  })

  it('points every control height declaration at the token', async () => {
    const css = await sheet()
    // base rect button, round, dense, dense-round, and the field control
    expect(css).toMatch(/\.q-btn\{[^}]*min-height:var\(--q-control-height\)/)
    expect(css).toMatch(
      /\.q-btn--round\{[^}]*min-height:var\(--q-control-height\)/
    )
    expect(css).toMatch(
      /\.q-btn--dense\{[^}]*min-height:var\(--q-control-height\)/
    )
    expect(css).toMatch(
      /\.q-btn--dense\.q-btn--round\{[^}]*min-height:var\(--q-control-height\)/
    )
    expect(css).toMatch(
      /\.q-field__control\{[^}]*min-height:var\(--q-control-height\)/
    )
  })

  it('leaves the shared component scale at 40px (double-duty guard)', async () => {
    // comp-md is also font-size in banners/items/radios — it must not move.
    expect(await sheet()).toMatch(/--q-comp-md:\s*40px/)
  })
})
