import { beforeAll, describe, expect, it } from 'vitest'
import { createGenerator } from 'unocss'
import { fieldRules } from '../src/components/field/rules.js'

/**
 * The native-type label float (color/date/datetime-local/month/time/week,
 * autofill, and the preset's own `[type=file]` addition) must be expressed
 * LABEL-side, the way quasar.prod.css does:
 *
 *   .q-field__label:has(+ :is(.q-field__native, .q-field__input):is(…, [type=date], …))
 *     { transform: translateY(-40%) scale(.75) }
 *   .q-field--dense .q-field__label:has(+ …) { transform: translateY(-30%) scale(.75) }
 *
 * Quasar renders the label BEFORE the control (`getControlContainer` pushes
 * the label, then `state.getControl()`), so the adjacency `native + label`
 * that the preset used to emit can never match — the rule existed in the
 * built CSS but floated nothing. The label-side `:has(+ …)` form is
 * order-independent (it only requires the control to FOLLOW the label,
 * which it always does).
 *
 * Values map 1:1 to quasar.prod.css: non-dense −40%, dense −30%.
 */

type Rule = { selectors: string[]; declarations: Map<string, string> }

const parse = (css: string): Rule[] => {
  const rules: Rule[] = []
  for (const chunk of css.split('}')) {
    const open = chunk.indexOf('{')
    if (open === -1) continue
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
      declarations
    })
  }
  return rules
}

/** A label-side float rule (dense or not) that names `[type='file']`. */
const labelFloatRule = (rules: Rule[], dense: boolean): Rule | undefined =>
  rules.find(
    (rule) =>
      rule.selectors.some((selector) =>
        dense
          ? selector.startsWith('.q-field--dense .q-field__label:has(')
          : selector.startsWith('.q-field__label:has(')
      ) &&
      rule.selectors.some((selector) => selector.includes("[type='file']")) &&
      rule.declarations.get('transform') !== undefined
  )

describe('the native-type label float is emitted label-side', () => {
  let rules: Rule[] = []

  beforeAll(async () => {
    const uno = await createGenerator({ presets: [], rules: fieldRules })
    const { css } = await uno.generate('q-field q-field--dense', {
      preflights: false
    })
    rules = parse(css)
  })

  it('floats from the label side with [type=file] covered (non-dense −40%)', () => {
    const rule = labelFloatRule(rules, false)
    expect(rule, 'no label-side :has(+ …) float selector').toBeDefined()
    expect(rule?.declarations.get('transform')).toMatch(
      /^translateY\(-40%\) scale\((?:\.75|0\.75)\)$/
    )
  })

  it('keeps the dense case at −30% with [type=file] covered', () => {
    const rule = labelFloatRule(rules, true)
    expect(rule, 'no dense label-side :has(+ …) float selector').toBeDefined()
    expect(rule?.declarations.get('transform')).toMatch(
      /^translateY\(-30%\) scale\((?:\.75|0\.75)\)$/
    )
  })

  it('names every floating type (plus autofill) on the label side', () => {
    const rule = labelFloatRule(rules, false)
    const selector = (rule?.selectors ?? []).join(',')
    for (const type of [
      ':autofill',
      "[type='color']",
      "[type='date']",
      "[type='datetime-local']",
      "[type='file']",
      "[type='month']",
      "[type='time']",
      "[type='week']"
    ]) {
      expect(selector, `missing ${type}`).toContain(type)
    }
  })
})
