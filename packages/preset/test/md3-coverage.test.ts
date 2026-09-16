// md3 coverage: full-preset generate() must emit the reference-visible
// declarations for body typography, btn icon sizing, item layout, card
// surface and toolbar. Expected literals come from the reference deployment
// CSS (independent source), never from the rules under test. Assertions are
// scoped to the exact selector block so safelisted utilities can't cause
// vacuous passes. Output is minified (no spaces): match accordingly.
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset } from '../src/index.js'
import { quasarSafelist } from '../src/safelist.js'

async function cssFor(tokens: string): Promise<string> {
  const gen = await createGenerator({ presets: [QuasarPreset({})] })
  const r = await gen.generate(tokens, { preflights: false })
  return r.css
}

/** All standalone `.sel{...}` blocks joined (a token may emit several). */
function block(css: string, sel: string): string {
  const m = css.match(new RegExp(`\\${sel}\\{[^}]*\\}`, 'g'))
  return m ? m.join('\n') : ''
}

describe('md3 coverage (reference parity)', () => {
  it('emits Roboto body typography for the q-body token', async () => {
    const css = await cssFor('q-body')
    expect(css).toMatch(/body\{[^}]*font-family:[^}]*Roboto/)
    expect(css).toContain('box-sizing:border-box')
  })

  it('emits dark page colors for the body--dark token', async () => {
    const css = await cssFor('body--dark')
    expect(css).toMatch(
      /\.body--dark\{[^}]*background:[^}]*var\(--q-dark-page\)/
    )
    expect(quasarSafelist).toContain('body--dark')
  })

  it('sizes icons inside buttons via a .q-btn .q-icon descendant rule', async () => {
    const css = await cssFor('q-btn')
    expect(css).toContain('.q-btn .q-icon')
    expect(css).toContain('1.715em')
  })

  it('safelists dynamically-rendered modifier/part tokens', async () => {
    expect(quasarSafelist).toContain('q-toggle__thumb')
    expect(quasarSafelist).toContain('q-btn--no-uppercase')
  })

  it('does not center item content (no align-items on q-item blocks)', async () => {
    const css = await cssFor('q-item q-item__section')
    const itemBlock = block(css, '.q-item')
    expect(itemBlock).not.toBe('')
    expect(itemBlock).not.toContain('align-items:center')
    const sectionBlock = block(css, '.q-item__section')
    expect(sectionBlock).not.toBe('')
    expect(sectionBlock).not.toContain('align-items:center')
  })

  it('gives q-card surface padding', async () => {
    const css = await cssFor('q-card')
    expect(block(css, '.q-card')).toMatch(
      /padding:(16px|var\(--q-space[^)]*\))/
    )
  })

  it('rounds q-btn via the md3 radius token', async () => {
    const css = await cssFor('q-btn')
    expect(block(css, '.q-btn')).toContain('border-radius')
  })

  it('positions q-toolbar relatively', async () => {
    const css = await cssFor('q-toolbar')
    expect(block(css, '.q-toolbar')).toContain('position:relative')
  })
})
