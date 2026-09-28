// Hover regression: hovering a list row turned the WHOLE PAGE purple.
//
// Cause: `.q-focus-helper` is a 100%x100% absolutely-positioned overlay. On
// hover it gets `background: currentColor; opacity: .15`. If the host has no
// positioned ancestor, the overlay resolves against the viewport and tints the
// page. Quasar guarantees containment with `.q-item { position: relative }`
// (quasar.css:2903) — the rewrite had dropped it.
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

  it('confines the tint to the desktop-scoped helper, not the bare pseudo-elements', async () => {
    // Both tokens: the tint rule is a descendant selector of `.q-focusable`, so
    // the generator emits it only when that class is in the scanned input too.
    const c = await cssFor('q-focus-helper q-focusable')
    // The reference states the tint on the helper itself —
    // `body.desktop .q-focusable:focus > .q-focus-helper{background:currentColor; opacity:.15}` —
    // with `:before/:after` carrying only opacity. That 100%x100% currentColor
    // overlay is exactly the shape that turned pages purple, so what keeps it
    // contained is the host's `position:relative` (asserted above), not a weaker
    // tint. The desktop scope is the reference's own guard: touch devices never
    // get the overlay at all.
    // UnoCSS joins every host variant into one comma-separated rule, so the tint
    // selector is followed by a comma, not the opening brace.
    expect(c).toContain('body.desktop .q-focusable:focus > .q-focus-helper,')
    // md3 state layers (m3.material.io/foundations/interaction/states/state-layers):
    // hover +8%, focus +10%, press +10%. Quasar's reference bundle hardcodes 0.15
    // for all three; the preset follows md3 instead, and that deliberate divergence
    // from the reference is recorded in fixtures/parity-baseline.json (the three
    // focusable/hoverable/manual-focusable modules moved off target 0 for it).
    // The token above is q-focusable, so this is the focus value.
    expect(c).toContain('background:currentColor;opacity:0.1;')
    // The pseudo-element layers carry opacity only — no colour of their own.
    expect(c).not.toMatch(
      /q-focus-helper:(before|after)[^{]*\{[^}]*background:/
    )
  })
})
