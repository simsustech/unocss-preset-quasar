import type { QuasarStyleEntry } from '../index.js'
import { md3Style } from '../../theme/index.js'

/**
 * Built-in Material Design 3 entry.
 *
 * Composed beside its own folder so a style owns its rules. md3 states every
 * theming value through tokens and both reference builds agree on its literals,
 * so it carries no rules — there is nothing tokens cannot express.
 */
export const MaterialDesign3: QuasarStyleEntry = {
  name: 'md3',
  tokens: md3Style.tokens
}
