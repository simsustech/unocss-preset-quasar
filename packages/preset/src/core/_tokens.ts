/**
 * Design tokens — single source of truth for all per-style CSS variables.
 *
 * Every token has a default (transparent/none/0/inherit) so missing
 * values never produce visible artifacts. Shortcuts reference these
 * tokens for ALL properties — the style determines the value.
 *
 * Token naming: --q-{category}-{name}
 *   --q-primary, --q-on-primary, --q-radius-xl, --q-space-md, --q-font-md
 * Component tokens: --q-{component}-{property}
 *   --q-toggle-track-bg, --q-toggle-font-size
 */

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
}

export interface DesignTokens {
  md3: TokenBlock
  md2: TokenBlock
  unstyled: TokenBlock
  dark: {
    md3: Pick<TokenBlock['color'], 'primary' | 'onPrimary'>
    md2: Pick<TokenBlock['color'], 'primary' | 'onPrimary'>
  }
}

const extra = {
  onPrimaryContainer: 'var(--light-on-primary-container)',
  onSecondaryContainer: 'var(--light-on-secondary-container)',
  onSurfaceVariant: 'var(--light-on-surface-variant)',
  surfaceContainerHigh: 'var(--light-surface-container-high)',
  darkSecondary: 'var(--dark-secondary)',
  darkOutline: 'var(--dark-outline)',
  darkInverseSurface: 'var(--dark-inverse-surface)',
  darkTertiaryContainer: 'var(--dark-tertiary-container)'
}

export const tokens: DesignTokens = {
  md3: {
    color: {
      primary: 'var(--light-primary)',
      onPrimary: 'var(--light-on-primary)',
      primaryContainer: 'var(--light-primary-container)',
      secondary: 'var(--light-secondary)',
      onSecondary: 'var(--light-on-secondary)',
      secondaryContainer: 'var(--light-secondary-container)',
      surface: 'var(--light-surface)',
      surfaceContainer: 'var(--light-surface-container)',
      surfaceContainerLow: 'var(--light-surface-container-low)',
      surfaceContainerHighest: 'var(--light-surface-container-highest)',
      outline: 'var(--light-outline)',
      onSurface: 'var(--light-on-surface)',
      ...extra
    },
    shape: {
      radiusXs: '4px',
      radiusSm: '8px',
      radiusMd: '12px',
      radiusLg: '16px',
      radiusXl: '28px',
      radiusFull: '9999px',
      radiusCircle: '50%'
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
    type: {
      fontXs: '11px',
      fontSm: '12px',
      fontMd: '14px',
      fontLg: '16px',
      fontXl: '20px',
      fontLead: '1.715em',
      hoverOpacity: '0.08',
      linearProgressSpeed: '0.3s',
      paginationGutterChild: '4px',
      paginationGutterParent: '4px',
      virtualScrollItemHeight: '48px',
      virtualScrollItemWidth: '100%',
      toggleFontSize: '32px',
      toggleDenseFontSize: '28px',
      toggleTrackBg: 'var(--q-surface-container)',
      toggleTrackOutline: '2px solid var(--q-outline)',
      toggleTrackOpacity: '1',
      toggleTrackBorderRadius: 'var(--q-radius-full)',
      toggleTrackHeight: '1em',
      toggleInnerWidth: '1.625em'
    }
  },
  md2: {
    color: {
      primary: 'var(--light-primary)',
      onPrimary: 'var(--light-on-primary)',
      primaryContainer: 'var(--light-primary-container)',
      secondary: 'var(--light-secondary)',
      onSecondary: 'var(--light-on-secondary)',
      secondaryContainer: 'var(--light-secondary-container)',
      surface: 'var(--light-surface)',
      surfaceContainer: 'var(--light-surface-container)',
      surfaceContainerLow: 'var(--light-surface-container-low)',
      surfaceContainerHighest: 'var(--light-surface-container-highest)',
      outline: 'var(--light-outline)',
      onSurface: 'var(--light-on-surface)',
      ...extra
    },
    shape: {
      radiusXs: '3px',
      radiusSm: '4px',
      radiusMd: '7px',
      radiusLg: '16px',
      radiusXl: '28px',
      radiusFull: '9999px',
      radiusCircle: '50%'
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
    type: {
      fontXs: '12px',
      fontSm: '12px',
      fontMd: '14px',
      fontLg: '14px',
      fontXl: '18px',
      fontLead: '1.715em',
      hoverOpacity: '0.08',
      linearProgressSpeed: '0.3s',
      paginationGutterChild: '4px',
      paginationGutterParent: '4px',
      virtualScrollItemHeight: '48px',
      virtualScrollItemWidth: '100%',
      toggleFontSize: '40px',
      toggleDenseFontSize: '28px',
      toggleTrackBg: 'currentColor',
      toggleTrackOutline: 'none',
      toggleTrackOpacity: '0.38',
      toggleTrackBorderRadius: '0.175em',
      toggleTrackHeight: '0.35em',
      toggleInnerWidth: '1.4em'
    }
  },
  unstyled: {
    color: {
      primary: 'transparent',
      onPrimary: 'inherit',
      primaryContainer: 'transparent',
      secondary: 'transparent',
      onSecondary: 'inherit',
      secondaryContainer: 'transparent',
      surface: 'transparent',
      surfaceContainer: 'transparent',
      surfaceContainerLow: 'transparent',
      surfaceContainerHighest: 'transparent',
      outline: 'transparent',
      onSurface: 'inherit',
      onPrimaryContainer: 'inherit',
      onSecondaryContainer: 'inherit',
      onSurfaceVariant: 'inherit',
      surfaceContainerHigh: 'transparent',
      darkSecondary: 'transparent',
      darkOutline: 'transparent',
      darkInverseSurface: 'transparent',
      darkTertiaryContainer: 'transparent'
    },
    shape: {
      radiusXs: '0',
      radiusSm: '0',
      radiusMd: '0',
      radiusLg: '0',
      radiusXl: '0',
      radiusFull: '9999px',
      radiusCircle: '0'
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
    type: {
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
      virtualScrollItemHeight: 'auto',
      virtualScrollItemWidth: 'auto',
      toggleFontSize: '32px',
      toggleDenseFontSize: '28px',
      toggleTrackBg: 'transparent',
      toggleTrackOutline: 'none',
      toggleTrackOpacity: '1',
      toggleTrackBorderRadius: 'var(--q-radius-full)',
      toggleTrackHeight: '1em',
      toggleInnerWidth: '1.625em'
    }
  },
  dark: {
    md3: {
      primary: 'var(--dark-primary)',
      onPrimary: 'var(--dark-on-primary)'
    },
    md2: { primary: 'var(--dark-primary)', onPrimary: 'var(--dark-on-primary)' }
  }
}
