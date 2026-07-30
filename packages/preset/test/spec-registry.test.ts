import { describe, it, expect } from 'vitest'
import { getStyleSpec, listStyles, registerStyle } from '../src/spec/index.js'
import type { StyleSpec } from '../src/spec/types.js'

describe('StyleSpec registry', () => {
  it('lists all registered styles', () => {
    const styles = listStyles()
    expect(styles).toContain('md3')
    expect(styles).toContain('md2')
    expect(styles).toContain('unstyled')
    expect(styles.length).toBe(3)
  })

  it('returns md3 spec by name', () => {
    const spec = getStyleSpec('md3')
    expect(spec.style).toBe('md3')
    expect(spec.tokens.color.primary).toBeDefined()
  })

  it('returns md2 spec by name', () => {
    const spec = getStyleSpec('md2')
    expect(spec.style).toBe('md2')
    expect(spec.tokens.shape.cornerSmall).toBe('4px')
  })

  it('returns unstyled spec by name', () => {
    const spec = getStyleSpec('unstyled')
    expect(spec.style).toBe('unstyled')
    expect(spec.tokens.color.primary).toBe('transparent')
    expect(spec.components).toEqual({})
  })

  it('unstyled tokens use default values', () => {
    const spec = getStyleSpec('unstyled')
    expect(spec.tokens.color.primary).toBe('transparent')
    expect(spec.tokens.color.onPrimary).toBe('inherit')
    expect(spec.tokens.shape.cornerSmall).toBe('0')
    expect(spec.tokens.typography.bodyMedium).toBe('inherit')
    expect(spec.tokens.elevation.level0).toBe('none')
    expect(spec.tokens.motion.durationShort).toBe('0s')
  })

  it('throws for unknown styles', () => {
    expect(() => getStyleSpec('nonexistent')).toThrow('StyleSpec not found')
  })

  it('allows runtime registration of new styles', () => {
    registerStyle('custom', () => ({
      style: 'custom',
      label: 'Custom Style',
      tokens: {
        color: {
          primary: 'red',
          onPrimary: 'white',
          primaryContainer: 'pink',
          onPrimaryContainer: 'black',
          secondary: 'gray',
          onSecondary: 'black',
          secondaryContainer: 'lightgray',
          onSecondaryContainer: 'black',
          tertiary: 'purple',
          onTertiary: 'white',
          tertiaryContainer: 'lavender',
          onTertiaryContainer: 'black',
          error: 'red',
          onError: 'white',
          errorContainer: 'pink',
          onErrorContainer: 'black',
          background: 'white',
          onBackground: 'black',
          surface: 'white',
          onSurface: 'black',
          surfaceVariant: 'lightgray',
          onSurfaceVariant: 'black',
          surfaceContainerLowest: 'white',
          surfaceContainerLow: 'white',
          surfaceContainer: 'white',
          surfaceContainerHigh: 'white',
          surfaceContainerHighest: 'white',
          outline: 'gray',
          outlineVariant: 'lightgray',
          inverseSurface: 'black',
          inverseOnSurface: 'white',
          inversePrimary: 'blue',
          shadow: 'black',
          scrim: 'black'
        },
        shape: {
          cornerExtraSmall: '2px',
          cornerSmall: '4px',
          cornerMedium: '8px',
          cornerLarge: '12px',
          cornerExtraLarge: '16px',
          cornerFull: '50%'
        },
        typography: {
          fontFamily: 'sans-serif',
          displayLarge: 'normal',
          displayMedium: 'normal',
          displaySmall: 'normal',
          headlineLarge: 'normal',
          headlineMedium: 'normal',
          headlineSmall: 'normal',
          titleLarge: 'normal',
          titleMedium: 'normal',
          titleSmall: 'normal',
          bodyLarge: 'normal',
          bodyMedium: 'normal',
          bodySmall: 'normal',
          labelLarge: 'normal',
          labelMedium: 'normal',
          labelSmall: 'normal',
          hoverOpacity: '0',
          focusOpacity: '0',
          pressedOpacity: '0',
          draggedOpacity: '0'
        },
        elevation: {
          level0: 'none',
          level1: 'none',
          level2: 'none',
          level3: 'none',
          level4: 'none',
          level5: 'none'
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
          durationShort: '0s',
          durationMedium: '0s',
          durationLong: '0s',
          easingStandard: 'inherit',
          easingDecelerate: 'inherit',
          easingAccelerate: 'inherit'
        }
      },
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
        shapeOverrides: false,
        perComponentDark: false,
        elevation: false,
        stateLayers: false,
        structuralKey: 'custom'
      },
      components: {}
    }))

    expect(listStyles()).toContain('custom')
    const custom = getStyleSpec('custom')
    expect(custom.style).toBe('custom')
    expect(custom.tokens.color.primary).toBe('red')
  })
})
