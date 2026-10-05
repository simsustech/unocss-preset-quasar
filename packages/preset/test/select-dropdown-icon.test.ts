// The QSelect's dropdown arrow stays in the append row, where Quasar puts it.
//
// The arrow used to be pulled out of flow and pinned to the control's right
// edge (`position: absolute; right: 12px; top: 50%; translate: 0 -50%`), which
// is what forced the 96px of stacked `padding-right` on the native and the
// input: with the arrow absolutely positioned, the flow had to reserve its
// space by hand. Upstream `quasar@2.34.0` does neither — the arrow is a normal
// child of the append row, and `.q-select__dropdown-icon` carries only
// `cursor: pointer !important; transition: transform 0.28s`.
//
// With the arrow back in flow, clearance comes from layout: the control's own
// `padding: 0 12px` keeps the same 12px gap to the control's right edge that
// the absolute `right: 12px` used to state, and `.rotate-180` (which Quasar
// toggles on open) rotates the arrow in its own box with no centering
// declaration to clobber. See ADR 0012.
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

describe('q-select dropdown icon stays in the upstream append row', () => {
  it('does not pin the icon out of flow', async () => {
    const css = await cssFor('q-select rotate-180')
    const decls = declarationsFor(css, '.q-select__dropdown-icon')
    expect(decls, 'icon block was not emitted').not.toBe('')
    expect(decls).not.toMatch(/position:\s*absolute/)
    expect(decls).not.toMatch(/right:\s*12px/)
    expect(decls).not.toMatch(/translate:/)
  })

  it("keeps the reference's cursor and transition declarations", async () => {
    const css = await cssFor('q-select rotate-180')
    const decls = declarationsFor(css, '.q-select__dropdown-icon')
    expect(decls).toMatch(/cursor:\s*pointer\s*!important/)
    expect(decls).toMatch(/transition:\s*transform\s*0\.28s/)
  })

  it('still emits the rotate-180 utility so the menu toggle reaches the icon', async () => {
    const css = await cssFor('q-select rotate-180')
    expect(css).toMatch(/\.rotate-180\s*\{[^}]*rotate/)
  })
})
