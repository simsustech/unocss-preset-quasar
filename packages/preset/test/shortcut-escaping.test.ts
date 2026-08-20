import { describe, it, expect } from 'vitest'
import { createGenerator } from '@unocss/core'
import { QuasarPreset } from '../src/index.js'

/**
 * Regression test for the BEM `__` escaping contract.
 *
 * UnoCSS treats `_` inside `[&...]` arbitrary selector variants as a space.
 * BEM class names like `q-field__inner` therefore MUST be escaped (`\_\_`) in
 * raw template-literal selectors, otherwise the generated selector is mangled
 * to `.q-field _inner` (a space) and never matches the real DOM.
 *
 * The `qe` tagged template (src/styles/_helpers.ts) performs this escaping.
 * This test guards against a regression where a raw template literal with an
 * unescaped `__` is reintroduced.
 */
describe('BEM __ escaping in raw template-literal selectors', () => {
  async function generate(classes: string): Promise<string> {
    const uno = await createGenerator({
      presets: [QuasarPreset()]
    })
    const { css } = await uno.generate(classes)
    return css
  }

  it('q-field--filled produces q-field__inner / q-field__control (not mangled)', async () => {
    const css = await generate('q-field--filled')
    expect(css).toContain('q-field__inner')
    expect(css).toContain('q-field__control')
    expect(css).not.toContain('q-field _inner')
    expect(css).not.toContain('q-field _control')
  })

  it('q-notification--standard produces q-notification__actions (not mangled)', async () => {
    const css = await generate('q-notification--standard')
    expect(css).toContain('q-notification__actions')
    expect(css).not.toContain('q-notification _actions')
  })
})
