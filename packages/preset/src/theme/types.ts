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
  level0: string
  level1: string
  level2: string
  level3: string
  level4: string
  level5: string
}

export interface SizingTokens {
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

export interface MotionTokens {
  durationShort: string
  durationMedium: string
  durationLong: string
  easingStandard: string
  easingDecelerate: string
  easingAccelerate: string
}

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
  toggleTrackBg: string
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
  toggleThumbBg: string
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
  btnMinHeight: string
  btnFontWeight: number
  btnContentGap: string
  btnIconFontSize: string
  btnIconLineHeight: string
  fieldMinHeight: string
  fieldBorderWidth: string
  fieldPaddingX: string
  fieldPaddingY: string
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
