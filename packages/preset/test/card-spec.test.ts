// Spec conformance (authoritative: specs/cards_and_containers.json):
//   elevated_card.corner_shape_token      = md.sys.shape.corner.large  -> 16px
//   elevated_card.background_layer_mapping = md.sys.color.surface-container-low
//   (filled -> surface-container, outlined -> surface)
// MD2 (specs/md2/core_component_design_specifications.json):
//   standard_card.border_radius_px        = 4
// Expected literals come from the spec files, not from the rules under test.
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'
import { Unstyled, MaterialDesign2 } from '../src/styles/index.js'

async function cssFor(tokens: string, style?: any): Promise<string> {
  const gen = await createGenerator({
    presets: [
      style
        ? QuasarPreset({ style })
        : QuasarPreset({ styles: QuasarStyleEntries })
    ]
  })
  const r = await gen.generate(tokens)
  return r.css
}

function block(css: string, sel: string): string {
  const m = css.match(new RegExp(`\\${sel}\\{[^}]*\\}`, 'g'))
  return m ? m.join('\n') : ''
}

describe('QCard spec conformance', () => {
  it('MD3 radius resolves to corner.large (16px)', async () => {
    const css = await cssFor('q-card')
    expect(css).toMatch(/--q-card-radius:\s*var\(--q-radius-lg\)/)
    expect(css).toMatch(/--q-radius-lg:\s*16px/)
    expect(block(css, '.q-card')).toContain(
      'border-radius:var(--q-card-radius)'
    )
  })

  it('MD2 radius resolves to 4px', async () => {
    const css = await cssFor('q-card', MaterialDesign2)
    expect(css).toMatch(/--q-card-radius:\s*4px/)
  })

  it('unstyled radius is 0', async () => {
    const css = await cssFor('q-card', Unstyled)
    expect(css).toMatch(/--q-card-radius:\s*0/)
  })

  it('elevated card uses surface-container-low via --q-card-surface', async () => {
    const css = await cssFor('q-card')
    // The rule reads the style token so md3/md2/unstyled can differ; the token
    // itself must map to the spec's surface-container-low role.
    expect(block(css, '.q-card')).toContain(
      'background-color:var(--q-card-surface)'
    )
    expect(css).toMatch(/--q-card-surface:\s*var\(--q-surface-container-low\)/)
  })
})
