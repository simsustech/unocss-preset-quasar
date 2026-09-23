import { createGenerator } from 'unocss'
import { describe, expect, it } from 'vitest'
import { QuasarPreset } from '../src/index.js'
import { quasarSafelist } from '../src/safelist.js'
import {
  componentClasses,
  globalClasses
} from '../src/generated/quasar-classes.js'
import { runtimeVariables } from '../src/theme/runtime-variables.js'

/**
 * A `var()` with no definition and no fallback makes the declaration invalid at
 * computed-value time — the property falls back to its initial value, which is
 * how the elevation aliases silently rendered nothing. This asserts the sheet's
 * unresolved references are exactly the variables Quasar's own JavaScript sets
 * at runtime, so a rule naming anything else fails here.
 *
 * Every reference without a fallback has to be one of them. A `var(--x, fallback)`
 * is fine by definition, and that is now the form our engine-internal reads take:
 * the fallback is our own `--q-*` value, so an engine that states nothing (mini
 * emits no `--colors-*` and states `--un-outline-style` only per utility) still
 * leaves the declaration valid.
 */
describe('variables the sheet references but does not define', () => {
  it('is exactly the set Quasar sets at runtime', async () => {
    const gen = await createGenerator({ presets: [QuasarPreset({})] })
    // Every class any mechanism supplies: the point is which variables the
    // emitted rules reference, so content must reach all of them.
    const content = [
      ...quasarSafelist,
      ...Object.values(componentClasses).flat(),
      ...globalClasses
    ].join(' ')
    const { css } = await gen.generate(content, {
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
