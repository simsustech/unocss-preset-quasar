// Emission integrity: rules and safelist entries that exist on disk but never
// reach the sheet.
//
// Two defects motivated this file, both of which left the suite green:
//
//   - `src/components/list/rules.ts` carried a `/^q-item-type$/` rule whose only
//     declaration was `display: block`, added "to force the class into the
//     emitted sheet". Every QItem carries `.q-item` *and* `.q-item-type`, and the
//     forcing rule came later in the sheet, so it overrode
//     `.q-item { display: flex }`: petboarding's booking rows grew from 93px to
//     154px. The reference declares nothing for the bare class (only the sibling
//     separator `.q-item-type + .q-item-type`), so the rule is gone.
//
//   - `src/core/elevation/rules.ts` exported `elevationRuleList`, but `pickRules`
//     only accepts exports whose name ends in `Rules`, so all 13 elevation
//     utilities (`.elevation-1` … `.q-elevation-5`, `.shadow-none`, `.z-notify`)
//     were silently dead.
//
// The safelist check keeps the third class of gap visible: classes the reference
// emits for a family the preset owns must be safelisted, because they are added
// at runtime and never appear in source for UnoCSS to scan.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createGenerator } from 'unocss'
import { QuasarPreset } from '../src/index.js'
import { quasarSafelist } from '../src/safelist.js'
import { isSupplied, suppliedBy } from './supplied.js'
import * as componentModules from '../src/components/index.js'
import * as coreModules from '../src/core/index.js'
// @ts-expect-error -- plain-JS helper; `tsc` only covers src/, vitest resolves it
import { classifySelector, colorNames } from '../scripts/parity-report.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const FIXTURE = JSON.parse(
  readFileSync(join(__dirname, 'fixtures', 'reference-selectors.json'), 'utf8')
) as {
  variables: Record<string, string>
  rules: { selector: string; declarations: { property: string }[] }[]
}

const generate = async (input: string, preflights = false) => {
  const gen = await createGenerator({ presets: [QuasarPreset({})] })
  const { css } = await gen.generate(input, { preflights })
  return css
}

/** Rules in sheet order, split per selector, for cascade-accurate lookups. */
function sheetRules(css: string) {
  const out: { selector: string; body: string }[] = []
  for (const match of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    for (const selector of match[1].split(',')) {
      const trimmed = selector.trim().replace(/\s+/g, ' ')
      if (trimmed) out.push({ selector: trimmed, body: match[2] })
    }
  }
  return out
}

/** Mirrors the contract `pickRules()` enforces in `src/index.ts`. */
const isRuleList = (value: unknown): value is unknown[] =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every(
    (entry) =>
      typeof entry === 'string' ||
      (Array.isArray(entry) &&
        (entry[0] instanceof RegExp || typeof entry[0] === 'string'))
  )

describe('emission integrity', () => {
  it('picks up every rule array the barrels export', () => {
    const unpicked: string[] = []
    for (const [name, mod] of [
      ['components', componentModules],
      ['core', coreModules]
    ] as const) {
      for (const [key, value] of Object.entries(mod)) {
        if (!isRuleList(value)) continue
        // `pickRules(mod, 'Rules')` is the only path into the preset: an export
        // named anything else is dead code that no test would otherwise miss.
        if (!key.endsWith('Rules')) unpicked.push(`${name}.${key}`)
      }
    }
    expect(
      unpicked,
      `rule arrays that pickRules() never sees: ${unpicked.join(', ')}`
    ).toEqual([])
  })

  it('emits the elevation utilities the reference ships', async () => {
    const css = await generate(
      'elevation-1 elevation-5 q-elevation-3 shadow-none no-shadow z-notify'
    )
    // Look the selectors up individually: UnoCSS merges identical declaration
    // bodies into one comma-joined list, so `.elevation-1{` is not a safe
    // substring to assert on.
    const bySelector = new Map(
      sheetRules(css).map((rule) => [rule.selector, rule.body])
    )
    expect(bySelector.get('.elevation-1')).toContain(
      'var(--q-elevation-level1)'
    )
    expect(bySelector.get('.q-elevation-3')).toContain(
      'var(--q-elevation-level3)'
    )
    expect(bySelector.get('.shadow-none')).toContain('box-shadow:none')
    expect(bySelector.get('.z-notify')).toContain('z-index:9500')
  })

  it('keeps .q-item flex on rows that also carry q-item-type', async () => {
    const css = await generate('q-item q-item-type', false)
    const matching = sheetRules(css).filter(
      (rule) => rule.selector === '.q-item' || rule.selector === '.q-item-type'
    )
    // A bare `.q-item-type` rule is the defect this guards against.
    expect(matching.filter((rule) => rule.selector === '.q-item-type')).toEqual(
      []
    )
    const displays = matching
      .map((rule) => rule.body.match(/display\s*:\s*([^;}]+)/)?.[1]?.trim())
      .filter(Boolean)
    // Last declaration wins for an element carrying both classes.
    expect(displays.at(-1)).toBe('flex')
  })

  it('supplies the responsive, platform and colour classes the reference emits', () => {
    const names = colorNames(FIXTURE.variables)
    // Scope classes are not utilities: `.quasar-style-*` and `.body--dark` are
    // emitted by the preset's preflight, not by a utility rule.
    const scopeClasses = new Set(['body--dark', 'quasar-style-unstyled'])
    const missing = new Map<string, string[]>()
    for (const rule of FIXTURE.rules) {
      const { module } = classifySelector(rule.selector, names)
      if (!['responsive', 'platform', 'color-utilities'].includes(module)) {
        continue
      }
      for (const match of rule.selector.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) {
        const cls = match[1]
        if (cls.startsWith('q-') || scopeClasses.has(cls)) continue
        if (cls.startsWith('quasar-style-')) continue
        // Supplied by some mechanism — the safelist, Quasar's runtime globals, a
        // component vocabulary or a value — not necessarily by the safelist.
        if (isSupplied(cls)) continue
        missing.set(cls, [...(missing.get(cls) ?? []), module])
      }
    }
    const list = [...missing].map(
      ([cls, modules]) =>
        `${cls} (${modules[0]}, supplied by ${suppliedBy(cls)})`
    )
    expect(list, `classes nothing supplies: ${list.join(', ')}`).toEqual([])
  })
})
