/**
 * StyleSpec registry — resolves specs by name and enumerates available styles.
 *
 * @module StyleSpec
 */

import type { StyleSpec } from './types.js'
import md3 from './md3.spec.js'
import md2 from './md2.spec.js'
import unstyled from './unstyled.spec.js'

const REGISTRY: Record<string, () => StyleSpec> = {
  md3: () => md3,
  md2: () => md2,
  unstyled: () => unstyled
}

/**
 * Return the StyleSpec for a given style name.
 * Throws if the style is not registered.
 */
export function getStyleSpec(style: string): StyleSpec {
  const factory = REGISTRY[style]
  if (!factory) {
    throw new Error(
      `StyleSpec not found: "${style}". Available: ${listStyles().join(', ')}`
    )
  }
  return factory()
}

/**
 * List all registered style names.
 */
export function listStyles(): string[] {
  return Object.keys(REGISTRY).sort()
}

/**
 * Register a new style spec at runtime.
 */
export function registerStyle(name: string, spec: () => StyleSpec): void {
  REGISTRY[name] = spec
}
