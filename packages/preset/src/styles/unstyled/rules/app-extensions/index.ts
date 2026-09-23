import type { Rule } from '@unocss/core'
import { qmarkdownRules } from './qmarkdown.js'

/**
 * Style rules that target an app extension's ported sheet, keyed by extension.
 *
 * They are gated by *style* inclusion, not by `appExtensions`: the switch an app
 * sets for them is listing the style that needs them (ADR 0006). An app that
 * declares qmarkdown without `Unstyled` therefore keeps its syntax colours, and
 * one that lists `Unstyled` without qmarkdown carries resets matching nothing —
 * a no-op, not a leak.
 */
export const appExtensionRules: Record<string, Rule[]> = {
  qmarkdown: qmarkdownRules
}
