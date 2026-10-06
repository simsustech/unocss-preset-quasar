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

  it('emits the dark `--flat` day colour after the plain one, mirroring light', async () => {
    const css = await cssFor('q-date q-date__calendar-item--in')
    // Both selectors weigh (0,3,0): whichever comes last wins. Emitted the other
    // way round the plain rule won, leaving the day numbers in `--q-on-primary`
    // (dark teal in dark mode) while its `background-color: var(--q-primary)`
    // lost to Quasar's own `.q-btn--flat { background: transparent }` — measured
    // 1.31:1 on the dark surface (audit: contrast-probe 2026-10-06).
    const plain = indexOfSelector(
      css,
      '.body--dark .q-date__calendar-item--in .q-btn'
    )
    const flat = indexOfSelector(
      css,
      '.body--dark .q-date__calendar-item--in .q-btn--flat'
    )
    expect(plain).toBeGreaterThan(-1)
    expect(flat).toBeGreaterThan(-1)
    expect(flat).toBeGreaterThan(plain)
    expect(css.slice(flat)).toContain('color:var(--q-on-surface)')
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
