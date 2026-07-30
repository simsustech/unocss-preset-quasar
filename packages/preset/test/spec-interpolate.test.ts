import { describe, it, expect } from 'vitest'
import { bindSpec } from '../src/styles/_spec.js'
import type { StyleSpec } from '../src/spec/types.js'

function createTestSpec(overrides?: Partial<StyleSpec>): StyleSpec {
  return {
    style: 'test',
    label: 'Test',
    tokens: {
      color: {
        primary: '#6750a4',
        onPrimary: '#ffffff',
        primaryContainer: '#eaddff',
        onPrimaryContainer: '#21005d',
        secondary: '#625b71',
        onSecondary: '#ffffff',
        secondaryContainer: '#e8def8',
        onSecondaryContainer: '#1d192b',
        tertiary: '#7d5260',
        onTertiary: '#ffffff',
        tertiaryContainer: '#ffd8e4',
        onTertiaryContainer: '#31111d',
        error: '#b3261e',
        onError: '#ffffff',
        errorContainer: '#f9dedc',
        onErrorContainer: '#410e0b',
        background: '#fffbfe',
        onBackground: '#1c1b1f',
        surface: '#fffbfe',
        onSurface: '#1c1b1f',
        surfaceVariant: '#e7e0ec',
        onSurfaceVariant: '#49454f',
        surfaceContainerLowest: '#ffffff',
        surfaceContainerLow: '#f7f2fa',
        surfaceContainer: '#f3edf7',
        surfaceContainerHigh: '#ece6f0',
        surfaceContainerHighest: '#e6e0e9',
        outline: '#79747e',
        outlineVariant: '#cac4d0',
        inverseSurface: '#313033',
        inverseOnSurface: '#f4eff4',
        inversePrimary: '#d0bcff',
        shadow: '#000000',
        scrim: '#000000'
      },
      shape: {
        cornerExtraSmall: '4px',
        cornerSmall: '8px',
        cornerMedium: '12px',
        cornerLarge: '16px',
        cornerExtraLarge: '28px',
        cornerFull: '50%'
      },
      typography: {
        fontFamily: 'Roboto, sans-serif',
        displayLarge: '400 57px/64px Roboto',
        displayMedium: '400 45px/52px Roboto',
        displaySmall: '400 36px/44px Roboto',
        headlineLarge: '400 32px/40px Roboto',
        headlineMedium: '400 28px/36px Roboto',
        headlineSmall: '400 24px/32px Roboto',
        titleLarge: '400 22px/28px Roboto',
        titleMedium: '500 16px/24px Roboto',
        titleSmall: '500 14px/20px Roboto',
        bodyLarge: '400 16px/24px Roboto',
        bodyMedium: '400 14px/20px Roboto',
        bodySmall: '400 12px/16px Roboto',
        labelLarge: '500 14px/20px Roboto',
        labelMedium: '500 12px/16px Roboto',
        labelSmall: '500 11px/16px Roboto',
        hoverOpacity: '0.08',
        focusOpacity: '0.12',
        pressedOpacity: '0.12',
        draggedOpacity: '0.16'
      },
      elevation: {
        level0: 'none',
        level1: '0 1px 3px rgba(0,0,0,0.2)',
        level2: '0 2px 6px rgba(0,0,0,0.2)',
        level3: '0 4px 10px rgba(0,0,0,0.3)',
        level4: '0 6px 14px rgba(0,0,0,0.3)',
        level5: '0 8px 20px rgba(0,0,0,0.3)'
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
      motion: {
        durationShort: '100ms',
        durationMedium: '300ms',
        durationLong: '500ms',
        easingStandard: 'cubic-bezier(0.2, 0, 0, 1)',
        easingDecelerate: 'cubic-bezier(0, 0, 0, 1)',
        easingAccelerate: 'cubic-bezier(0.4, 0, 1, 1)'
      }
    },
    darkTokens: {
      color: {
        primary: '#000000',
        onPrimary: '#ffffff',
        surface: '#1e1e1e',
        onSurface: '#e0e0e0'
      } as Record<string, string>
    } as Partial<StyleSpec['tokens']>,
    layout: {
      breakpoints: {
        xs: '0px',
        sm: '600px',
        md: '1024px',
        lg: '1440px',
        xl: '1920px'
      },
      spacing: { unit: '4px' }
    },
    accessibility: {
      contrast: { wcag: { aa: { standardText: 4.5, largeText: 3.0 } } },
      interactiveTargets: { minimumPx: 48 }
    },
    features: {
      shapeOverrides: true,
      perComponentDark: true,
      elevation: true,
      stateLayers: true,
      structuralKey: 'test'
    },
    components: {},
    ...overrides
  }
}

describe('spec interpolation', () => {
  it('resolves simple token paths', () => {
    const spec = createTestSpec()
    const s = bindSpec(spec)
    expect(s('color.primary')).toBe('#6750a4')
    expect(s('shape.cornerLarge')).toBe('16px')
    expect(s('elevation.level1')).toBe('0 1px 3px rgba(0,0,0,0.2)')
    expect(s('typography.bodyMedium')).toBe('400 14px/20px Roboto')
    expect(s('sizing.spaceMd')).toBe('12px')
    expect(s('motion.durationShort')).toBe('100ms')
  })

  it('resolves dark token refs', () => {
    const spec = createTestSpec()
    const s = bindSpec(spec)
    expect(s('darkTokens.color.primary')).toBe('#000000')
    expect(s('darkTokens.color.surface')).toBe('#1e1e1e')
  })

  it('returns "inherit" for missing refs', () => {
    const spec = createTestSpec()
    const s = bindSpec(spec)
    expect(s('color.nonexistent')).toBe('inherit')
    expect(s('totally.bogus')).toBe('inherit')
  })

  it('caches resolved values', () => {
    const spec = createTestSpec()
    const s = bindSpec(spec)
    // First call resolves from object
    const first = s('color.primary')
    // Second call returns from cache
    const second = s('color.primary')
    expect(first).toBe('#6750a4')
    expect(second).toBe('#6750a4')
  })

  it('works with tagged template syntax', () => {
    const spec = createTestSpec()
    const s = bindSpec(spec)
    expect(s`color.primary`).toBe('#6750a4')
    expect(s`shape.cornerSmall`).toBe('8px')
  })

  it('resolves nested refs in template composition', () => {
    const spec = createTestSpec()
    const s = bindSpec(spec)
    const composed = `bg-${s('color.primary')} text-${s('color.onPrimary')} rounded-${s('shape.cornerLarge')}`
    expect(composed).toBe('bg-#6750a4 text-#ffffff rounded-16px')
  })

  it('resolves from different styles', () => {
    const md3Spec = createTestSpec({
      tokens: {
        ...createTestSpec().tokens,
        shape: { ...createTestSpec().tokens.shape, cornerMedium: '12px' }
      }
    })

    const md2Spec = createTestSpec({
      tokens: {
        ...createTestSpec().tokens,
        shape: { ...createTestSpec().tokens.shape, cornerMedium: '7px' }
      }
    })

    expect(bindSpec(md3Spec)('shape.cornerMedium')).toBe('12px')
    expect(bindSpec(md2Spec)('shape.cornerMedium')).toBe('7px')
  })

  it('resolves with "tokens." prefix', () => {
    const spec = createTestSpec()
    const s = bindSpec(spec)
    expect(s('tokens.color.primary')).toBe('#6750a4')
  })

  it('resolves elevation tokens', () => {
    const spec = createTestSpec()
    const s = bindSpec(spec)
    expect(s('elevation.level2')).toBe('0 2px 6px rgba(0,0,0,0.2)')
  })
})
