// `quasarWind4Options` is the fragment consumers hand to wind4 now that the preset
// no longer nests it. Its docblock claims two behaviours; both are asserted here,
// because the failure mode of getting them wrong is silent:
//
//   - `preflights: { reset: false }` — wind4's base reset clobbers Quasar's own
//     control styling (measured in INVESTIGATION.md), and a *wrong* value here
//     looks like a Quasar bug rather than a config mistake.
//   - `dark: { light: '.body--light', dark: '.body--dark' }` — wind4 maps `dark:`
//     to Tailwind's `.dark` by default, a class Quasar never sets, so every `dark:*`
//     utility would be dead CSS.
//
// The object is deliberately *not* frozen: wind4's factory normalises the options it
// is handed by assigning to them (`options.dark = options.dark ?? 'class'`), so a
// frozen fragment throws. That is asserted too — it is the documented gotcha.
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import presetWind4 from '@unocss/preset-wind4'
import {
  QuasarPreset,
  quasarWind4Options,
  QuasarStyleEntries
} from '../src/index.js'

const sheet = async (tokens: string): Promise<string> =>
  (
    await (
      await createGenerator({
        presets: [
          presetWind4(quasarWind4Options),
          QuasarPreset({ styles: QuasarStyleEntries })
        ]
      })
    ).generate(tokens)
  ).css

describe('quasarWind4Options', () => {
  it('turns wind4’s reset off and points its dark variant at Quasar’s body classes', () => {
    expect(quasarWind4Options.preflights).toEqual({ reset: false })
    expect(quasarWind4Options.dark).toEqual({
      light: '.body--light',
      dark: '.body--dark'
    })
  })

  it('is not frozen, because wind4 assigns to the options it is given', () => {
    expect(Object.isFrozen(quasarWind4Options)).toBe(false)
    // handing it over must not throw, which is what a frozen object would do
    expect(() => presetWind4(quasarWind4Options)).not.toThrow()
  })

  it('emits the dark: variant under .body--dark, not Tailwind’s .dark', async () => {
    const css = await sheet('dark:bg-black')
    expect(css).toContain('.body--dark')
    // the whole point: without the mapping this rule would target `.dark`, which
    // Quasar never sets, so the utility would never apply
    expect(css).not.toMatch(/\.dark\s+\.dark\\:bg-black/)
  })

  it('keeps Quasar-owned classes ours regardless of array order', async () => {
    const forward = await sheet('q-btn')
    const reversed = (
      await (
        await createGenerator({
          presets: [
            QuasarPreset({ styles: QuasarStyleEntries }),
            presetWind4(quasarWind4Options)
          ]
        })
      ).generate('q-btn')
    ).css
    expect(forward.includes('.q-btn')).toBe(true)
    expect(reversed.includes('.q-btn')).toBe(true)
  })
})
