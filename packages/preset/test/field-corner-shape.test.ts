import { beforeAll, describe, expect, it } from 'vitest'
import { createGenerator } from 'unocss'
import { fieldRules } from '../src/components/field/rules.js'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'

/**
 * A field's corner shape is variant-scoped, and no variant may read it from a
 * base declaration on `.q-field__control`.
 *
 * The preset used to put `border-radius: var(--q-radius-sm)` (8px in md3) on
 * the control itself. Every variant but `standard` overrides the whole radius,
 * so only the standard field leaked the base value — and there only through its
 * unset bottom corners: the standard control rendered
 * `border-top-left-radius: 0px` / `border-bottom-left-radius: 8px`
 * ("bottom rounded, top square", first seen in petboarding's login form).
 *
 * `standard` keeps its reference-pinned `border-top-*-radius: inherit`. The
 * value it inherits must come from its direct parent, `.q-field__inner` — CSS
 * `inherit` never reaches the field root — which is where Material's
 * extra-small top corners belong: Flutter's `UnderlineInputBorder` documents
 * "the top left and right corners have a circular radius of 4.0" with the
 * bottom radii zero, and the md3 machine spec's text-field bottom edge is
 * `md.sys.shape.corner.none`.
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

/** `border-radius`, `border-top-left-radius`, `border-start-end-radius`, … */
const RADIUS = /^border(-radius|-(top|bottom|start|end)-(left|right)-radius)$/

const declarationsFor = (rules: Rule[], selector: string) =>
  rules.find((rule) => rule.selectors.includes(selector))?.declarations

describe('the field control owns no base corner radius', () => {
  let rules: Rule[] = []

  beforeAll(async () => {
    const uno = await createGenerator({ presets: [], rules: fieldRules })
    const { css } = await uno.generate(
      [
        'q-field',
        'q-field__control',
        'q-field__inner',
        'q-field--standard',
        'q-field--filled',
        'q-field--outlined',
        'q-field--standout',
        'q-field--rounded',
        'q-field--square'
      ].join(' '),
      { preflights: false }
    )
    rules = parse(css)
  })

  it('declares no corner radius on the bare control', () => {
    const offenders = rules
      .filter((rule) => rule.selectors.includes('.q-field__control'))
      .flatMap((rule) =>
        [...rule.declarations]
          .filter(([property]) => RADIUS.test(property))
          .map(([property, value]) => `${property}: ${value}`)
      )
    expect(offenders).toEqual([])
  })

  it('feeds the standard control its top corners from the inner', () => {
    const inner = declarationsFor(rules, '.q-field__inner')
    expect(inner?.get('border-top-left-radius')).toBe(
      'var(--q-corner-extra-small)'
    )
    expect(inner?.get('border-top-right-radius')).toBe(
      'var(--q-corner-extra-small)'
    )
  })

  it('keeps the reference-pinned inherits on the standard control', () => {
    const standard = declarationsFor(
      rules,
      '.q-field--standard .q-field__control'
    )
    expect(standard?.get('border-top-left-radius')).toBe('inherit')
    expect(standard?.get('border-top-right-radius')).toBe('inherit')
  })

  const rootRadiusOn = (selector: string): string[] =>
    rules
      .filter((rule) => rule.selectors.includes(selector))
      .flatMap((rule) =>
        [...rule.declarations]
          .filter(([property]) => RADIUS.test(property))
          .map(([property, value]) => `${property}: ${value}`)
      )

  it('keeps the rounded prop off the field root', () => {
    // quasar rounds the *variants* through the control; its root never carries
    // the radius. Our root rule was inert anyway: the only radius that reads
    // the root is a direct-child `inherit`, and the control's parent is
    // `.q-field__inner`. Removing it drops a parity-extra that could never
    // paint.
    expect(rootRadiusOn('.q-field--rounded')).toEqual([])
  })

  it('still rounds the variants that read the prop (positive control)', () => {
    const variantRounded = rules.filter(
      (rule) =>
        rule.selectors.some((selector) => /--rounded /.test(selector)) &&
        [...rule.declarations.keys()].some((property) => RADIUS.test(property))
    )
    expect(variantRounded.length).toBeGreaterThan(0)
  })
})

/**
 * md2 states extra-small as **4px** — its own spec's filled (`4px 4px 0px 0px`)
 * and outlined (`4`) text fields, and `quasar.css`, which renders every
 * extra-small consumer at 4px. The preset carried `3px`, so md2's outlined and
 * standout fields drew a 3px corner where both authorities say 4px (the value
 * survived nowhere in the field rules: filled states its own 4px longhand).
 *
 * The per-style block is a *diff* against the baseline style, so once md2 says
 * the same 4px the baseline does, the block must stop overriding the key at
 * all — the assertion therefore reads the value md2 *resolves to* (its own
 * override when it has one, the baseline otherwise), never the block's literal
 * text.
 */
describe('the md2 corner scale keeps the spec extra-small', () => {
  let css = ''

  beforeAll(async () => {
    const uno = await createGenerator({
      presets: [QuasarPreset({ styles: QuasarStyleEntries })]
    })
    css = (await uno.generate('', { preflights: true })).css
  })

  const CORNER = 'q-corner-extra-small'

  /**
   * Preflights emit several blocks per selector (colours first, tokens later),
   * so a selector's value is the first block that actually declares it.
   */
  const declaredIn = (selector: string): string | undefined => {
    const blocks = css.match(
      new RegExp(
        `(?:^|\\n)${selector.replace(/\./g, '\\.')} \\{([^}]*)\\}`,
        'g'
      )
    )
    for (const block of blocks ?? []) {
      const declared = block.match(new RegExp(`--${CORNER}:\\s*([^;\\n]+)`))
      if (declared) return declared[1].trim()
    }
    return undefined
  }

  const md2ResolvesTo = (baselineSelector: string): string | undefined =>
    declaredIn('body.quasar-style-md2') ?? declaredIn(baselineSelector)

  it('resolves extra-small to 4px for md2, with no 3px override', () => {
    expect(md2ResolvesTo('body')).toBe('4px')
  })

  it('carries the same value into md2 dark mode', () => {
    expect(
      declaredIn('body.body--dark.quasar-style-md2') ??
        declaredIn('body.body--dark')
    ).toBe('4px')
  })
})
