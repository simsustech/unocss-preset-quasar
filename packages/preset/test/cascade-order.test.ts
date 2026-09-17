// Cascade order: color utilities must be emitted AFTER component rules.
//
// `.q-btn` sets `background: transparent` (a shorthand, so it resets
// background-color). With utilities emitted first, a `bg-secondary q-btn` lost
// its fill and rendered transparent — the "Screenshot Review" button. Quasar
// and the reference deployment both place utilities last (reference: .q-btn at
// index 65, .bg-secondary at 100), so utilities win on equal specificity.
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset } from '../src/index.js'

async function cssFor(tokens: string): Promise<string> {
  const gen = await createGenerator({ presets: [QuasarPreset({})] })
  const r = await gen.generate(tokens, { preflights: false })
  return r.css
}

/** Index of the first standalone `.sel{` occurrence, or -1. */
function indexOfBlock(css: string, sel: string): number {
  return css.search(new RegExp(`\\${sel}\\{`))
}

describe('utility vs component cascade order', () => {
  it('emits bg-* utilities after the component rule they must override', async () => {
    const css = await cssFor('q-btn bg-secondary text-white')
    const bg = indexOfBlock(css, '.bg-secondary')
    const btn = indexOfBlock(css, '.q-btn')
    expect(bg).toBeGreaterThan(-1)
    expect(btn).toBeGreaterThan(-1)
    expect(bg).toBeGreaterThan(btn)
  })

  it('emits text-* utilities after component rules', async () => {
    const css = await cssFor('q-card text-primary')
    expect(indexOfBlock(css, '.text-primary')).toBeGreaterThan(
      indexOfBlock(css, '.q-card')
    )
  })

  it('still emits both the component rule and the utility', async () => {
    const css = await cssFor('q-btn bg-secondary')
    expect(css).toContain('.bg-secondary{background-color:var(--q-secondary);}')
    expect(css).toContain('.q-btn{')
  })
})
