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
//
// The `declarations survive the production CSS minifier` describe below closes
// a fourth: a declaration that reaches the sheet but not the build, because
// Lightning CSS (the minifier in Vite 8 production builds) rewrites it away.
import { beforeAll, describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createGenerator } from 'unocss'
import { transform } from 'lightningcss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'
import { quasarSafelist, pluginSafelistMap } from '../src/safelist.js'
import { isSupplied, suppliedBy } from './supplied.js'
import * as componentModules from '../src/components/index.js'
import * as coreModules from '../src/core/index.js'
import { componentClasses } from '../src/generated/quasar-classes.js'
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
  const gen = await createGenerator({
    presets: [QuasarPreset({ styles: QuasarStyleEntries })]
  })
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

  it('safelists the bare grey palette utilities Quasar composes', () => {
    // Quasar's `color="grey"` prop composes `text-grey` / `bg-grey` at runtime,
    // so no source UnoCSS scans names the class and only the safelist makes the
    // engine emit it. `grey-1` … `grey-14` were listed; the bare name was not,
    // and the harness's class-coverage gate found `<i class="text-grey">` with
    // no matching rule (QPopupEditPage's `<q-icon color="grey">`).
    const preset = QuasarPreset({ styles: QuasarStyleEntries }) as {
      safelist?: string[]
    }
    expect(preset.safelist).toContain('text-grey')
    expect(preset.safelist).toContain('bg-grey')
  })

  it('safelists the resolved classes when iconSet names a quasar library', () => {
    // The fix (step 3): a library string resolves to the provider's icon set,
    // whose classes are app configuration and must reach the safelist — a
    // class Quasar adds at runtime never appears in markup UnoCSS scans.
    const preset = QuasarPreset({
      styles: QuasarStyleEntries,
      iconSet: 'mdi-v7'
    }) as { safelist?: string[] }
    expect(preset.safelist).toContain('i-mdi-arrow-up')
    expect(preset.safelist).toContain('i-mdi-check-circle')
  })

  it('keeps a supplied nested icon set safelisted unchanged (backwards compat)', () => {
    const preset = QuasarPreset({
      styles: QuasarStyleEntries,
      iconSet: { type: { positive: 'i-mdi-supplied-icon' } }
    }) as { safelist?: string[] }
    expect(preset.safelist).toContain('i-mdi-supplied-icon')
  })
})

describe('declarations survive the production CSS minifier', () => {
  /**
   * The declarations above reach the sheet; these reach the *build*.
   *
   * Vite 8 minifies CSS with Lightning CSS, which folds the individual
   * transform properties (`translate`, `rotate`, `scale`) into a `transform`
   * that follows them in source order and **drops the earlier declaration** —
   * in one block, or across two blocks UnoCSS emitted for the same selector.
   * A rule that states an individual transform next to a `transform` therefore
   * renders two ways: unminified both apply (the fab's `rotate: 180deg` +
   * `transform: rotate(180deg)` composed to 360deg, so the icon never turned),
   * minified only the `transform` survives (the checkbox state layer landed
   * (20,20)px off the box; the floating field label lost its 0.75 scale).
   *
   * The harness cannot see that difference — its `vitrify.config.ts` sets
   * `build: { cssMinify: false }` — so nothing else in the suite can catch it.
   */
  const INDIVIDUAL = ['translate', 'rotate', 'scale'] as const

  /** The sheet a real app build minifies: every component and plugin. */
  const buildSheet = async (): Promise<string> => {
    const gen = await createGenerator({
      presets: [
        QuasarPreset({
          styles: QuasarStyleEntries,
          plugins: Object.keys(pluginSafelistMap)
        })
      ]
    })
    // The same input the parity gate uses: the safelist plus a mention of every
    // component, which is the signal a build gets from markup.
    const markers = Object.keys(componentClasses).map((root) =>
      root
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')
    )
    const { css } = await gen.generate(
      [
        ...quasarSafelist,
        ...Object.values(pluginSafelistMap).flat(),
        ...Object.keys(componentClasses),
        ...markers
      ].join(' '),
      { preflights: true }
    )
    return css
  }

  const minify = (css: string): string =>
    transform({
      filename: 'unocss.css',
      code: Buffer.from(css),
      minify: true
    }).code.toString()

  const declarationsIn = (body: string): Map<string, string> => {
    const out = new Map<string, string>()
    for (const declaration of body.split(';')) {
      const colon = declaration.indexOf(':')
      if (colon === -1) continue
      out.set(
        declaration.slice(0, colon).trim(),
        declaration.slice(colon + 1).trim()
      )
    }
    return out
  }

  let css = ''

  beforeAll(async () => {
    css = await buildSheet()
  })

  it('never states an individual transform next to a transform', () => {
    const rules = sheetRules(css)
    expect(rules.length).toBeGreaterThan(500)
    const offenders: string[] = []
    for (const { selector, body } of rules) {
      const declarations = declarationsIn(body)
      const individual = INDIVIDUAL.filter((property) =>
        declarations.has(property)
      )
      if (individual.length === 0 || !declarations.has('transform')) continue
      offenders.push(
        `${selector} { ${[...individual, 'transform'].join(', ')} }`
      )
    }
    expect(
      offenders,
      `an individual transform shares a block with a transform, and Lightning ` +
        `CSS drops the earlier declaration:\n${offenders.join('\n')}`
    ).toEqual([])
  })

  it('keeps the individual transforms that are left through the minifier', () => {
    // What survives is deliberate: a centring `translate` with no `transform`
    // near it (the q-select dropdown icon), which is the composition the
    // `.rotate-180` utility needs. Minify each such block on its own — the
    // sheet-wide pass rewrites selector text (quoting, merging), so a rule
    // cannot be looked up in its output by selector.
    const checked: string[] = []
    for (const { selector, body } of sheetRules(css)) {
      const individual = INDIVIDUAL.filter((property) =>
        declarationsIn(body).has(property)
      )
      if (individual.length === 0) continue
      const minified = minify(`.probe{${body}}`)
      for (const property of individual) {
        expect(
          minified,
          `${selector} loses \`${property}\` in a production build: ${minified}`
        ).toMatch(new RegExp(`(?:^|[;{])${property}:`))
      }
      checked.push(selector)
    }
    // A guard that checked nothing would pass; the message names the sites.
    expect(
      checked.length,
      `individual transform declarations left in the sheet: ${checked.join(', ')}`
    ).toBeGreaterThan(0)
  })

  it('keeps the positioning-engine guard, un-important, through the minifier', () => {
    const guard = sheetRules(css).find(
      (rule) => rule.selector === '.q-position-engine'
    )
    expect(guard, '.q-position-engine is emitted').toBeDefined()
    expect(guard!.body, 'the popup guard is stated').toMatch(
      /visibility:\s*hidden/
    )
    // `!important` would beat the engine's inline `visibility: visible`, which
    // is what reveals a placed popup.
    expect(guard!.body, 'the guard must not be important').not.toMatch(
      /visibility:\s*hidden\s*!important/
    )
    expect(minify(`.probe{${guard!.body}}`)).toMatch(
      /(?:^|[;{])visibility:hidden/
    )
  })
})
