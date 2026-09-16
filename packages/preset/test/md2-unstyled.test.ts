// Step 4: md2/unstyled go through the body.quasar-style-* token switch —
// no per-style rule forks. These tests pin the token switch; the visual gate
// is two Playwright parity screenshots (/q-btn md2 + unstyled vs reference).
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

describe('md2/unstyled token scoping (no per-style forks)', () => {
  it('unstyled zeroes the btn radius token', async () => {
    const css = await cssFor('q-btn', Unstyled)
    expect(css).toMatch(/--q-btn-radius:\s*0;/)
  })

  it('md2 keeps the small radius token', async () => {
    const css = await cssFor('q-btn', MaterialDesign2)
    expect(css).toMatch(/--q-btn-radius:\s*var\(--q-radius-sm\)/)
  })

  it('default (md3) uses the xl radius token', async () => {
    const css = await cssFor('q-btn')
    expect(css).toMatch(/--q-btn-radius:\s*var\(--q-radius-xl\)/)
  })
})
