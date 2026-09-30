import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'

/**
 * The checkbox is an MD3 *checkbox*, not a radio.
 *
 * Rendered in the app (the payments page's bank-link dialog is the only
 * QCheckbox, so the markup was injected into a running page and shot at 4×):
 * unchecked it drew a 36px **circle** with a tiny glyph inside, and checked it
 * drew a **dark square** on the primary fill instead of an `on-primary` check.
 *
 * Three causes, all in `components/checkbox/rules.ts`:
 *
 * - `__inner` carried `font-size: 36px` with `border-radius: 50%`, so `1em`
 *   boxes were 36px circles. MD3's checkbox is an 18dp box with a 2dp corner;
 *   the circle is the *radio* shape, and 36px is double the icon size.
 * - `__inner--truthy .q-checkbox__bg { background-color: currentColor }` painted
 *   the check's own box in `on-surface-variant` — the dark square — because the
 *   truthy state never changes `color`, only the border and background.
 * - the check path had no `stroke`, so nothing legible was drawn over the fill.
 *
 * MD3 wants: 18dp box, 2dp radius, 40dp state layer, primary fill with an
 * `on-primary` check.
 */

async function cssFor(tokens: string): Promise<string> {
  const gen = await createGenerator({
    presets: [QuasarPreset({ styles: QuasarStyleEntries })]
  })
  return (await gen.generate(tokens, { preflights: false })).css
}

/** The declaration block declaring exactly `needle` as one of its selectors. */
function block(css: string, needle: string): string {
  const blocks = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => [
    m[1].trim(),
    m[2]
  ])
  const exact = blocks.find(([selector]) =>
    selector.split(',').some((one) => one.trim() === needle)
  )
  return exact ? exact[1].replace(/\s+/g, '') : ''
}

describe('checkbox geometry (MD3)', () => {
  it('is an 18dp box with a 2dp corner, not a 36px circle', async () => {
    const css = await cssFor('q-checkbox')

    const inner = block(css, '.q-checkbox__inner')
    expect(inner, '.q-checkbox__inner must be stated').toBeTruthy()
    expect(inner, "MD3's checkbox corner is 2dp").toContain('border-radius:2px')
    expect(inner, 'the circle is the radio shape').not.toContain(
      'border-radius:50%'
    )
    expect(inner, 'MD3 icon size is 18dp (so 1em boxes are 18px)').toContain(
      'font-size:18px'
    )
  })

  it('draws the check in on-primary over the primary fill', async () => {
    const css = await cssFor('q-checkbox')

    const truthy = block(css, '.q-checkbox__inner--truthy')
    expect(truthy, 'the checked box is filled with primary').toContain(
      'background-color:var(--q-primary)'
    )

    const check = block(css, '.q-checkbox__inner--truthy path')
    expect(check, 'the check must state its colour').toContain(
      'stroke:var(--q-on-primary)'
    )

    // The dark-square cause: the glyph's box must not be filled with the
    // inherited text colour.
    const bg = block(css, '.q-checkbox__inner--truthy .q-checkbox__bg')
    expect(bg, 'no currentColor fill on the glyph box').not.toContain(
      'currentColor'
    )
  })

  it('carries a 40dp state layer', async () => {
    const css = await cssFor('q-checkbox')
    const layer = block(
      css,
      '.q-checkbox:not(.disabled) .q-checkbox__inner:before'
    )
    expect(layer, 'the state layer must be stated').toBeTruthy()
    expect(layer, 'MD3 state layer is 40dp').toContain('width:40px')
    expect(layer).toContain('height:40px')
  })
})
