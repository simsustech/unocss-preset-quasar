import { createGenerator } from 'unocss'
import { describe, expect, it } from 'vitest'
import {
  MaterialDesign3,
  QuasarPreset,
  QuasarStyleEntries
} from '../src/index.js'

/**
 * Unstyled means "structure only": the preset's own token layer neutralises
 * style-driven values (`body.quasar-style-unstyled` diffs the style tokens), and
 * anything a ported rule states as a *literal* theming value — a colour, a
 * shadow — has to be reset explicitly, because no token carries it.
 *
 * So the contract is two-layered, exactly like the 60 bundled component modules:
 *
 * - a base rule with literal theming declarations needs a
 *   `body.quasar-style-unstyled <selector>` yield that resets them, using only
 *   the allowed reset keys and only the keys the base rule actually states;
 * - a base rule whose theming values are all `var(--q-…)` needs no stub at all —
 *   the token diff already handles it, and a redundant stub would be a
 *   declaration that says nothing.
 *
 * The walk is done on the emitted sheet (diffed against the same sheet with the
 * extension but without the style that owns the resets), not on the source: what
 * ships is what matters.
 */

const THEMING_PROPERTIES = [
  'color',
  'background',
  'background-color',
  'border',
  'border-color',
  'border-top',
  'border-right',
  'border-bottom',
  'border-left',
  'box-shadow',
  'outline',
  'outline-color'
]

/** The reset keys a stub may use. */
const ALLOWED_RESET = new Set([
  'color',
  'background-color',
  'border-color',
  'box-shadow'
])

const UNSTYLED = 'body.quasar-style-unstyled '

type Block = { selector: string; declarations: Map<string, string> }

/**
 * `selector -> declarations`, with comma groups split into their members: the
 * two sheets group the same declarations differently (a lone rule here is part
 * of a group there), so comparing group strings reports the other sheet's rules
 * as this extension's.
 */
const blocksOf = (css: string): Map<string, Block> => {
  const blocks = new Map<string, Block>()
  for (const match of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const declarations = new Map(
      match[2]
        .split(';')
        .map((declaration) => declaration.trim())
        .filter(Boolean)
        .map((declaration) => {
          const at = declaration.indexOf(':')
          return [
            declaration.slice(0, at).trim(),
            declaration.slice(at + 1).trim()
          ] as [string, string]
        })
    )
    for (const selector of match[1].split(',')) {
      const key = selector.trim().replace(/\s+/g, ' ')
      const existing = blocks.get(key)
      blocks.set(key, {
        selector: key,
        declarations: existing
          ? new Map([...existing.declarations, ...declarations])
          : declarations
      })
    }
  }
  return blocks
}

const sheet = async (
  classes: string[],
  extensions: ('qcalendar' | 'qmarkdown' | 'qmediaplayer')[],
  styles: QuasarStyleEntry[] = QuasarStyleEntries
): Promise<string> => {
  const gen = await createGenerator({
    presets: [QuasarPreset({ styles, appExtensions: extensions })]
  })
  const { css } = await gen.generate(classes.join(' '), { preflights: false })
  return css
}

/**
 * A declaration that states a literal colour or shadow, i.e. something no token
 * can flip. Structural values (`outline: 0`, `border: solid currentColor`) are
 * not theming and need no stub.
 */
const LITERAL_COLOUR = /#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i

const isLiteralTheming = (property: string, value: string): boolean =>
  THEMING_PROPERTIES.includes(property) &&
  !value.includes('var(') &&
  LITERAL_COLOUR.test(value)

const CASES = [
  {
    extension: 'qcalendar' as const,
    classes: [
      'q-calendar',
      'q-calendar-day',
      'q-calendar-month',
      'q-calendar-mini'
    ],
    minimumBlocks: 40
  },
  {
    extension: 'qmarkdown' as const,
    classes: ['q-markdown'],
    minimumBlocks: 40
  },
  {
    extension: 'qmediaplayer' as const,
    classes: ['q-media'],
    minimumBlocks: 20
  }
]

describe('app extensions ship a two-layer unstyled story', () => {
  for (const { extension, classes, minimumBlocks } of CASES) {
    it(`${extension}: literal theming gets a stub, token theming does not`, async () => {
      const withExtension = blocksOf(await sheet(classes, [extension]))
      const withoutExtension = blocksOf(await sheet(classes, []))
      const own = [...withExtension.values()].filter(
        (block) => !withoutExtension.has(block.selector)
      )
      expect(own.length, `${extension} contributed blocks`).toBeGreaterThan(
        minimumBlocks
      )

      // The resets are style-owned (ADR 0006), so they are isolated by dropping
      // the style, with the extension still declared — not by dropping the
      // extension, which now changes nothing about them.
      const withoutStyle = blocksOf(
        await sheet(classes, [extension], [MaterialDesign3])
      )
      const resets = [...withExtension.values()].filter(
        (block) => !withoutStyle.has(block.selector)
      )

      const stubbed = new Map(
        resets
          .filter((block) => block.selector.startsWith(UNSTYLED))
          .map((block) => [block.selector.slice(UNSTYLED.length), block])
      )

      // 1. Every stub uses only allowed keys.
      // 1. Every stub of this extension's own classes uses only allowed keys.
      //    Scoped to them on purpose: the component resets also reset the
      //    `background` shorthand, which a colour-key whitelist does not cover,
      //    and those belong to the core contract, not to an extension's sheet.
      for (const block of stubbed.values()) {
        const ownClass = classes.some((cls) =>
          block.selector.includes(`.${cls}`)
        )
        if (!ownClass) continue
        expect(
          [...block.declarations.keys()].filter(
            (property) => !ALLOWED_RESET.has(property)
          ),
          `stub for ${block.selector}`
        ).toEqual([])
      }

      // 2. Every base rule with literal theming has a stub covering exactly the
      //    allowed subset of what it declares.
      const offenders: string[] = []
      for (const block of own) {
        if (block.selector.startsWith(UNSTYLED)) continue
        // Only the allowed subset is stubbable; a literal on a property a stub
        // may not touch (`border-left: 4px solid #…`) is structural, and the
        // contract says nothing about it.
        const expected = [...block.declarations]
          .filter(([property, value]) => isLiteralTheming(property, value))
          .map(([property]) => property)
          .filter((property) => ALLOWED_RESET.has(property))
        const stub = stubbed.get(block.selector)
        if (expected.length === 0) {
          if (stub) offenders.push(`${block.selector}: stub without literals`)
          continue
        }
        if (!stub) {
          offenders.push(
            `${block.selector}: no stub for ${expected.join(', ')}`
          )
          continue
        }
        const actual = [...stub.declarations.keys()].sort()
        if (JSON.stringify(actual) !== JSON.stringify(expected.sort())) {
          offenders.push(
            `${block.selector}: stub keys ${actual.join(', ')} != ${expected.join(', ')}`
          )
        }
      }
      expect(offenders.slice(0, 12)).toEqual([])
    })
  }
})

/**
 * `.q-calendar-month__body` is ported verbatim from the library's stylesheet,
 * `overflow: hidden` included. That clipping is deliberate vertically, but it
 * also swallows the horizontal overflow on a narrow viewport, where a month
 * grid wider than its container becomes unreachable rather than scrollable.
 * `overflow-x: auto` is therefore a deliberate divergence from the ported
 * stylesheet: the vertical contract is kept, the horizontal one is repaired.
 */
describe('the calendar month body scrolls horizontally', () => {
  it('keeps the library vertical clip and makes x reachable', async () => {
    const body = blocksOf(await sheet(['q-calendar-month'], ['qcalendar'])).get(
      '.q-calendar-month__body'
    )
    expect(body?.declarations.get('overflow')).toBe('hidden')
    expect(body?.declarations.get('overflow-x')).toBe('auto')
  })
})
