import type { ComponentRule } from '../../rules/types.js'

/**
 * Typography utilities — ported from core/typography.unocss.ts.
 *
 * Text styling utilities: heading sizes, body text, captions, alignment,
 * transform, weight, and whitespace.
 */

/** Single rule entry helper — keeps tuple type [RegExp, matcher] */
function rule(
  regex: RegExp,
  matcher: () => Record<string, string | number>
): ComponentRule {
  return [regex, matcher]
}

export const typographyRules: ComponentRule[] = [
  [
    /^q-body$/,
    // Synthetic token (safelisted): emits Quasar body typography on the bare
    // `body` element via symbols.selector — no preflight. Source: former
    // core/typography/preflights.ts body block + reference `body` rule
    // (Roboto stack, 14px/1.5, margin 0).
    function* (_: unknown, { symbols }: any): Generator<any, void, any> {
      yield {
        [symbols.selector]: () => 'body',
        'font-family':
          "Roboto, -apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif",
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '14px',
        'line-height': 1.5,
        margin: 0,
        '-webkit-font-smoothing': 'antialiased'
      }
      // Universal box-sizing (replaces resetPreflight's :where block, deleted
      // step 3). Merged here: one rule per token — duplicate /^q-body$/
      // entries would drop each other.
      yield {
        [symbols.selector]: () => '*,::before,::after',
        'box-sizing': 'border-box'
      }
    }
  ],
  // --- Heading sizes ---
  rule(/^text-h1$/, () => ({
    // quasar: this value is Quasar's own, not a forked token
    'font-size': '6rem',
    'font-weight': 300,
    'line-height': '6rem',
    'letter-spacing': '-0.01562em'
  })),
  rule(/^text-h2$/, () => ({
    'font-size': '3.75rem',
    'font-weight': 300,
    'line-height': '3.75rem',
    'letter-spacing': '-0.00833em'
  })),
  rule(/^text-h3$/, () => ({
    'font-size': '3rem',
    'font-weight': 400,
    'line-height': '3.125rem',
    'letter-spacing': 'normal'
  })),
  rule(/^text-h4$/, () => ({
    'font-size': '2.125rem',
    'font-weight': 400,
    'line-height': '2.5rem',
    'letter-spacing': '0.00735em'
  })),
  rule(/^text-h5$/, () => ({
    'font-size': '1.5rem',
    'font-weight': 400,
    'line-height': '2rem',
    'letter-spacing': 'normal'
  })),
  rule(/^text-h6$/, () => ({
    'font-size': '1.25rem',
    'font-weight': 500,
    'line-height': '2rem',
    'letter-spacing': '0.0125em'
  })),

  // --- Subtitles ---
  rule(/^text-subtitle1$/, () => ({
    'font-size': '1rem',
    'font-weight': 400,
    'line-height': '1.75rem',
    'letter-spacing': '0.00937em'
  })),
  rule(/^text-subtitle2$/, () => ({
    'font-size': '0.875rem',
    'font-weight': 500,
    'line-height': '1.375rem',
    'letter-spacing': '0.00714em'
  })),

  // --- Body text ---
  rule(/^text-body1$/, () => ({
    'font-size': '1rem',
    'font-weight': 400,
    'line-height': '1.5rem',
    'letter-spacing': '0.03125em'
  })),
  rule(/^text-body2$/, () => ({
    'font-size': '0.875rem',
    'font-weight': 400,
    'line-height': '1.4rem',
    'letter-spacing': '0.01786em'
  })),

  // --- Overline / Caption ---
  rule(/^text-overline$/, () => ({
    'font-size': '0.75rem',
    'font-weight': 500,
    'line-height': '2rem',
    'letter-spacing': '0.16667em'
  })),
  rule(/^text-caption$/, () => ({
    'font-size': '0.75rem',
    'font-weight': 400,
    'line-height': '1.25rem',
    'letter-spacing': '0.03333em'
  })),

  // --- Text transform ---
  rule(/^text-uppercase$/, () => ({ 'text-transform': 'uppercase' })),
  rule(/^text-lowercase$/, () => ({ 'text-transform': 'lowercase' })),
  rule(/^text-capitalize$/, () => ({ 'text-transform': 'capitalize' })),

  // --- Text alignment ---
  rule(/^text-center$/, () => ({ 'text-align': 'center' })),
  rule(/^text-left$/, () => ({ 'text-align': 'left' })),
  rule(/^text-right$/, () => ({ 'text-align': 'right' })),
  rule(/^text-justify$/, () => ({ 'text-align': 'justify' })),

  // --- Text style ---
  rule(/^text-italic$/, () => ({ 'font-style': 'italic' })),
  rule(/^text-bold$/, () => ({ 'font-weight': 700 })),
  rule(/^text-no-wrap$/, () => ({ 'white-space': 'nowrap' })),
  rule(/^text-strike$/, () => ({ 'text-decoration': 'line-through' })),

  // --- Font weight ---
  rule(/^text-weight-thin$/, () => ({ 'font-weight': 100 })),
  rule(/^text-weight-light$/, () => ({ 'font-weight': 300 })),
  rule(/^text-weight-regular$/, () => ({ 'font-weight': 400 })),
  rule(/^text-weight-medium$/, () => ({ 'font-weight': 500 })),
  rule(/^text-weight-bold$/, () => ({ 'font-weight': 700 })),
  rule(/^text-weight-bolder$/, () => ({ 'font-weight': 900 }))
]
