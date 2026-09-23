import { readFileSync } from 'node:fs'
import { createGenerator } from 'unocss'
import { describe, expect, it } from 'vitest'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'
import { engineNamespaceTokens, quasarDefaults } from '../src/theme/engine.js'

/**
 * Two sets of custom properties have to be *stated* by us rather than left to the
 * engine, and both are pinned to the vendored reference build so a hand-typed
 * value fails here instead of drifting:
 *
 * - `engineNamespaceTokens`: names our own rules reference (`calc(var(--spacing)
 *   * N)`, `var(--radius-none)`, the font weights). The engine only guarantees
 *   them once one of *its* utilities generates — mini states a different block
 *   (transforms, ring, shadow) and no `--spacing` — so a Quasar-only page would
 *   leave every declaration naming them invalid at computed-value time.
 * - `quasarDefaults`: our own `--q-*` namespace for the declarations that used to
 *   read engine-internal names. Keeping our default in our own namespace means a
 *   consumer's engine still wins the read (see the `var(--un-X, var(--q-X))`
 *   form) without us shipping engine-named defaults.
 *
 * The reference bundle is the source of the values: its `*` block for the
 * opacity/contain/content/translate family, its `@property` registrations for the
 * ring/shadow family.
 */
describe('engine theme namespaces', () => {
  const fixture = JSON.parse(
    readFileSync('test/fixtures/reference-selectors.json', 'utf8')
  ) as { variables: Record<string, string> }
  const bundle = readFileSync(
    '../../specs/reference/raw/reference-bundle.css.txt',
    'utf8'
  )
  const universalBlock =
    bundle.match(/\*,\s*::before[^{]*\{([^}]*)\}/)?.[1] ?? ''

  const referenceValue = (engineName: string): string | undefined => {
    const fromBlock = universalBlock.match(
      new RegExp(`${engineName}:\\s*([^;}]+)`)
    )?.[1]
    const raw =
      fromBlock ??
      bundle.match(
        new RegExp(
          `@property ${engineName}\\{syntax:"[^"]*";inherits:[a-z]+;initial-value:([^}]*)`
        )
      )?.[1]
    return raw?.trim().replace(/;+$/, '')
  }

  // The reference leaves the translate axes at `initial` (mini states `0`): both
  // mean "no translation", and `0` keeps `translateX(var(--q-translate-x))`
  // valid where `initial` would be a keyword in a transform function list.
  const EQUIVALENT_TO_INITIAL = new Set(['--q-translate-x', '--q-translate-y'])

  it('state the values the reference bundle resolved to', () => {
    for (const [prop, value] of Object.entries(engineNamespaceTokens)) {
      expect(fixture.variables[prop], `${prop} in the reference bundle`).toBe(
        value
      )
    }
  })

  it('states our own defaults at the reference’s values', () => {
    for (const [prop, value] of Object.entries(quasarDefaults)) {
      const engineName = prop.replace(/^--q-/, '--un-')
      const reference = referenceValue(engineName)
      expect(reference, `${engineName} in the reference bundle`).toBeDefined()
      if (EQUIVALENT_TO_INITIAL.has(prop)) {
        expect(
          reference,
          `${engineName} is the ` + '`initial`' + ` keyword`
        ).toBe('initial')
        expect(value, `${prop} states the neutral value`).toBe('0')
        continue
      }
      expect(value, `${prop} mirrors ${engineName}`).toBe(reference)
    }
  })

  it('states them all, and covers every namespace the sheet references', async () => {
    const gen = await createGenerator({
      presets: [QuasarPreset({ styles: QuasarStyleEntries })]
    })
    // Quasar-only content: no engine utility, which is the case that used to
    // leave these unresolved.
    const { css } = await gen.generate('q-gutter-md q-pa-md q-card', {
      preflights: true
    })
    for (const prop of [
      ...Object.keys(engineNamespaceTokens),
      ...Object.keys(quasarDefaults)
    ]) {
      expect(css, `${prop} is stated`).toContain(`${prop}:`)
    }
    const referenced = [
      ...new Set(
        [
          ...css.matchAll(
            /var\((--(?:spacing|radius|fontWeight|leading|tracking)[\w-]*|--une-animated-duration|--q-(?:bg|text|border|border-left|outline)-opacity|--q-(?:outline-style|contain-size|content|inset-shadow|inset-ring-shadow|ring-shadow|ring-offset-shadow|shadow|translate-x|translate-y))\)/g
          )
        ].map((m) => m[1])
      )
    ]
    // Guard against a vacuous pass if the rules ever stop using them.
    expect(referenced.length).toBeGreaterThan(0)
    for (const name of referenced) {
      expect(
        engineNamespaceTokens[name] ?? quasarDefaults[name],
        `${name} is referenced by the sheet but never stated`
      ).toBeDefined()
    }
  })
})
