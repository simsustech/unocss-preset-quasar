import type { ComponentRule } from '../../rules/types.js'

/**
 * Dark mode utilities — ported from core/dark.unocss.ts.
 *
 * In the new token system, dark colors are emitted as --q-* overrides on
 * body.body--dark by the token preflight. The q-dark utility applies those
 * same dark colors to an element regardless of body class, by referencing
 * the dark-specific custom properties emitted on :root.
 *
 * Note: dark color values are emitted as --q-dark-* custom properties on
 * :root by the token preflight (see tokens/preflight.ts), allowing .q-dark
 * to apply dark colors standalone.
 */

/** Single rule entry helper — keeps tuple type [RegExp, matcher] */
function rule(
  regex: RegExp,
  matcher: () => Record<string, string>
): ComponentRule {
  return [regex, matcher]
}

export const darkRules: ComponentRule[] = [
  // q-dark: force dark colors on an element
  rule(/^q-dark$/, () => ({
    color: 'var(--q-dark-on-surface)',
    'background-color': 'var(--q-dark-surface)'
  }))
]
