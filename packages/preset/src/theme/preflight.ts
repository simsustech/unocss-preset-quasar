import type { Preflight } from '@unocss/core'
import type { ColorBlock } from './colors.js'
import type { StyleEntry, TokenBlock } from './types.js'

/**
 * Emit CSS custom properties.
 * - Colors on :root (shared, from sourceColor)
 * - Default style tokens on :root (zero-config)
 * - Per-style overrides on body.quasar-style-{name} (only tokens that differ from default)
 * - Dark overrides on body.body--dark (default) and body.body--dark.quasar-style-{name}
 */
export function createTokenPreflight(params: {
  colors: ColorBlock
  defaultStyle: StyleEntry
  styles: StyleEntry[]
}): Preflight {
  return {
    getCSS: () => {
      const parts: string[] = []
      // 1. Colors on :root (shared)
      parts.push(
        renderColorBlock(':root', params.colors.light, params.colors.quasar)
      )
      // 2. Default style tokens on :root
      parts.push(renderTokenBlock(':root', params.defaultStyle.tokens))
      // 3. Per-style overrides (only diffs from default)
      for (const style of params.styles) {
        const diff = diffTokens(params.defaultStyle.tokens, style.tokens)
        if (Object.keys(diff).length > 0) {
          parts.push(renderTokenBlock(`body.quasar-style-${style.name}`, diff))
        }
      }
      // 4. Dark overrides: ONLY color tokens (shape/typography/etc are same in dark)
      parts.push(renderColorDarkBlock('body.body--dark', params.colors.dark))
      // 4b. Dark tokens on :root (for .q-dark utility to reference)
      parts.push(
        renderColorBlock(':root', params.colors.dark, undefined, '-dark')
      )
      for (const style of params.styles) {
        // Per-style dark: only if style has color overrides (it doesn't — colors are shared)
        // This block is for completeness; colors are shared so no per-style dark overrides needed
        void style
      }
      return parts.join('\n\n')
    }
  }
}

function renderColorBlock(
  selector: string,
  colors: TokenBlock['color'],
  quasar?: ColorBlock['quasar'],
  suffix = ''
): string {
  const lines: string[] = []
  for (const [key, value] of Object.entries(colors)) {
    lines.push(`  --q${suffix}-${kebab(key)}: ${value};`)
  }
  if (quasar) {
    for (const [key, value] of Object.entries(quasar)) {
      lines.push(`  --q${suffix}-${key}: ${value};`)
    }
  }
  return `${selector} {\n${lines.join('\n')}\n}`
}

function renderColorDarkBlock(
  selector: string,
  colors: TokenBlock['color']
): string {
  const lines: string[] = []
  for (const [key, value] of Object.entries(colors)) {
    lines.push(`  --q-${kebab(key)}: ${value};`)
  }
  return `${selector} {\n${lines.join('\n')}\n}`
}

type TokenCategories = Omit<TokenBlock, 'color'>

// SAFETY: every token category is a Record<string,string> at runtime; the typed
// interfaces (ShapeTokens, TypographyTokens, ...) have no index signature.
const asRecord = (o: unknown): Record<string, string> =>
  o as Record<string, string>

function renderTokenBlock(
  selector: string,
  tokens: Partial<TokenCategories> | TokenCategories
): string {
  const lines: string[] = []
  for (const [_category, categoryTokens] of Object.entries(tokens)) {
    if (!categoryTokens) continue
    for (const [key, value] of Object.entries(asRecord(categoryTokens))) {
      lines.push(`  --q-${kebab(key)}: ${value};`)
    }
  }
  return `${selector} {\n${lines.join('\n')}\n}`
}

function diffTokens(
  defaultTokens: TokenCategories,
  styleTokens: TokenCategories
): Partial<TokenCategories> {
  const diff: Record<string, Record<string, string>> = {}
  for (const [category, categoryTokens] of Object.entries(styleTokens)) {
    const defaultCategory = defaultTokens[category as keyof TokenCategories]
    const categoryDiff: Record<string, string> = {}
    for (const [key, value] of Object.entries(asRecord(categoryTokens))) {
      if (asRecord(defaultCategory)[key] !== value) {
        categoryDiff[key] = value
      }
    }
    if (Object.keys(categoryDiff).length > 0) {
      diff[category] = categoryDiff
    }
  }
  return diff as Partial<TokenCategories>
}

function kebab(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}
