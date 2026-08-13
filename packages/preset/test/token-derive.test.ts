import { describe, it, expect } from 'vitest'
import { tokens } from '../src/core/_tokens.js'
import { deriveTokenBlock } from '../src/core/_tokenDerive.js'
import { getStyleSpec } from '../src/spec/index.js'

/**
 * Drift guard: the runtime tokens are DERIVED from the StyleSpecs.
 * These snapshots freeze the pre-derivation output, so any spec edit
 * that silently changes emitted `--q-*` values fails here.
 * To change a value intentionally: edit the spec AND this snapshot.
 */
const EXPECTED_MD3 = {
  color: {
    primary: 'var(--light-primary)',
    onPrimary: 'var(--light-on-primary)',
    primaryContainer: 'var(--light-primary-container)',
    secondary: 'var(--light-secondary)',
    onSecondary: 'var(--light-on-secondary)',
    secondaryContainer: 'var(--light-secondary-container)',
    surface: 'var(--light-surface)',
    surfaceContainer: 'var(--light-surface-container)',
    surfaceContainerLow: 'var(--light-surface-container-low)',
    surfaceContainerHigh: 'var(--light-surface-container-high)',
    surfaceContainerHighest: 'var(--light-surface-container-highest)',
    outline: 'var(--light-outline)',
    onSurface: 'var(--light-on-surface)',
    onPrimaryContainer: 'var(--light-on-primary-container)',
    onSecondaryContainer: 'var(--light-on-secondary-container)',
    onSurfaceVariant: 'var(--light-on-surface-variant)',
    darkSecondary: 'var(--dark-secondary)',
    darkOutline: 'var(--dark-outline)',
    darkInverseSurface: 'var(--dark-inverse-surface)',
    darkTertiaryContainer: 'var(--dark-tertiary-container)'
  },
  shape: {
    radiusXs: '4px',
    radiusSm: '8px',
    radiusMd: '12px',
    radiusLg: '16px',
    radiusXl: '28px',
    radiusFull: '9999px',
    radiusCircle: '50%'
  },
  sizing: {
    spaceXs: '4px',
    spaceSm: '8px',
    spaceMd: '12px',
    spaceLg: '16px',
    spaceXl: '24px',
    sizeIcon: '24px',
    sizeSm: '24px',
    sizeMd: '40px',
    sizeLg: '56px'
  },
  type: {
    fontXs: '11px',
    fontSm: '12px',
    fontMd: '14px',
    fontLg: '16px',
    fontXl: '20px',
    fontLead: '1.715em',
    hoverOpacity: '0.08',
    linearProgressSpeed: '0.3s',
    paginationGutterChild: '4px',
    paginationGutterParent: '4px',
    virtualScrollItemHeight: '48px',
    virtualScrollItemWidth: '100%',
    toggleFontSize: '32px',
    toggleDenseFontSize: '28px',
    toggleTrackBg: 'var(--q-surface-container)',
    toggleTrackOutline: '2px solid var(--q-outline)',
    toggleTrackOpacity: '1',
    toggleTrackBorderRadius: 'var(--q-radius-full)',
    toggleTrackHeight: '1em',
    toggleInnerWidth: '1.625em'
  },
  component: {
    btnBg: 'var(--light-primary)',
    btnColor: 'var(--light-on-primary)',
    btnTextTransform: 'none',
    btnRadius: 'var(--q-radius-xl)',
    btnMinWidth: 'auto',
    btnPaddingX: '24px',
    btnShadow:
      '0 4px 6px -1px rgb(156 163 175 / 0.14), 0 2px 4px -2px rgb(156 163 175 / 0.14)',
    btnPressedShadow:
      '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px rgba(0, 0, 0, 0.14), 0 1px 14px rgba(0, 0, 0, 0.12)',
    btnOutlineColor: 'var(--light-primary)',
    btnOutlineBorder: 'var(--light-outline)',
    btnFlatColor: 'var(--light-primary)',
    btnFlatPaddingX: '12px',
    btnPushRadius: '7px',
    btnPushBorderBottom: '3px solid rgba(0, 0, 0, 0.15)',
    btnRoundedRadius: 'var(--q-radius-xl)',
    btnRoundRadius: '50%',
    btnSquareRadius: '0',
    btnDensePadding: '0.175em',
    btnFontSize: '14px',
    btnLineHeight: '1.715em',
    btnPressedShadowLg:
      '0 10px 15px -3px rgb(156 163 175 / 0.14), 0 4px 6px -4px rgb(156 163 175 / 0.14)',
    fabBg: 'var(--light-primary-container)',
    fabColor: 'var(--light-on-surface)',
    fabRadius: 'var(--q-radius-lg)',
    fabSize: '56px',
    fabMiniSize: '40px',
    tabIndicatorHeight: '40%',
    tabIndicatorRadius: 'var(--q-radius-full)',
    tabIndicatorBg: 'var(--light-secondary-container)'
  }
}

const EXPECTED_MD2 = {
  color: {
    primary: 'var(--light-primary)',
    onPrimary: 'var(--light-on-primary)',
    primaryContainer: 'var(--light-primary-container)',
    secondary: 'var(--light-secondary)',
    onSecondary: 'var(--light-on-secondary)',
    secondaryContainer: 'var(--light-secondary-container)',
    surface: 'var(--light-surface)',
    surfaceContainer: 'var(--light-surface-container)',
    surfaceContainerLow: 'var(--light-surface-container-low)',
    surfaceContainerHigh: 'var(--light-surface-container-high)',
    surfaceContainerHighest: 'var(--light-surface-container-highest)',
    outline: 'var(--light-outline)',
    onSurface: 'var(--light-on-surface)',
    onPrimaryContainer: 'var(--light-on-primary-container)',
    onSecondaryContainer: 'var(--light-on-secondary-container)',
    onSurfaceVariant: 'var(--light-on-surface-variant)',
    darkSecondary: 'var(--dark-secondary)',
    darkOutline: 'var(--dark-outline)',
    darkInverseSurface: 'var(--dark-inverse-surface)',
    darkTertiaryContainer: 'var(--dark-tertiary-container)'
  },
  shape: {
    radiusXs: '3px',
    radiusSm: '4px',
    radiusMd: '7px',
    radiusLg: '16px',
    radiusXl: '28px',
    radiusFull: '9999px',
    radiusCircle: '50%'
  },
  sizing: {
    spaceXs: '4px',
    spaceSm: '8px',
    spaceMd: '8px',
    spaceLg: '16px',
    spaceXl: '16px',
    sizeIcon: '32px',
    sizeSm: '24px',
    sizeMd: '48px',
    sizeLg: '56px'
  },
  type: {
    fontXs: '12px',
    fontSm: '12px',
    fontMd: '14px',
    fontLg: '14px',
    fontXl: '18px',
    fontLead: '1.715em',
    // Spec-true: MD2 machine spec says 4% hover; the old hardcoded token had 0.08 (copy of md3)
    hoverOpacity: '0.04',
    linearProgressSpeed: '0.3s',
    paginationGutterChild: '4px',
    paginationGutterParent: '4px',
    virtualScrollItemHeight: '48px',
    virtualScrollItemWidth: '100%',
    toggleFontSize: '40px',
    toggleDenseFontSize: '28px',
    toggleTrackBg: 'currentColor',
    toggleTrackOutline: 'none',
    toggleTrackOpacity: '0.38',
    toggleTrackBorderRadius: '0.175em',
    toggleTrackHeight: '0.35em',
    toggleInnerWidth: '1.4em'
  },
  component: {
    btnBg: 'var(--light-primary)',
    btnColor: 'var(--light-on-primary)',
    btnTextTransform: 'uppercase',
    btnRadius: 'var(--q-radius-sm)',
    btnMinWidth: '64px',
    btnPaddingX: '16px',
    btnShadow:
      '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)',
    btnPressedShadow:
      '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px rgba(0, 0, 0, 0.14), 0 1px 14px rgba(0, 0, 0, 0.12)',
    btnOutlineColor: 'currentColor',
    btnOutlineBorder: 'currentColor',
    btnFlatColor: 'currentColor',
    btnFlatPaddingX: '8px',
    btnPushRadius: '7px',
    btnPushBorderBottom: '3px solid rgba(0, 0, 0, 0.15)',
    btnRoundedRadius: '28px',
    btnRoundRadius: '50%',
    btnSquareRadius: '0',
    btnDensePadding: '0.285em',
    btnFontSize: '14px',
    btnLineHeight: '1.715em',
    btnPressedShadowLg:
      '0 10px 15px -3px rgb(156 163 175 / 0.14), 0 4px 6px -4px rgb(156 163 175 / 0.14)',
    fabBg: 'transparent',
    fabColor: 'inherit',
    fabRadius: '50%',
    fabSize: '56px',
    fabMiniSize: '40px',
    tabIndicatorHeight: '2px',
    tabIndicatorRadius: '0',
    tabIndicatorBg: 'currentColor'
  }
}

const EXPECTED_UNSTYLED = {
  color: {
    primary: 'transparent',
    onPrimary: 'inherit',
    primaryContainer: 'transparent',
    secondary: 'transparent',
    onSecondary: 'inherit',
    secondaryContainer: 'transparent',
    surface: 'transparent',
    surfaceContainer: 'transparent',
    surfaceContainerLow: 'transparent',
    surfaceContainerHigh: 'transparent',
    surfaceContainerHighest: 'transparent',
    outline: 'transparent',
    onSurface: 'inherit',
    onPrimaryContainer: 'inherit',
    onSecondaryContainer: 'inherit',
    onSurfaceVariant: 'inherit',
    darkSecondary: 'transparent',
    darkOutline: 'transparent',
    darkInverseSurface: 'transparent',
    darkTertiaryContainer: 'transparent'
  },
  shape: {
    radiusXs: '0',
    radiusSm: '0',
    radiusMd: '0',
    radiusLg: '0',
    radiusXl: '0',
    radiusFull: '9999px',
    radiusCircle: '0'
  },
  sizing: {
    spaceXs: '4px',
    spaceSm: '8px',
    spaceMd: '8px',
    spaceLg: '16px',
    spaceXl: '24px',
    sizeIcon: '24px',
    sizeSm: '24px',
    sizeMd: '40px',
    sizeLg: '56px'
  },
  type: {
    fontXs: 'inherit',
    fontSm: 'inherit',
    fontMd: 'inherit',
    fontLg: 'inherit',
    fontXl: 'inherit',
    fontLead: 'inherit',
    hoverOpacity: '0',
    linearProgressSpeed: '0s',
    paginationGutterChild: '0',
    paginationGutterParent: '0',
    virtualScrollItemHeight: 'auto',
    virtualScrollItemWidth: 'auto',
    toggleFontSize: '32px',
    toggleDenseFontSize: '28px',
    toggleTrackBg: 'transparent',
    toggleTrackOutline: 'none',
    toggleTrackOpacity: '1',
    toggleTrackBorderRadius: 'var(--q-radius-full)',
    toggleTrackHeight: '1em',
    toggleInnerWidth: '1.625em'
  },
  component: {
    btnBg: 'transparent',
    btnColor: 'inherit',
    btnTextTransform: 'none',
    btnRadius: '0',
    btnMinWidth: 'auto',
    btnPaddingX: '16px',
    btnShadow: 'none',
    btnPressedShadow: 'none',
    btnOutlineColor: 'inherit',
    btnOutlineBorder: 'currentColor',
    btnFlatColor: 'inherit',
    btnFlatPaddingX: '16px',
    btnPushRadius: '0',
    btnPushBorderBottom: 'none',
    btnRoundedRadius: '0',
    btnRoundRadius: '0',
    btnSquareRadius: '0',
    btnDensePadding: '0.175em',
    btnFontSize: 'inherit',
    btnLineHeight: 'inherit',
    btnPressedShadowLg: 'none',
    fabBg: 'transparent',
    fabColor: 'inherit',
    fabRadius: '0',
    fabSize: '56px',
    fabMiniSize: '40px',
    tabIndicatorHeight: '2px',
    tabIndicatorRadius: '0',
    tabIndicatorBg: 'currentColor'
  }
}

describe('token derivation (StyleSpec → runtime tokens)', () => {
  it('md3 tokens match the frozen pre-derivation snapshot', () => {
    expect(tokens.md3).toEqual(EXPECTED_MD3)
  })

  it('md2 tokens match the frozen pre-derivation snapshot', () => {
    expect(tokens.md2).toEqual(EXPECTED_MD2)
  })

  it('unstyled tokens match the frozen pre-derivation snapshot', () => {
    expect(tokens.unstyled).toEqual(EXPECTED_UNSTYLED)
  })

  it('every TokenBlock key is populated (no DEFAULTS leakage)', () => {
    for (const name of ['md3', 'md2', 'unstyled'] as const) {
      const block = tokens[name]
      for (const section of [
        'color',
        'shape',
        'sizing',
        'type',
        'component'
      ] as const) {
        for (const [key, value] of Object.entries(block[section])) {
          expect(value, `${name}.${section}.${key}`).not.toBe('')
          expect(value, `${name}.${section}.${key}`).toBeDefined()
        }
      }
    }
  })

  it('derives a single spec independently of the registry', () => {
    const md3 = deriveTokenBlock(getStyleSpec('md3'))
    expect(md3.shape.radiusXl).toBe('28px')
    expect(md3.component.btnRadius).toBe('var(--q-radius-xl)')
  })

  it('spec shape.cornerFull maps to radiusFull (pill) and cornerCircle to radiusCircle', () => {
    const md3 = getStyleSpec('md3')
    expect(md3.tokens.shape.cornerFull).toBe('9999px')
    expect(md3.tokens.shape.cornerCircle).toBe('50%')
    expect(tokens.md3.shape.radiusFull).toBe('9999px')
    expect(tokens.md3.shape.radiusCircle).toBe('50%')
  })
})
