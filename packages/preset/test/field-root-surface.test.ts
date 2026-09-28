import { beforeAll, describe, expect, it } from 'vitest'
import { createGenerator } from 'unocss'
import { fieldRules } from '../src/components/field/rules.js'

/**
 * A field's surface belongs to `.q-field__control`. The reference draws the
 * background there (`--standard`, `--filled`), draws the outline on the control's
 * pseudo-element (`--outlined .q-field__control:before`) and handles dark mode
 * per control — it has no surface rule on the field root at all.
 *
 * The preset used to paint the root for `--outlined`, `--standard`, `--dark` and
 * `--standout`. Because the root wraps the whole field, that background also
 * covered `.q-field__bottom`, so a standard field read as a grey slab with an
 * extra strip under it (the interaction app's login form was the loudest case),
 * and outlined fields drew their border a pixel outside the control.
 */

type Rule = { selectors: string[]; declarations: Map<string, string> }

const SURFACE = ['background', 'background-color', 'border', 'border-color']

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

/** `.q-field`, `.q-field--standard`, `.body--dark .q-field--dark`, … */
const isRootSurfaceSelector = (selector: string): boolean =>
  /^\.q-field(--[\w-]+)?$/.test(selector) ||
  /^\.body--dark \.q-field(--[\w-]+)?$/.test(selector)

describe('no field variant paints the field root', () => {
  let rules: Rule[] = []

  beforeAll(async () => {
    const uno = await createGenerator({ presets: [], rules: fieldRules })
    const { css } = await uno.generate(
      [
        'q-field',
        'q-field__control',
        'q-field__native',
        'q-field--standard',
        'q-field--outlined',
        'q-field--filled',
        'q-field--standout',
        'q-field--dark',
        'q-field--borderless',
        'q-field--readonly',
        'q-field--labeled'
      ].join(' '),
      { preflights: false }
    )
    rules = parse(css)
  })

  it('keeps every surface declaration off the root selector', () => {
    const offenders: string[] = []
    for (const rule of rules) {
      const roots = rule.selectors.filter(isRootSurfaceSelector)
      if (roots.length === 0) continue
      for (const property of SURFACE) {
        if (rule.declarations.has(property)) {
          offenders.push(
            `${roots[0]} { ${property}: ${rule.declarations.get(property)} }`
          )
        }
      }
    }
    expect(offenders).toEqual([])
  })

  it('still paints the control for the variants that need a surface', () => {
    const control = rules.filter((rule) =>
      rule.selectors.some((selector) => /\.q-field__control$/.test(selector))
    )
    const painted = control.filter((rule) =>
      rule.declarations.has('background-color')
    )
    expect(painted.length).toBeGreaterThan(0)
  })
})

/**
 * An empty `before` marginal is still laid out: Quasar reserves
 * `padding-right: 12px` on `.q-field__before` whatever it holds, and the
 * reference's `min-width: 56px` rides on `q-field__before` unmodified, so an
 * empty slot leaves a 12px gutter in front of the control. `after` and
 * `append` do not have that problem — the preset already hides them while
 * empty, which is why the two are asserted together here: the pair is the
 * contract, not the single rule.
 */
describe('an empty field marginal is not laid out', () => {
  let blocks: Rule[] = []

  beforeAll(async () => {
    const uno = await createGenerator({ presets: [], rules: fieldRules })
    const { css } = await uno.generate(
      ['q-field', 'q-field__before', 'q-field__after'].join(' '),
      { preflights: false }
    )
    blocks = parse(css)
  })

  const declarationsFor = (selector: string) =>
    blocks.find((rule) => rule.selectors.includes(selector))?.declarations

  it('collapses the empty before marginal', () => {
    expect(declarationsFor('.q-field__before:empty')?.get('display')).toBe(
      'none'
    )
  })

  it('still collapses the empty after marginal (positive control)', () => {
    expect(declarationsFor('.q-field__after:empty')?.get('display')).toBe(
      'none'
    )
  })
})
