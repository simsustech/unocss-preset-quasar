import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'
import { generateColorTokens } from '../src/theme/colors.js'

/**
 * Status colours have to be scheme-aware.
 *
 * Quasar reads one token per status for *both* roles — `.text-positive`
 * (money columns) and `.bg-positive` / `color="positive"` fills — and
 * `theme/colors.ts` harmonized a single hex per status for both schemes.
 * The brand red and green are mid-tone, so they clear 4.5:1 against neither
 * extreme: `text-positive` measured 2.33:1 on the light surface (2.22:1 on
 * the zebra row) and `text-negative` 2.68:1 on the dark surface, in the
 * tables whose whole purpose is showing money.
 *
 * The fix pins an MD3 tone per scheme (derived from the harmonized brand hue,
 * never hand-picked), so each scheme gets the rung its surface needs.
 */

/** WCAG 2.x relative luminance of a `#rrggbb` colour. */
function luminance(hex: string): number {
  const int = Number.parseInt(hex.replace('#', ''), 16)
  const channel = (value: number) => {
    const c = value / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return (
    0.2126 * channel((int >> 16) & 255) +
    0.7152 * channel((int >> 8) & 255) +
    0.0722 * channel(int & 255)
  )
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

/**
 * Every declaration block whose selector *is* `needle` (exact, not substring).
 *
 * Plural on purpose: the sheet states `body.body--dark` three times — the
 * colour roles, the Quasar aliases (this fix) and the shadow primitives — so a
 * first-match lookup reads a block that never declared the property and the
 * assertion fails for the wrong reason.
 */
function blocks(css: string, needle: string): string[] {
  return [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
    .filter((match) => match[1].trim() === needle)
    .map((match) => match[2])
}

/** The value of `prop` wherever the sheet declares it under `selector`. */
function declared(
  css: string,
  selector: string,
  prop: string
): string | undefined {
  for (const body of blocks(css, selector)) {
    const value = body.match(new RegExp(`${prop}\\s*:\\s*([^;}]+)`))?.[1]
    if (value) return value.trim()
  }
  return undefined
}

async function preflightCss(): Promise<string> {
  const gen = await createGenerator({
    presets: [QuasarPreset({ styles: QuasarStyleEntries })]
  })
  return (await gen.generate('text-positive', { preflights: true })).css
}

const TEXT_MIN = 4.5
/** WCAG 1.4.11: non-text contrast, for the white glyph on a status fill. */
const GLYPH_MIN = 3

describe('status colours', () => {
  const tokens = generateColorTokens('#1976d2')

  it('carries a per-scheme value per status, not one shared hex', () => {
    expect(tokens.quasarDark.positive).not.toBe(tokens.quasar.positive)
    expect(tokens.quasarDark.negative).not.toBe(tokens.quasar.negative)
  })

  it('clears 4.5:1 as text on its own surface and on the table row', () => {
    const cases: Array<[string, string, string, string]> = [
      ['light positive', tokens.quasar.positive, tokens.light.surface, '2.33'],
      [
        'light positive / zebra row',
        tokens.quasar.positive,
        tokens.light.surfaceContainerLow,
        '2.22'
      ],
      ['light negative', tokens.quasar.negative, tokens.light.surface, '9.1'],
      ['dark positive', tokens.quasarDark.positive, tokens.dark.surface, '6.6'],
      [
        'dark negative',
        tokens.quasarDark.negative,
        tokens.dark.surface,
        '2.68'
      ],
      [
        'dark negative / zebra row',
        tokens.quasarDark.negative,
        tokens.dark.surfaceContainerLow,
        '2.56'
      ]
    ]

    for (const [name, status, surface, before] of cases) {
      const ratio = contrast(status, surface)
      expect(
        ratio,
        `${name}: ${status} on ${surface} is ${ratio.toFixed(2)}:1, was ${before}:1 before this fix`
      ).toBeGreaterThanOrEqual(TEXT_MIN)
    }
  })

  it('keeps a white glyph legible on the status fill (1.4.11)', () => {
    for (const [name, status] of [
      ['light positive', tokens.quasar.positive],
      ['dark positive', tokens.quasarDark.positive],
      ['light negative', tokens.quasar.negative],
      ['dark negative', tokens.quasarDark.negative]
    ] as const) {
      const ratio = contrast('#ffffff', status)
      expect(ratio, `${name} fill: white on ${status}`).toBeGreaterThanOrEqual(
        GLYPH_MIN
      )
    }
  })

  it('emits both statuses in the dark block, not only the light one', async () => {
    const css = await preflightCss()

    for (const prop of ['--q-positive', '--q-negative']) {
      const lightValue = declared(css, ':root', prop)
      const darkValue = declared(css, 'body.body--dark', prop)

      expect(lightValue, `${prop} on :root`).toBeDefined()
      expect(darkValue, `${prop} in body.body--dark (the defect)`).toBeDefined()
      expect(darkValue, `${prop} must differ per scheme`).not.toBe(lightValue)
    }
  })
})
