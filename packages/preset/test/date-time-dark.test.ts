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

describe('QDate dark mode', () => {
  it('emits dark overrides for date surface and header', async () => {
    const css = await cssFor('q-date q-date__header')
    expect(css).toContain('.body--dark .q-date')
    expect(css).toContain('.body--dark .q-date__header')
    expect(css).toContain('background-color:var(--q-surface-container-high)')
    expect(css).toContain('color:var(--q-on-surface)')
  })
})

describe('QTime dark mode', () => {
  it('emits dark overrides for time surface and header', async () => {
    const css = await cssFor('q-time q-time__header')
    expect(css).toContain('.body--dark .q-time')
    expect(css).toContain('.body--dark .q-time__header')
    expect(css).toContain('background-color:var(--q-surface-container-high)')
    expect(css).toContain('color:var(--q-on-primary)')
  })
})
