/**
 * MD3 color role tokens (from @poupe/material-color-utilities).
 *
 * Its own module, not a const in `colors/rules.ts`: the array is not a rule
 * list, and `emission.test.ts` refuses any array-shaped export the `core` barrel
 * carries that `pickRules()` never sees (`core.md3Tokens: expected [] to deeply
 * equal []` was the first failure this fix produced). Nothing re-exports this
 * file, so the barrel stays free of it while both the rules and the safelist can
 * read one list.
 */
export const md3Tokens = [
  'on-primary',
  'primary-container',
  'on-primary-container',
  'on-secondary',
  'secondary-container',
  'on-secondary-container',
  'tertiary',
  'on-tertiary',
  'tertiary-container',
  'on-tertiary-container',
  'error',
  'on-error',
  'error-container',
  'on-error-container',
  'background',
  'on-background',
  'surface',
  'on-surface',
  'surface-variant',
  'on-surface-variant',
  'surface-dim',
  'surface-bright',
  'surface-container-lowest',
  'surface-container-low',
  'surface-container',
  'surface-container-high',
  'surface-container-highest',
  'outline',
  'outline-variant',
  'inverse-surface',
  'inverse-on-surface',
  'inverse-primary',
  'shadow',
  'scrim'
] as const
