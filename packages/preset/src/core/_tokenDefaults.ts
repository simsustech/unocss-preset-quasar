/**
 * Default values for every runtime token. When a token is missing from a
 * style block (or from a StyleSpec), its default is emitted so the CSS
 * property has no visual effect (transparent, none, 0, inherit).
 *
 * Shared by the token preflight (`emitBlock`) and the spec derivation
 * (`deriveTokenBlock`), so a missing value never produces empty CSS.
 *
 * @module Core
 */

export const DEFAULTS: Record<string, string> = {
  // Color tokens → transparent/none have no visual effect
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
  darkTertiaryContainer: 'transparent',
  // Shape defaults → 0 = no radius
  radiusXs: '0',
  radiusSm: '0',
  radiusMd: '0',
  radiusLg: '0',
  radiusXl: '0',
  radiusFull: '0',
  radiusCircle: '0',
  // Sizing defaults → 0 = no size (element collapses without other styles)
  spaceXs: '0',
  spaceSm: '0',
  spaceMd: '0',
  spaceLg: '0',
  spaceXl: '0',
  sizeIcon: '0',
  sizeSm: '0',
  sizeMd: '0',
  sizeLg: '0',
  // Type defaults → inherit/preserve natural rendering
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
  virtualScrollItemHeight: '0',
  virtualScrollItemWidth: '0',
  // Component-specific defaults → no visual effect
  toggleFontSize: 'inherit',
  toggleDenseFontSize: 'inherit',
  toggleTrackBg: 'transparent',
  toggleTrackOutline: 'none',
  toggleTrackOpacity: '1',
  toggleTrackBorderRadius: '0',
  toggleTrackHeight: 'auto',
  toggleInnerWidth: 'auto',
  // QBtn
  btnBg: 'transparent',
  btnColor: 'inherit',
  btnTextTransform: 'none',
  btnRadius: '0',
  btnMinWidth: 'auto',
  btnPaddingX: '0',
  btnFontSize: '14px',
  btnLineHeight: '1.715em',
  btnShadow: 'none',
  btnPressedShadow: 'none',
  btnPressedShadowLg: 'none',
  btnOutlineColor: 'inherit',
  btnOutlineBorder: 'currentColor',
  btnFlatColor: 'inherit',
  btnFlatPaddingX: '0',
  btnPushRadius: '0',
  btnPushBorderBottom: 'none',
  btnRoundedRadius: '0',
  btnRoundRadius: '0',
  btnSquareRadius: '0',
  btnDensePadding: '0.175em',
  // QFab
  fabBg: 'transparent',
  fabColor: 'inherit',
  fabRadius: '0',
  fabSize: '56px',
  fabMiniSize: '40px',
  // Position-engine runtime variables (set dynamically by Quasar at runtime)
  peTop: '0px',
  peLeft: '0px'
}
