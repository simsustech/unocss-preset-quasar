import type { Variant } from '@unocss/core'

/**
 * Responsive column classes carry their breakpoint inside the class name
 * (`col-sm`, not `sm:col-sm`), so there is no prefix for UnoCSS to strip and no
 * matcher that can own the media wrapper.
 *
 * Quasar wraps each of them in `@media (min-width: <bp>)`, and that wrapper is
 * load-bearing: without it `.col-12` and `.col-sm` are equal specificity with no
 * at-rule frame between them, so the base span wins by source order and every
 * `col-12 col-sm` cell stays full width at every viewport. That is the defect —
 * petboarding's AgendaPage and Kennellayout legends rendered as a vertical stack
 * instead of a row.
 *
 * A rule body cannot carry the at-rule (UnoCSS stringifies a nested `@media` key
 * to `[object Object]`), so the wrapper comes from a variant's `parent`. `match`
 * must RETURN `{ matcher, parent }`; setting `parent` as a property on the
 * variant object does not reach the at-rule emission.
 *
 * `xs` is deliberately unchanged: it is the base breakpoint (0px), so a wrapper
 * would add an at-rule frame around a rule that already applies unconditionally.
 */
export function gridBreakpointVariants(
  breakpoints: Record<string, string>
): Variant[] {
  const names = Object.keys(breakpoints).filter(
    (name) => name !== 'xs' && breakpoints[name]
  )
  if (names.length === 0) return []
  // `col-sm`, `col-sm-6`, `col-sm-auto` … — anchored so `col-span-12` and any
  // other `col-*` name that merely starts with a breakpoint is left alone.
  const pattern = new RegExp(`^col-(?:${names.join('|')})(?:-|$)`)
  const variant = {
    name: 'quasar-grid-breakpoint',
    match: (matcher: string) => {
      if (!pattern.test(matcher)) return undefined
      const name = matcher.slice('col-'.length).split('-')[0]
      const min = breakpoints[name]
      if (!min) return undefined
      return { matcher, parent: `@media (min-width: ${min})` }
    }
  }
  // SAFETY: `Variant` types `match` against its own generic matcher shape; this
  // matcher returns the documented `{ matcher, parent }` form at runtime, which
  // is the same pattern `src/index.ts` already uses for its own options.
  return [variant as unknown as Variant]
}
