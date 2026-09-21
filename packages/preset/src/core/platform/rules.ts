import type { ComponentRule } from '../../rules/types.js'

/**
 * Platform-scoped rules.
 *
 * Quasar's platform detection puts classes on `<body>` at runtime
 * (`desktop`, `mobile`, `touch`, `electron`, `platform-ios`, `platform-android`,
 * `native-mobile`), and the reference sheet scopes a visibility family to each
 * pair: `.desktop-hide` is hidden *on* desktop, `.desktop-only` everywhere else.
 *
 * The prefix is baked into the emitted selector (`body.desktop .desktop-hide`)
 * rather than applied from JavaScript: the browser evaluating the body class is
 * the whole mechanism, and runtime JS is what the rewrite is removing.
 *
 * Reference bodies are `display: none !important` throughout.
 */

const PLATFORMS = ['desktop', 'mobile', 'touch', 'electron'] as const

/** `*-hide`: hidden while the platform class is present. */
const hideRules: ComponentRule[] = PLATFORMS.map((platform) => [
  new RegExp(`^${platform}-hide$`),
  function* (_, { symbols }) {
    yield {
      [symbols.selector]: (sel) => `body.${platform} ${sel}`,
      display: 'none !important'
    }
  }
])

/** `*-only`: hidden while the platform class is absent. */
const onlyRules: ComponentRule[] = PLATFORMS.map((platform) => [
  new RegExp(`^${platform}-only$`),
  function* (_, { symbols }) {
    yield {
      [symbols.selector]: (sel) => `body:not(.${platform}) ${sel}`,
      display: 'none !important'
    }
  }
])

/** iOS/Android are detected as `platform-ios`/`platform-android`. */
const platformHideRules: ComponentRule[] = ['ios', 'android'].map(
  (platform) => [
    new RegExp(`^platform-${platform}-hide$`),
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `body.platform-${platform} ${sel}`,
        display: 'none !important'
      }
    }
  ]
)

export const platformRules: ComponentRule[] = [
  ...hideRules,
  ...onlyRules,
  ...platformHideRules
]

/**
 * Orientation and print families.
 *
 * These need media queries, which a class rule cannot carry, so they are emitted
 * as CSS text (assembled in `src/index.ts`) with the same bodies as the
 * reference: `.orientation-landscape` is hidden in portrait, `.print-only` on
 * screen, `.print-hide` when printing.
 */
export const platformMediaCss: string = [
  '@media all and (orientation: portrait){.orientation-landscape{display:none !important}}',
  '@media all and (orientation: landscape){.orientation-portrait{display:none !important}}',
  '@media screen{.print-only{display:none !important}}',
  '@media print{.print-hide{display:none !important}}'
].join('\n')
