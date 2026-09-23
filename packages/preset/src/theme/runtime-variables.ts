/**
 * Variables our sheet references that nothing in a build-time sheet defines.
 *
 * Every entry is set at runtime — by Quasar's own JavaScript — so leaving them
 * out of the preflight is correct. The set still has to be *stated*, because an
 * undefined custom property with no `var()` fallback makes the whole
 * declaration invalid at computed-value time. That is exactly how the elevation
 * scale went unnoticed for so long: `.q-card { box-shadow: var(--q-elevation-1) }`
 * rendered nothing, silently.
 *
 * `test/runtime-variables.test.ts` asserts this list is exactly the set of
 * unresolved references in the emitted sheet — no more, no less. A rule that
 * names a variable nobody defines fails the suite; so does an entry here that
 * has stopped being referenced.
 *
 * `--un-*` names are deliberately absent. They belong to wind4's variable-based
 * utility system, which ships its own defaults (a `*, ::before, ::after` block
 * plus the matching `@property` registrations) in any real build; the sheet this
 * test generates comes from the preset alone, so those references only *look*
 * unresolved here. The invariant test scopes them out rather than claiming the
 * preset owns them — a rule of ours that reads an `--un-*` wind4 never defines
 * at runtime is a wind4 concern, not a preset runtime variable.
 *
 * Sources are from `~/Projects/quasar/ui` (`src/…`), the code that ships inside
 * `quasar.client.js`.
 */
export const runtimeVariables: Record<string, string> = {
  // --- Written inline by a Quasar component ---
  '--q-drawer-width': 'QDrawer.js: `"--q-drawer-width": `${size.value}px``',
  '--q-fab-stagger': 'QFab.js: `--q-fab-stagger: ${props.stagger}ms`'
}
