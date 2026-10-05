// A QDate calendar cell is a *date*, not an action button. Quasar's own CSS and
// the local reference bundle both size it `30x30` with a `50%` radius (a
// circle), and `.q-date__years-item .q-btn` at `60x30`.
//
// `width`/`height` lose to `min-width`/`min-height`, so the preset's 48dp button
// floor (`.q-btn` / `.q-btn--dense` `min-height: var(--q-control-height)`, added
// in 1ed9f77) and md2's 64px `.q-btn` `min-width` leak into the cell and stretch
// it into an oval. The component rules must pin the square themselves.
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'

async function sheet(): Promise<string> {
  const gen = await createGenerator({
    presets: [QuasarPreset({ styles: QuasarStyleEntries })]
  })
  return (await gen.generate('q-date')).css
}

function decls(css: string, selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return [...css.matchAll(new RegExp(`${escaped}\\{([^}]*)\\}`, 'g'))]
    .map((m) => m[1])
    .join(';')
}

describe('QDate cell shape', () => {
  it('pins the day cell square so the button floors cannot oval it', async () => {
    const block = decls(await sheet(), '.q-date__calendar-item button')
    expect(block).toContain('width:30px')
    expect(block).toContain('height:30px')
    expect(block).toContain('min-width:30px')
    expect(block).toContain('min-height:30px')
  })

  it('pins the year selector buttons to the reference 60x30', async () => {
    const css = await sheet()
    for (const sel of [
      '.q-date__years-item .q-btn',
      '.q-date__years-item .q-btn--flat'
    ]) {
      const block = decls(css, sel)
      expect(block, sel).toContain('width:60px')
      expect(block, sel).toContain('height:30px')
      expect(block, sel).toContain('min-width:60px')
      expect(block, sel).toContain('min-height:30px')
    }
  })
})
