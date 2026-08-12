/**
 * md3.spec.ts — Material Design 3 StyleSpec
 *
 * Authored from material_design_3_machine_spec.json + _tokens.md3 +
 * spec-inventory literals. Code-as-is on conflicts (F2).
 *
 * @module StyleSpec
 */

import type { StyleSpec } from './types.js'

const spec: StyleSpec = {
  style: 'md3',
  label: 'Material Design 3 (with Quasar overrides)',

  /* ─── Core tokens ───────────────────────────────────────────── */

  tokens: {
    color: {
      primary: 'var(--light-primary)',
      onPrimary: 'var(--light-on-primary)',
      primaryContainer: 'var(--light-primary-container)',
      onPrimaryContainer: 'var(--light-on-primary-container)',
      secondary: 'var(--light-secondary)',
      onSecondary: 'var(--light-on-secondary)',
      secondaryContainer: 'var(--light-secondary-container)',
      onSecondaryContainer: 'var(--light-on-secondary-container)',
      tertiary: 'var(--light-tertiary)',
      onTertiary: 'var(--light-on-tertiary)',
      tertiaryContainer: 'var(--light-tertiary-container)',
      onTertiaryContainer: 'var(--light-on-tertiary-container)',
      error: 'var(--light-error)',
      onError: 'var(--light-on-error)',
      errorContainer: 'var(--light-error-container)',
      onErrorContainer: 'var(--light-on-error-container)',
      background: 'var(--light-background)',
      onBackground: 'var(--light-on-background)',
      surface: 'var(--light-surface)',
      onSurface: 'var(--light-on-surface)',
      surfaceVariant: 'var(--light-surface-variant)',
      onSurfaceVariant: 'var(--light-on-surface-variant)',
      surfaceContainerLowest: 'var(--light-surface-container-lowest)',
      surfaceContainerLow: 'var(--light-surface-container-low)',
      surfaceContainer: 'var(--light-surface-container)',
      surfaceContainerHigh: 'var(--light-surface-container-high)',
      surfaceContainerHighest: 'var(--light-surface-container-highest)',
      outline: 'var(--light-outline)',
      outlineVariant: 'var(--light-outline-variant)',
      inverseSurface: 'var(--light-inverse-surface)',
      inverseOnSurface: 'var(--light-inverse-on-surface)',
      inversePrimary: 'var(--light-inverse-primary)',
      shadow: 'var(--light-shadow)',
      scrim: 'var(--light-scrim)'
    },

    shape: {
      cornerExtraSmall: '4px',
      cornerSmall: '8px',
      cornerMedium: '12px',
      cornerLarge: '16px',
      cornerExtraLarge: '28px',
      cornerFull: '9999px',
      cornerCircle: '50%'
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

    /* ─── Runtime fonts ──────────────────────────────────────────── */

    /** Emitted as `--q-font-*`; separate from the shorthand `typography` strings */
    fonts: {
      fontXs: '11px',
      fontSm: '12px',
      fontMd: '14px',
      fontLg: '16px',
      fontXl: '20px',
      fontLead: '1.715em'
    },

    /* ─── Component tokens ──────────────────────────────────────── */

    /** Per-style component values, emitted as `--q-{component}-{property}` */
    component: {
      linearProgressSpeed: '0.3s',
      paginationGutterChild: '4px',
      paginationGutterParent: '4px',
      virtualScrollItemHeight: '48px',
      virtualScrollItemWidth: '100%',
      // QToggle
      toggleFontSize: '32px',
      toggleDenseFontSize: '28px',
      toggleTrackBg: 'var(--q-surface-container)',
      toggleTrackOutline: '2px solid var(--q-outline)',
      toggleTrackOpacity: '1',
      toggleTrackBorderRadius: 'var(--q-radius-full)',
      toggleTrackHeight: '1em',
      toggleInnerWidth: '1.625em',
      // QBtn
      btnBg: 'var(--light-primary)',
      btnColor: 'var(--light-on-primary)',
      btnTextTransform: 'none',
      btnRadius: 'var(--q-radius-xl)',
      btnMinWidth: 'auto',
      btnPaddingX: '24px',
      btnShadow:
        '0 4px 6px -1px rgb(156 163 175 / 0.14), 0 2px 4px -2px rgb(156 163 175 / 0.14)',
      btnPressedShadow:
        '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px rgba(0, 0, 0, 0.14), 0 1px 14px rgba(0, 0, 0, 0.12)',
      btnOutlineColor: 'var(--light-primary)',
      btnOutlineBorder: 'var(--light-outline)',
      btnFlatColor: 'var(--light-primary)',
      btnFlatPaddingX: '12px',
      btnPushRadius: '7px',
      btnPushBorderBottom: '3px solid rgba(0, 0, 0, 0.15)',
      btnRoundedRadius: 'var(--q-radius-xl)',
      btnRoundRadius: '50%',
      btnSquareRadius: '0',
      btnDensePadding: '0.175em',
      btnFontSize: '14px',
      btnLineHeight: '1.715em',
      btnPressedShadowLg:
        '0 10px 15px -3px rgb(156 163 175 / 0.14), 0 4px 6px -4px rgb(156 163 175 / 0.14)',
      // QFab
      fabBg: 'var(--light-primary-container)',
      fabColor: 'var(--light-on-surface)',
      fabRadius: 'var(--q-radius-lg)',
      fabSize: '56px',
      fabMiniSize: '40px'
    }
  },

  darkTokens: {
    color: {
      primary: 'var(--dark-primary)',
      onPrimary: 'var(--dark-on-primary)',
      primaryContainer: 'var(--dark-primary-container)',
      onPrimaryContainer: 'var(--dark-on-primary-container)',
      secondary: 'var(--dark-secondary)',
      onSecondary: 'var(--dark-on-secondary)',
      secondaryContainer: 'var(--dark-secondary-container)',
      onSecondaryContainer: 'var(--dark-on-secondary-container)',
      surface: 'var(--dark-surface)',
      onSurface: 'var(--dark-on-surface)',
      outline: 'var(--dark-outline)',
      inverseSurface: 'var(--dark-inverse-surface)',
      inverseOnSurface: 'var(--dark-inverse-on-surface)',
      surfaceContainer: 'var(--dark-surface-container)',
      surfaceContainerLow: 'var(--dark-surface-container-low)',
      surfaceContainerHigh: 'var(--dark-surface-container-high)',
      surfaceContainerHighest: 'var(--dark-surface-container-highest)',
      tertiaryContainer: 'var(--dark-tertiary-container)'
    } as Record<string, string>
  } as unknown as Partial<StyleSpec['tokens']>,

  /* ─── Layout ─────────────────────────────────────────────────── */

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

  /* ─── Accessibility ──────────────────────────────────────────── */

  accessibility: {
    contrast: {
      wcag: {
        aa: {
          standardText: 4.5,
          largeText: 3.0
        },
        aaa: {
          standardText: 7.0,
          largeText: 4.5
        }
      },
      apca: {
        bodyText: 'Lc 75',
        displayHeadline: 'Lc 60'
      }
    },
    interactiveTargets: {
      minimumPx: 48,
      inlineDensityMarginPx: 8
    }
  },

  /* ─── Feature flags ──────────────────────────────────────────── */

  features: {
    shapeOverrides: true,
    perComponentDark: true,
    elevation: true,
    stateLayers: true,
    structuralKey: 'md3',
    component: {
      QBtn: {
        uppercase: false,
        roundedDefault: true
      }
    }
  },

  /* ─── Component specs ────────────────────────────────────────── */

  components: {
    QBtn: {
      selector: '.q-btn',
      base: [
        { property: 'font-size', value: '14px' },
        { property: 'line-height', value: '1.715em' },
        { property: 'font-weight', value: '500' },
        { property: 'text-transform', value: 'none' },
        { property: 'min-height', value: '2.572em' },
        { property: 'padding-left', value: '24px' },
        { property: 'padding-right', value: '24px' },
        { property: 'padding-top', value: '4px' },
        { property: 'padding-bottom', value: '4px' },
        {
          property: 'background-color',
          value: 'color.primary',
          isTokenRef: true
        },
        { property: 'color', value: 'color.onPrimary', isTokenRef: true }
      ],
      dark: [
        {
          property: 'background-color',
          value: 'darkTokens.color.primary',
          isTokenRef: true
        },
        {
          property: 'color',
          value: 'darkTokens.color.onPrimary',
          isTokenRef: true
        }
      ],
      variants: {
        standard: {
          base: [{ property: 'border-radius', value: '28px' }]
        },
        outline: {
          base: [
            { property: 'border-radius', value: '28px' },
            { property: 'background-color', value: 'transparent' },
            { property: 'color', value: 'color.primary', isTokenRef: true }
          ],
          dark: [
            {
              property: 'color',
              value: 'darkTokens.color.primary',
              isTokenRef: true
            }
          ],
          pseudo: {
            before: [
              { property: 'border-width', value: '1px' },
              { property: 'border-style', value: 'solid' },
              {
                property: 'border-color',
                value: 'color.outline',
                isTokenRef: true
              }
            ]
          }
        },
        flat: {
          base: [
            { property: 'border-radius', value: '28px' },
            { property: 'background-color', value: 'transparent' },
            { property: 'color', value: 'color.primary', isTokenRef: true },
            { property: 'padding-left', value: '12px' },
            { property: 'padding-right', value: '12px' }
          ],
          dark: [
            {
              property: 'color',
              value: 'darkTokens.color.primary',
              isTokenRef: true
            }
          ]
        },
        push: {
          base: [{ property: 'border-radius', value: '7px' }],
          pseudo: {
            before: [
              { property: 'border-bottom', value: '3px solid rgba(0,0,0,0.15)' }
            ]
          }
        },
        rounded: {
          base: [{ property: 'border-radius', value: '28px' }]
        },
        round: {
          base: [
            { property: 'border-radius', value: '50%' },
            { property: 'min-width', value: '3em' },
            { property: 'min-height', value: '3em' },
            { property: 'padding', value: '0' }
          ]
        },
        square: {
          base: [{ property: 'border-radius', value: '0' }]
        },
        dense: {
          base: [
            { property: 'padding', value: '0.175em' },
            { property: 'min-height', value: '2em' }
          ]
        },
        fab: {
          base: [
            {
              property: 'background-color',
              value: 'color.primaryContainer',
              isTokenRef: true
            },
            { property: 'color', value: 'color.onSurface', isTokenRef: true },
            { property: 'min-width', value: '56px' },
            { property: 'height', value: '56px' },
            { property: 'padding', value: '0' },
            {
              property: 'border-radius',
              value: 'shape.cornerLarge',
              isTokenRef: true
            }
          ]
        },
        'fab-mini': {
          base: [
            {
              property: 'background-color',
              value: 'color.primaryContainer',
              isTokenRef: true
            },
            { property: 'color', value: 'color.onSurface', isTokenRef: true },
            { property: 'min-width', value: '40px' },
            { property: 'height', value: '40px' },
            { property: 'padding', value: '0' },
            {
              property: 'border-radius',
              value: 'shape.cornerMedium',
              isTokenRef: true
            }
          ]
        }
      },
      pseudo: {
        before: [
          { property: 'border-radius', value: 'inherit' },
          {
            property: 'box-shadow',
            value: 'elevation.level2',
            isTokenRef: true
          }
        ]
      },
      children: {
        content: {
          selector: '.q-btn__content',
          base: [{ property: 'transition', value: 'opacity 0.3s' }]
        },
        progress: {
          selector: '.q-btn__progress',
          base: [{ property: 'border-radius', value: 'inherit' }]
        },
        'progress-indicator': {
          selector: '.q-btn__progress-indicator',
          base: [
            { property: 'transform', value: 'translateX(-100%)' },
            { property: 'background-color', value: 'rgba(255,255,255,0.25)' }
          ],
          dark: [{ property: 'background-color', value: 'rgba(0,0,0,0.2)' }]
        }
      }
    },

    QCard: {
      selector: '.q-card',
      base: [
        {
          property: 'border-radius',
          value: 'shape.cornerMedium',
          isTokenRef: true
        },
        { property: 'box-shadow', value: 'elevation.level2', isTokenRef: true }
      ],
      children: {
        section: {
          selector: '.q-card__section',
          base: [{ property: 'padding', value: '16px' }]
        }
      }
    },

    QDialog: {
      selector: '.q-dialog',
      base: [],
      children: {
        card: {
          selector: '.q-dialog__inner > .q-card',
          base: [
            {
              property: 'box-shadow',
              value: 'elevation.level4',
              isTokenRef: true
            }
          ]
        }
      }
    },

    QInput: {
      selector: '.q-input',
      base: [
        { property: 'font-size', value: '16px' },
        { property: 'line-height', value: '1.5em' }
      ]
    },

    QChip: {
      selector: '.q-chip',
      base: [
        {
          property: 'border-radius',
          value: 'shape.cornerSmall',
          isTokenRef: true
        }
      ]
    },

    QBadge: {
      selector: '.q-badge',
      base: [{ property: 'font-size', value: '12px' }]
    }
  }
}

export default spec
