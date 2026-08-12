import type { Preflight } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'
import type { QuasarStyleEntry, TokenBlock } from './_tokens.js'
import { DEFAULTS } from './_tokenDefaults.js'

export type { QuasarStyleEntry } from './_tokens.js'

const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)

/** Emit CSS custom properties for one style block under a selector, filling defaults */
const emitBlock = (selector: string, block: TokenBlock): string => {
  const lines: string[] = []
  const all = {
    ...DEFAULTS,
    ...block.color,
    ...block.shape,
    ...block.sizing,
    ...block.type,
    ...block.component
  }
  for (const [key, val] of Object.entries(all))
    lines.push(`  --q-${kebab(key)}: ${val};`)
  return `${selector} {\n${lines.join('\n')}\n}`
}

/** Emit dark overrides: swap --light- → --dark- for color/component keys */
const emitDarkBlock = (selector: string, block: TokenBlock): string => {
  const lines: string[] = []
  const all = {
    ...block.color,
    ...block.component
  }
  for (const [key, val] of Object.entries(all))
    lines.push(`  --q-${kebab(key)}: ${val.replace(/--light-/g, '--dark-')};`)
  return `${selector} {\n${lines.join('\n')}\n}`
}

/** Emit the default style globally on `:root` — works with no body class */
const emitDefault = (block: TokenBlock): string => emitBlock(':root', block)

/** Emit the default style's dark overrides on `body.body--dark` */
const emitDarkDefault = (block: TokenBlock): string =>
  emitDarkBlock('body.body--dark', block)

/**
 * Token preflight. Reads the style entries from the UnoCSS theme
 * (`theme.quasar.tokens`, injected by the preset's `extendTheme`) so
 * users can override token values with plain UnoCSS theme config.
 *
 * The first style entry is the default style: its tokens are ALSO emitted
 * unscoped on `:root` (and `body.body--dark` for dark mode), so the preset
 * works out of the box with zero config — no `quasar-style-*` body class
 * required. Every entry (including the default) additionally keeps its
 * scoped `body.quasar-style-{name}` block, so `setStyle()` can still switch
 * styles at runtime; the scoped selectors outrank `:root` in the cascade.
 */
export function createTokenPreflight(): Preflight<QuasarTheme> {
  return {
    getCSS: ({ theme }) => {
      const entries = (
        theme.quasar as { tokens?: QuasarStyleEntry[] } | undefined
      )?.tokens
      if (!entries?.length) return ''
      const parts: string[] = ['/* ===== Quasar Design Tokens ===== */']
      // First entry = default style. Emit unscoped so tokens work with no
      // body class; dark defaults apply under body--dark.
      const [defaultEntry] = entries
      parts.push(emitDefault(defaultEntry.tokens))
      parts.push(emitDarkDefault(defaultEntry.tokens))
      // Every entry keeps its scoped block so setStyle() can round-trip.
      for (const entry of entries)
        parts.push(emitBlock(`body.quasar-style-${entry.name}`, entry.tokens))
      parts.push('/* ===== Dark mode overrides ===== */')
      for (const entry of entries)
        parts.push(
          emitDarkBlock(
            `body.body--dark.quasar-style-${entry.name}`,
            entry.tokens
          )
        )
      return parts.join('\n\n')
    }
  }
}
