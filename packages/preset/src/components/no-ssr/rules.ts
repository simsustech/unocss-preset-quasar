import type { Rule } from '@unocss/core'

/**
 * `QNoSsr` only gates rendering; the unstyled style entry still strips the
 * component's own surface so a themed wrapper shows through.
 */
export const noSsrRules = [
  [
    /^q-no-ssr$/,
    function* () {
      // .q-no-ssr
    }
  ]
] as Rule[]
