import { createGenerator } from 'unocss'
import presetWind4 from '@unocss/preset-wind4'
import { describe, expect, it } from 'vitest'
import { QuasarPreset } from '../src/index.js'
import { generateTheme } from '../src/theme/quasar-theme.js'

/**
 * Every palette class resolves to the same colour on either engine.
 *
 * The palette reaches the engine through `extendTheme`, and the two engines
 * compile it differently: mini inlines the value (`rgb(121 85 72 / var(--un-bg-opacity))`),
 * wind4 emits `color-mix(in oklab, var(--colors-brown) …)`. Both have to end up at
 * Quasar's colour — with one exception this file was written for: `bg-light-blue` /
 * `text-light-blue` are mini's *own* spelling of its Tailwind **sky** family
 * (`lightblue` / `lightBlue` / `sky` are a single theme entry whose `DEFAULT` is
 * `#38bdf8`), so the bare name never consults our palette. The numbered shades are
 * unaffected, because mini looks our `light-blue-5` key up directly.
 *
 * The preset emits those two names itself (`enforce: 'post'` displaces mini's rule
 * for exactly them). This is the ratchet around that: same colour on both engines,
 * on the classes that resolve through the palette, plus the pins that prove the
 * comparison is not vacuous.
 */
const wind4Options = {
  preflights: { reset: false },
  dark: { light: '.body--light', dark: '.body--dark' }
}

const paletteKeys = (() => {
  const theme = generateTheme('#1976d2')
  return Object.entries(theme.colors)
    .filter(
      ([key, value]) =>
        key !== 'light' && key !== 'dark' && typeof value === 'string'
    )
    .map(([key]) => key)
})()

/** The numeric components of a colour, so `#795548` == `rgb(121 85 72 / 1)`. */
const components = (colour: string): string => {
  const hex = colour.match(/#([0-9a-f]{6})\b/i)
  if (hex) {
    const int = Number.parseInt(hex[1], 16)
    return [int >> 16, (int >> 8) & 255, int & 255]
      .map((channel) => String(channel & 255))
      .join(',')
  }
  const channels = (colour.match(/-?[\d.]+/g) ?? []).map(Number)
  return (
    channels.length === 4 && channels[3] === 1 ? channels.slice(0, 3) : channels
  ).join(',')
}

/**
 * The colour each `bg-*`/`text-*` class of one configuration resolves to.
 *
 * Vars are resolved from the declaration's **own block** first (`--un-bg-opacity`
 * is declared per rule by mini, not globally), then from the sheet, and an
 * engine opacity variable nobody declares means 100% — that is the engine's own
 * registered default.
 */
async function resolveColours(
  presets: unknown[],
  tokens: string[]
): Promise<Map<string, string>> {
  const gen = await createGenerator({ presets: presets as never[] })
  const { css } = await gen.generate(tokens.join(' '), { preflights: true })

  // Every `:root` block the sheet declares, merged: that is where the role aliases
  // (`bg-primary` and friends) live, and where the preflight states our own
  // `--q-*` defaults in a block of their own.
  const rootBlocks = [...css.matchAll(/:root\s*\{([^{}]*)\}/g)].map(
    (match) => match[1]
  )
  const sheetVars = new Map(
    rootBlocks.flatMap((block) =>
      [...block.matchAll(/(--[\w-]+)\s*:\s*([^;}]+)/g)].map((m) => [
        m[1],
        m[2].trim()
      ])
    )
  )

  const resolve = (value: string, local: Map<string, string>): string => {
    let out = value
    for (let i = 0; i < 6; i++) {
      const next = out.replace(
        /var\((--[\w-]+)(?:\s*,\s*([^()]*))?\)/g,
        (whole, name: string, fallback?: string) => {
          const declared = local.get(name) ?? sheetVars.get(name)
          if (declared !== undefined) return declared
          if (fallback?.trim()) return fallback.trim()
          // The engine's registered default for its own opacity variables.
          if (/^--un-[\w-]*-opacity$/.test(name)) return '100%'
          return whole
        }
      )
      if (next === out) break
      out = next
    }
    return out
  }

  const out = new Map<string, string>()
  for (const match of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    // A `@supports` twin carries the same colour; the plain rule is compared.
    if (match[1].includes('@supports')) continue
    const body = match[2]
    const local = new Map(
      [...body.matchAll(/(--[\w-]+)\s*:\s*([^;}]+)/g)].map((m) => [
        m[1],
        m[2].trim()
      ])
    )
    const selectors = match[1]
      .split(',')
      .map((selector) => selector.trim().replace(/\s+/g, ' '))
    for (const declaration of body.split(';')) {
      const idx = declaration.indexOf(':')
      if (idx < 0) continue
      const property = declaration.slice(0, idx).trim()
      if (property !== 'background-color' && property !== 'color') continue
      const resolved = resolve(declaration.slice(idx + 1).trim(), local)
        // `color-mix(in <space>, <colour> <alpha>, transparent)` is the colour at
        // that alpha; the mixing space does not change which colour it is.
        .replace(
          /color-mix\(\s*in\s+[\w-]+\s*,\s*([^,()]+?)\s+([\d.]+%?)\s*,\s*transparent\s*\)/g,
          (_, colour: string, alpha: string) => `${colour.trim()} / ${alpha}`
        )
        .replace(
          /\/\s*([\d.]+)%/,
          (_, alpha: string) => `/ ${Number(alpha) / 100}`
        )
      for (const selector of selectors) out.set(selector, resolved)
    }
  }
  return out
}

const tokens = paletteKeys.flatMap((key) => [`bg-${key}`, `text-${key}`])

describe('palette classes resolve to the same colour on either engine', () => {
  it('agrees class for class, including the alpha-carrying names', async () => {
    const [mini, wind4] = await Promise.all([
      resolveColours([QuasarPreset({})], tokens),
      resolveColours([presetWind4(wind4Options), QuasarPreset({})], tokens)
    ])

    const differing: string[] = []
    const unresolved: string[] = []
    let compared = 0
    for (const token of tokens) {
      const ours = mini.get(`.${token}`)
      const theirs = wind4.get(`.${token}`)
      if (ours === undefined || theirs === undefined) continue
      compared++
      // A pair that still carries a `var()` never resolved — comparing it would
      // pass vacuously.
      if (/var\(/.test(ours) || /var\(/.test(theirs)) {
        unresolved.push(`${token}: mini ${ours} vs wind4 ${theirs}`)
        continue
      }
      if (components(ours) !== components(theirs)) {
        differing.push(`${token}: mini ${ours} vs wind4 ${theirs}`)
      }
    }
    // Guard against a vacuous pass: the sweep has to have compared something.
    expect(compared).toBeGreaterThan(500)
    expect(unresolved).toEqual([])
    expect(differing).toEqual([])
  })

  it('resolves the sampled classes to Quasar’s values, not the engine’s', async () => {
    const mini = await resolveColours(
      [QuasarPreset({})],
      [
        'bg-brown',
        'bg-separator',
        'bg-light-blue',
        'text-light-blue',
        'bg-light-blue-9'
      ]
    )
    // Value the palette entry carries, independent of the engine.
    expect(components(mini.get('.bg-brown') ?? '')).toBe('121,85,72')
    // A colour with alpha: the engine keeps it in its own opacity variable.
    expect(components(mini.get('.bg-separator') ?? '')).toBe('0,0,0,0.12')
    // The two names mini would otherwise shadow with its sky family…
    expect(components(mini.get('.bg-light-blue') ?? '')).toBe('3,169,244')
    expect(components(mini.get('.text-light-blue') ?? '')).toBe('3,169,244')
    // …while the numbered shade was never shadowed.
    expect(components(mini.get('.bg-light-blue-9') ?? '')).toBe('2,119,189')
  })
})
