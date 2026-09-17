// Header surface + marginal sections.
//
// The reference renders the top bar through `.q-layout__section--marginal`
// with `md.sys.color.surface-container-low` (cards_and_containers.json and
// universal_system_navigation.json both map surfaces to that token). Two bugs
// made ours render transparent:
//   1. the class was missing from the safelist, so the rule was never emitted
//      (Quasar adds it at runtime; the extractor cannot see it);
//   2. the rule itself painted `--q-primary` with white text.
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset } from '../src/index.js'
import { quasarSafelist } from '../src/safelist.js'

async function cssFor(tokens: string): Promise<string> {
  const gen = await createGenerator({ presets: [QuasarPreset({})] })
  const r = await gen.generate(tokens, { preflights: false })
  return r.css
}

function block(css: string, sel: string): string {
  const m = css.match(new RegExp(`\\${sel}\\{[^}]*\\}`, 'g'))
  return m ? m.join('\n') : ''
}

describe('layout marginal sections (header/footer surface)', () => {
  it('safelists the runtime-added marginal class', () => {
    expect(quasarSafelist).toContain('q-layout__section--marginal')
  })

  it('paints the marginal section with surface-container-low, not primary', async () => {
    const css = await cssFor('q-layout__section--marginal')
    const b = block(css, '.q-layout__section--marginal')
    expect(b).toContain('background-color:var(--q-surface-container-low)')
    expect(b).not.toContain('var(--q-primary)')
  })

  it('does not duplicate the q-header matcher (last-wins would drop rules)', async () => {
    const gen = await createGenerator({ presets: [QuasarPreset({})] })
    const css = (await gen.generate('q-header')).css
    // base header must carry both the section position and its shadow hook,
    // proving the two former entries were merged rather than one being lost.
    const b = block(css, '.q-header')
    expect(b).toContain('position:relative')
    expect(css).toContain('.q-header .q-layout__shadow:after')
  })
})
