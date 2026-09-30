import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'

/**
 * An active tab has to *win* the colour, not merely state one.
 *
 * The plan for this step read "no rule at all", and that is not what the sheet
 * says: this preset already states `.q-tab--active { color: var(--q-primary) }`
 * (merged into one block with its `.body--dark` twin). The defect is the
 * cascade. Plain `.q-tab--active` is 0,1,0 — exactly like the base
 * `.q-tab { color: inherit }` (dist's value) that the sheet emits *later* — so
 * the colour loses and the label computes the inherited black. Measured on
 * `/admin/payments`, the only selected affordance was the indicator pill
 * (56×32, radius 16px, secondary-container).
 *
 * The fix carries both classes, 0,2,0, so it wins wherever the sheet places it —
 * the same two-class idiom as the reference's `.flex.inline` companion. The pill
 * stays: recording it as a deliberate MD3 deviation from the 3 dp tab indicator
 * is settled, so the last case asserts the pill and its dark value are untouched
 * (the (e) condition).
 */

async function cssFor(tokens: string): Promise<string> {
  const gen = await createGenerator({
    presets: [QuasarPreset({ styles: QuasarStyleEntries })]
  })
  return (await gen.generate(tokens, { preflights: false })).css
}

/**
 * The declaration block declaring exactly `needle` as one of its selectors.
 *
 * Exact per selector (after splitting UnoCSS's comma-merged lists), never a
 * substring: the sheet also carries `.body--dark .q-tab--active`,
 * `.q-tabs--vertical .q-tab__indicator` and the colour-scoped
 * `.q-tabs__header-content--dark .q-tab--active`, so a substring match answers
 * with a block that never declared the property.
 */
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

describe('active tab', () => {
  it('outranks the base rule, so the label takes the palette colour', async () => {
    const css = await cssFor('q-tabs q-tab')

    const active = block(css, '.q-tab.q-tab--active')
    expect(
      active,
      '.q-tab.q-tab--active must be stated (plain .q-tab--active ties with the base rule and loses)'
    ).toBeTruthy()
    expect(active, 'the active label reads the palette').toContain(
      'color:var(--q-primary)'
    )
  })

  it('leaves the inactive tab inheriting, as dist states it', async () => {
    const css = await cssFor('q-tabs q-tab')
    expect(block(css, '.q-tab')).toContain('color:inherit')
  })

  it('keeps the indicator pill and its dark value (the (e) condition)', async () => {
    const css = await cssFor('q-tabs q-tab')

    const pill = block(css, '.q-tab__indicator')
    expect(pill, 'the pill keeps its fill').toContain(
      'var(--q-secondary-container)'
    )
    expect(pill, 'the pill geometry is untouched').toContain('width:56px')
    expect(pill).toContain('height:32px')

    const darkPill = block(css, '.body--dark .q-tab__indicator')
    expect(
      darkPill,
      'the dark pill still resolves the secondary container'
    ).toContain('var(--q-secondary-container)')
  })
})
