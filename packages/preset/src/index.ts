import {
  definePreset,
  presetIcons,
  PresetOptions,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
import presetWind4 from '@unocss/preset-wind4'
import { generateTheme, QuasarTheme } from './theme.js'
import { animatedUno } from 'animated-unocss'
import { scopeStyle } from './styles/_scope.js'
import { Postprocessor, UtilObject } from '@unocss/core'

import { type QuasarIconSet, type QuasarPlugins } from 'quasar'

import { MaterialDesign3, type QuasarStyle } from './styles/index.js'
import {
  preflights as corePreflights,
  rules as coreRules,
  shortcuts as coreShortcuts
} from './core/index.js'
import { WebFontsOptions } from '@unocss/preset-web-fonts'
import { generateSafelist, componentsSafelistMap } from './safelist.js'

export interface QuasarPresetOptions extends PresetOptions {
  style: QuasarStyle
  sourceColor?: string
  plugins?: (keyof QuasarPlugins)[]
  iconSet?: QuasarIconSet
  presetWebFonts?: WebFontsOptions
  /**
   * Scope all CSS to a per-style body class (`quasar-style-md3` etc.).
   *
   * When `true`, every selector gets prefixed with `body.quasar-style-*`
   * so it only matches when `<body>` carries that class. This lets you
   * register multiple `QuasarPreset` instances (one per style) in a
   * single UnoCSS build and switch at runtime by toggling the body class.
   *
   * When `false` (default), CSS is emitted as clean global selectors —
   * no body-class prefix, no runtime class needed. Use this when you
   * only have one style and don't need runtime switching.
   *
   * @default false
   */
  scoped?: boolean
}

const toKebabCase = (str: string) =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((x) => x.toLowerCase())
    .join('-') ?? ''

const clearAndUpper = (text: string) => {
  return text.replace(/-/, '').toUpperCase()
}

const toPascalCase = (text: string) => {
  return text.replace(/(^\w|-\w)/g, clearAndUpper)
}

export const QuasarPreset = definePreset<QuasarPresetOptions, QuasarTheme>(
  (options) => {
    const rawStyle = options?.style ?? MaterialDesign3
    const theme = generateTheme(options?.sourceColor ?? '#1976d2')

    const scoped = options?.scoped === true
    const style =
      scoped && rawStyle.bodyClass
        ? scopeStyle(rawStyle, rawStyle.bodyClass)
        : rawStyle

    /**
     * Postprocessor that undoes `--` → `var(--)` mangling of Quasar BEM
     * class-name modifiers inside bracket-variant selectors.
     *
     * UnoCSS preset-wind4's `variantVariables` handler passes bracket
     * selectors such as `[&_.q-btn--flat]` through `h.bracket()`, which
     * interprets `--flat` as a CSS variable reference and converts it to
     * `var(--flat)`. The resulting class selector `.q-btnvar(--flat)` is
     * invalid CSS and causes lightningcss to fail.
     *
     * This postprocessor runs on every util's selector and replaces
     * `var(--xxx)` with `--xxx` when it is immediately preceded by a word
     * character. The regex uses `[^)]+` (anything except closing paren) to
     * handle cases where `cssVarsRE` matches across dots, spaces, and
     * other characters (e.g. `--dark.q-field--highlighted .q-field__input`).
     *
     * The replacement is run in a loop to handle edge cases where multiple
     * `var()` wrappings or nesting are present.
     */
    const fixBemVarMangling: Postprocessor = (util: UtilObject) => {
      if (util.selector) {
        let prev: string
        do {
          prev = util.selector
          // Pass 1: flatten nested var(var(--xxx)-rest) → var(--xxx-rest)
          util.selector = util.selector.replace(
            /(\w)var\(var\((--[^)]+)\)/g,
            '$1var($2'
          )
          // Pass 2: strip remaining var(--xxx) → --xxx
          util.selector = util.selector.replace(/(\w)var\((--[^)]+)\)/g, '$1$2')
        } while (util.selector !== prev)
      }
      return util
    }

    const layers: Record<string, number> = {
      '0-reset': -200,
      '1-modifier': -5,
      '2-base': -3,
      '3-components': -2,
      '4-state': -1,

      default: 1,
      utilities: 2
    }
    if (scoped && style.bodyClass) {
      layers[style.bodyClass] = -1
    }

    return {
      presets: [
        presetWind4({
          preflights: { reset: false },
          dark: {
            light: '.body--light',
            dark: '.body--dark'
          }
        }) as any,
        animatedUno() as any,
        presetIcons({}) as any,
        presetWebFonts(
          options?.presetWebFonts ?? {
            provider: 'bunny',
            fonts: {
              roboto: 'Roboto'
            }
          }
        ) as any
      ],
      name: rawStyle.bodyClass || 'quasar',
      safelist: generateSafelist(options ?? {}),
      preflights: corePreflights.concat(style.preflights),
      rules: coreRules.concat(style.rules),
      variants: style.variants,
      shortcuts: coreShortcuts.concat(style.shortcuts),
      postprocess: style.postprocess
        ? style.postprocess.concat(fixBemVarMangling)
        : [fixBemVarMangling],
      extendTheme: (themeArg: QuasarTheme) => {
        return {
          ...themeArg,
          ...theme,
          colors: {
            ...themeArg.colors,
            ...theme.colors
          }
        }
      },
      outputToCssLayers: false,
      layers,
      extractors: [
        {
          name: 'quasar-extractor',
          order: 0,

          extract({ code }) {
            const kebabMatch = code.matchAll(/q-(\w)([\w-]*)/g)
            const pascalMatch = code.matchAll(/Q([A-Z][a-z0-9]+)+/g)
            const transitionMatch = code.matchAll(
              /(transition|transition-show|transition-hide|transition-prev|transition-next)="(\S*)"/g
            )
            const colorMatch = code.matchAll(/color[=|:]"(.*?)"/g)

            const themeColorMatch = code.matchAll(
              new RegExp(`(${Object.keys(theme.colors).join('|')})`, 'g')
            )
            const iconMatch = code.matchAll(/(?:icon|name)[=|:]"(.*?)"/g)
            const mdiMatch = code.matchAll(/["'`]i-mdi-([a-z0-9-]+)["'`]/g)

            const pascalComponentsMatch: string[] = []
            const matches: string[] = []

            for (const match of kebabMatch) {
              matches.push(match[0])
              pascalComponentsMatch.push(toPascalCase(match[0]))
            }
            for (const match of pascalMatch) {
              pascalComponentsMatch.push(match[0])
              matches.push(toKebabCase(match[0]))
            }
            const transitionClasses: string[] = []
            for (const match of transitionMatch) {
              transitionClasses.push(
                ...[
                  'enter-from',
                  'enter-active',
                  'enter-to',
                  'leave-from',
                  'leave-active',
                  'leave-to'
                ].map((v) => `q-transition--${match[2]}-${v}`)
              )
            }
            const colorClasses: string[] = []
            for (const match of colorMatch) {
              colorClasses.push(`text-${match[1]}`, `bg-${match[1]}`)
            }
            for (const match of themeColorMatch) {
              colorClasses.push(`text-${match[1]}`, `bg-${match[1]}`)
            }

            const iconClasses: string[] = []
            for (const match of iconMatch) {
              iconClasses.push(`i-mdi-${match[1]}`)
            }
            for (const match of mdiMatch) {
              iconClasses.push(`i-mdi-${match[1]}`)
            }

            const classes: string[] = []
            const componentClasses = [
              ...matches,
              ...pascalComponentsMatch.reduce((acc, component) => {
                if (component in componentsSafelistMap) {
                  acc.push(
                    ...(componentsSafelistMap as Record<string, string[]>)[
                      component
                    ]
                  )
                }
                return acc
              }, [] as string[])
            ]
            classes.push(
              ...transitionClasses,
              ...colorClasses,
              ...componentClasses,
              ...iconClasses
            )
            return classes
          }
        }
      ],
      transformers: [transformerVariantGroup(), transformerDirectives()]
    }
  }
)
