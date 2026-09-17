// Spec conformance for button corners.
//
//   specs/buttons.json           -> corner_shape_token = md.sys.shape.corner.full
//                                   for every variant (implemented as 28px,
//                                   "Quasar convention" per SPEC_VERIFICATION_REPORT)
//   specs/md2/...specifications  -> contained/outlined/text button
//                                   border_radius_px = 4
// So the corner must come from the style token `--q-btn-radius`, never from a
// hardcoded legacy 3px: that literal overrode the token in every style and made
// the "Screenshot Review" button square (3px) instead of 28px.
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset } from '../src/index.js'
import { Unstyled, MaterialDesign2 } from '../src/styles/index.js'

async function cssFor(tokens: string, style?: any): Promise<string> {
  const gen = await createGenerator({
    presets: [style ? QuasarPreset({ style }) : QuasarPreset({})]
  })
  const r = await gen.generate(tokens)
  return r.css
}

function block(css: string, sel: string): string {
  const m = css.match(new RegExp(`\\${sel}\\{[^}]*\\}`, 'g'))
  return m ? m.join('\n') : ''
}

describe('QBtn corner spec conformance', () => {
  it('MD3 resolves the button corner to corner.full (28px)', async () => {
    const css = await cssFor('q-btn')
    expect(css).toMatch(/--q-btn-radius:\s*var\(--q-radius-xl\)/)
    expect(css).toMatch(/--q-radius-xl:\s*28px/)
    expect(block(css, '.q-btn')).toContain('border-radius:var(--q-btn-radius)')
  })

  it('MD2 resolves the button corner to the spec 4px', async () => {
    const css = await cssFor('q-btn', MaterialDesign2)
    expect(css).toMatch(/--q-btn-radius:\s*var\(--q-radius-sm\)/)
    expect(css).toMatch(/--q-radius-sm:\s*4px/)
  })

  it('unstyled zeroes the button corner', async () => {
    const css = await cssFor('q-btn', Unstyled)
    expect(css).toMatch(/--q-btn-radius:\s*0/)
  })

  it('never hardcodes a legacy 3px corner on q-btn--rectangle', async () => {
    for (const style of [undefined, MaterialDesign2, Unstyled]) {
      const css = await cssFor('q-btn--rectangle', style)
      const b = block(css, '.q-btn--rectangle')
      expect(b).not.toContain('border-radius:3px')
      if (b) expect(b).toContain('border-radius:var(--q-btn-radius)')
    }
  })
})
