import type { QuasarStyleEntry } from '../index.js'
import { unstyledStyle } from '../../theme/index.js'
import { appExtensionRules } from './rules/app-extensions/index.js'
import { unstyledRules } from './rules/index.js'

/**
 * Built-in unstyled entry — all tokens 0/transparent/inherit (no visual styling).
 *
 * Its `rules` are the other half of the contract: a ported rule that states a
 * literal colour or shadow cannot be neutralised by a token flip, so the reset
 * belongs to the style that wants it — the component rules' resets in
 * `rules/index.ts`, and the ones that target a ported app-extension sheet in
 * `rules/app-extensions/`. Listing this entry is what ships them; nothing else
 * does.
 */
export const Unstyled: QuasarStyleEntry = {
  name: 'unstyled',
  tokens: unstyledStyle.tokens,
  rules: [...unstyledRules, ...Object.values(appExtensionRules).flat()]
}
