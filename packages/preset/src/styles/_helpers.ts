import type { DynamicShortcutMatcher } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

/**
 * Escape `__` as `\_\_` so UnoCSS does not treat the double
 * underscore as a child selector (the `_` → ` ` translation).
 */
export const qe = (
  strings: TemplateStringsArray | string,
  ...values: unknown[]
): string => {
  const escape = (s: string) => s.replace(/__/g, '\\_\\_')
  if (typeof strings === 'string') return escape(strings)
  let result = ''
  for (let i = 0; i < strings.length; i++) {
    result += escape(strings[i])
    if (i < values.length) result += String(values[i])
  }
  return result
}

/**
 * Wrap a flat utility string to be scoped under the body-class + component
 * class selector so the rule only applies when the matching body class is
 * active (e.g. `body.quasar-style-md3 .q-btn`).
 */
function scopeUtils(
  utils: string,
  componentClass: string,
  bodyClass: string | undefined
): string {
  if (!bodyClass || utils.includes(bodyClass)) return utils
  // Split on whitespace but keep bracket groups intact
  const parts = utils.match(/(?:\[[^\]]+\]|\[[^\]]*:[^\]]*\])|(?:\([^)]+\))|[^\s]+/g) || [utils]
  return parts.map((u) => {
    if (!u || u.startsWith('[')) return u // Already scoped or has own selector
    if (u.startsWith('(')) return u // Grouped utilities
    return `[body\.${bodyClass}_\.${componentClass}]:${u}`
  }).join(' ')
}

/**
 * Build a UnoCSS shortcut handler that returns the theme override for a
 * component class if one is configured, otherwise falls back to a literal
 * class string.
 */
export const componentClass = (
  name: string,
  fallback: string
): DynamicShortcutMatcher<QuasarTheme> => {
  return (_match, { theme }) => {
    const css = (theme.quasar?.components as Record<string, string> | undefined)?.[name] ??
      fallback
    return scopeUtils(css, name, (theme.quasar as any)?.bodyClass)
  }
}

/**
 * Same as `componentCtxClass` but for constant class strings.
 */
export const staticClass = (
  classes: string
): DynamicShortcutMatcher<QuasarTheme> => {
  return () => classes
}

/**
 * Like `componentClass`, but lets the fallback depend on the rule context
 * (e.g. when it needs `theme.quasar.z.fab`).
 */
export const componentCtxClass = (
  name: string,
  fallback: (ctx: { theme: QuasarTheme }) => string
): DynamicShortcutMatcher<QuasarTheme> => {
  return (_match, ctx) => {
    const css = (ctx.theme.quasar?.components as Record<string, string> | undefined)?.[name] ??
      fallback(ctx)
    return scopeUtils(css, name, (ctx.theme.quasar as any)?.bodyClass)
  }
}
