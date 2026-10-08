import { createGenerator } from 'unocss'
import { describe, expect, it } from 'vitest'
import {
  MaterialDesign3,
  QuasarPreset,
  QuasarStyleEntries
} from '../src/index.js'
import type { QuasarStyleEntry } from '../src/index.js'

/**
 * The core half of the `unstyled` contract.
 *
 * `app-extensions-unstyled.test.ts` proves the rule for the three app extensions
 * (qcalendar, qmarkdown, qmediaplayer). Its walk never covered the 85 CORE
 * component modules, and that is exactly where four leaks accumulated unseen:
 *
 *   BUG-067 `q-message`      - bubbles stayed fully painted
 *   BUG-073 `q-notification` - the toast kept a dark surface and its shadow
 *   BUG-075 `q-fab`          - the FAB list kept a rounded surface + shadow
 *   BUG-076 `q-loading`      - the overlay painted a dark rectangle
 *
 * Each of those was reported by a vision pass and fixed by hand, one at a time.
 * This test closes the family: it walks the emitted sheet and asserts the
 * contract directly for a representative spread of core components.
 *
 * The contract, restated:
 *   - a base rule that states a LITERAL theming value (a hex/rgb/hsl colour, a
 *     shadow) cannot be neutralised by the token diff, so it needs a
 *     `body.quasar-style-unstyled <same selector>` reset, and
 *   - a base rule whose theming values are all `var(--q-…)` needs NO reset,
 *     because the style's token block already flips them.
 *
 * The walk runs on the EMITTED SHEET, not the source: what ships is what matters.
 */

/**
 * Known-open gaps, each already filed as a harness bug. Recorded rather than
 * ignored: the guard fails if a NEW selector appears, so the family cannot grow
 * silently. Remove entries here as the corresponding bug is fixed — a shrinking
 * list is the point.
 *
 *   BUG-075 q-fab      - root paints a surface with no reset
 *   BUG-076 q-loading  - root paints background-color with no reset
 *
 * The rest were found by this walk and are NOT yet filed; several may be
 * intended (a dialog backdrop arguably should paint, and a disabled-state colour
 * may be structural rather than theming), which is why they are recorded here
 * for judgement rather than fixed unilaterally.
 */
const KNOWN_OPEN = new Set([
  '.q-loading',
  '.q-dialog__backdrop',
  '.q-uploader__overlay',
  '.q-stepper__header--border',
  '.q-stepper__tab--disabled .q-stepper__dot',
  '.q-stepper__tab--disabled .q-stepper__label',
  '.q-drawer--left.q-drawer--bordered',
  '.q-drawer--right.q-drawer--bordered',
  '.q-chip--clickable:focus-visible',
  // q-stepper draws its connector lines and dots as pseudo-elements on
  // --horizontal/--vertical variants; the family is listed by prefix below
  '.q-stepper__line',
  '.q-stepper__dot'
])

/** Variants that never render under `unstyled`: the style is light-only. */
const OUT_OF_SCOPE = /--dark/

const isKnown = (selector: string): boolean =>
  OUT_OF_SCOPE.test(selector) ||
  KNOWN_OPEN.has(selector) ||
  // Substring, not prefix: the gap may sit in a DESCENDANT selector
  // ('.q-stepper--horizontal .q-stepper__line:before'), where the known
  // fragment is not at position 0.
  [...KNOWN_OPEN].some((k) => selector.includes(k))

const THEMING_PROPERTIES = new Set([
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
])

const UNSTYLED = 'body.quasar-style-unstyled '

/** A literal colour or shadow — something no token can flip. */
const LITERAL_COLOUR = /#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i

const isLiteralTheming = (property: string, value: string): boolean =>
  THEMING_PROPERTIES.has(property) &&
  !value.includes('var(') &&
  LITERAL_COLOUR.test(value)

type Block = { selector: string; declarations: Map<string, string> }

/** `selector -> declarations`, comma groups split into members. */
const blocksOf = (css: string): Map<string, Block> => {
  const blocks = new Map<string, Block>()
  for (const match of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const declarations = new Map(
      match[2]
        .split(';')
        .map((d) => d.trim())
        .filter(Boolean)
        .map((d) => {
          const at = d.indexOf(':')
          return [d.slice(0, at).trim(), d.slice(at + 1).trim()] as [
            string,
            string
          ]
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
  styles: QuasarStyleEntry[] = QuasarStyleEntries
): Promise<string> => {
  const gen = await createGenerator({ presets: [QuasarPreset({ styles })] })
  return (await gen.generate(classes.join(' '), { preflights: false })).css
}

/**
 * Core components to walk. Namespaced (BEM) members are included where they are
 * painted independently of the root, because those are the ones a root-only
 * reset misses — the q-message bubbles were exactly that case.
 */
const CASES: { name: string; classes: string[] }[] = [
  { name: 'q-message', classes: ['q-message', 'q-message-text'] },
  {
    name: 'q-notification',
    classes: ['q-notification', 'q-notification__badge']
  },
  { name: 'q-fab', classes: ['q-fab', 'q-fab__actions'] },
  { name: 'q-loading', classes: ['q-loading'] },
  { name: 'q-card', classes: ['q-card'] },
  { name: 'q-badge', classes: ['q-badge'] },
  { name: 'q-menu', classes: ['q-menu'] },
  { name: 'q-tooltip', classes: ['q-tooltip'] },
  { name: 'q-chip', classes: ['q-chip'] },
  { name: 'q-banner', classes: ['q-banner'] },
  { name: 'q-dialog', classes: ['q-dialog'] },
  { name: 'q-drawer', classes: ['q-drawer'] },
  { name: 'q-uploader', classes: ['q-uploader', 'q-uploader__header'] },
  { name: 'q-stepper', classes: ['q-stepper'] },
  { name: 'q-timeline', classes: ['q-timeline'] }
]

describe('core components ship the two-layer unstyled story', () => {
  for (const { name, classes } of CASES) {
    it(`${name}: literal theming gets a reset`, async () => {
      const withStyles = blocksOf(await sheet(classes))
      // Isolate the resets: they are style-owned, so drop to a single style
      // (ADR 0006) and everything the full sheet has that this one does not is
      // a reset contributed by the styles we removed.
      const md3Only = blocksOf(await sheet(classes, [MaterialDesign3]))
      const resets = [...withStyles.values()].filter(
        (block) => !md3Only.has(block.selector)
      )
      const stubbed = new Map(
        resets
          .filter((b) => b.selector.startsWith(UNSTYLED))
          .map((b) => [b.selector.slice(UNSTYLED.length), b] as const)
      )

      const offenders: string[] = []
      for (const block of withStyles.values()) {
        if (block.selector.startsWith(UNSTYLED)) continue
        // Only the root and members of THIS component.
        const isOurs = classes.some((cls) => {
          const bare = cls.replace(/^q-/, '')
          return (
            block.selector === `.${cls}` ||
            block.selector.startsWith(`.${cls}`) ||
            block.selector.startsWith(`.q-${bare}`)
          )
        })
        if (!isOurs) continue

        const literals = [...block.declarations]
          .filter(([p, v]) => isLiteralTheming(p, v))
          .map(([p]) => p)
        if (literals.length === 0) continue

        const stub = stubbed.get(block.selector)
        if (!stub) {
          offenders.push(
            `${block.selector}: no unstyled reset for ${literals.join(', ')}`
          )
        }
      }

      const novel = offenders.filter((o) => {
        const sel = o.split(': no unstyled reset')[0].trim()
        return !isKnown(sel)
      })
      expect(
        novel.slice(0, 12),
        `${name}: NEW base rule with literal theming and no unstyled reset`
      ).toEqual([])
    })
  }
})

/**
 * The same contract, expressed as a single whole-sheet walk rather than per
 * component: every core component whose root paints a literal surface must have
 * a `body.quasar-style-unstyled` reset for that root. This is the assertion that
 * would have caught BUG-067/073/075/076 the day each was introduced.
 */
describe('every painted core root has an unstyled reset', () => {
  const ROOTS = [
    'q-badge',
    'q-banner',
    'q-bar',
    'q-card',
    'q-chip',
    'q-fab',
    'q-loading',
    'q-message',
    'q-notification',
    'q-skeleton',
    'q-slide-item',
    'q-tooltip'
  ]

  it('resets each root that paints a literal surface', async () => {
    const css = await sheet(ROOTS)
    const blocks = blocksOf(css)
    const offenders: string[] = []

    for (const root of ROOTS) {
      const bare = blocks.get(`.${root}`)
      if (!bare) continue
      const paints = [...bare.declarations].some(([p, v]) =>
        isLiteralTheming(p, v)
      )
      if (!paints) continue
      const hasReset = [...blocks.keys()].some(
        (k) => k === `${UNSTYLED}.${root}`
      )
      if (!hasReset && !isKnown(`.${root}`)) {
        offenders.push(
          `${root} paints a literal surface with no unstyled reset`
        )
      }
    }

    expect(offenders).toEqual([])
  })
})
