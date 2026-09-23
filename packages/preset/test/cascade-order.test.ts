// Cascade order: color utilities must be emitted AFTER component rules.
//
// `.q-btn` sets `background: transparent` (a shorthand, so it resets
// background-color). With utilities emitted first, a `bg-secondary q-btn` lost
// its fill and rendered transparent — the "Screenshot Review" button. Quasar
// and the reference deployment both place utilities last (reference: .q-btn at
// index 65, .bg-secondary at 100), so utilities win on equal specificity.
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
 * Index of the first rule carrying `sel`, whether it stands alone or is a member
 * of a comma-joined selector list. UnoCSS merges rules with identical declaration
 * bodies into one list, so a utility can share a block with a component rule;
 * matching only `sel{` would then miss it entirely.
 */
function indexOfBlock(css: string, sel: string): number {
  const m = new RegExp(`(?:^|[,\\n])\\s*(\\${sel})(?=\\s*[,{])`, 'm').exec(css)
  return m ? m.index + m[0].length - m[1].length : -1
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
    // The utility may lead a selector list rather than own a block of its own.
    expect(css).toMatch(
      /\.bg-secondary[^{}]*\{background-color:var\(--q-secondary\);\}/
    )
    expect(css).toContain('.q-btn{')
  })
})
