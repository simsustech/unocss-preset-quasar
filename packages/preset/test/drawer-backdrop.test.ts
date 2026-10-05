import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'

async function cssFor(tokens: string): Promise<string> {
  const gen = await createGenerator({
    presets: [QuasarPreset({ styles: QuasarStyleEntries })]
  })
  return (await gen.generate(tokens, { preflights: false })).css
}

/** The declarations of the emitted rule whose selector contains `needle`. */
function block(css: string, needle: string): string {
  for (const match of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (match[1].includes(needle)) return match[2]
  }
  return ''
}

/**
 * The `!important` on the backdrop's z-index is load-bearing, and the parity gate
 * cannot see it: `parity-report.mjs` strips `!important` before comparing, so
 * "presence and value" stayed green while the flag was missing.
 *
 * Without the flag the backdrop loses to `.fullscreen`. Quasar renders that
 * element as `<div class="fullscreen q-drawer__backdrop">`, `.fullscreen` carries
 * `z-index: 6000` (faithfully ported in `core/position/rules.ts`), and both
 * selectors are a single class — so source order decided and the backdrop landed
 * at 6000, above the app bar's 2000, swallowing every header click while the
 * drawer was open at mobile width. quasar.css states
 * `.q-drawer__backdrop { z-index: 2999 !important }`; ADR 0007 adopts that value
 * (one step below its drawer at 3000) and must keep the flag.
 */
describe('drawer backdrop layering', () => {
  it('flags the backdrop z-index !important', async () => {
    const css = await cssFor('q-drawer')
    expect(block(css, '.q-drawer__backdrop')).toContain(
      'z-index:2999 !important'
    )
  })

  it('leaves .fullscreen at the reference value', async () => {
    // The clash is the reference's own behaviour; the fix is the flag above, not
    // moving `.fullscreen` off 6000.
    const css = await cssFor('fullscreen')
    expect(block(css, '.fullscreen')).toContain('z-index:6000')
  })
})

/**
 * ADR 0007's ordering edges, read off the emitted sheet rather than off a
 * remembered constant: the overlay drawer spans the full viewport height, so
 * it must outrank *both* marginals — at 1500 the app bar covered its close
 * button and the fixed bottom nav covered its last nav item — while staying
 * under the dialog tier, which is what the reference bundle's 7000 broke.
 *
 * The behaviour is proven in the harness (`tests/md3-layout.spec.ts` drives
 * the shell and clicks both); this guards the declaration, the same way the
 * backdrop flag above is guarded against a gate that cannot see it.
 */
describe('overlay drawer ordering', () => {
  /**
   * The z-index of the rule whose selector list contains `needle` exactly.
   * `block()` only asks for containment, and `.q-header` is contained in
   * `.q-header .q-toolbar__title` — a derived rule carrying no z-index — so the
   * lookup has to match a whole selector and keep going until it finds one that
   * declares the property.
   */
  const zIndex = (css: string, needle: string): number => {
    for (const match of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      const selectors = match[1].split(',').map((s) => s.trim())
      if (!selectors.includes(needle)) continue
      const z = match[2].match(/z-index:\s*(\d+)/)
      if (z) return Number(z[1])
    }
    return NaN
  }

  it('the overlay tier outranks both marginals and stays under dialogs', async () => {
    const css = await cssFor('q-drawer q-header q-footer q-dialog')
    const drawer = zIndex(css, '.q-drawer--on-top')
    const backdrop = zIndex(css, '.q-drawer__backdrop')
    const header = zIndex(css, '.q-header')
    const footer = zIndex(css, '.q-footer')
    const dialog = zIndex(css, '.q-dialog')

    for (const [name, value] of Object.entries({
      drawer,
      backdrop,
      header,
      footer,
      dialog
    })) {
      expect(Number.isNaN(value), `${name} declares a z-index`).toBe(false)
    }

    expect(drawer, 'above the app bar').toBeGreaterThan(header)
    expect(drawer, 'above the bottom nav').toBeGreaterThan(footer)
    expect(drawer, 'below the dialog tier').toBeLessThan(dialog)

    // The scrim, not the drawer's box, is what dims the marginals: petboarding
    // insets its drawer below the app bar (`top: 50px`), so the drawer never
    // overlaps the header there and the backdrop at 2999 has to be the element
    // that takes the pointer while the drawer is open. It must also stay under
    // the drawer itself, or the scrim would swallow the drawer's own clicks.
    expect(backdrop, 'scrim above the app bar').toBeGreaterThan(header)
    expect(backdrop, 'scrim above the bottom nav').toBeGreaterThan(footer)
    expect(backdrop, 'scrim below the drawer').toBeLessThan(drawer)
  })
})
