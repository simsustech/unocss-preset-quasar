import presetIcons from '@unocss/preset-icons'
import presetWebFonts from '@unocss/preset-web-fonts'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import type { IconsOptions } from '@unocss/preset-icons'
import type { WebFontsOptions } from '@unocss/preset-web-fonts'
import presetMini from '@unocss/preset-mini'
import { definePreset } from '@unocss/core'
import type { Preset, Rule } from '@unocss/core'
import type { QuasarPlugins } from 'quasar'
import { generateTheme } from './theme/quasar-theme.js'
import { mergeDuplicateRules, rulesInLayer } from './rules/merge.js'
import { scopeRule } from './rules/scope.js'
import { animatedUno } from 'animated-unocss'
import { quasarKeyframesCss } from './core/motion/keyframes.js'
import { generateColorTokens } from './theme/colors.js'
import { createTokenPreflight } from './theme/preflight.js'
import type { QuasarStyleEntry } from './styles/index.js'
import { quasarComponentExtractor, quasarValueExtractor } from './extractor.js'
import { quasarSafelist, pluginSafelistMap } from './safelist.js'
import { gridBreakpointVariants } from './core/grid/variants.js'
import * as componentModules from './components/index.js'
import * as coreModules from './core/index.js'
import {
  animationHelperMediaCss,
  animationHelperStaticCss,
  animationHelperTokenCss,
  mouseHelperCss,
  platformMediaCss,
  responsiveVisibilityCss
} from './core/index.js'
import { layoutMediaCss } from './components/layout/rules.js'
import { tooltipMediaCss } from './components/tooltip/rules.js'
import { notificationMediaCss } from './components/notification/rules.js'
import { dialogMediaCss, dialogPlatformCss } from './components/dialog/rules.js'
import {
  appExtensionModules,
  type AppExtensionName
} from './app-extensions/index.js'

const pickBySuffix = (
  mod: Record<string, unknown>,
  suffix: string
): unknown[] =>
  Object.entries(mod)
    .filter(([key]) => key.endsWith(suffix))
    .flatMap(([, value]) => (Array.isArray(value) ? value : [value]))

/** A Rule is a `[matcher, ...]` tuple, a bare selector, or an object map. */
const isRuleList = (value: unknown): value is Rule[] =>
  Array.isArray(value) &&
  value.every(
    (entry) =>
      typeof entry === 'string' ||
      (Array.isArray(entry) &&
        (entry[0] instanceof RegExp || typeof entry[0] === 'string'))
  )

/** Rule exporters, narrowed from the module namespaces without assertions. */
const pickRules = (mod: Record<string, unknown>, suffix: string): Rule[] =>
  Object.entries(mod)
    .filter(([key]) => key.endsWith(suffix))
    .flatMap(([, value]) => (isRuleList(value) ? value : []))

const componentRules = pickRules(componentModules, 'Rules')
// Grid/container utilities (`.column`, `.row`, `.col`) must precede the
// component rules. Quasar's own sheet and the reference deployment both place
// `.column` before the q-item layout rules, so `.q-item__section--main
// { flex: 10000 1 0% }` wins over `.column { flex: 1 1 auto }`. With every
// utility last, `.column` won instead and the row collapsed: the side section
// grew to 378px where the reference is 56px.
const coreRuleEntries = Object.entries(coreModules).filter(([key]) =>
  key.endsWith('Rules')
)
const gridRules = pickRules(
  Object.fromEntries(coreRuleEntries.filter(([key]) => key.startsWith('grid'))),
  'Rules'
)
const nonGridCoreRules = pickRules(
  Object.fromEntries(
    coreRuleEntries.filter(([key]) => !key.startsWith('grid'))
  ),
  'Rules'
)
const corePreflights = pickBySuffix(coreModules, 'Preflights')
const componentPreflights = pickBySuffix(componentModules, 'Preflights')
const coreShortcuts = pickBySuffix(coreModules, 'Shortcuts')
const componentShortcuts = pickBySuffix(componentModules, 'Shortcuts')

/**
 * The flat Quasar palette out of the public theme, for the engine's theme.
 *
 * `colors.light` / `colors.dark` are *scheme objects*, not colours — spreading
 * them into a colour namespace would make the engine treat each role as a
 * palette entry (`--colors-light-primary`). The roles reach CSS through the
 * token preflight instead. Everything else (the Quasar palette plus the brand
 * aliases) is a colour name that utilities address directly.
 */
function paletteColors(theme: { colors: Record<string, unknown> }) {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(theme.colors)) {
    if (key === 'light' || key === 'dark') continue
    if (typeof value !== 'string') continue
    out[key] = value
  }
  // The reference also exposes the light scheme's primary as a palette colour:
  // `.text-light-primary` resolves `var(--colors-light-primary, var(--light-primary))`, so it is a
  // utility-addressed colour rather than a role.
  const light = theme.colors.light
  if (light && typeof light === 'object') {
    const primary = (light as Record<string, unknown>).primary
    if (typeof primary === 'string') out['light-primary'] = primary
  }
  return out
}
export interface QuasarPresetOptions {
  /**
   * The styles that ship. The FIRST entry is the baseline: its tokens land on
   * `body` and its rules ship unscoped. Every other entry ships only as a
   * `body.quasar-style-{name}` switch block, so an app carries exactly the
   * styles it lists and nothing else. The runtime `setStyle()` only switches
   * between styles this list made switchable.
   *
   * `QuasarPreset()` with neither this nor `style` throws: guessing a default
   * would either ship styles nobody asked for or make `setStyle()` a silent
   * no-op, and both are surprises an app should choose deliberately.
   */
  styles?: QuasarStyleEntry[]
  /**
   * Shorthand for `styles: [style]` — the single-entry case. Ignored when
   * `styles` is given.
   */
  style?: QuasarStyleEntry
  sourceColor?: string
  presetIcons?: IconsOptions
  presetWebFonts?: WebFontsOptions
  /**
   * Quasar's icon set (`framework.iconSet`): a nested map of icon names to the
   * class each one renders as. The app owns it, so the preset reads the classes
   * out of it — Quasar's own components ask for icons nobody writes in markup
   * (a table's expand chevron, a select's arrow), and a class that only exists
   * in this map is otherwise never generated.
   */
  iconSet?: unknown
  /**
   * The Quasar plugins the app drives through their API rather than a tag
   * (`$q.dialog()`, `$q.notify()`, …). Each plugin's safelist classes join the
   * list only when the plugin is declared, so an app that never calls
   * `$q.notify()` never carries the notification classes — the same coupling
   * `main` makes through `pluginSafelistMap`.
   */
  plugins?: (keyof QuasarPlugins)[]
  /**
   * The third-party Quasar UI libraries whose CSS the app uses. Each one's
   * selectors and tokens join the output only when it is declared, so an app
   * that uses none of them carries none of their CSS — the same coupling
   * `plugins` makes for the plugin safelists. The libraries' classes reach the
   * extractor's vocabulary either way; a class with no declared extension
   * simply matches no rule.
   */
  appExtensions?: AppExtensionName[]
}

/** Every `i-*` class value in the icon set, at any depth. */
export function iconSetClasses(iconSet: unknown): string[] {
  const found = new Set<string>()
  const walk = (value: unknown): void => {
    if (typeof value === 'string') {
      if (/^i-[a-z0-9-]+$/.test(value)) found.add(value)
      return
    }
    if (Array.isArray(value)) {
      for (const entry of value) walk(entry)
      return
    }
    if (value !== null && typeof value === 'object') {
      for (const entry of Object.values(value)) walk(entry)
    }
  }
  walk(iconSet)
  return [...found]
}

/**
 * The style list a call resolved to: `styles` wins, `style` is the single-entry
 * shorthand, and neither is an error rather than a guess — a silent default would
 * either ship styles nobody asked for or make `setStyle()` a no-op (the option's
 * doc says which).
 */
function resolveStyles(options?: QuasarPresetOptions): QuasarStyleEntry[] {
  if (options?.styles?.length) return options.styles.map(checkStyleEntry)
  if (options?.style) return [checkStyleEntry(options.style, 0)]
  throw new Error(
    'QuasarPreset: no style configured — pass styles: QuasarStyleEntry[] (first entry = baseline) or style'
  )
}

/**
 * A configured entry has to be usable before anything downstream reads it: the
 * name becomes the `body.quasar-style-{name}` scope and `tokens` the diff source.
 * A JS consumer can pass neither, and a silent `undefined` diff would emit a
 * broken sheet instead of a diagnosable error.
 */
function checkStyleEntry(
  entry: QuasarStyleEntry | null | undefined,
  index: number
): QuasarStyleEntry {
  if (entry == null || typeof entry.name !== 'string' || entry.name === '') {
    throw new Error(
      `QuasarPreset: styles[${index}] is not a style entry — expected { name, tokens }`
    )
  }
  if (entry.tokens == null || typeof entry.tokens !== 'object') {
    throw new Error(`QuasarPreset: style entry "${entry.name}" has no tokens`)
  }
  return entry
}

/**
 * The preset, callable and usable directly.
 *
 * Consumers configure it — `QuasarPreset({ style, sourceColor, iconSet })` — and
 * `definePreset` types its result as a plain `Preset`, which has no call
 * signature. The runtime object is callable (that is how the option reaches the
 * preset at all); only the type was wrong, so every call site was a type error.
 */
export type QuasarPresetFactory = Preset & {
  (options?: QuasarPresetOptions): Preset
}

const quasarPreset = definePreset<QuasarPresetOptions>((options) => {
  const sourceColor = options?.sourceColor ?? '#1976d2'
  const colors = generateColorTokens(sourceColor)
  // The public theme: the engine needs the palette on the UnoCSS theme (see
  // `extendTheme` below), and it is the same generator behind our preflight.
  const theme = generateTheme(sourceColor)
  const entries = resolveStyles(options)
  // The baseline owns the unscoped token block and the shape roles; the rest are
  // diffs against it. Both come from the list, so an unlisted style is neither
  // emitted nor switchable.
  const defaultStyle = entries[0]
  // App-extension output is opt-in and collected by export suffix, exactly as
  // the core and component collections above are.
  const appExtensionSources = (options?.appExtensions ?? []).map(
    (name) => appExtensionModules[name]
  )
  const appPreflights = appExtensionSources.flatMap((mod) =>
    pickBySuffix(mod, 'Preflights')
  )
  const appRules = appExtensionSources.flatMap((mod) => pickRules(mod, 'Rules'))
  const appShortcuts = appExtensionSources.flatMap((mod) =>
    pickBySuffix(mod, 'Shortcuts')
  )
  // The styles' own rules — the declarations tokens cannot express. The baseline
  // entry's ship as authored; every other entry's are scoped to its body class,
  // so an unlisted style carries none of them.
  const styleRules = entries.flatMap((entry, index) =>
    (entry.rules ?? []).map((rule) =>
      scopeRule(rule, index === 0 ? '' : `body.quasar-style-${entry.name} `)
    )
  )

  return {
    name: 'quasar',
    // Enforce AFTER nested presets (engine/icons): UnoCSS matches dynamic
    // rules first-match-wins in reverse preset order, so without this an
    // engine's generic rules (e.g. wind4's grid `col-N` -> grid-column, or the
    // `p-*` family) would shadow Quasar's component semantics.
    enforce: 'post',
    presets: [
      // The nested engine is mini: it states its defaults eagerly (no
      // on-demand `@property` registrations for a Quasar-only page to
      // reference), ships no base reset to clobber Quasar's controls, and has
      // no bare `col-N` grid rule. Consumers who prefer wind4 add it themselves
      // — see `quasarWind4Options`.
      presetMini({
        dark: { light: '.body--light', dark: '.body--dark' }
      }),
      // Icons are not optional here: Quasar takes an icon *name* as a prop
      // (`icon="chevron-down"`) and adds `i-mdi-chevron-down` to the DOM at
      // runtime, so `quasarValueExtractor` derives the class from the value and
      // this preset turns it into CSS. Without it the icons render as empty
      // boxes while every other check stays green.
      presetIcons(options?.presetIcons ?? {}),
      // animated-unocss brings the `une*` keyframes and the `.animated-*`
      // classes that name them; the reference build was made with it in place.
      // SAFETY: animated-unocss types its result against its own copy of the
      // UnoCSS `Preset` shape; at runtime it is a plain preset and this entry
      // only ever sits in the `presets` array, where UnoCSS reads name/rules.
      animatedUno() as unknown as Preset,
      presetWebFonts(
        options?.presetWebFonts ?? {
          provider: 'bunny',
          fonts: { roboto: 'Roboto' }
        }
      )
    ],
    preflights: [
      ...corePreflights,
      ...componentPreflights,
      createTokenPreflight({ colors, defaultStyle, styles: entries }),
      // Media-query families: responsive visibility (`lt-md`, `xs`, …) and the
      // orientation/print platform classes. A UnoCSS rule body cannot carry an
      // at-rule (a nested `'@media …'` key is stringified as `[object Object]`),
      // and these classes are added by Quasar or by markup with no source hint,
      // so the reference emits them unconditionally — here, once, as text.
      {
        getCSS: () =>
          `${responsiveVisibilityCss}\n${platformMediaCss}\n${layoutMediaCss}\n${tooltipMediaCss}\n${notificationMediaCss}\n${dialogMediaCss}\n${dialogPlatformCss}\n${quasarKeyframesCss}\n${animationHelperMediaCss}\n${mouseHelperCss}\n${animationHelperStaticCss}\n${animationHelperTokenCss}`
      },
      // App-extension tokens last: they reference `--q-*` and the style tokens
      // the blocks above state, and they are present only when declared.
      ...appPreflights
    ],
    // Rule order matters twice over:
    //  - grid/container utilities first, so component layout wins on equal
    //    specificity (see gridRules above).
    //  - the remaining core utilities (colors, text, spacing) last, so
    //    `bg-*`/`text-*` win — otherwise `.q-btn { background: transparent }`
    //    wins the shorthand and `bg-secondary` buttons render unfilled.
    // The styles' rules sit between the components and the core utilities: a
    // style's reset has to come after the base rule it neutralises (equal
    // specificity, so the later one wins) and before the utilities that are
    // meant to override either.
    // mergeDuplicateRules collapses repeated matchers: UnoCSS keeps only the
    // last rule per regex, so duplicates silently dropped declarations.
    // Cascade bands, in emission order. The rule ARRAY order below only
    // sequences rules that share a layer; layers sequence the bands themselves.
    //
    // This exists because array order cannot reach every utility a consumer's
    // engine emits. Quasar's palette colours (`bg-pink`, `bg-yellow-2`) are
    // generated by the engine from `extendTheme`, not by a rule here, so they
    // land in `default` wherever the engine puts them — which is BEFORE these
    // component rules, letting `.q-badge{background-color:var(--q-primary)}`
    // beat `bg-pink` on equal specificity. Every legend badge rendered primary
    // for exactly that reason. Explicit layers pull the component band ahead of
    // `default`, so every utility — this preset's and the engine's alike — wins.
    layers: {
      // Keep the documented relative order intact (see the rule list below):
      // grid/container utilities stay ahead of the components, so component
      // layout still wins on equal specificity.
      'quasar.grid': -4,
      'quasar.components': -3,
      'quasar.app': -2,
      'quasar.styles': -1
      // Everything else — this preset's core utilities and the engine's — stays
      // in `default` (0), i.e. last.
    },
    rules: mergeDuplicateRules([
      ...rulesInLayer('quasar.grid', gridRules),
      ...rulesInLayer('quasar.components', componentRules),
      ...rulesInLayer('quasar.app', appRules),
      ...rulesInLayer('quasar.styles', styleRules),
      ...nonGridCoreRules
    ]),
    // The responsive `col-<bp>` / `col-<bp>-N` names carry their breakpoint in
    // the class name, so the media wrapper has to come from a variant; a rule
    // body cannot carry an at-rule (see core/grid/variants.ts).
    variants: gridBreakpointVariants(theme.breakpoints),
    shortcuts: [...coreShortcuts, ...componentShortcuts, ...appShortcuts],
    // Values that name classes (icons, transitions) cannot be safelisted, so
    // they are derived from the markup instead — see extractor.ts.
    extractors: [quasarComponentExtractor, quasarValueExtractor],
    // The icon set's classes join the safelist: they are app configuration, not
    // markup, and Quasar applies them without any source mentioning them. A
    // plugin's classes join only when the app declares that plugin.
    safelist: [
      ...quasarSafelist,
      ...(options?.plugins ?? []).flatMap(
        (plugin) => pluginSafelistMap[plugin as string] ?? []
      ),
      ...iconSetClasses(options?.iconSet)
    ],
    // The Quasar palette has to reach the engine's theme, not just our own
    // token preflight: the engine emits `--colors-<name>` and generates the
    // colour utilities (`bg-grey-8`, `text-deep-orange`, …) from the theme, so
    // without this the palette classes the safelist names resolve to nothing.
    extendTheme: (themeArg: { colors?: Record<string, unknown> }) => ({
      ...themeArg,
      colors: {
        ...(themeArg.colors ?? {}),
        ...paletteColors(theme)
      }
    }),
    transformers: [transformerVariantGroup(), transformerDirectives()]
  }
})

// SAFETY: `definePreset` types its result as a plain `Preset`, which has no
// call signature. The runtime object is callable — that is how `options`
// reaches the factory at all — see `QuasarPresetFactory` above.
export const QuasarPreset = quasarPreset as unknown as QuasarPresetFactory

/**
 * The wind4 options this preset used to nest itself.
 *
 * Consumers who want wind4’s vocabulary add it themselves —
 * `presets: [presetWind4(quasarWind4Options), QuasarPreset()]` — and passing this
 * fragment keeps the two behaviours the nesting set up for them:
 *
 * - `preflights: { reset: false }` — wind4’s base reset ships a `*`/`::backdrop`
 *   block plus its `@supports` fallbacks that clobbers Quasar’s own control
 *   styling.
 * - `dark: { light: '.body--light', dark: '.body--dark' }` — wind4 maps `dark:`
 *   to Tailwind’s `.dark` class by default, and Quasar never sets that class, so
 *   every `dark:*` utility would be dead CSS.
 *
 * The rest is up to the consumer: the palette arrives through this preset’s
 * `extendTheme` regardless of engine, and Quasar-owned class names stay ours in
 * either array order because the preset carries `enforce: 'post'`.
 *
 * Deliberately not frozen: wind4's factory normalises the options it is given by
 * assigning to them (`options.dark = options.dark ?? 'class'`, measured at
 * `@unocss/preset-wind4/dist/index.mjs`), so a frozen fragment throws. Spread it
 * if you want to hand wind4 a private copy.
 */
export const quasarWind4Options = {
  preflights: { reset: false },
  dark: { light: '.body--light', dark: '.body--dark' }
}

export type { QuasarStyleEntry } from './styles/index.js'
export {
  setStyle,
  getActiveStyle,
  MaterialDesign3,
  MaterialDesign2,
  Unstyled,
  QuasarStyleEntries
} from './styles/index.js'
