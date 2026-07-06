import { MaterialDesign2 } from '../styles/index.js'
import { tokens } from './_tokens.js'

/**
 * Complete MD2 package: token values + shortcuts + preflights.
 *
 *   import { Md2Tokens } from 'unocss-preset-quasar'
 *   QuasarPreset({ tokens: Md2Tokens })
 */
export const Md2Tokens = {
  ...tokens.md2,
  style: MaterialDesign2
} as const
