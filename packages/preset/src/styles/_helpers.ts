import type { DynamicShortcutMatcher } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

/**
 * Escape BEM double-underscores in a string for UnoCSS shortcut strings.
 * In UnoCSS class-name position, `_` (single) means space, `__` means a
 * literal underscore character followed by another. Quasar BEM classes
 * like `q-toggle__inner` must become `q-toggle\\_\\_inner` so the
 * double-underscore is preserved as a literal part of the class name.
 * Single underscores are kept as-is because they're intential space
 * combinators in UnoCSS selector syntax.
 *
 * Usage via tagged template:
 *   qe`[&.q-btn__wrapper]:(flex)`
 *   // → "[&.q-btn\\_\\_wrapper]:(flex)"
 *
 * Or as a function:
 *   qe('.q-toggle__inner--truthy')
 *   // → ".q-toggle\\_\\_inner--truthy"
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
 * Build a UnoCSS shortcut handler that returns the theme override for a
 * component class if one is configured, otherwise falls back to a literal
 * class string. Replaces the `([, c], { theme }) => theme.quasar?.components?.['x'] ?? '...'`
 * boilerplate that appears ~600 times across the component shortcuts.
 *
 * The returned function preserves the exact original behavior — same
 * match signature, same context dispatch, same fallback semantics.
 */
export const componentClass = (
  name: string,
  fallback: string
): DynamicShortcutMatcher<QuasarTheme> => {
  return (_match, { theme }) =>
    (theme.quasar?.components as Record<string, string> | undefined)?.[name] ??
    fallback
}

/**
 * Same as `componentClass` but for shortcuts that don't need a theme override
 * at all (purely static class strings). Lets you write
 *
 *   [/^q-card__section$/, staticClass('relative')]
 *
 * instead of the more verbose
 *
 *   [/^q-card__section$/, ([, c], { theme }) => 'relative']
 */
export const staticClass = (
  classes: string
): DynamicShortcutMatcher<QuasarTheme> => {
  return () => classes
}

/**
 * Like `componentClass`, but lets the fallback depend on the rule context
 * (e.g. when it needs `theme.quasar.z.fab`). The override lookup still
 * happens first, so this only computes the fallback when no override is
 * configured.
 */
export const componentCtxClass = (
  name: string,
  fallback: (ctx: { theme: QuasarTheme }) => string
): DynamicShortcutMatcher<QuasarTheme> => {
  return (_match, ctx) =>
    (ctx.theme.quasar?.components as Record<string, string> | undefined)?.[
      name
    ] ?? fallback(ctx)
}
