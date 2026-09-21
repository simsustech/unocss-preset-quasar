import { createGenerator } from 'unocss'
import { describe, expect, it } from 'vitest'
import { QuasarPreset } from '../src/index.js'
import { quasarSafelist } from '../src/safelist.js'
import { runtimeVariables } from '../src/theme/runtime-variables.js'

/**
 * A `var()` with no definition and no fallback makes the declaration invalid at
 * computed-value time — the property falls back to its initial value, which is
 * how the elevation aliases silently rendered nothing. This asserts the sheet's
 * unresolved references are exactly the variables Quasar (or wind4) sets at
 * runtime, so a rule naming anything else fails here.
 */
describe('variables the sheet references but does not define', () => {
  it('is exactly the set Quasar and wind4 set at runtime', async () => {
    const gen = await createGenerator({ presets: [QuasarPreset({})] })
    const { css } = await gen.generate(quasarSafelist.join(' '), {
      preflights: true
    })

    const defined = new Set(
      [...css.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1])
    )
    // `var(--x, fallback)` is fine: the fallback keeps the declaration valid.
    const unresolved = [
      ...new Set(
        [...css.matchAll(/var\(\s*(--[\w-]+)\s*([,)])/g)]
          .filter((m) => m[2] === ')')
          .map((m) => m[1])
      )
    ].filter((name) => !defined.has(name))

    expect(unresolved.filter((n) => !(n in runtimeVariables)).sort()).toEqual(
      []
    )
    // And the list may not rot: everything stated must still be referenced.
    expect(
      Object.keys(runtimeVariables)
        .filter((n) => !unresolved.includes(n))
        .sort()
    ).toEqual([])
  })
})
