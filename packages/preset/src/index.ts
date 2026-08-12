import {
  definePreset,
  presetIcons,
  type PresetOptions,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
import presetWind4 from '@unocss/preset-wind4'
import { generateTheme, type QuasarTheme } from './theme.js'
import { animatedUno } from 'animated-unocss'
import type { Postprocessor, UtilObject } from '@unocss/core'
import {
  createTokenPreflight,
  type QuasarStyleEntry
} from './core/_tokenPreflight.js'

import type { QuasarIconSet, QuasarPlugins } from 'quasar'

import { QuasarStyleEntries, type QuasarStyle } from './styles/index.js'
import baseStyle from './styles/shared/index.js'
import {
  preflights as corePreflights,
  rules as coreRules,
  shortcuts as coreShortcuts
} from './core/index.js'
import type { WebFontsOptions } from '@unocss/preset-web-fonts'
import { generateSafelist, componentsSafelistMap } from './safelist.js'

export interface QuasarPresetOptions extends PresetOptions {
  /**
   * Style entries — one named token spec per style. The FIRST entry is the
   * default style: its tokens are emitted globally on `:root` (plus
   * `body.body--dark` dark overrides), so it applies out of the box with
   * zero config and no body class. Every entry's tokens are also emitted
   * as a scoped `body.quasar-style-{name}` CSS-variable block, so switching
   * the body class (`setStyle`) swaps styles at runtime with one preset.
   *
   *   import { QuasarStyleEntries } from 'unocss-preset-quasar/styles'
   *   QuasarPreset({ styles: QuasarStyleEntries })
   *
   * Defaults to all built-in entries (md3, md2, unstyled).
   */
  styles?: QuasarStyleEntry[]
  /**
   * A single style entry — shorthand for `styles: [style]`. As the first
   * (only) entry it is the default style and applies globally without a
   * body class. When both are given, `styles` wins.
   */
  style?: QuasarStyleEntry
  sourceColor?: string
  plugins?: (keyof QuasarPlugins)[]
  iconSet?: QuasarIconSet
  presetWebFonts?: WebFontsOptions
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
    // The shared base tree is the ONLY component tree. Style differences
    // are pure token values; entries select which token block is active.
    const styleEntries: QuasarStyleEntry[] = options?.styles?.length
      ? options.styles
      : options?.style
        ? [options.style]
        : QuasarStyleEntries
    const rawStyle: QuasarStyle = baseStyle
    const theme = generateTheme(options?.sourceColor ?? '#1976d2')

    // Token preflight reads `theme.quasar.tokens` (injected in extendTheme),
    // so style values are plain UnoCSS theme config.
    const tokenPreflight = createTokenPreflight()

    const fixBemVarMangling: Postprocessor = (util: UtilObject) => {
      if (util.selector) {
        let prev: string
        do {
          prev = util.selector
          util.selector = util.selector.replace(
            /(\w)var\(var\((--[^)]+)\)/g,
            '$1var($2'
          )
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
      name: 'quasar',
      safelist: generateSafelist(options ?? {}),
      preflights: [tokenPreflight].concat(corePreflights, rawStyle.preflights),
      rules: coreRules.concat(rawStyle.rules),
      variants: rawStyle.variants,
      shortcuts: coreShortcuts.concat(rawStyle.shortcuts),
      postprocess: rawStyle.postprocess
        ? rawStyle.postprocess.concat(fixBemVarMangling)
        : [fixBemVarMangling],
      extendTheme: (themeArg: QuasarTheme) => {
        return {
          ...themeArg,
          ...theme,
          colors: {
            ...themeArg.colors,
            ...theme.colors
          },
          quasar: {
            ...theme.quasar,
            ...themeArg.quasar,
            tokens: styleEntries
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
