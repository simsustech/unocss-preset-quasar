import { describe, expect, it } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'

/**
 * BUG-064 (`square`) and BUG-083 (`flat`).
 *
 * `selector` is `.q-table`, but the element that carries the card styles is
 * `.q-table__container … .q-table__card .q-table--square` — it has no bare
 * `.q-table` class. So the old carve-out `.q-table.q-table--square` matched
 * nothing, and `.q-table--flat` (0,1,0) tied with `.q-table__card` (0,1,0) and
 * lost on emission order. Live on :3100, `.q-table__card` kept
 * `border-radius:4px` with `square=true` and its default `box-shadow` with
 * `flat=true`.
 *
 * The carve-out must name the element that actually carries the class, doubled
 * for specificity so it does not depend on intra-layer emission order.
 */
const cssFor = async (classes: string) => {
  const gen = await createGenerator({
    presets: [QuasarPreset({ styles: QuasarStyleEntries })]
  })
  const { css } = await gen.generate(classes, { preflights: false })
  return css
}

describe('q-table square/flat carve-outs (BUG-064, BUG-083)', () => {
  it('square targets the card that actually carries the class', async () => {
    const css = await cssFor('q-table q-table--square')
    expect(css).toMatch(
      /\.q-table__card\.q-table--square[^{}]*\{[^}]*border-radius:\s*0/
    )
  })

  it('flat targets the card that actually carries the class', async () => {
    const css = await cssFor('q-table q-table--flat')
    expect(css).toMatch(
      /\.q-table__card\.q-table--flat[^{}]*\{[^}]*box-shadow:\s*none/
    )
  })

  it('the square carve-out sorts after the base card rule', async () => {
    const css = await cssFor('q-table q-table--square')
    const base = css.search(/\.q-table__card[^{}]*\{[^}]*border-radius/)
    const carve = css.search(/\.q-table__card\.q-table--square/)
    expect(base, 'base card rule is emitted').toBeGreaterThanOrEqual(0)
    expect(carve, 'doubled carve-out is emitted').toBeGreaterThanOrEqual(0)
    expect(carve).toBeGreaterThan(base)
  })

  it('the flat carve-out sorts after the base card rule', async () => {
    const css = await cssFor('q-table q-table--flat')
    const base = css.search(/\.q-table__card[^{}]*\{[^}]*box-shadow/)
    const carve = css.search(/\.q-table__card\.q-table--flat/)
    expect(base, 'base card rule is emitted').toBeGreaterThanOrEqual(0)
    expect(carve, 'doubled carve-out is emitted').toBeGreaterThanOrEqual(0)
    expect(carve).toBeGreaterThan(base)
  })
})
