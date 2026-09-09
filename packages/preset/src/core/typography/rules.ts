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
  // --- Heading sizes ---
  rule(/^text-h1$/, () => ({
    fontSize: '6rem',
    fontWeight: 300,
    lineHeight: '6rem',
    letterSpacing: '-0.01562em'
  })),
  rule(/^text-h2$/, () => ({
    fontSize: '3.75rem',
    fontWeight: 300,
    lineHeight: '3.75rem',
    letterSpacing: '-0.00833em'
  })),
  rule(/^text-h3$/, () => ({
    fontSize: '3rem',
    fontWeight: 400,
    lineHeight: '3.125rem',
    letterSpacing: 'normal'
  })),
  rule(/^text-h4$/, () => ({
    fontSize: '2.125rem',
    fontWeight: 400,
    lineHeight: '2.5rem',
    letterSpacing: '0.00735em'
  })),
  rule(/^text-h5$/, () => ({
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: '2rem',
    letterSpacing: 'normal'
  })),
  rule(/^text-h6$/, () => ({
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: '2rem',
    letterSpacing: '0.0125em'
  })),

  // --- Subtitles ---
  rule(/^text-subtitle1$/, () => ({
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1.75rem',
    letterSpacing: '0.00937em'
  })),
  rule(/^text-subtitle2$/, () => ({
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: '1.375rem',
    letterSpacing: '0.00714em'
  })),

  // --- Body text ---
  rule(/^text-body1$/, () => ({
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1.5rem',
    letterSpacing: '0.03125em'
  })),
  rule(/^text-body2$/, () => ({
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.4rem',
    letterSpacing: '0.01786em'
  })),

  // --- Overline / Caption ---
  rule(/^text-overline$/, () => ({
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: '2rem',
    letterSpacing: '0.16667em'
  })),
  rule(/^text-caption$/, () => ({
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: '1.25rem',
    letterSpacing: '0.03333em'
  })),

  // --- Text transform ---
  rule(/^text-uppercase$/, () => ({ textTransform: 'uppercase' })),
  rule(/^text-lowercase$/, () => ({ textTransform: 'lowercase' })),
  rule(/^text-capitalize$/, () => ({ textTransform: 'capitalize' })),

  // --- Text alignment ---
  rule(/^text-center$/, () => ({ textAlign: 'center' })),
  rule(/^text-left$/, () => ({ textAlign: 'left' })),
  rule(/^text-right$/, () => ({ textAlign: 'right' })),
  rule(/^text-justify$/, () => ({ textAlign: 'justify' })),

  // --- Text style ---
  rule(/^text-italic$/, () => ({ fontStyle: 'italic' })),
  rule(/^text-bold$/, () => ({ fontWeight: 700 })),
  rule(/^text-no-wrap$/, () => ({ whiteSpace: 'nowrap' })),
  rule(/^text-strike$/, () => ({ textDecoration: 'line-through' })),

  // --- Font weight ---
  rule(/^text-weight-thin$/, () => ({ fontWeight: 100 })),
  rule(/^text-weight-light$/, () => ({ fontWeight: 300 })),
  rule(/^text-weight-regular$/, () => ({ fontWeight: 400 })),
  rule(/^text-weight-medium$/, () => ({ fontWeight: 500 })),
  rule(/^text-weight-bold$/, () => ({ fontWeight: 700 })),
  rule(/^text-weight-bolder$/, () => ({ fontWeight: 900 }))
]
