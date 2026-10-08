import { describe, expect, it } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'

/**
 * A `--square` carve-out must beat its component's base rule.
 *
 * Every square carve-out declares `border-radius: 0` (or the style's small
 * corner token), and every base declares a rounded token —
 * `.q-menu { border-radius: var(--q-corner-extra-small) }`. Both live in the
 * `quasar.components` layer, so at EQUAL specificity the winner is decided by
 * UnoCSS's intra-layer sort, not by the order the rules are written.
 *
 * That is not hypothetical: in the app build (`unocss-DPzoYWVI.css`) the square
 * carve-outs with identical declarations were MERGED into one early rule —
 *
 *   .q-btn-group--square,.q-field--square,.q-menu--square,…{border-radius:0}
 *
 * at offset 151011, while `.q-menu { … border-radius: var(--q-corner-extra-small) }`
 * sat at 243361. Seven of the eight carve-outs were emitted BEFORE their base
 * and were therefore dead: `square` rendered identical to `rounded`, which is
 * exactly what the q-menu vision sheet showed.
 *
 * The carve-outs now carry a doubled class (`.q-menu.q-menu--square`, 0-2-0) so
 * they win regardless of where the merge lands. This test asserts that
 * property directly: for each square carve-out, the winning border-radius for
 * that class must be the square value, not the base's round one.
 */
const SQUARE_CLASSES = [
  'q-menu',
  'q-field',
  'q-chip',
  'q-table',
  'q-time',
  'q-uploader',
  'q-skeleton',
  'q-btn-group'
] as const

/** Split the sheet into `selector -> declarations` for the selectors we want. */
const rulesFor = (css: string, className: string) => {
  const out: Array<{ selector: string; declarations: string }> = []
  for (const block of css.split('}')) {
    const open = block.indexOf('{')
    if (open === -1) continue
    const selector = block.slice(0, open)
    if (!selector.includes(`.${className}`)) continue
    out.push({ selector, declarations: block.slice(open + 1) })
  }
  return out
}

describe('a square carve-out beats its component base', () => {
  /**
   * The root-level carve-out for each component: the rule whose selector targets
   * the component root with `--square` and which is not a descendant rule.
   * `.q-chip--square .q-avatar` styles the avatar INSIDE a square chip and is a
   * different concern — it does not compete with `.q-chip`'s own radius.
   */
  const rootSquareBlocks = (css: string, name: string) =>
    rulesFor(css, name).filter((block) =>
      block.selector
        .split(',')
        .map((part) => part.trim())
        .some((part) =>
          // The class must be the last thing in the compound, so a following
          // descendant selector (` .q-avatar`) is a different rule.
          new RegExp(`\\.${name}(\\.${name})?--square$`).test(part)
        )
    )

  it('scopes every root carve-out with a doubled class', async () => {
    // Specificity, not emission order, is what makes the carve-out win.
    // `.q-menu--square` alone is (0,1,0) and ties `.q-menu`, so which one
    // wins is decided by UnoCSS's intra-layer sort — and in the app build the
    // merged square rule landed BEFORE the base, so the base's rounded token
    // won and `square` did nothing. `.q-menu.q-menu--square` is (0,2,0) and
    // wins wherever the merge lands.
    const uno = await createGenerator({
      presets: [QuasarPreset({ styles: QuasarStyleEntries })]
    })
    const candidates = SQUARE_CLASSES.flatMap((name) => [
      name,
      `${name}--square`
    ])
    const { css } = await uno.generate(candidates.join(' '))

    const unscoped: string[] = []
    for (const name of SQUARE_CLASSES) {
      for (const block of rootSquareBlocks(css, name)) {
        // UnoCSS may merge identical declarations into ONE rule whose selector
        // list spans several newline-separated entries. The entry that concerns
        // this component is `.<name>.<name>--square`; entries for OTHER
        // components in the same merged list are theirs, not this one's.
        const entries = block.selector
          .split(',')
          .map((part) => part.trim())
          .filter((part) => part.includes(`.${name}`))
        const safe = entries.every(
          (part) =>
            part === `.${name}.${name}--square` ||
            part.startsWith(`.${name}.${name}--square`) ||
            block.declarations.includes('!important')
        )
        if (!safe) unscoped.push(`${name} -> ${entries.join(' | ')}`)
      }
    }
    expect(unscoped).toEqual([])
  })

  it('gives each root carve-out a radius different from its base', async () => {
    // A carve-out that repeats the base's radius is dead code whatever its
    // specificity. `.q-chip--square` keeps a small corner by design (Quasar
    // squares the avatar, not the chip), but it must still DIFFER from the
    // bare `.q-chip` value or the state renders identically to defaults.
    const uno = await createGenerator({
      presets: [QuasarPreset({ styles: QuasarStyleEntries })]
    })
    const candidates = SQUARE_CLASSES.flatMap((name) => [
      name,
      `${name}--square`
    ])
    const { css } = await uno.generate(candidates.join(' '))

    const identical: string[] = []
    for (const name of SQUARE_CLASSES) {
      // Quasar's `.q-chip--square` keeps a small root radius on purpose and
      // squares the AVATAR instead (QChip.sass:79-82:
      // `&--square { border-radius: $generic-border-radius; .q-avatar {…} }`).
      // Repeating the base radius there is the reference behaviour, not a
      // dead carve-out, so it is exempt from the "must differ" rule — its
      // scoping is still covered by the test above.
      if (name === 'q-chip') continue
      const all = rulesFor(css, name)
      const rootBase = all
        .filter(
          (block) =>
            !block.selector.includes('--square') &&
            !block.selector.includes(' ')
        )
        .map((block) => block.declarations.match(/border-radius:([^;}]+)/))
        .find(Boolean)
      const rootSquare = rootSquareBlocks(css, name)
        .map((block) => block.declarations.match(/border-radius:([^;}]+)/))
        .find(Boolean)
      if (rootBase === undefined || rootSquare === undefined) continue
      if (rootBase[1].trim() === rootSquare[1].trim()) {
        identical.push(`${name}: both ${rootBase[1]}`)
      }
    }
    expect(identical).toEqual([])
  })
})
