// Step 8ii (AUD-024): the duplicate-yield folds.
//
// Ten component files carried two yields for the same selector — the port's
// tokenized form and the older literal form (or a shorthand/longhand pair). The
// blocks do not merge, so the *later* one silently wins and the effective value
// depends on yield order. Counting duplicates cannot see that; these assertions
// compare the effective declaration against **the reference fixture's** own
// (`test/fixtures/reference-selectors.json`), which is what the fold has to
// preserve.
//
// Two sites were worse than "ordering-fragile": `q-select`'s focus target pair
// and `q-file__filler` currently render the *non*-reference form, so their fold
// is a behaviour fix, not a no-op.
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'

const HERE = dirname(fileURLToPath(import.meta.url))
const FIXTURE = join(HERE, 'fixtures', 'reference-selectors.json')

type FixtureRule = {
  selector: string
  media: string | null
  declarations: { property: string; value: string }[]
}

const fixture = JSON.parse(readFileSync(FIXTURE, 'utf8')) as {
  rules: FixtureRule[]
}

/** The reference's own declarations for a selector, as `property:value`. */
function referenceDecls(selector: string): Map<string, string> {
  const rule = fixture.rules.find(
    (r) => r.selector === selector && r.media == null
  )
  if (!rule) throw new Error(`reference selector missing: ${selector}`)
  return new Map(rule.declarations.map((d) => [d.property, d.value]))
}

/**
 * The effective declarations this sheet produces for a selector: every block
 * that carries it, later wins per property — the cascade UnoCSS's output
 * actually applies.
 */
async function effectiveDecls(
  token: string,
  selector: string
): Promise<Map<string, string>> {
  const css = (
    await (
      await createGenerator({
        presets: [QuasarPreset({ styles: QuasarStyleEntries })]
      })
    ).generate(token, { preflights: false })
  ).css
  const out = new Map<string, string>()
  for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selectors = m[1].split(',').map((s) => s.trim().replace(/\s+/g, ' '))
    if (!selectors.includes(selector)) continue
    for (const decl of m[2].split(';')) {
      const idx = decl.indexOf(':')
      if (idx < 0) continue
      out.set(decl.slice(0, idx).trim(), decl.slice(idx + 1).trim())
    }
  }
  return out
}

/**
 * Where this preset tokenizes a value the reference spells literally, the two
 * resolve identically, so the fold's guarantee is the *deterministic single
 * declaration*, not textual equality with the fixture: `--q-comp-md` resolves to
 * the reference's `40px`. (The other former entry, `--q-primary` against the
 * reference's `--light-primary`, is handled by `normaliseReads` below.)
 */
const ALIASES: [actual: string, expected: string][] = [
  ['var(--q-comp-md)', '40px']
]

/**
 * Our engine-internal reads spell the same value two ways the reference does not:
 * they name our own default (`var(--un-X, var(--q-X))`, `var(--colors-white, #fff)`) and
 * the opacity quartet reads our own name outright (`--q-text-opacity`), because the
 * engine's is a number under mini where the reference's is a percentage. Both spellings
 * resolve to the reference's value — which `engine-reads.test.ts` guarantees — so
 * normalise them back before comparing the declaration itself. `--q-primary` is
 * this preset's role token for the colour the reference reaches through wind4's
 * `--light-primary`, which is the same aliasing in a different name.
 */
const normaliseReads = (value: string): string =>
  value
    .replace(/var\(--q-primary\)/g, 'var(--light-primary)')
    .replace(/var\((--un-[\w-]+), var\(--q-[\w-]+\)\)/g, 'var($1)')
    .replace(/var\((--colors-[\w-]+), [^)]+\)/g, 'var($1)')
    .replace(
      /var\(--q-(bg|text|border|border-left|outline)-opacity\)/g,
      'var(--un-$1-opacity)'
    )

/** Values that differ in spelling but not in effect. */
const equivalent = (actual: string | undefined, expected: string): boolean => {
  const ours = normaliseReads(actual ?? '')
  const theirs = normaliseReads(expected)
  return (
    actual === expected ||
    (actual != null &&
      ours.replace(/\s+/g, '') === theirs.replace(/\s+/g, '')) ||
    // wind4's spacing math for a literal zero
    (expected === 'calc(var(--spacing) * 0)' && actual === '0') ||
    (expected === '0' && actual === 'calc(var(--spacing) * 0)') ||
    (actual != null && ALIASES.some(([a, e]) => a === actual && e === expected))
  )
}

/**
 * Each entry is one folded site: the token that reaches the selector, the
 * selector, and the properties the fold had to settle. The expected value is
 * always the reference's.
 */
const SITES: [token: string, selector: string, properties: string[]][] = [
  [
    'q-pull-to-refresh',
    '.q-pull-to-refresh__puller',
    ['color', 'background-color', 'border-radius', 'width', 'height']
  ],
  ['q-rating', '.q-rating__icon--exselected', ['opacity']],
  ['q-rating', '.q-rating__icon-container', ['outline-style', 'outline-width']],
  ['q-banner', '.q-banner', ['padding-inline', 'padding-block', 'min-height']],
  ['q-banner', '.q-banner--dense', ['padding', 'min-height']],
  [
    'q-select',
    '.q-select__focus-target',
    ['outline-style', 'outline-width', 'border-width']
  ],
  [
    'q-select',
    '.q-select__autocomplete-input',
    ['outline-style', 'outline-width']
  ],
  ['q-file', '.q-file__dnd', ['outline-color', 'outline-offset']],
  ['q-file', '.q-file__filler', ['border-style', 'visibility', 'width']],
  [
    'q-checkbox',
    '.q-checkbox__inner',
    ['font-size', 'border-radius', 'width', 'height']
  ],
  [
    'q-radio',
    '.q-radio__inner',
    ['font-size', 'border-radius', 'width', 'height']
  ],
  ['q-tabs', '.q-tab', ['padding-inline', 'padding-block', 'min-height']],
  ['q-tabs', '.q-badge--multi-line', ['word-break', 'word-wrap']],
  ['q-tabs', '.q-badge--transparent', ['opacity']],
  ['q-checkbox', '.q-checkbox__indet', ['rotate', 'transform-origin']]
]

/**
 * The blocks that carry a selector, whatever their declarations.
 *
 * The fold's end state is one block per selector, but not every site can get
 * there by *deleting* a yield: at five of them the two yields carry disjoint
 * declarations (the port's layout properties next to the reference's literal
 * ones), so the fold has to merge them, and a plain deletion would drop
 * rendering the reference needs. Those are pinned below with the count they
 * currently emit and may only shrink — the same ratchet the duplicate-matcher
 * test uses — so the remaining work is recorded rather than hidden.
 */
async function blocksFor(token: string, selector: string): Promise<string[]> {
  const css = (
    await (
      await createGenerator({
        presets: [QuasarPreset({ styles: QuasarStyleEntries })]
      })
    ).generate(token, { preflights: false })
  ).css
  const bodies: string[] = []
  for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selectors = m[1].split(',').map((s) => s.trim().replace(/\s+/g, ' '))
    if (selectors.includes(selector)) bodies.push(m[2].trim())
  }
  return bodies
}

/**
 * Sites whose two yields overlap only partly: merging them is a source edit
 * rather than a deletion, so the count is pinned. Shrinking this map is the
 * remaining AUD-024 work; a row must disappear, never grow.
 */
/**
 * Empty: every folded site now emits exactly one block. It stays in the file as the
 * place to pin a site again if a future yield pair needs splitting.
 */
const PENDING_MERGE: Record<string, number> = {}

describe('duplicate-yield folds keep the reference value (AUD-024)', () => {
  it('emits one block per folded selector, or the pinned count (may only shrink)', async () => {
    const violations: string[] = []
    for (const [token, selector] of SITES) {
      const blocks = await blocksFor(token, selector)
      const pinned = PENDING_MERGE[selector] ?? 1
      if (blocks.length > pinned) {
        violations.push(`${selector}`)
      }
    }
    expect(violations.join('\n')).toBe('')
  })

  for (const [token, selector, properties] of SITES) {
    it(`${selector} renders the reference declaration`, async () => {
      const ours = await effectiveDecls(token, selector)
      const reference = referenceDecls(selector)
      for (const property of properties) {
        const expected = reference.get(property)
        expect(expected, `${selector} ${property} in the fixture`).toBeDefined()
        expect(
          equivalent(ours.get(property), expected as string),
          `${selector} { ${property} } — ours: ${ours.get(property)}, reference: ${expected}`
        ).toBe(true)
      }
    })
  }
})
