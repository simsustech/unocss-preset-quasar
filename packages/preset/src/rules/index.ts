import type { Rule } from '@unocss/core'
import type { ComponentRule } from './types.js'
import { qBadgeRules } from './q-badge.js'

/**
 * getAllRules() — aggregates all component rule arrays into a flat Rule[].
 * Starts empty; component rules are added in Phase 7.
 */
export function getAllRules(): Rule[] {
  const rules: Rule[] = [...qBadgeRules]
  // Component rules are registered here during Phase 7.
  return rules
}

export type { ComponentRule }
