import type { Rule } from '@unocss/core'
import type { StyleEntry } from '../theme/index.js'
import { MaterialDesign2 } from './md2/index.js'
import { MaterialDesign3 } from './md3/index.js'
import { Unstyled } from './unstyled/index.js'

export interface QuasarStyleEntry {
  name: string
  tokens: StyleEntry['tokens']
  /**
   * The declarations this style needs that tokens cannot express — the literal
   * colours and shadows of the ported rules.
   *
   * Ownership follows inclusion: an entry that is not listed ships neither its
   * tokens nor its rules, and a listed non-baseline entry's rules are emitted
   * under `body.quasar-style-{name}` (see `rules/scope.ts`). The baseline
   * entry's rules ship as authored, because its scope is `body` already.
   */
  rules?: Rule[]
}

// The entries are composed in their own folders — `md3/`, `md2/`, `unstyled/` —
// so a style owns the rules tokens cannot express, and this module stays the
// public surface (`Unstyled` re-exports the entry that carries the resets).
export { MaterialDesign2, MaterialDesign3, Unstyled }

export const QuasarStyleEntries: QuasarStyleEntry[] = [
  MaterialDesign3,
  MaterialDesign2,
  Unstyled
]

/** @deprecated use MaterialDesign3 */
export const Md3StyleEntry = MaterialDesign3
/** @deprecated use MaterialDesign2 */
export const Md2StyleEntry = MaterialDesign2
/** @deprecated use Unstyled */
export const UnstyledStyleEntry = Unstyled

export function setStyle(name: string): void {
  if (typeof document === 'undefined') return
  for (const cls of Array.from(document.body.classList))
    if (cls.startsWith('quasar-style-')) document.body.classList.remove(cls)
  document.body.classList.add(`quasar-style-${name}`)
}

export function getActiveStyle(): string | null {
  if (typeof document === 'undefined') return null
  const match = Array.from(document.body.classList).find((c) =>
    c.startsWith('quasar-style-')
  )
  return match ? match.slice('quasar-style-'.length) : null
}
