import type { Rule } from '@unocss/core'

/**
 * ComponentRule — a UnoCSS Rule that references CSS custom properties
 * directly (no theme generic). One rule per BEM class.
 */
export type ComponentRule = Rule

export interface RuleMeta {
  name: string
}
