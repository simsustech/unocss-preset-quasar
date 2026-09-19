import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset } from '../src/index.js'

async function cssFor(tokens: string): Promise<string> {
  const gen = await createGenerator({ presets: [QuasarPreset({})] })
  const r = await gen.generate(tokens, { preflights: false })
  return r.css
}

describe('QTable dark mode', () => {
  it('emits dark overrides for bordered, bottom, and card', async () => {
    const css = await cssFor(
      'q-table q-table__card q-table__bottom q-table--bordered'
    )
    expect(css).toContain('.body--dark .q-table--bordered')
    expect(css).toContain('.body--dark .q-table__bottom')
    expect(css).toContain('.body--dark .q-table__card')
    expect(css).toContain('border-color:var(--q-outline)')
    expect(css).toContain('color:var(--q-on-surface)')
  })
})
