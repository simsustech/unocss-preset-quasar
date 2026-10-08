import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'

async function cssFor(tokens: string): Promise<string> {
  const gen = await createGenerator({
    presets: [QuasarPreset({ styles: QuasarStyleEntries })]
  })
  const r = await gen.generate(tokens, { preflights: false })
  return r.css
}

/**
 * Index of a selector that starts its own block or member of a comma list.
 * UnoCSS merges identical declaration bodies into one selector list, so
 * `sel{` alone would miss a rule that shares a block.
 */
function indexOfSelector(css: string, sel: string): number {
  let at = css.indexOf(sel)
  while (at !== -1) {
    const next = css[at + sel.length]
    if (next === '{' || next === ',') return at
    at = css.indexOf(sel, at + 1)
  }
  return -1
}

describe('QDate dark mode', () => {
  it('emits dark overrides for date surface and header', async () => {
    const css = await cssFor('q-date q-date__header')
    expect(css).toContain('.body--dark .q-date')
    expect(css).toContain('.body--dark .q-date__header')
    expect(css).toContain('background-color:var(--q-surface-container-high)')
    expect(css).toContain('color:var(--q-on-surface)')
  })

  it('outranks the plain `.q-btn` rule for the dark `--flat` day button', async () => {
    const css = await cssFor(
      'q-date q-date__calendar-item--in q-btn q-btn--flat'
    )
    // The flat day button must keep `--q-on-surface` against the plain
    // `.q-btn` rule's `--q-on-primary`. Ordering cannot deliver that: UnoCSS
    // merges rules with identical bodies, and the merged
    // `color:var(--q-on-surface)` block (which carries
    // `.q-date__navigation .q-btn` and ~10 unrelated selectors) is emitted
    // EARLY while the plain on-primary rule lands later and won. Measured in
    // the app bundle: the flat day button painted 1.10:1 on the dark surface,
    // i.e. an invisible calendar.
    //
    // The override therefore carries a doubled class so it wins on specificity
    // whatever order the merge produces. This replaces an earlier assertion
    // that merely checked emission order — which passed here but failed in the
    // real bundle, exactly the blind spot that hid the bug.
    const flat = indexOfSelector(
      css,
      '.body--dark .q-date__calendar-item--in .q-btn--flat.q-btn--flat'
    )
    expect(flat).toBeGreaterThan(-1)
    expect(css.slice(flat)).toContain('color:var(--q-on-surface)')
    // The doubled class is what supplies the extra specificity; without it the
    // override ties the plain rule.
    expect(css).not.toContain(
      '.body--dark .q-date__calendar-item--in .q-btn--flat,'
    )
  })
})

describe('QTime dark mode', () => {
  it('emits dark overrides for time surface and header', async () => {
    const css = await cssFor('q-time q-time__header')
    expect(css).toContain('.body--dark .q-time')
    expect(css).toContain('.body--dark .q-time__header')
    expect(css).toContain('background-color:var(--q-surface-container-high)')
    expect(css).toContain('color:var(--q-on-primary)')
  })
})
