/**
 * The wind4 theme namespaces our own rules reference.
 *
 * wind4 states these as *runtime* variables: `--spacing` and friends only enter
 * the sheet once one of wind4's own utilities generates a declaration naming
 * them (`p-4` → `padding: calc(var(--spacing) * 4)`, which registers
 * `--spacing: 0.25rem` alongside). The reference bundle happened to be built
 * from content that did use such utilities, so its 281 `var(--spacing)`
 * declarations resolve, and so do its corner radii, font weights, leading and
 * tracking.
 *
 * A consumer that only ever uses Quasar classes never generates one of those
 * utilities, so wind4 never emits the variables — measured: with Quasar-only
 * content, `presetWind4` alone emits a zero-length sheet. None of these have a
 * `var()` fallback, and an undefined custom property makes the declaration
 * invalid at computed-value time: the property falls back to its *initial*
 * value, so the gutters collapse, the corners square off and the text loses its
 * weight rather than falling back to something reasonable.
 *
 * We therefore state them ourselves, at wind4's own defaults — which are also
 * the values the reference's build resolved to, so the emitted CSS stays
 * byte-identical while the dependency on unrelated content is gone. The values
 * are pinned to the reference bundle by `test/wind4-namespaces.test.ts`.
 */
export const wind4NamespaceTokens: Record<string, string> = {
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
