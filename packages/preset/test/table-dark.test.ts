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

/** The declarations of the emitted rule whose selector contains `needle`. */
function block(css: string, needle: string): string {
  for (const match of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (match[1].includes(needle)) return match[2]
  }
  return ''
}

describe('QTable dark mode', () => {
  it('emits dark overrides for bordered, bottom, and card', async () => {
    const css = await cssFor(
      'q-table q-table__card q-table__bottom q-table--bordered'
    )
    expect(block(css, '.body--dark .q-table--bordered')).toContain(
      'border-color:var(--q-outline-variant)'
    )
    expect(block(css, '.body--dark .q-table__card')).toContain(
      'background-color:var(--q-surface-container)'
    )
    expect(css).toContain('.body--dark .q-table__bottom,')
    expect(css).toContain('color:var(--q-on-surface)')
  })
})
