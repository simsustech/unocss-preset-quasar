/**
 * Variables our sheet references that nothing in a build-time sheet defines.
 *
 * Every entry is set at runtime — by Quasar's own JavaScript, or by wind4's
 * utility machinery — so leaving them out of the preflight is correct. The set
 * still has to be *stated*, because an undefined custom property with no
 * `var()` fallback makes the whole declaration invalid at computed-value time.
 * That is exactly how the elevation scale went unnoticed for so long:
 * `.q-card { box-shadow: var(--q-elevation-1) }` rendered nothing, silently.
 *
 * `test/runtime-variables.test.ts` asserts this list is exactly the set of
 * unresolved references in the emitted sheet — no more, no less. A rule that
 * names a variable nobody defines fails the suite; so does an entry here that
 * has stopped being referenced.
 *
 * Sources are from `~/Projects/quasar/ui` (`src/…`), the code that ships inside
 * `quasar.client.js`.
 */
export const runtimeVariables: Record<string, string> = {
  // --- Written inline by a Quasar component ---
  '--q-drawer-width': 'QDrawer.js: `"--q-drawer-width": `${size.value}px``',
  '--q-fab-stagger': 'QFab.js: `--q-fab-stagger: ${props.stagger}ms`',

  // --- wind4's variable-based utility system ---
  // A wind4 utility writes these and consumes them in the same rule pair, e.g.
  // `shadow-md` sets `--un-shadow` alongside `box-shadow: var(--un-shadow)`, so
  // they resolve whenever any of those utilities is actually used. The reference
  // bundle relies on the same mechanism (945 declarations) and likewise carries
  // no `@property` registrations, so this is parity — not a gap.
  '--un-shadow': 'wind4 utility variable',
  '--un-inset-shadow': 'wind4 utility variable',
  '--un-ring-shadow': 'wind4 utility variable',
  '--un-ring-offset-shadow': 'wind4 utility variable',
  '--un-inset-ring-shadow': 'wind4 utility variable',
  '--un-outline-style': 'wind4 utility variable',
  '--un-outline-opacity': 'wind4 utility variable',
  '--un-border-left-opacity': 'wind4 utility variable',
  '--un-translate-x': 'wind4 utility variable',
  '--un-translate-y': 'wind4 utility variable',
  '--un-content': 'wind4 utility variable',
  '--un-contain-size': 'wind4 utility variable',
  '--un-contain-layout': 'wind4 utility variable',
  '--un-contain-paint': 'wind4 utility variable',
  '--un-contain-style': 'wind4 utility variable'
}
