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
 * drawer was open at mobile width. The reference states
 * `.q-drawer__backdrop { z-index: 2999 !important }`; this preset keeps ADR
 * 0007's 1499 and must keep the flag.
 */
describe('drawer backdrop layering', () => {
  it('flags the backdrop z-index !important', async () => {
    const css = await cssFor('q-drawer')
    expect(block(css, '.q-drawer__backdrop')).toContain(
      'z-index:1499 !important'
    )
  })

  it('leaves .fullscreen at the reference value', async () => {
    // The clash is the reference's own behaviour; the fix is the flag above, not
    // moving `.fullscreen` off 6000.
    const css = await cssFor('fullscreen')
    expect(block(css, '.fullscreen')).toContain('z-index:6000')
  })
})
