/**
 * unstyled.spec.ts — Unstyled StyleSpec
 *
 * Empty spec where all values return defaults (transparent/none/0/inherit).
 * Used as the baseline reference and as the fallback when no style is active.
 *
 * @module StyleSpec
 */

import type { StyleSpec } from './types.js'

const spec: StyleSpec = {
  style: 'unstyled',
  label: 'Unstyled (Quasar defaults — no Material Design)',

  tokens: {
    color: {
      primary: 'transparent',
      onPrimary: 'inherit',
      primaryContainer: 'transparent',
      onPrimaryContainer: 'inherit',
      secondary: 'transparent',
      onSecondary: 'inherit',
      secondaryContainer: 'transparent',
      onSecondaryContainer: 'inherit',
      tertiary: 'transparent',
      onTertiary: 'inherit',
      tertiaryContainer: 'transparent',
      onTertiaryContainer: 'inherit',
      error: 'transparent',
      onError: 'inherit',
      errorContainer: 'transparent',
      onErrorContainer: 'inherit',
      background: 'transparent',
      onBackground: 'inherit',
      surface: 'transparent',
      onSurface: 'inherit',
      surfaceVariant: 'transparent',
      onSurfaceVariant: 'inherit',
      surfaceContainerLowest: 'transparent',
      surfaceContainerLow: 'transparent',
      surfaceContainer: 'transparent',
      surfaceContainerHigh: 'transparent',
      surfaceContainerHighest: 'transparent',
      outline: 'transparent',
      outlineVariant: 'transparent',
      inverseSurface: 'transparent',
      inverseOnSurface: 'inherit',
      inversePrimary: 'inherit',
      shadow: 'transparent',
      scrim: 'transparent'
    },

    shape: {
      cornerExtraSmall: '0',
      cornerSmall: '0',
      cornerMedium: '0',
      cornerLarge: '0',
      cornerExtraLarge: '0',
      cornerFull: '9999px', // Quasar's unstyled QToggle keeps its pill track
      cornerCircle: '0'
    },

    typography: {
      fontFamily: 'inherit',
      displayLarge: 'inherit',
      displayMedium: 'inherit',
      displaySmall: 'inherit',
      headlineLarge: 'inherit',
      headlineMedium: 'inherit',
      headlineSmall: 'inherit',
      titleLarge: 'inherit',
      titleMedium: 'inherit',
      titleSmall: 'inherit',
      bodyLarge: 'inherit',
      bodyMedium: 'inherit',
      bodySmall: 'inherit',
      labelLarge: 'inherit',
      labelMedium: 'inherit',
      labelSmall: 'inherit',
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
      spaceMd: '8px',
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
    },

    /* ─── Runtime fonts ──────────────────────────────────────────── */

    /** Emitted as `--q-font-*`; separate from the shorthand `typography` strings */
    fonts: {
      fontXs: 'inherit',
      fontSm: 'inherit',
      fontMd: 'inherit',
      fontLg: 'inherit',
      fontXl: 'inherit',
      fontLead: 'inherit'
    },

    /* ─── Component tokens ──────────────────────────────────────── */

    /** Per-style component values, emitted as `--q-{component}-{property}` */
    component: {
      linearProgressSpeed: '0s',
      paginationGutterChild: '0',
      paginationGutterParent: '0',
      virtualScrollItemHeight: 'auto',
      virtualScrollItemWidth: 'auto',
      // QToggle
      toggleFontSize: '32px',
      toggleDenseFontSize: '28px',
      toggleTrackBg: 'transparent',
      toggleTrackOutline: 'none',
      toggleTrackOpacity: '1',
      toggleTrackBorderRadius: 'var(--q-radius-full)',
      toggleTrackHeight: '1em',
      toggleInnerWidth: '1.625em',
      // QBtn
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
      // QFab
      fabBg: 'transparent',
      fabColor: 'inherit',
      fabRadius: '0',
      fabSize: '56px',
      fabMiniSize: '40px'
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
    spacing: {
      unit: '4px'
    }
  },

  accessibility: {
    contrast: {
      wcag: {
        aa: {
          standardText: 4.5,
          largeText: 3.0
        }
      }
    },
    interactiveTargets: {
      minimumPx: 48
    }
  },

  features: {
    shapeOverrides: false,
    perComponentDark: false,
    elevation: false,
    stateLayers: false,
    structuralKey: 'unstyled'
  },

  components: {}
}

export default spec
