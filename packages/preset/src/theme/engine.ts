/**
 * The engine's theme namespaces our own rules reference, plus the defaults we own
 * for the declarations that used to read engine-internal names.
 *
 * `engineNamespaceTokens` — our rules reference these (`--spacing` and friends in
 * `calc(var(--spacing) * N)`, the corner radii, the font weights, leading and
 * tracking). The engine states them as *runtime* variables, emitted only once one
 * of its own utilities generates a declaration naming them, and the nested engine
 * (mini) does not state `--spacing` at all: it writes `padding: 1rem` where wind4
 * wrote `padding: calc(var(--spacing) * 4)`. A consumer that only ever uses
 * Quasar classes therefore never gets them — measured: with Quasar-only content
 * `presetWind4` alone emits a zero-length sheet. They have no `var()` fallback,
 * and an undefined custom property makes the declaration invalid at
 * computed-value time: the gutters collapse, the corners square off and the text
 * loses its weight rather than falling back to something reasonable.
 *
 * We state them at the values the reference build resolved to, so the emitted CSS
 * stays byte-identical while the dependency on unrelated content is gone.
 *
 * `quasarDefaults` — the `--q-*` side of every `var(--un-X, var(--q-X))` read our
 * rules make. The engine-first form keeps a consumer's own utility composing into
 * a Quasar declaration; the `--q-*` default is what renders when the engine states
 * nothing (mini leaves `--un-outline-style`, `--un-contain-size`, `--un-content`,
 * the inset/ring shadow family and all `--un-*-opacity` per-utility rather than
 * globally). Values mirror the reference bundle's `*` block and `@property`
 * initial values one for one.
 *
 * Both sets are pinned to the vendored bundle by `test/engine-namespaces.test.ts`.
 */
export const engineNamespaceTokens: Record<string, string> = {
  '--spacing': '0.25rem',
  '--radius-none': '0',
  '--radius-2xl': '1rem',
  '--fontWeight-light': '300',
  '--fontWeight-normal': '400',
  '--fontWeight-medium': '500',
  '--fontWeight-bold': '700',
  '--leading-none': '1',
  '--leading-normal': '1.5',
  '--tracking-normal': '0em',
  '--tracking-widest': '0.1em',
  // From animated-unocss, which has the same on-demand behaviour.
  '--une-animated-duration': '1s'
}

/**
 * Our own namespace for the defaults the engine does not guarantee.
 *
 * The opacity quartet reads `--q-*-opacity` *only*: mini sets the engine's
 * `--un-bg-opacity` to the number `1` and registers no `@property`, so an
 * engine-first read inside a `color-mix(…)` — which needs a percentage — would
 * invalidate the declaration on any element under a mini colour utility, and the
 * value would inherit into the subtree.
 */
export const quasarDefaults: Record<string, string> = {
  '--q-bg-opacity': '100%',
  '--q-text-opacity': '100%',
  '--q-border-opacity': '100%',
  '--q-border-left-opacity': '100%',
  '--q-outline-opacity': '100%',
  '--q-outline-style': 'solid',
  '--q-contain-size': 'initial',
  '--q-content': '""',
  '--q-inset-shadow': '0 0 #0000',
  '--q-inset-ring-shadow': '0 0 #0000',
  '--q-ring-shadow': '0 0 #0000',
  '--q-ring-offset-shadow': '0 0 #0000',
  '--q-shadow': '0 0 #0000',
  '--q-translate-x': '0',
  '--q-translate-y': '0'
}
