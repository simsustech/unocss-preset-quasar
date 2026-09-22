import { beforeAll, describe, expect, it } from 'vitest'
import { createGenerator } from 'unocss'
import { fieldRules } from '../src/components/field/rules.js'
import { MaterialDesign3 } from '../src/styles/index.js'

/**
 * Quasar decides some field geometry by source order, not specificity. The
 * `line-height` of a field's native control is one of them:
 *
 *   .q-field--labeled .q-field__native     { line-height: 24px }   (sass: 2673)
 *   .q-field--auto-height .q-field__native { line-height: 18px }   (sass: 2742)
 *
 * Both selectors carry two classes, so whichever comes last wins — and on a
 * field that is both (`q-select` in the agenda's filters is
 * `q-field--auto-height q-field--float q-field--labeled`), quasar.css therefore
 * renders the tighter 18px line.
 *
 * The preset cannot rely on that order: UnoCSS emits the yields of one rule
 * alphabetically, and `--auto-height` sorts before `--labeled`, so the labeled
 * rule's 24px won on every auto-height field — 6px of drift on every filter in
 * the agenda. The compound rule in `src/components/field/rules.ts` pins the
 * quasar.css outcome instead. This test resolves the cascade the way a browser
 * would (matching selectors, then specificity, then source order) so the
 * resolution cannot silently flip again.
 */

/**
 * The declarations now reference role tokens (`var(--q-body-large-line-height)`),
 * and those resolve from the theme rather than from `fieldRules` alone — the
 * token block is emitted by the preflight. The map is built from the style entry
 * with the same derivation the emitter uses, so the test reads real values
 * instead of a copy of them.
 */
const ROLE_SHORTHAND =
  /^(?:(\d{3})\s+)?(\d+(?:\.\d+)?(?:px|em|rem))\s*(?:\/\s*([^\s]+))?\s+(.+)$/

const kebab = (key: string): string =>
  key.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    (m, ofs: number) => (ofs ? '-' : '') + m.toLowerCase()
  )

const tokenMap = (): Map<string, string> => {
  const map = new Map<string, string>()
  const entry = MaterialDesign3 as unknown as {
    tokens?: Record<string, unknown>
  }
  for (const group of Object.values(entry.tokens ?? {})) {
    if (!group || typeof group !== 'object') continue
    for (const [key, value] of Object.entries(
      group as Record<string, unknown>
    )) {
      if (typeof value !== 'string') continue
      map.set(`--q-${kebab(key)}`, value)
      const role = ROLE_SHORTHAND.exec(value)
      if (role === null) continue
      const [, weight, size, lineHeight, family] = role
      if (weight !== undefined) map.set(`--q-${kebab(key)}-weight`, weight)
      map.set(`--q-${kebab(key)}-size`, size as string)
      if (lineHeight !== undefined) {
        map.set(`--q-${kebab(key)}-line-height`, lineHeight)
      }
      map.set(`--q-${kebab(key)}-family`, family as string)
    }
  }
  return map
}

const TOKENS = tokenMap()

/** Resolve one level of `var(--q-…)`, leaving anything unknown as written. */
const resolveVars = (value: string): string => {
  const match = /^var\((--[\w-]+)\)$/.exec(value.trim())
  return match ? (TOKENS.get(match[1]) ?? value) : value
}

/** Just the declarations the resolver compares. */
const PROPERTY = 'line-height'

/** A rule as the resolver sees it: selectors, declarations, source position. */
type Rule = {
  selectors: string[]
  declarations: Map<string, string>
  order: number
}

/** Classes named by a compound selector such as `.a.b > .c.d`. */
const classesOf = (part: string): string[] =>
  [...part.matchAll(/\.([\w-]+)/g)].map((match) => match[1] as string)

/**
 * Does every class of every compound part sit on the element, with the last
 * part naming `target`? Pseudo-elements and attribute selectors are skipped:
 * they never apply to the plain control this test resolves for.
 */
const matchesTarget = (
  selector: string,
  target: string,
  own: Set<string>
): boolean => {
  if (/[:[]/.test(selector)) return false
  const parts = selector.trim().split(/\s+/)
  const last = parts[parts.length - 1] as string
  if (!classesOf(last).includes(target)) return false
  return parts
    .slice(0, -1)
    .every((part) => classesOf(part).every((name) => own.has(name)))
}

/** Classes in the selector decide the cascade when specificity ties. */
const specificity = (selector: string): number =>
  selector.match(/\./g)?.length ?? 0

const parseRules = (css: string): Rule[] => {
  const rules: Rule[] = []
  css.split('}').forEach((chunk, index) => {
    const open = chunk.indexOf('{')
    if (open === -1) return
    const declarations = new Map<string, string>()
    for (const declaration of chunk.slice(open + 1).split(';')) {
      const colon = declaration.indexOf(':')
      if (colon === -1) continue
      declarations.set(
        declaration.slice(0, colon).trim(),
        declaration.slice(colon + 1).trim()
      )
    }
    rules.push({
      selectors: chunk
        .slice(0, open)
        .split(',')
        .map((selector) => selector.trim())
        .filter(Boolean),
      declarations,
      order: index
    })
  })
  return rules
}

const resolve = (
  rules: Rule[],
  target: string,
  elementClasses: string[]
): string | undefined => {
  const own = new Set(elementClasses)
  let winner: { specificity: number; order: number; value: string } | undefined

  for (const rule of rules) {
    const raw = rule.declarations.get(PROPERTY)
    if (raw === undefined) continue
    const value = resolveVars(raw)
    const applicable = rule.selectors
      .filter((selector) => matchesTarget(selector, target, own))
      .map(specificity)
    if (applicable.length === 0) continue
    const best = Math.max(...applicable)
    if (
      winner === undefined ||
      best > winner.specificity ||
      (best === winner.specificity && rule.order > winner.order)
    ) {
      winner = { specificity: best, order: rule.order, value }
    }
  }
  return winner?.value
}

describe('the field native line-height resolves as quasar.css does', () => {
  let rules: Rule[] = []

  beforeAll(async () => {
    const uno = await createGenerator({ presets: [], rules: fieldRules })
    const { css } = await uno.generate(
      [
        'q-field',
        'q-field--auto-height',
        'q-field--labeled',
        'q-field__native',
        'q-field--dense',
        'q-field--float'
      ].join(' '),
      { preflights: false }
    )
    rules = parseRules(css)
  })

  it('gives a labeled field the base 24px line', () => {
    expect(
      resolve(rules, 'q-field__native', ['q-field', 'q-field--labeled'])
    ).toBe('24px')
  })

  it('tightens the line to 18px when the field is auto-height too', () => {
    expect(
      resolve(rules, 'q-field__native', [
        'q-field',
        'q-field--auto-height',
        'q-field--float',
        'q-field--labeled'
      ])
    ).toBe('18px')
  })

  it('leaves an auto-height field without a label at 18px', () => {
    expect(
      resolve(rules, 'q-field__native', ['q-field', 'q-field--auto-height'])
    ).toBe('18px')
  })
})
