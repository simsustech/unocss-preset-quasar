import { describe, expect, it } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'

describe('QCarousel fullscreen', () => {
  it('emits the real fullscreen selector with viewport height', async () => {
    const gen = await createGenerator({
      presets: [QuasarPreset({ styles: QuasarStyleEntries })]
    })
    const { css } = await gen.generate('q-carousel fullscreen', {
      preflights: false
    })

    expect(css).toMatch(/\.q-carousel\.fullscreen[^{}]*\{/)
    expect(css).toMatch(/\.q-carousel\.fullscreen[^{}]*\{[^}]*height:100%/)
  })
})
