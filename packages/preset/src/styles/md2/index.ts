import type { QuasarStyleEntry } from '../index.js'
import { md2Style } from '../../theme/index.js'

/**
 * Built-in Material Design 2 entry (matches `quasar.css`).
 *
 * Like md3, every value it states is a token value, so it needs no rules.
 */
export const MaterialDesign2: QuasarStyleEntry = {
  name: 'md2',
  tokens: md2Style.tokens
}
