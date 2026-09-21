import { readFileSync } from 'node:fs'
import { createGenerator } from 'unocss'
import { describe, expect, it } from 'vitest'
import { QuasarPreset } from '../src/index.js'
import { quasarSafelist } from '../src/safelist.js'
import { wind4NamespaceTokens } from '../src/theme/wind4.js'

/**
 * wind4 emits its theme namespaces only on demand, so a Quasar-only page would
 * leave the declarations that reference them invalid. We state them ourselves;
 * these two tests keep that honest: the values must match the reference bundle,
 * and no rule may reference a namespace we do not state.
 */
describe('wind4 theme namespaces', () => {
  const fixture = JSON.parse(
    readFileSync('test/fixtures/reference-selectors.json', 'utf8')
  ) as { variables: Record<string, string> }

  it('state the values the reference bundle resolved to', () => {
    for (const [prop, value] of Object.entries(wind4NamespaceTokens)) {
      expect(fixture.variables[prop], `${prop} in the reference bundle`).toBe(
        value
      )
    }
  })

  it('cover every namespace the emitted sheet references', async () => {
    const gen = await createGenerator({ presets: [QuasarPreset({})] })
    // Quasar-only content: no wind4 utility, which is the case that used to
    // leave these unresolved.
    const { css } = await gen.generate('q-gutter-md q-pa-md q-card', {
      preflights: true
    })
    const referenced = [
      ...new Set(
        [
          ...css.matchAll(
            /var\((--(?:spacing|radius|fontWeight|leading|tracking)[\w-]*|--une-animated-duration)\)/g
          )
        ].map((m) => m[1])
      )
    ]
    // Guard against a vacuous pass if the rules ever stop using them.
    expect(referenced.length).toBeGreaterThan(0)
    for (const name of referenced) {
      expect(
        wind4NamespaceTokens[name],
        `${name} is referenced by the sheet but never stated`
      ).toBeDefined()
    }
  })
})
