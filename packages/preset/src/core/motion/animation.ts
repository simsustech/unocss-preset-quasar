import type { ComponentRule } from '../../rules/types.js'

/**
 * Quasar's bare animation helpers (AUD-022) — verbatim from
 * `quasar/dist/quasar.css`.
 *
 * Quasar's animation docs pair every one of these with `.animated`, and dist
 * states them *combined* (`.animated.faster`, `.animated.delay-3s`): bare
 * `faster`, `infinite` or `delay-3s` has no dist block at all. That is also why
 * a combined-class matcher would never fire — the extractor splits
 * `class="animated faster"` into single tokens — so each entry emits the
 * combined selector from the *single* token.
 *
 * `.animated` reads `--animate-duration`, `--animate-repeat` and
 * `--animate-delay`, which the composed `animated-unocss` preset defines; that
 * preset supplies the `animated-*` / `une-*` grammar, not these bare names.
 */

/** CSS value — strings or unitless numbers */
type CSSValue = string | number

/** `cls` -> `.animated.cls { … }`, reachable from the bare `cls` token. */
const ANIMATED_COMBOS: [cls: string, decls: Record<string, CSSValue>][] = [
  ['infinite', { 'animation-iteration-count': 'infinite' }],
  ['hinge', { 'animation-duration': '2s' }],
  ['faster', { 'animation-duration': 'calc(var(--animate-duration) / 2)' }],
  ['fast', { 'animation-duration': 'calc(var(--animate-duration) * 0.8)' }],
  ['slow', { 'animation-duration': 'calc(var(--animate-duration) * 2)' }],
  ['slower', { 'animation-duration': 'calc(var(--animate-duration) * 3)' }],
  ['repeat-1', { 'animation-iteration-count': 'var(--animate-repeat)' }],
  [
    'repeat-2',
    { 'animation-iteration-count': 'calc(var(--animate-repeat) * 2)' }
  ],
  [
    'repeat-3',
    { 'animation-iteration-count': 'calc(var(--animate-repeat) * 3)' }
  ],
  ['delay-1s', { 'animation-delay': 'var(--animate-delay)' }],
  ['delay-2s', { 'animation-delay': 'calc(var(--animate-delay) * 2)' }],
  ['delay-3s', { 'animation-delay': 'calc(var(--animate-delay) * 3)' }],
  ['delay-4s', { 'animation-delay': 'calc(var(--animate-delay) * 4)' }],
  ['delay-5s', { 'animation-delay': 'calc(var(--animate-delay) * 5)' }]
]

/** Quasar's rotate helpers; dist marks each `rtl:ignore`. */
const ROTATES = [45, 90, 135, 225, 270, 315] as const

/** dist: `.dimmed:after` veils the element. `light-dimmed` rides in the static
 * CSS instead: in this composition `light-` is consumed as wind4's theme variant
 * before the rule layer, so the emitted selector came out as
 * `.body--light .light-dimmed:after` (measured). See `animationHelperStaticCss`.
 */
const DIMMERS: [cls: string, background: string][] = [
  ['dimmed', 'rgba(0, 0, 0, 0.4) !important']
]

const comboRules: ComponentRule[] = ANIMATED_COMBOS.map(([cls, decls]) => [
  new RegExp(`^${cls}$`),
  function* (_, { symbols }) {
    yield { [symbols.selector]: () => `.animated.${cls}`, ...decls }
  }
])

const dimmedRules: ComponentRule[] = DIMMERS.map(([cls, background]) => [
  new RegExp(`^${cls}$`),
  function* (_, { symbols }) {
    yield {
      [symbols.selector]: (sel: string) => `${sel}:after`,
      content: '""',
      position: 'absolute',
      top: '0',
      right: '0 /* rtl:ignore */',
      bottom: '0',
      left: '0 /* rtl:ignore */',
      background
    }
  }
])

export const animationHelperRules: ComponentRule[] = [
  [
    /^animated$/,
    function* (_, { symbols }) {
      yield {
        'animation-duration': 'var(--animate-duration)',
        'animation-fill-mode': 'both'
      }
      // dist: `.animated[class*=Out] { opacity: 0 }` — the entrance state for
      // the `fadeOut`-style names animated-unocss defines.
      yield {
        [symbols.selector]: (sel: string) => `${sel}[class*=Out]`,
        opacity: '0'
      }
    }
  ],
  ...comboRules,
  ...dimmedRules,
  [/^q-animate--fade$/, () => ({ animation: 'q-fade 0.2s /* rtl:ignore */' })],
  [
    /^q-animate--scale$/,
    () => ({
      animation: 'q-scale 0.15s',
      'animation-timing-function': 'cubic-bezier(0.25, 0.8, 0.25, 1)'
    })
  ],
  ...ROTATES.map((deg): ComponentRule => [
    new RegExp(`^rotate-${deg}$`),
    () => ({ transform: `rotate(${deg}deg) /* rtl:ignore */` })
  ])
]

/**
 * The reduce-motion override dist ships for the same family. It lives inside
 * `@media print, (prefers-reduced-motion: reduce)`, which a rule body cannot
 * carry, so `.animated` gets it through the static CSS channel in `src/index.ts`
 * (same mechanism as the platform media families).
 */
/**
 * The three variables dist's `.animated` family reads.
 *
 * dist takes them from animate.css, which a plain Quasar+vite app imports
 * separately; this preset composes `animated-unocss` instead, and that preset
 * defines its own `--une-*` names — so without this block the declarations
 * below would reference nothing and drop at computed-value time. Emitted once,
 * with animate.css's own defaults.
 */
export const animationHelperTokenCss: string =
  ':root{--animate-duration:1s;--animate-delay:1s;--animate-repeat:1}'

/**
 * The helper that cannot go through the rule layer: `light-dimmed`'s `light-`
 * prefix is matched as wind4's theme variant first, which wraps the utility in
 * `.body--light`. dist has no such condition, so the class ships through the
 * static CSS channel (like `all-pointer-events`, and like the reference bundle,
 * which emits it unconditionally).
 */
export const animationHelperStaticCss: string =
  '.light-dimmed:after{content:"";position:absolute;top:0;right:0 /* rtl:ignore */;bottom:0;left:0 /* rtl:ignore */;background:rgba(255, 255, 255, 0.6) !important}'

export const animationHelperMediaCss: string =
  '@media print, (prefers-reduced-motion: reduce){' +
  '.animated{animation-duration:1ms !important;transition-duration:1ms !important;animation-iteration-count:1 !important}' +
  '.animated[class*=Out]{opacity:0}}'
