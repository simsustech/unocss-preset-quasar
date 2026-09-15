import type { StyleEntry } from '../theme/index.js'
import { md3Style, md2Style, unstyledStyle } from '../theme/index.js'

export interface QuasarStyleEntry {
  name: string
  tokens: StyleEntry['tokens']
}

/** Built-in Material Design 3 style entry */
export const MaterialDesign3: QuasarStyleEntry = {
  name: 'md3',
  tokens: md3Style.tokens
}

/** Built-in Material Design 2 style entry */
export const MaterialDesign2: QuasarStyleEntry = {
  name: 'md2',
  tokens: md2Style.tokens
}

/** Built-in unstyled entry — all tokens 0/transparent/inherit (no visual styling) */
export const Unstyled: QuasarStyleEntry = {
  name: 'unstyled',
  tokens: unstyledStyle.tokens
}

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
