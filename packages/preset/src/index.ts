import {
  definePreset,
  presetIcons,
  PresetOptions,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
import presetWind4 from '@unocss/preset-wind3'
import { generateTheme, QuasarTheme } from './theme.js'
import { animatedUno } from 'animated-unocss'
import { scopeStyle } from './styles/_scope.js'

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

    const layers: Record<string, number> = {
      components: -1,
      default: 1,
      utilities: 2
    }
    if (scoped && style.bodyClass) {
      layers[style.bodyClass] = -1
    }

    return {
      presets: [
        presetWind4({
          dark: {
            light: '.body--light',
            dark: '.body--dark'
          }
        }),
        animatedUno(),
        presetIcons({}),
        presetWebFonts(
          options?.presetWebFonts ?? {
            provider: 'bunny',
            fonts: {
              roboto: 'Roboto'
            }
          }
        )
      ],
      name: rawStyle.bodyClass || 'quasar',
      safelist: generateSafelist(options ?? {}),
      preflights: corePreflights.concat(style.preflights),
      rules: coreRules.concat(style.rules),
      variants: style.variants,
      shortcuts: coreShortcuts.concat(style.shortcuts),
      postprocess: style.postprocess,
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
      outputToCssLayers: true,
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
