// Hover regression: hovering a list row turned the WHOLE PAGE purple.
//
// Cause: `.q-focus-helper` is a 100%x100% absolutely-positioned overlay. On
// hover it gets `background: currentColor; opacity: .15`. If the host has no
// positioned ancestor, the overlay resolves against the viewport and tints the
// page. Quasar guarantees containment with `.q-item { position: relative }`
// (quasar.css:2903) — the rewrite had dropped it.
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset } from '../src/index.js'

async function cssFor(tokens: string): Promise<string> {
  const gen = await createGenerator({ presets: [QuasarPreset({})] })
  const r = await gen.generate(tokens, { preflights: false })
  return r.css
}

/** Standalone `.sel{...}` block(s), joined. */
function block(c: string, sel: string): string {
  const m = c.match(new RegExp(`\\${sel}\\{[^}]*\\}`, 'g'))
  return m ? m.join('\n') : ''
}

describe('focus-helper hover must not tint the page', () => {
  it('base helper is transparent and invisible', async () => {
    const b = block(await cssFor('q-focus-helper'), '.q-focus-helper')
    expect(b).toContain('background:transparent')
    expect(b).toContain('opacity:0')
  })

  it('hover hosts contain the absolute helper (quasar.css parity)', async () => {
    for (const host of ['q-item', 'q-chip', 'q-fab', 'q-card', 'q-btn']) {
      const css = await cssFor(host)
      expect(block(css, '.' + host), host).toContain('position:relative')
    }
  })

  it('overlay tints come from the black/white pseudo-elements', async () => {
    const c = await cssFor('q-focus-helper')
    expect(c).toMatch(/\.q-focus-helper:before\{[^}]*background:#000/)
    expect(c).toMatch(/\.q-focus-helper:after\{[^}]*background:#fff/)
  })
})
