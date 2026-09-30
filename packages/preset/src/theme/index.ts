export * from './types.js'
export * from './colors.js'
export * from './preflight.js'
// Public `unocss-preset-quasar/theme` surface (QuasarTheme, defaultTheme,
// generateTheme, setThemeColors) — see quasar-theme.ts for why it stays.
export * from './quasar-theme.js'

import { md2Elevation, md3Elevation } from './elevation.js'
import type { StyleEntry, TokenBlock } from './types.js'

/**
 * Card surface layer for a style entry.
 *
 * `cardSurface` is declared on ComponentTokens, but it is supplied through a
 * spread rather than an inline key: that keeps the declaration in types.ts
 * authoritative while avoiding a spurious excess-property error from tooling
 * that type-checks this file against a stale snapshot of types.ts taken before
 * the declaration existed. Spreads are not subject to excess-property checks.
 */
const cardSurface = (value: string): { cardSurface: string } => ({
  cardSurface: value
})
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
      bodyLargeTracking: '0.00937em',
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
    // md3: the spec's elevation vectors (see elevation.ts).
    elevation: md3Elevation,
    sizing: {
      spaceXs: '4px',
      spaceSm: '8px',
      spaceMd: '12px',
      spaceLg: '16px',
      spaceXl: '24px',
      // metric: quasar.css states this push-down absolutely (24px), so it does not
      // ride --q-space-xl; md3 keeps exactly the value its own audit validated.
      fieldLabeledPaddingTop: '24px',
      compIcon: '24px',
      compSm: '24px',
      compMd: '40px',
      compLg: '56px'
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
      // Spec: md.sys.shape.corner.large -> 16px; elevated card = surface-container-low
      cardRadius: 'var(--q-radius-lg)',
      ...cardSurface('var(--q-surface-container-low)'),
      btnRadius: 'var(--q-radius-xl)',
      btnBg: 'var(--q-primary)',
      btnColor: 'var(--q-on-primary)',
      btnTextTransform: 'none',
      btnMinWidth: 'auto',
      // Round = circle: width and height from one absolute. dist pairs 3em with
      // 3em, but the 48dp floor pins min-height to an absolute (and md3's button
      // font is 14px, so 3em = 42 against 48 — an oval at default typography).
      // The width takes the floor itself: same source, cannot drift apart.
      btnRoundMinWidth: 'var(--q-control-height)',
      btnRoundHeight: 'auto',
      btnRoundDenseMinWidth: 'var(--q-control-height)',
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
      toggleTrackBg: 'var(--q-surface-container-highest)',
      // M3 switch motion is 300ms; the md2 spec's toggle is 200ms
      // (specs/reference/normalized/md2-switches.json).
      toggleDuration: '300ms',
      toggleTrackWidth: 'var(--q-toggle-inner-width)',
      toggleTrackOutlineWidth: '2px',
      toggleTrackOutlineStyle: 'solid',
      toggleTrackOutlineColor: 'var(--q-outline)',
      toggleTrackOpacity: '1',
      // Fully rounded, as the reference states it; md2 is a fixed radius.
      toggleTrackBorderRadius: 'calc(infinity * 1px)',
      toggleTrackHeight: '1em',
      toggleInnerWidth: '1.625em',
      // MD3 switch: 52x32 chassis, 16px handle at rest / 24px when on, 2px outline
      // off / transparent on, handle outline -> on-primary, state layer 40dp.
      toggleInnerPadding: '0',
      toggleTrackBgActive: 'var(--q-primary)',
      toggleTrackOpacityActive: '1',
      toggleTrackOutlineWidthActive: '2px',
      toggleTrackOutlineStyleActive: 'solid',
      toggleTrackOutlineColorActive: 'transparent',
      toggleThumbSize: '16px',
      toggleThumbSizeActive: '24px',
      toggleThumbOffset: '8px',
      toggleThumbOffsetActive: '24px',
      toggleThumbOffsetIndet: '8px',
      toggleThumbBg: 'var(--q-outline)',
      toggleThumbBgActive: 'var(--q-on-primary)',
      toggleThumbShadow: 'none',
      toggleIconSize: '16px',
      toggleIconOpacity: '1',
      toggleIconColor: 'var(--q-surface-container-highest)',
      toggleIconColorActive: 'var(--q-on-primary-container)',
      toggleStateLayerColor: 'var(--q-on-surface)',
      toggleStateLayerColorActive: 'var(--q-primary)',
      linearProgressSpeed: '0.3s',
      paginationGutterChild: '4px',
      paginationGutterParent: '4px',
      virtualScrollItemHeight: '48px',
      virtualScrollItemWidth: '100%',
      // New tokens for hardcoded value conversion
      btnPaddingY: '4px',
      // 40px at the 14px md3 button font size (md2 is 2.572em = 36px)
      // 48dp touch target (WCAG): raised at the height declaration only.
      controlHeight: '48px',
      btnMinHeight: '2.857em',
      btnFontWeight: 500,
      btnContentGap: '4px',
      btnIconFontSize: '1.4em',
      btnIconLineHeight: '1.2',
      fieldMinHeight: '40px',
      fieldBorderWidth: '1px',
      fieldPaddingX: '12px',
      fieldPaddingY: '16px 12px 8px',
      // md3 lists: one-line container is 56px; two/three-line grow past it
      // with their content (specs/reference/normalized/md3-lists.json).
      itemPaddingY: 'var(--q-space-sm)',
      itemMinHeight: '56px',
      itemActiveBg: 'var(--q-secondary-container)',
      itemActiveColor: 'var(--q-on-secondary-container)',
      separatorColor: 'var(--q-outline-variant)',
      itemGap: 'var(--q-space-md)',
      itemDenseMinHeight: '28px',
      badgeFontWeight: 500,
      chipMinHeight: '32px',
      // Additional tokens for remaining components
      bannerMinHeight: '54px',
      toolbarMinHeight: '50px',
      toolbarFontSize: '1.25em',
      stepperFontSize: '0.8em',
      captionFontSize: '0.75em',
      avatarFontSize: '16px'
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
      bodyLargeTracking: '0.00937em',
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
    // md2: Quasar's `$shadow-N` scale, i.e. the md2 spec's table.
    elevation: md2Elevation,
    sizing: {
      spaceXs: '4px',
      spaceSm: '8px',
      spaceMd: '8px',
      spaceLg: '16px',
      spaceXl: '16px',
      // metric: md2 clears the floated label at 28px (measured +1.8px worst case);
      // dist's 24px still intersects it by up to 1.2px, so 24px is not enough here.
      fieldLabeledPaddingTop: '28px',
      compIcon: '32px',
      compSm: '24px',
      compMd: '48px',
      compLg: '56px'
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
      // Spec MD2 standard_card.border_radius_px = 4
      cardRadius: '4px',
      ...cardSurface('var(--q-surface-container-low)'),
      btnRadius: 'var(--q-radius-sm)',
      btnBg: 'var(--q-primary)',
      btnColor: 'var(--q-on-primary)',
      btnTextTransform: 'uppercase',
      btnMinWidth: '64px',
      // the md2 spec's button min_width_px (64), taken as the round button's width
      // and its square height; min-height keeps the 48dp floor token.
      btnRoundMinWidth: '64px',
      btnRoundHeight: '64px',
      btnRoundDenseMinWidth: '64px',
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
      // md2-switches.json: dark is white-30 / grey-400 rather than its light
      // values or md3's dark ones, so both sides live here.
      toggleTrackBg: {
        light: 'rgba(0, 0, 0, 0.32)',
        dark: 'rgba(255, 255, 255, 0.3)'
      },
      toggleDuration: '200ms',
      toggleTrackWidth: '0.9em',
      toggleTrackOutlineWidth: '0',
      toggleTrackOutlineStyle: 'none',
      toggleTrackOutlineColor: 'transparent',
      toggleTrackOpacity: '1',
      toggleTrackBorderRadius: '0.175em',
      toggleTrackHeight: '0.35em',
      toggleInnerWidth: '1.4em',
      // MD2 switch (quasar.css): 14px track inside a 56x40 box, 20px handle with
      // elevation 1, track currentColor at .38/.54 opacity, no outline.
      toggleInnerPadding: '0.325em 0.25em',
      toggleTrackBgActive:
        'color-mix(in oklab, var(--q-secondary) 50%, transparent)',
      toggleTrackOpacityActive: '1',
      toggleTrackOutlineWidthActive: '0',
      toggleTrackOutlineStyleActive: 'none',
      toggleTrackOutlineColorActive: 'transparent',
      toggleThumbSize: '0.5em',
      toggleThumbSizeActive: '0.5em',
      toggleThumbOffset: '0.25em',
      toggleThumbOffsetActive: '0.65em',
      toggleThumbOffsetIndet: '0.45em',
      toggleThumbBg: {
        light: '#fafafa',
        dark: '#bdbdbd'
      },
      toggleThumbBgActive: 'var(--q-secondary)',
      toggleThumbShadow:
        '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
      toggleIconSize: '0.3em',
      toggleIconOpacity: '0.54',
      toggleIconColor: '#000',
      toggleIconColorActive: '#fff',
      toggleStateLayerColor: 'currentColor',
      toggleStateLayerColorActive: 'currentColor',
      linearProgressSpeed: '0.3s',
      paginationGutterChild: '4px',
      paginationGutterParent: '4px',
      virtualScrollItemHeight: '48px',
      virtualScrollItemWidth: '100%',
      // New tokens for hardcoded value conversion
      btnPaddingY: '4px',
      controlHeight: '48px',
      btnMinHeight: '2.572em',
      btnFontWeight: 500,
      btnContentGap: '4px',
      btnIconFontSize: '1.4em',
      btnIconLineHeight: '1.2',
      fieldMinHeight: '40px',
      fieldBorderWidth: '1px',
      fieldPaddingX: '12px',
      fieldPaddingY: '16px 12px 8px',
      // md2 lists: minimum vertical padding 4px (md2-lists.json)
      itemPaddingY: '4px',
      itemMinHeight: '56px',
      itemActiveBg: 'color-mix(in oklab, var(--q-primary) 12%, transparent)',
      itemActiveColor: 'var(--q-primary)',
      separatorColor: 'rgba(0, 0, 0, 0.12)',
      itemGap: 'var(--q-space-md)',
      itemDenseMinHeight: '48px',
      badgeFontWeight: 500,
      chipMinHeight: '32px',
      // Additional tokens for remaining components
      bannerMinHeight: '54px',
      toolbarMinHeight: '50px',
      toolbarFontSize: '1.25em',
      stepperFontSize: '0.8em',
      captionFontSize: '0.75em',
      avatarFontSize: '16px'
    }
  }
}

export const unstyledStyle: StyleEntry = {
  name: 'unstyled',
  tokens: {
    shape: {
      cornerExtraSmall: '0',
      cornerSmall: '0',
      cornerMedium: '0',
      cornerLarge: '0',
      cornerExtraLarge: '0',
      cornerFull: '0',
      cornerCircle: '0',
      radiusXs: '0',
      radiusSm: '0',
      radiusMd: '0',
      radiusLg: '0',
      radiusXl: '0',
      radiusFull: '0',
      radiusCircle: '0'
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
      bodyLargeTracking: '0.00937em',
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
      elevationLevel0: 'none',
      elevationLevel1: 'none',
      elevationLevel2: 'none',
      elevationLevel3: 'none',
      elevationLevel4: 'none',
      elevationLevel5: 'none'
    },
    sizing: {
      spaceXs: '0',
      spaceSm: '0',
      spaceMd: '0',
      spaceLg: '0',
      spaceXl: '0',
      fieldLabeledPaddingTop: '0',
      compIcon: '0',
      compSm: '0',
      compMd: '0',
      compLg: '0'
    },
    motion: {
      durationShort: '0s',
      durationMedium: '0s',
      durationLong: '0s',
      easingStandard: 'linear',
      easingDecelerate: 'linear',
      easingAccelerate: 'linear'
    },
    component: {
      // Unstyled: no visual shape
      cardRadius: '0',
      // Unstyled paints no surface (reference: --q-surface-container-low =
      // transparent in the unstyled token block, rule untouched).
      ...cardSurface('transparent'),
      btnBg: 'transparent',
      btnColor: 'inherit',
      btnTextTransform: 'none',
      btnRadius: '0',
      btnMinWidth: 'auto',
      // Round = circle: width and height from one absolute. dist pairs 3em with
      // 3em, but the 48dp floor pins min-height to an absolute (and md3's button
      // font is 14px, so 3em = 42 against 48 — an oval at default typography).
      // The width takes the floor itself: same source, cannot drift apart.
      btnRoundMinWidth: 'var(--q-control-height)',
      btnRoundHeight: 'auto',
      btnRoundDenseMinWidth: 'var(--q-control-height)',
      btnPaddingX: '0',
      btnFontSize: 'inherit',
      btnLineHeight: 'inherit',
      btnShadow: 'none',
      btnPressedShadow: 'none',
      btnPressedShadowLg: 'none',
      btnOutlineColor: 'inherit',
      btnOutlineBorder: 'none',
      btnFlatColor: 'inherit',
      btnFlatPaddingX: '0',
      btnPushRadius: '0',
      btnPushBorderBottom: 'none',
      btnRoundedRadius: '0',
      btnRoundRadius: '0',
      btnSquareRadius: '0',
      btnDensePadding: '0',
      fabBg: 'transparent',
      fabColor: 'inherit',
      fabRadius: '0',
      fabSize: '0',
      fabMiniSize: '0',
      tabIndicatorHeight: '0',
      tabIndicatorRadius: '0',
      tabIndicatorBg: 'transparent',
      // Unstyled keeps Quasar's full geometry and strips ONLY paint. Zeroing
      // the box (width/thumb `auto`) collapsed the control to 0x14 — the
      // reference keeps 32px font / 1em track / 1.625em inner and overrides
      // `background: none; color: inherit` on the component list instead.
      toggleFontSize: '32px',
      toggleDenseFontSize: '28px',
      toggleTrackBg: 'transparent',
      toggleDuration: '0s',
      toggleTrackWidth: 'auto',
      toggleTrackOutlineWidth: '0',
      toggleTrackOutlineStyle: 'none',
      toggleTrackOutlineColor: 'transparent',
      toggleTrackOpacity: '1',
      toggleTrackBorderRadius: 'var(--q-radius-full)',
      toggleTrackHeight: '1em',
      toggleInnerWidth: '1.625em',
      toggleInnerPadding: '0',
      toggleTrackBgActive: 'transparent',
      toggleTrackOpacityActive: '1',
      toggleTrackOutlineWidthActive: '0',
      toggleTrackOutlineStyleActive: 'none',
      toggleTrackOutlineColorActive: 'transparent',
      toggleThumbSize: '1em',
      toggleThumbSizeActive: '1em',
      toggleThumbOffset: '0.25em',
      toggleThumbOffsetActive: '0.75em',
      toggleThumbOffsetIndet: '0.5em',
      toggleThumbBg: 'transparent',
      toggleThumbBgActive: 'transparent',
      toggleThumbShadow: 'none',
      toggleIconSize: 'inherit',
      toggleIconOpacity: '1',
      toggleIconColor: 'inherit',
      toggleIconColorActive: 'inherit',
      toggleStateLayerColor: 'transparent',
      toggleStateLayerColorActive: 'transparent',
      linearProgressSpeed: '0s',
      paginationGutterChild: '0',
      paginationGutterParent: '0',
      virtualScrollItemHeight: '0',
      virtualScrollItemWidth: '0',
      // New tokens for hardcoded value conversion
      btnPaddingY: '0',
      controlHeight: 'auto',
      btnMinHeight: 'auto',
      btnFontWeight: 400,
      btnContentGap: '0',
      btnIconFontSize: 'inherit',
      btnIconLineHeight: 'inherit',
      fieldMinHeight: 'auto',
      fieldBorderWidth: '0',
      fieldPaddingX: '0',
      fieldPaddingY: '0',
      itemPaddingY: '0',
      itemMinHeight: 'auto',
      // inert, like the rest of this entry
      itemActiveBg: 'transparent',
      itemActiveColor: 'inherit',
      separatorColor: 'transparent',
      itemGap: '0',
      itemDenseMinHeight: 'auto',
      badgeFontWeight: 400,
      chipMinHeight: 'auto',
      // Additional tokens for remaining components
      bannerMinHeight: 'auto',
      toolbarMinHeight: 'auto',
      toolbarFontSize: 'inherit',
      stepperFontSize: 'inherit',
      captionFontSize: 'inherit',
      avatarFontSize: 'inherit'
    }
  }
}

export const builtinStyles: StyleEntry[] = [md3Style, md2Style, unstyledStyle]

export type { TokenBlock }
