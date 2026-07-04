import type { Preflight } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'
import type { DesignTokens, TokenBlock } from './_tokens.js'
import { tokens as defaultTokens } from './_tokens.js'

export function mergeTokens(user?: Partial<DesignTokens>): DesignTokens {
  if (!user) return defaultTokens
  const deep = (target: any, source: any): any => {
    const out = { ...target }
    for (const key of Object.keys(source)) {
      if (
        source[key] &&
        typeof source[key] === 'object' &&
        !Array.isArray(source[key])
      )
        out[key] = deep(target[key] || {}, source[key])
      else out[key] = source[key]
    }
    return out
  }
  return deep(defaultTokens, user) as DesignTokens
}

const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
const v = (...parts: string[]) => `--q-${parts.map(kebab).join('-')}`

/** Emit a body-scoped CSS variable block */
const emitBlock = (bodyClass: string, block: TokenBlock): string => {
  const lines: string[] = []
  for (const [key, val] of Object.entries(block.color))
    lines.push(`  ${v(key)}: ${val};`)
  for (const [key, val] of Object.entries(block.shape))
    lines.push(`  ${v(key)}: ${val};`)
  for (const [key, val] of Object.entries(block.sizing))
    lines.push(`  ${v(key)}: ${val};`)
  for (const [key, val] of Object.entries(block.type))
    lines.push(`  ${v(key)}: ${val};`)
  return `body.${bodyClass} {\n${lines.join('\n')}\n}`
}

/** Emit dark-mode overrides: swap `var(--light-*)` → `var(--dark-*)` */
const emitDark = (bodyClass: string, block: TokenBlock): string => {
  const lines: string[] = []
  for (const [key, val] of Object.entries(block.color))
    lines.push(`  ${v(key)}: ${val.replace(/--light-/g, '--dark-')};`)
  return `body.body--dark.${bodyClass} {\n${lines.join('\n')}\n}`
}

export function createTokenPreflight(
  tokens: DesignTokens
): Preflight<QuasarTheme> {
  return {
    getCSS: () => `
/* ===== Quasar Design Tokens ===== */

${emitBlock('quasar-style-md3', tokens.md3)}

${emitBlock('quasar-style-md2', tokens.md2)}

${emitBlock('quasar-style-unstyled', tokens.unstyled)}

/* ===== Dark mode overrides ===== */
${emitDark('quasar-style-md3', tokens.md3)}

${emitDark('quasar-style-md2', tokens.md2)}`
  }
}
