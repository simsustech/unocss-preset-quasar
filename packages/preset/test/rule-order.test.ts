// Rule-order conformance.
//
// The preset assembles its rules array by hand and UnoCSS emits blocks in that
// order, so on equal specificity the LAST matching rule wins. Two constraints
// have to hold at the same time and they pull in opposite directions, so both
// are pinned here:
//
//  1. grid/container utilities (`.column`, `.row`, `.col`) BEFORE components.
//     Quasar's own sheet and the reference deployment both place `.column`
//     before the q-item rules, so `.q-item__section--main { flex: 10000 1 0% }`
//     beats `.column { flex: 1 1 auto }`. With every utility last this failed
//     and the row collapsed (side section 378px wide instead of 56px).
//
//  2. colours/text/spacing utilities AFTER components.
//     `.bg-secondary` must beat `.q-btn { background: transparent }`, otherwise
//     `bg-*` buttons render unfilled.
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'

async function cssFor(tokens: string): Promise<string> {
  const gen = await createGenerator({
    presets: [QuasarPreset({ styles: QuasarStyleEntries })]
  })
  const r = await gen.generate(tokens)
  return r.css
}

/**
 * Index of the first rule carrying `sel`, whether it stands alone or is a member
 * of a comma-joined selector list. UnoCSS merges rules with identical declaration
 * bodies into one list, so a utility can share a block with a component rule.
 */
function indexOfBlock(css: string, sel: string): number {
  const m = new RegExp(`(?:^|[,\\n])\\s*(\\${sel})(?=\\s*[,{])`, 'm').exec(css)
  return m ? m.index + m[0].length - m[1].length : -1
}

describe('rule order', () => {
  it('emits grid utilities before component layout rules', async () => {
    const css = await cssFor(
      'column row col q-item__section--main q-item__section--side'
    )
    const column = css.indexOf('.column{')
    const main = css.indexOf('.q-item__section--main{')
    expect(column).toBeGreaterThan(-1)
    expect(main).toBeGreaterThan(-1)
    // `.column` must come first so the component's flex wins.
    expect(column).toBeLessThan(main)
  })

  it('emits colour utilities after component rules', async () => {
    const css = await cssFor('q-btn bg-secondary text-primary')
    const btn = indexOfBlock(css, '.q-btn')
    const bg = indexOfBlock(css, '.bg-secondary')
    expect(btn).toBeGreaterThan(-1)
    expect(bg).toBeGreaterThan(-1)
    expect(bg).toBeGreaterThan(btn)
  })

  it('keeps the item label on the reference line-height', async () => {
    const css = await cssFor('q-item__label')
    // Anchor at the start of a line: the compound `.q-item__label + .q-item__label`
    // rule otherwise matches first (its selector ends with the same text).
    const block = css.match(/(?:^|\n)\.q-item__label\{[^}]*\}/)?.[0] ?? ''
    expect(block).toContain('line-height:1.2em')
  })
})
