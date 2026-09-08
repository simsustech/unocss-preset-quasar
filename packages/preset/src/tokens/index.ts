export * from './types.js'
export * from './colors.js'
export * from './preflight.js'

import type { StyleEntry, TokenBlock } from './types.js'

/** MD3 built-in style entry */
export const md3Style: StyleEntry = {
  name: 'md3',
  tokens: {
    shape: {
      cornerExtraSmall: '4px',
      cornerSmall: '8px',
      cornerMedium: '12px',
      cornerLarge: '16px',
      cornerExtraLarge: '28px',
      cornerFull: '9999px',
      cornerCircle: '50%',
      // Radius aliases
      radiusXs: '4px',
      radiusSm: '8px',
      radiusMd: '12px',
      radiusLg: '16px',
      radiusXl: '28px',
      radiusFull: '9999px',
      radiusCircle: '50%'
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
    },
    component: {
      btnRadius: 'var(--q-radius-xl)',
      btnBg: 'var(--q-primary)',
      btnColor: 'var(--q-on-primary)',
      btnTextTransform: 'none',
      btnMinWidth: 'auto',
      btnPaddingX: '24px',
      btnFontSize: '14px',
      btnLineHeight: '1.715em',
      btnShadow:
        '0 4px 6px -1px rgb(156 163 175 / 0.14), 0 2px 4px -2px rgb(156 163 175 / 0.14)',
      btnPressedShadow:
        '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px rgba(0, 0, 0, 0.14), 0 1px 14px rgba(0, 0, 0, 0.12)',
      btnPressedShadowLg:
        '0 10px 15px -3px rgb(156 163 175 / 0.14), 0 4px 6px -4px rgb(156 163 175 / 0.14)',
      btnOutlineColor: 'var(--q-primary)',
      btnOutlineBorder: '1px solid var(--q-outline)',
      btnFlatColor: 'var(--q-primary)',
      btnFlatPaddingX: '12px',
      btnPushRadius: '7px',
      btnPushBorderBottom: '3px solid rgba(0, 0, 0, 0.15)',
      btnRoundedRadius: 'var(--q-radius-xl)',
      btnRoundRadius: '50%',
      btnSquareRadius: '0',
      btnDensePadding: '0.175em',
      fabBg: 'var(--q-primary-container)',
      fabColor: 'var(--q-on-surface)',
      fabRadius: 'var(--q-radius-lg)',
      fabSize: '56px',
      fabMiniSize: '40px',
      tabIndicatorHeight: '40%',
      tabIndicatorRadius: 'var(--q-radius-full)',
      tabIndicatorBg: 'var(--q-secondary-container)',
      toggleFontSize: '32px',
      toggleDenseFontSize: '28px',
      toggleTrackBg: 'var(--q-surface-container)',
      toggleTrackOutline: '2px solid var(--q-outline)',
      toggleTrackOpacity: '1',
      toggleTrackBorderRadius: 'var(--q-radius-full)',
      toggleTrackHeight: '1em',
      toggleInnerWidth: '1.625em',
      linearProgressSpeed: '0.3s',
      paginationGutterChild: '4px',
      paginationGutterParent: '4px',
      virtualScrollItemHeight: '48px',
      virtualScrollItemWidth: '100%'
    }
  }
}

/** MD2 built-in style entry (matches quasar.css) */
export const md2Style: StyleEntry = {
  name: 'md2',
  tokens: {
    shape: {
      cornerExtraSmall: '3px',
      cornerSmall: '4px',
      cornerMedium: '7px',
      cornerLarge: '16px',
      cornerExtraLarge: '28px',
      cornerFull: '9999px',
      cornerCircle: '50%',
      // Radius aliases (MD2 values)
      radiusXs: '3px',
      radiusSm: '4px',
      radiusMd: '7px',
      radiusLg: '16px',
      radiusXl: '28px',
      radiusFull: '9999px',
      radiusCircle: '50%'
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      displayLarge: '300 96px/112px Roboto',
      displayMedium: '300 60px/72px Roboto',
      displaySmall: '400 48px/56px Roboto',
      headlineLarge: '400 40px/48px Roboto',
      headlineMedium: '400 32px/40px Roboto',
      headlineSmall: '500 28px/36px Roboto',
      titleLarge: '500 24px/32px Roboto',
      titleMedium: '500 20px/28px Roboto',
      titleSmall: '500 16px/24px Roboto',
      bodyLarge: '400 16px/24px Roboto',
      bodyMedium: '400 14px/20px Roboto',
      bodySmall: '400 12px/16px Roboto',
      labelLarge: '500 14px/20px Roboto',
      labelMedium: '500 12px/16px Roboto',
      labelSmall: '500 11px/16px Roboto',
      hoverOpacity: '0.04',
      focusOpacity: '0.12',
      pressedOpacity: '0.16',
      draggedOpacity: '0.08'
    },
    elevation: {
      level0: 'none',
      level1: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      level2: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      level3: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      level4: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      level5: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'
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
    motion: {
      durationShort: '100ms',
      durationMedium: '300ms',
      durationLong: '500ms',
      easingStandard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easingDecelerate: 'cubic-bezier(0, 0, 0.2, 1)',
      easingAccelerate: 'cubic-bezier(0.4, 0, 1, 1)'
    },
    component: {
      btnRadius: 'var(--q-radius-sm)',
      btnBg: 'var(--q-primary)',
      btnColor: 'var(--q-on-primary)',
      btnTextTransform: 'uppercase',
      btnMinWidth: '64px',
      btnPaddingX: '16px',
      btnFontSize: '14px',
      btnLineHeight: '1.715em',
      btnShadow:
        '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)',
      btnPressedShadow:
        '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px rgba(0, 0, 0, 0.14), 0 1px 14px rgba(0, 0, 0, 0.12)',
      btnPressedShadowLg:
        '0 10px 15px -3px rgb(156 163 175 / 0.14), 0 4px 6px -4px rgb(156 163 175 / 0.14)',
      btnOutlineColor: 'currentColor',
      btnOutlineBorder: '1px solid currentColor',
      btnFlatColor: 'currentColor',
      btnFlatPaddingX: '8px',
      btnPushRadius: '7px',
      btnPushBorderBottom: '3px solid rgba(0, 0, 0, 0.15)',
      btnRoundedRadius: '28px',
      btnRoundRadius: '50%',
      btnSquareRadius: '0',
      btnDensePadding: '0.285em',
      fabBg: 'transparent',
      fabColor: 'inherit',
      fabRadius: '50%',
      fabSize: '56px',
      fabMiniSize: '40px',
      tabIndicatorHeight: '40%',
      tabIndicatorRadius: 'var(--q-radius-full)',
      tabIndicatorBg: 'var(--q-secondary-container)',
      toggleFontSize: '40px',
      toggleDenseFontSize: '28px',
      toggleTrackBg: 'currentColor',
      toggleTrackOutline: 'none',
      toggleTrackOpacity: '0.38',
      toggleTrackBorderRadius: '0.175em',
      toggleTrackHeight: '0.35em',
      toggleInnerWidth: '1.4em',
      linearProgressSpeed: '0.3s',
      paginationGutterChild: '4px',
      paginationGutterParent: '4px',
      virtualScrollItemHeight: '48px',
      virtualScrollItemWidth: '100%'
    }
  }
}

export const builtinStyles: StyleEntry[] = [md3Style, md2Style]

export type { TokenBlock }
