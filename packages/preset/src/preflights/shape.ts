import type { Preflight } from '@unocss/core'

/**
 * Shape preflight — ported from core/shape.unocss.ts.
 *
 * Emits shape corner radius tokens on :root.
 * Tokens: --q-shape-corner-extra-small through --q-shape-corner-extra-large.
 */
export const shapePreflight: Preflight = {
  getCSS: () => `:root {
  --q-shape-corner-extra-small: var(--q-radius-xs);
  --q-shape-corner-small: var(--q-radius-sm);
  --q-shape-corner-medium: var(--q-radius-md);
  --q-shape-corner-large: var(--q-radius-lg);
  --q-shape-corner-extra-large: var(--q-radius-xl);
}`
}
