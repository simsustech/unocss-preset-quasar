import type { Rule } from '@unocss/core'

export const spaceRules = [
  [
    /^q-space$/,
    function* () {
      // .q-space
      yield { flex: '1', 'flex-grow': 1 }
    }
  ]
] as Rule[]
