/**
 * Design tokens — the runtime shape of per-style CSS variables.
 *
 * The VALUES are no longer hand-maintained here: they are derived from
 * the StyleSpecs (`spec/md3.spec.ts`, `spec/md2.spec.ts`,
 * `spec/unstyled.spec.ts`) via `deriveDesignTokens()`. The specs are the
 * single source of truth; this module only defines the TokenBlock shape
 * the preflight emits as `--q-{category}-{name}` variables.
 *
 * Token naming: --q-{category}-{name}
 *   --q-primary, --q-on-primary, --q-radius-xl, --q-space-md, --q-font-md
 * Component tokens: --q-{component}-{property}
 *   --q-toggle-track-bg, --q-toggle-font-size
 */

import { deriveDesignTokens } from './_tokenDerive.js'

export interface TokenBlock {
  color: {
    primary: string
    onPrimary: string
    primaryContainer: string
    secondary: string
    onSecondary: string
    secondaryContainer: string
    surface: string
    surfaceContainer: string
    surfaceContainerLow: string
    surfaceContainerHigh: string
    surfaceContainerHighest: string
    outline: string
    onSurface: string
    onPrimaryContainer: string
    onSecondaryContainer: string
    onSurfaceVariant: string
    darkSecondary: string
    darkOutline: string
    darkInverseSurface: string
    darkTertiaryContainer: string
  }
  shape: {
    radiusXs: string
    radiusSm: string
    radiusMd: string
    radiusLg: string
    radiusXl: string
    radiusFull: string
    radiusCircle: string
  }
  sizing: {
    spaceXs: string
    spaceSm: string
    spaceMd: string
    spaceLg: string
    spaceXl: string
    sizeIcon: string
    sizeSm: string
    sizeMd: string
    sizeLg: string
  }
  type: {
    fontXs: string
    fontSm: string
    fontMd: string
    fontLg: string
    fontXl: string
    fontLead: string
    hoverOpacity: string
    linearProgressSpeed: string
    paginationGutterChild: string
    paginationGutterParent: string
    virtualScrollItemHeight: string
    virtualScrollItemWidth: string
    // QToggle
    toggleFontSize: string
    toggleDenseFontSize: string
    toggleTrackBg: string
    toggleTrackOutline: string
    toggleTrackOpacity: string
    toggleTrackBorderRadius: string
    toggleTrackHeight: string
    toggleInnerWidth: string
  }
  /**
   * Component tokens — `--q-{component}-{property}`. One shared shortcut
   * set references these vars; each style entry supplies the values
   * (e.g. `--q-btn-radius` = 28px for md3, 4px for md2).
   */
  component: {
    // QBtn
    btnBg: string
    btnColor: string
    btnTextTransform: string
    btnRadius: string
    btnMinWidth: string
    btnPaddingX: string
    btnFontSize: string
    btnLineHeight: string
    btnShadow: string
    btnPressedShadow: string
    btnPressedShadowLg: string
    btnOutlineColor: string
    btnOutlineBorder: string
    btnFlatColor: string
    btnFlatPaddingX: string
    btnPushRadius: string
    btnPushBorderBottom: string
    btnRoundedRadius: string
    btnRoundRadius: string
    btnSquareRadius: string
    btnDensePadding: string
    fabBg: string
    fabColor: string
    fabRadius: string
    fabSize: string
    fabMiniSize: string
  }
}

export interface DesignTokens {
  md3: TokenBlock
  md2: TokenBlock
  unstyled: TokenBlock
}

/**
 * A style entry: one named token spec. The name becomes the body class
 * (`quasar-style-{name}`) that activates the block at runtime.
 */
export interface QuasarStyleEntry {
  name: string
  tokens: TokenBlock
}

/** Built-in style blocks, derived from the StyleSpec registry. */
export const tokens: DesignTokens = deriveDesignTokens()
