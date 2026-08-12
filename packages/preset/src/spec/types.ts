/**
 * StyleSpec — specification-driven style interface.
 *
 * A `StyleSpec` is the single source of truth for all per-style CSS
 * values. Every token has a default (transparent/none/0/inherit) so
 * missing values never produce visible artifacts.
 *
 * @module StyleSpec
 */

/* ─── Core token categories ─────────────────────────────────── */

export interface ColorTokens {
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
  /** Fully-rounded (pill) corner — machine-spec `corner.full` (Infinity → 9999px) */
  cornerFull: string
  /** Circular corner (50%) — e.g. round buttons, FABs */
  cornerCircle?: string
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
  /** Hover/focus/pressed overlay opacity */
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

/* ─── Runtime font tokens ─────────────────────────────────────── */

/**
 * Plain font sizes used by Quasar's em-based typography utilities.
 * Separate from `typography` (machine-spec shorthand strings) because
 * the runtime emits these as `--q-font-*` variables.
 */
export interface FontsTokens {
  fontXs: string
  fontSm: string
  fontMd: string
  fontLg: string
  fontXl: string
  fontLead: string
}

/* ─── Component tokens ────────────────────────────────────────── */

/**
 * Per-style component tokens — emitted as `--q-{component}-{property}`.
 * One shared shortcut set references these vars; each style supplies
 * the values (e.g. `btnRadius` = 28px for md3, 4px for md2).
 */
export interface ComponentTokens {
  // QToggle
  toggleFontSize: string
  toggleDenseFontSize: string
  toggleTrackBg: string
  toggleTrackOutline: string
  toggleTrackOpacity: string
  toggleTrackBorderRadius: string
  toggleTrackHeight: string
  toggleInnerWidth: string
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
  // Misc
  linearProgressSpeed: string
  paginationGutterChild: string
  paginationGutterParent: string
  virtualScrollItemHeight: string
  virtualScrollItemWidth: string
}

/* ─── Component specs ───────────────────────────────────────── */

/**
 * A single CSS declaration for a component selector.
 * Values are either literal strings or token references resolved
 * at render time via the spec interpolation helper.
 */
export interface SpecDeclaration {
  /** CSS property name */
  property: string
  /** Literal value or token reference path (e.g. "color.primary") */
  value: string
  /** If true, `value` is a token reference resolved from the spec's token block */
  isTokenRef?: boolean
}

/**
 * Per-component spec section.
 * Keyed by component name (e.g. "QBtn", "QCard").
 */
export interface ComponentSpec {
  /** Base selector class (e.g. ".q-btn") */
  selector: string
  /** Declarations for the base selector (light mode, default state) */
  base: SpecDeclaration[]
  /** Sub-selector specs keyed by variant/state name (e.g. "standard", "flat", "fab") */
  variants?: Record<string, ComponentVariantSpec>
  /** Dark-mode override declarations (merged on top of base) */
  dark?: SpecDeclaration[]
  /** Dark-mode variant overrides */
  darkVariants?: Record<string, ComponentVariantSpec>
  /** Pseudo-element specs (before, after) */
  pseudo?: Record<string, SpecDeclaration[]>
  /** Sub-component specs (e.g. q-btn__content, q-btn__progress) */
  children?: Record<string, ComponentChildSpec>
}

export interface ComponentVariantSpec {
  selector?: string
  base: SpecDeclaration[]
  dark?: SpecDeclaration[]
  pseudo?: Record<string, SpecDeclaration[]>
}

export interface ComponentChildSpec {
  selector: string
  base: SpecDeclaration[]
  dark?: SpecDeclaration[]
}

/* ─── Accessibility ─────────────────────────────────────────── */

export interface AccessibilitySpec {
  contrast: {
    wcag: {
      aa: {
        standardText: number
        largeText: number
      }
      aaa?: {
        standardText: number
        largeText: number
      }
    }
    apca?: {
      bodyText: string
      displayHeadline: string
    }
  }
  interactiveTargets: {
    minimumPx: number
    inlineDensityMarginPx?: number
  }
}

/* ─── Layout & breakpoints ──────────────────────────────────── */

export interface LayoutSpec {
  breakpoints: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  spacing: Record<string, string>
}

/* ─── Feature flags ─────────────────────────────────────────── */

export interface StyleFeatures {
  /** Whether this style supports `!rounded-*` overrides */
  shapeOverrides: boolean
  /** Whether this style uses dark-mode variant overrides per component */
  perComponentDark: boolean
  /** Whether this style has elevation shadows */
  elevation: boolean
  /** Whether this style supports state layers (hover/focus/pressed overlays) */
  stateLayers: boolean
  /** Structural differences key (e.g. "md3", "md2") */
  structuralKey: string
  /** Custom feature flags per component */
  component?: Record<string, Record<string, boolean>>
}

/* ─── Top-level StyleSpec ────────────────────────────────────── */

/**
 * Complete specification for one style (md3, md2, unstyled, etc).
 */
export interface StyleSpec {
  /** Unique style identifier */
  style: string
  /** Human-readable label */
  label: string

  /* Core token blocks */
  tokens: {
    color: ColorTokens
    shape: ShapeTokens
    typography: TypographyTokens
    elevation: ElevationTokens
    sizing: SizingTokens
    motion: MotionTokens
    /** Runtime font sizes (`--q-font-*`) — optional, built-in styles provide them */
    fonts?: FontsTokens
    /** Per-style component tokens (`--q-{component}-{property}`) — optional, built-ins provide them */
    component?: ComponentTokens
  }

  /** Dark-mode token overrides (partial — inherits light tokens) */
  darkTokens?: Partial<StyleSpec['tokens']>

  /* Layout */
  layout: LayoutSpec

  /* Accessibility */
  accessibility: AccessibilitySpec

  /* Feature flags */
  features: StyleFeatures

  /* Per-component specs */
  components: Record<string, ComponentSpec>
}

/* ─── Registry types ─────────────────────────────────────────── */

export type SpecRegistry = Record<string, () => StyleSpec>
