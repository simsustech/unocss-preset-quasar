import { Unstyled } from '../styles/index.js'
import { tokens } from './_tokens.js'

/**
 * Complete Unstyled package: token values + shortcuts + preflights.
 *
 *   import { UnstyledTokens } from 'unocss-preset-quasar'
 *   QuasarPreset({ tokens: UnstyledTokens })
 */
export const UnstyledTokens = {
  ...tokens.unstyled,
  style: Unstyled
} as const
