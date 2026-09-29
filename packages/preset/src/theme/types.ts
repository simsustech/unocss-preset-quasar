export interface ColorTokens {
  // MD3 tokens (all emitted as --q-*)
  primary: string
  onPrimary: string
  primaryContainer: string
  onPrimaryContainer: string
  secondary: string
  onSecondary: string
  secondaryContainer: string
  onSecondaryContainer: string
  tertiary: string
  onTertiary: string
  tertiaryContainer: string
  onTertiaryContainer: string
  error: string
  onError: string
  errorContainer: string
  onErrorContainer: string
  background: string
  onBackground: string
  surface: string
  onSurface: string
  surfaceVariant: string
  onSurfaceVariant: string
  surfaceDim: string
  surfaceBright: string
  surfaceContainerLowest: string
  surfaceContainerLow: string
  surfaceContainer: string
  surfaceContainerHigh: string
  surfaceContainerHighest: string
  outline: string
  outlineVariant: string
  inverseSurface: string
  inverseOnSurface: string
  inversePrimary: string
  shadow: string
  scrim: string
}

export interface ShapeTokens {
  cornerExtraSmall: string
  cornerSmall: string
  cornerMedium: string
  cornerLarge: string
  cornerExtraLarge: string
  cornerFull: string
  cornerCircle: string
  // Radius aliases (used by rules)
  radiusXs: string
  radiusSm: string
  radiusMd: string
  radiusLg: string
  radiusXl: string
  radiusFull: string
  radiusCircle: string
}

export interface TypographyTokens {
  fontFamily: string
  displayLarge: string
  displayMedium: string
  displaySmall: string
  headlineLarge: string
  headlineMedium: string
  headlineSmall: string
  titleLarge: string
  titleMedium: string
  titleSmall: string
  bodyLarge: string
  /** MD3 body-large tracking (letter-spacing); no role shorthand carries it. */
  bodyLargeTracking: string
  bodyMedium: string
  bodySmall: string
  labelLarge: string
  labelMedium: string
  labelSmall: string
  hoverOpacity: string
  focusOpacity: string
  pressedOpacity: string
  draggedOpacity: string
}

export interface ElevationTokens {
  elevationLevel0: TokenValue
  elevationLevel1: TokenValue
  elevationLevel2: TokenValue
  elevationLevel3: TokenValue
  elevationLevel4: TokenValue
  elevationLevel5: TokenValue
}

export interface SizingTokens {
  spaceXs: string
  spaceSm: string
  spaceMd: string
  spaceLg: string
  spaceXl: string
  /**
   * The labeled-field push-down. A metric, not a space step: quasar.css states
   * an absolute value for it, so it must not ride the style-varying
   * `--q-space-*` scale (that is what left md2's value under its label).
   */
  fieldLabeledPaddingTop: string
  compIcon: string
  compSm: string
  compMd: string
  compLg: string
}

export interface MotionTokens {
  durationShort: string
  durationMedium: string
  durationLong: string
  easingStandard: string
  easingDecelerate: string
  easingAccelerate: string
}

/**
 * A token whose dark value is not derivable from the palette roles (md2's dark
 * switch is white-30 / grey-400, which is neither its light value nor md3's
 * dark one). Keeping both sides at the token means one token lives in one
 * place; a second `tokensDark` map could drift out of step silently.
 */
export interface DarkPair {
  light: string
  dark: string
}

export type TokenValue = string | DarkPair

export interface ComponentTokens {
  // QCard — md.sys.shape.corner.large (16px MD3, 4px MD2); surface per style
  cardRadius: string
  cardSurface: string
  // QBtn
  btnBg: string
  btnColor: string
  btnTextTransform: string
  btnRadius: string
  btnMinWidth: string
  /**
   * The round button's side. A shape metric: `border-radius: 50%` on unequal
   * dimensions is an ellipse, so both sides must come from one value per style.
   * md2 = the md2 spec's button `min_width_px` (64px) for both dimensions; md3
   * keeps 3em x control-height so its own audited rendering does not move.
   */
  btnRoundMinWidth: string
  /**
   * The round button's square side. `auto` leaves the style's own geometry alone
   * (md3); a length makes the button square (md2 64px = the spec's button
   * `min_width_px`). Deliberately NOT `min-height`: the 48dp floor must keep
   * reading `var(--q-control-height)` as `min-height` (control-height.test.ts).
   */
  btnRoundHeight: string
  /**
   * The dense round button's own width: dist keeps dense at 2.4em while the plain
   * round button is 3em, so they cannot share one token (a first attempt did, and
   * moved md3's dense round width to 3em — caught by the md3 gate). md2 takes the
   * spec's 64px here too: dense tightens padding, not shape.
   */
  btnRoundDenseMinWidth: string
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
  // QFab
  fabBg: string
  fabColor: string
  fabRadius: string
  fabSize: string
  fabMiniSize: string
  // QTab
  tabIndicatorHeight: string
  tabIndicatorRadius: string
  tabIndicatorBg: string
  // QToggle
  toggleFontSize: string
  toggleDenseFontSize: string
  toggleTrackBg: TokenValue
  toggleDuration: string
  toggleTrackWidth: string
  toggleTrackOutlineWidth: string
  toggleTrackOutlineStyle: string
  toggleTrackOutlineColor: string
  toggleTrackOpacity: string
  toggleTrackBorderRadius: string
  toggleTrackHeight: string
  toggleInnerWidth: string
  // QToggle — MD3 switch spec: specs/reference/normalized/md3-switches.json
  // (chassis 52x32, handle 16 resting / 24 active, 2px outline, state layer 40,
  // toggled in 300ms). MD2 keeps Quasar's 14px track / 20px handle.
  toggleInnerPadding: string
  toggleTrackBgActive: string
  toggleTrackOpacityActive: string
  toggleTrackOutlineWidthActive: string
  toggleTrackOutlineStyleActive: string
  toggleTrackOutlineColorActive: string
  toggleThumbSize: string
  toggleThumbSizeActive: string
  toggleThumbOffset: string
  toggleThumbOffsetActive: string
  toggleThumbOffsetIndet: string
  toggleThumbBg: TokenValue
  toggleThumbBgActive: string
  toggleThumbShadow: string
  toggleIconSize: string
  toggleIconOpacity: string
  toggleIconColor: string
  toggleIconColorActive: string
  toggleStateLayerColor: string
  toggleStateLayerColorActive: string
  // Misc
  linearProgressSpeed: string
  paginationGutterChild: string
  paginationGutterParent: string
  virtualScrollItemHeight: string
  virtualScrollItemWidth: string
  // New tokens for hardcoded value conversion
  btnPaddingY: string
  /** Dedicated touch-target height for controls (48dp); never share compMd. */
  controlHeight: string
  btnMinHeight: string
  btnFontWeight: number
  btnContentGap: string
  btnIconFontSize: string
  btnIconLineHeight: string
  fieldMinHeight: string
  fieldBorderWidth: string
  fieldPaddingX: string
  fieldPaddingY: string
  itemPaddingY: string
  itemMinHeight: string
  separatorColor: string
  itemGap: string
  itemActiveBg: string
  itemActiveColor: string
  itemDenseMinHeight: string
  badgeFontWeight: number
  chipMinHeight: string
  // Additional tokens for remaining components
  bannerMinHeight: string
  toolbarMinHeight: string
  toolbarFontSize: string
  stepperFontSize: string
  captionFontSize: string
  avatarFontSize: string
}

export interface TokenBlock {
  color: ColorTokens // shared (from sourceColor) — NOT per-style
  shape: ShapeTokens // per-style
  typography: TypographyTokens // per-style
  elevation: ElevationTokens // per-style
  sizing: SizingTokens // per-style
  motion: MotionTokens // per-style
  component: ComponentTokens // per-style
}

export interface StyleEntry {
  name: string
  tokens: Omit<TokenBlock, 'color'> // color is shared, not per-style
}
