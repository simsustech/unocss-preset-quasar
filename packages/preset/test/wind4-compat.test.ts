import { createGenerator } from 'unocss'
import presetWind4 from '@unocss/preset-wind4'
import { describe, expect, it } from 'vitest'
import { QuasarPreset, quasarWind4Options } from '../src/index.js'

/**
 * A consumer that wants wind4 adds it themselves. Two things then depend on
 * *our* configuration fragment, and both are order-sensitive without it:
 *
 * - the `dark:` variant: wind4 maps it to Tailwind's `.dark` class unless told
 *   otherwise, and Quasar never sets that class, so a `dark:*` utility would
 *   never match. The fragment points it at Quasar's own scheme selectors.
 * - the base reset: wind4 ships one that clobbers Quasar's own control styling.
 *
 * Whatever the two engines disagree about (`bg-red-5`'s value form, mini's
 * `light-blue`, the `p-4` spelling) must at least be *decided*, and decided the
 * same way in either array order for the names Quasar owns: this preset carries
 * `enforce: 'post'`, so `col-6` and the palette stay ours.
 */
describe('a consumer’s wind4 is configured by the preset’s fragment', () => {
  const orders = (): [label: string, presets: unknown[]][] => [
    ['wind4 first', [presetWind4(quasarWind4Options), QuasarPreset({})]],
    ['wind4 last', [QuasarPreset({}), presetWind4(quasarWind4Options)]]
  ]

  const sheet = async (presets: unknown[], content: string) => {
    const gen = await createGenerator({ presets: presets as never[] })
    return (await gen.generate(content, { preflights: true })).css
  }

  it('exports the fragment the nesting used to apply', () => {
    expect(quasarWind4Options).toEqual({
      preflights: { reset: false },
      dark: { light: '.body--light', dark: '.body--dark' }
    })
  })

  it('keeps `dark:` on Quasar’s scheme selectors in either order', async () => {
    for (const [label, presets] of orders()) {
      const css = await sheet(presets, 'dark:bg-black')
      expect(css, label).toMatch(/\.body--dark[^{]*\{[^}]*background-color/)
      // Tailwind's `.dark` class is never set by Quasar, so a rule hanging off it
      // would be dead CSS.
      expect(css, label).not.toMatch(/(^|[},])\s*\.dark\s+\.dark\\:bg-black/)
    }
  })

  it('keeps Quasar’s own class names ours in either order', async () => {
    for (const [label, presets] of orders()) {
      const css = await sheet(presets, 'col-6')
      expect(css, label).toContain('--q-col-span')
      expect(css, label).not.toContain('grid-column: 6')
    }
  })

  it('resolves a palette class to Quasar’s colour in either order', async () => {
    for (const [label, presets] of orders()) {
      const css = await sheet(presets, 'bg-red-5')
      const block = css.match(/\.bg-red-5[^{]*\{[^}]*\}/)?.[0] ?? ''
      const declaration =
        block.match(/background-color:\s*([^;}]+)/)?.[1]?.trim() ?? ''
      // wind4 spells it `color-mix(… var(--colors-red-5) …)`, mini inlines it.
      const resolved = declaration.replace(
        /var\(--colors-red-5\)/,
        () => css.match(/--colors-red-5:\s*([^;}]+)/)?.[1]?.trim() ?? ''
      )
      // The palette value arrives either as `#ef5350` or as `rgb(239 83 80 …)`.
      const hex = resolved.match(/#([0-9a-f]{6})/i)
      const channels = hex
        ? [
            Number.parseInt(hex[1], 16) >> 16,
            (Number.parseInt(hex[1], 16) >> 8) & 255,
            Number.parseInt(hex[1], 16) & 255
          ]
        : (resolved.match(/\d+/g) ?? []).map(Number)
      expect(channels.slice(0, 3).join(','), `${label}: ${resolved}`).toBe(
        '239,83,80'
      )
    }
  })
})
