import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset } from '../src/index.js'

async function cssFor(tokens: string): Promise<string> {
  const gen = await createGenerator({ presets: [QuasarPreset({})] })
  const r = await gen.generate(tokens, { preflights: false })
  return r.css
}

/** The declarations of the emitted rule whose selector contains `needle`. */
function block(css: string, needle: string): string {
  for (const match of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (match[1].includes(needle)) return match[2]
  }
  return ''
}

describe('Card dark mode', () => {
  it('emits dark overrides for card, bordered, dialog', async () => {
    const css = await cssFor('q-card q-card--bordered')
    // Asserted per block: a sheet-wide `toContain` passed for years on a literal
    // some other rule happened to emit. The bordered edge is the faint role.
    expect(block(css, '.body--dark .q-card--bordered')).toContain(
      'border-color:var(--q-outline-variant)'
    )
    expect(block(css, '.body--dark .q-card:not(.disabled):focus')).toContain(
      'background-color:var(--q-secondary)'
    )
    expect(css).toContain('.body--dark .q-dialog__inner>.q-card')
  })
})

describe('Chip dark mode', () => {
  it('emits dark overrides for chip and chip icon', async () => {
    const css = await cssFor('q-chip')
    expect(
      block(css, '.body--dark .q-chip') || block(css, '.body--dark .q-chip,')
    ).toContain('var(--dark-on-secondary-container)')
    expect(css).toContain('.body--dark .q-chip__icon,')
    expect(css).toContain('color:var(--q-primary)')
  })
})
