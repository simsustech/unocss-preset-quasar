import type { DynamicShortcutMatcher } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

/**
 * Build a UnoCSS shortcut handler that returns the theme override for a
 * component class if one is configured, otherwise falls back to a literal
 * class string. Replaces the `([, c], { theme }) => theme.quasar?.components?.['x'] ?? '...'`
 * boilerplate that appears ~600 times across the MD3 component shortcuts.
 *
 * The returned function preserves the exact original behavior — same
 * match signature, same context dispatch, same fallback semantics.
 */
export const mdComponent = (
  name: string,
  fallback: string
): DynamicShortcutMatcher<QuasarTheme> => {
  return (_match, { theme }) =>
    (theme.quasar?.components as Record<string, string> | undefined)?.[name] ??
    fallback
}

/**
 * Same as `mdComponent` but for shortcuts that don't need a theme override
 * at all (purely static class strings). Lets you write
 *
 *   [/^q-card__section$/, mdStatic('relative')]
 *
 * instead of the more verbose
 *
 *   [/^q-card__section$/, ([, c], { theme }) => 'relative']
 */
export const mdStatic = (
  classes: string
): DynamicShortcutMatcher<QuasarTheme> => {
  return () => classes
}

/**
 * Like `mdComponent`, but lets the fallback depend on the rule context
 * (e.g. when it needs `theme.quasar.z.fab`). The override lookup still
 * happens first, so this only computes the fallback when no override is
 * configured.
 */
export const mdComponentCtx = (
  name: string,
  fallback: (ctx: { theme: QuasarTheme }) => string
): DynamicShortcutMatcher<QuasarTheme> => {
  return (_match, ctx) =>
    (ctx.theme.quasar?.components as Record<string, string> | undefined)?.[
      name
    ] ?? fallback(ctx)
}
