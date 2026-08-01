/**
 * md2.spec.ts — Material Design 2 StyleSpec
 *
 * Authored from material_design_2_machine_spec.json + _tokens.md2 +
 * spec-inventory literals. Code-as-is on conflicts (F2).
 *
 * @module StyleSpec
 */

import type { StyleSpec } from './types.js'

const spec: StyleSpec = {
  style: 'md2',
  label: 'Material Design 2 (with Quasar overrides)',

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
      cornerExtraSmall: '3px',
      cornerSmall: '4px',
      cornerMedium: '7px',
      cornerLarge: '16px',
      cornerExtraLarge: '28px',
      cornerFull: '50%'
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
      surfaceContainerHighest: 'var(--dark-surface-container-highest)'
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
      }
    },
    interactiveTargets: {
      minimumPx: 48
    }
  },

  /* ─── Feature flags ──────────────────────────────────────────── */

  features: {
    shapeOverrides: true,
    perComponentDark: true,
    elevation: true,
    stateLayers: false,
    structuralKey: 'md2',
    component: {
      QBtn: {
        uppercase: true,
        roundedDefault: false
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
        { property: 'text-transform', value: 'uppercase' },
        { property: 'min-height', value: '2.572em' },
        { property: 'padding-left', value: '16px' },
        { property: 'padding-right', value: '16px' },
        { property: 'padding-top', value: '4px' },
        { property: 'padding-bottom', value: '4px' },
        { property: 'border-radius', value: '4px' },
        { property: 'min-width', value: '64px' },
        { property: 'background-color', value: 'transparent' },
        { property: 'color', value: 'inherit' }
      ],
      variants: {
        standard: {
          base: [
            {
              property: 'box-shadow',
              value: 'elevation.level1',
              isTokenRef: true
            }
          ]
        },
        outline: {
          base: [{ property: 'background-color', value: 'transparent' }],
          pseudo: {
            before: [
              { property: 'border', value: '1px solid currentColor' },
              { property: 'box-shadow', value: 'none' }
            ]
          }
        },
        flat: {
          base: [
            { property: 'padding-left', value: '8px' },
            { property: 'padding-right', value: '8px' }
          ],
          pseudo: {
            before: [{ property: 'box-shadow', value: 'none' }]
          }
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
            { property: 'padding', value: '0' },
            { property: 'min-width', value: '3em' },
            { property: 'min-height', value: '3em' }
          ]
        },
        square: {
          base: [{ property: 'border-radius', value: '0' }]
        },
        dense: {
          base: [
            { property: 'padding', value: '0.285em' },
            { property: 'min-height', value: '2em' }
          ]
        },
        fab: {
          base: [
            { property: 'border-radius', value: '50%' },
            { property: 'min-width', value: '56px' },
            { property: 'min-height', value: '56px' },
            { property: 'padding', value: '0' }
          ]
        },
        'fab-mini': {
          base: [
            { property: 'border-radius', value: '50%' },
            { property: 'padding', value: '8px' },
            { property: 'min-width', value: '40px' },
            { property: 'min-height', value: '40px' }
          ]
        }
      },
      pseudo: {
        before: [
          { property: 'border-radius', value: 'inherit' },
          {
            property: 'box-shadow',
            value: 'elevation.level1',
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
          value: 'shape.cornerSmall',
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
              value: 'elevation.level5',
              isTokenRef: true
            }
          ]
        }
      }
    },

    QInput: {
      selector: '.q-input',
      base: [{ property: 'font-size', value: '16px' }]
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
