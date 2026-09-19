import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset } from '../src/index.js'

async function cssFor(tokens: string): Promise<string> {
  const gen = await createGenerator({ presets: [QuasarPreset({})] })
  const r = await gen.generate(tokens, { preflights: false })
  return r.css
}

describe('Card dark mode', () => {
  it('emits dark overrides for card, bordered, dialog', async () => {
    const css = await cssFor('q-card q-card--bordered')
    expect(css).toContain('.body--dark .q-card')
    expect(css).toContain('.body--dark .q-card--bordered')
    expect(css).toContain('.body--dark .q-dialog__inner>.q-card')
    expect(css).toContain('background-color:var(--q-surface-container-low)')
    expect(css).toContain('border-color:var(--q-outline)')
  })
})

describe('Chip dark mode', () => {
  it('emits dark overrides for chip and chip icon', async () => {
    const css = await cssFor('q-chip')
    expect(css).toContain('.body--dark .q-chip')
    expect(css).toContain('.body--dark .q-chip__icon')
    expect(css).toContain('color:var(--q-on-secondary-container)')
    expect(css).toContain('color:var(--q-primary)')
  })
})
