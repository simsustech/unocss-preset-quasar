import type { ComponentRule } from '../../rules/types.js'

/**
 * Grid system — ported from core/flex.unocss.ts as self-contained CSS rules.
 *
 * Modernizations vs the original:
 * - Raw CSS declarations instead of Wind4 utility composition (no `flex flex-row`)
 * - CSS custom properties (--q-space-*) for gutter/gap values
 * - Logical properties (row-gap/column-gap) for RTL support
 *
 * Responsive variants (sm:/md:/lg:/xl:) are handled by UnoCSS's built-in
 * variant system which wraps these rules in @media queries automatically.
 */

const sizes = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const

/** Map size name to --q-space-* custom property */
const spaceVar = (size: string) => `var(--q-space-${size})`

/** Single rule entry helper — keeps tuple type [RegExp, matcher] */
function rule(
  regex: RegExp,
  matcher: () => Record<string, string>
): ComponentRule {
  return [regex, matcher]
}

export const gridRules: ComponentRule[] = [
  // --- Row / Column containers ---
  rule(/^row$/, () => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: '1 1 auto'
  })),
  rule(/^column$/, () => ({
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    flex: '1 1 auto'
  })),
  rule(/^row-reverse$/, () => ({
    display: 'flex',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    flex: '1 1 auto'
  })),
  rule(/^column-reverse$/, () => ({
    display: 'flex',
    flexDirection: 'column-reverse',
    flexWrap: 'wrap',
    flex: '1 1 auto'
  })),

  // --- Col (flexible column) ---
  rule(/^col$/, () => ({
    flex: '1 1 0%',
    maxWidth: '100%'
  })),
  rule(/^col-auto$/, () => ({
    flex: '0 0 auto',
    width: 'auto',
    maxWidth: '100%'
  })),
  rule(/^col-grow$/, () => ({
    flex: '1 1 auto',
    maxWidth: '100%'
  })),

  // --- col-1 through col-12 ---
  ...Array.from({ length: 12 }, (_, i): ComponentRule => {
    const n = i + 1
    const pct = `${((n / 12) * 100).toFixed(4).replace(/\.?0+$/, '')}%`
    return rule(new RegExp(`^col-${n}$`), () => ({
      flex: `0 0 ${pct}`,
      maxWidth: pct
    }))
  }),

  // --- Wrap utilities ---
  rule(/^wrap$/, () => ({ flexWrap: 'wrap' })),
  rule(/^no-wrap$/, () => ({ flexWrap: 'nowrap' })),
  rule(/^reverse-wrap$/, () => ({ flexWrap: 'wrap-reverse' })),

  // --- Flex-center shortcut ---
  rule(/^flex-center$/, () => ({
    justifyContent: 'center',
    alignItems: 'center'
  })),

  // --- q-gutter-* (gap on parent) ---
  ...sizes.map((size): ComponentRule =>
    rule(new RegExp(`^q-gutter-${size}$`), () => ({
      gap: spaceVar(size)
    }))
  ),

  // --- q-gutter-x-* (column-gap) ---
  ...sizes.map((size): ComponentRule =>
    rule(new RegExp(`^q-gutter-x-${size}$`), () => ({
      columnGap: spaceVar(size)
    }))
  ),

  // --- q-gutter-y-* (row-gap) ---
  ...sizes.map((size): ComponentRule =>
    rule(new RegExp(`^q-gutter-y-${size}$`), () => ({
      rowGap: spaceVar(size)
    }))
  ),

  // --- q-col-gutter-* (gap on col-based parent) ---
  ...sizes.map((size): ComponentRule =>
    rule(new RegExp(`^q-col-gutter-${size}$`), () => ({
      gap: spaceVar(size)
    }))
  ),

  // --- q-col-gutter-x-* (column-gap on col-based parent) ---
  ...sizes.map((size): ComponentRule =>
    rule(new RegExp(`^q-col-gutter-x-${size}$`), () => ({
      columnGap: spaceVar(size)
    }))
  ),

  // --- q-col-gutter-y-* (row-gap on col-based parent) ---
  ...sizes.map((size): ComponentRule =>
    rule(new RegExp(`^q-col-gutter-y-${size}$`), () => ({
      rowGap: spaceVar(size)
    }))
  ),

  // --- order utilities ---
  rule(/^order-first$/, () => ({ order: '-1' })),
  rule(/^order-last$/, () => ({ order: '9999' })),
  rule(/^order-none$/, () => ({ order: '0' }))
]
