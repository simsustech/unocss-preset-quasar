import type { QuasarStyle } from '../styles/index.js'
import { MaterialDesign3 } from '../styles/index.js'
import { tokens } from './_tokens.js'

/**
 * Complete MD3 package: token values + shortcuts + preflights.
 *
 *   import { Md3Tokens } from 'unocss-preset-quasar'
 *   QuasarPreset({ tokens: Md3Tokens })
 */
export const Md3Tokens = {
  ...tokens.md3,
  style: MaterialDesign3
} as const
