// The QSelect's text area must own the width between the control's paddings.
//
// `select/rules.ts` used to reserve the dropdown arrow's clearance twice:
// `padding-right: 48px` on `.q-select .q-field__native` *and* on
// `.q-select .q-field__input`. The input lives inside the native's content box,
// so the two paddings stack — 96px of dead space on the right of the input —
// and on a phone the usable text area collapsed to ~42px at 320px viewport
// (the third typed character scrolled out of view).
//
// Neither padding exists upstream: `quasar@2.34.0` ships
// `.q-select .q-field__input { min-width: 50px !important; cursor: text }` and
// no `padding-right` on either selector. The clearance belongs to the in-flow
// append row that holds the arrow (see ADR 0011), so the two extras are gone
// while upstream's own two declarations stay.
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

/** Declarations of every block whose selector list contains `sel` exactly. */
function declarationsFor(css: string, sel: string): string {
  const re = /([^{}]*)\{([^{}]*)\}/g
  const bodies: string[] = []
  for (const m of css.matchAll(re)) {
    const selectors = m[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    if (selectors.includes(sel)) bodies.push(m[2])
  }
  return bodies.join('\n')
}

describe('q-select text area owns the width inside the control', () => {
  it('reserves no right padding on the native', async () => {
    const css = await cssFor('q-select')
    // The preset no longer targets `.q-select .q-field__native` at all, so this
    // asserts over whatever the selector resolves to today: empty now, and a
    // true regression guard if the padding ever comes back.
    const decls = declarationsFor(css, '.q-select .q-field__native')
    expect(decls).not.toMatch(/padding-right/)
  })

  it('reserves no right padding on the input', async () => {
    const css = await cssFor('q-select')
    const decls = declarationsFor(css, '.q-select .q-field__input')
    expect(decls, 'input block was not emitted').not.toBe('')
    expect(decls).not.toMatch(/padding-right/)
  })

  it("keeps upstream's own input declarations", async () => {
    const css = await cssFor('q-select')
    const decls = declarationsFor(css, '.q-select .q-field__input')
    expect(decls).toMatch(/min-width:\s*50px\s*!important/)
    expect(decls).toMatch(/cursor:\s*text/)
  })
})
