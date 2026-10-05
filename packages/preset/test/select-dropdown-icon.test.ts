// QSelect dropdown icon must stay vertically centered while Quasar rotates it.
//
// Quasar adds `.rotate-180` to `.q-select__dropdown-icon` when the menu opens
// (QSelect.js). `.rotate-180` is emitted by the default layer — AFTER this
// preset's component rules — and its full `transform:` stack replaces any
// component-band `transform: translateY(-50%)`, dropping the icon by half its
// height. Centering therefore must use the individual `translate` property so
// it composes with the utility's `transform` (ADR 0009).
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

/**
 * Body of the first rule whose selector list contains `sel` and whose body
 * matches `bodyPattern` (the selector owns two blocks: the positioning one and
 * a cursor/transition one).
 */
function blockBody(
  css: string,
  sel: string,
  bodyPattern: RegExp
): string | null {
  const re = new RegExp(`([^{}]*\\${sel}[^{}]*)\\{([^{}]*)\\}`, 'g')
  for (const m of css.matchAll(re)) {
    if (bodyPattern.test(m[2])) return m[2]
  }
  return null
}

describe('q-select dropdown icon centering composes with rotate-180', () => {
  it('centers the icon with the individual translate property', async () => {
    const css = await cssFor('q-select rotate-180')
    const body = blockBody(css, '.q-select__dropdown-icon', /position:absolute/)
    expect(body).not.toBeNull()
    // red today: rule declares transform:translateY(-50%)
    expect(body).toMatch(/translate:\s*0\s+-50%/)
  })

  it('does not put the centering on the transform shorthand', async () => {
    const css = await cssFor('q-select rotate-180')
    const body = blockBody(css, '.q-select__dropdown-icon', /position:absolute/)
    expect(body).not.toBeNull()
    // red today: transform:translateY(-50%) is clobbered by .rotate-180
    expect(body).not.toMatch(/transform:/)
  })

  it('still emits the rotate-180 utility so the menu toggle reaches the icon', async () => {
    const css = await cssFor('q-select rotate-180')
    expect(css).toMatch(/\.rotate-180\s*\{[^}]*rotate/)
  })
})
