import { beforeAll, describe, expect, it } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'
import * as generated from '../src/generated/quasar-classes.js'

/**
 * A selector the browser cannot parse does not merely fail to match: it
 * discards the whole rule it appears in. That is normally harmless — Quasar
 * ships `.q-field ::-ms-clear, .q-field ::-ms-reveal { display: none }` and
 * Chrome throws it away, which changes nothing because nothing else is in it.
 *
 * It stops being harmless under equal-declaration merging. Every rule whose
 * declarations are exactly `display: none` is folded into ONE rule with a
 * combined selector list, so a single unparseable selector takes every innocent
 * selector in that list with it. `::-ms-clear`/`::-ms-reveal` — invalid outside
 * IE/legacy Edge — did exactly that and killed 29 unrelated declarations,
 * including:
 *
 *   .q-tabs--not-scrollable .q-tabs__arrow      → chevron drawn over the first tab
 *   .q-drawer--mini .q-mini-drawer-hide         → mini and full drawer content
 *   .q-drawer--mobile  .q-mini-drawer-only        both rendered at once, so the
 *   .q-drawer--standard .q-mini-drawer-only       drawer showed two Home entries
 *   .hidden, .q-field__after:empty, the stepper and date rules, …
 *
 * The CSS text still looked correct, which is what made it hard to see: only the
 * browser's parsed rules revealed the loss. These tests read the emitted sheet
 * and assert the survivors are still there.
 */
const REJECTED = [
  /::(-ms-|shadow)/g,
  /:-ms-/g,
  /::v-(deep|global|slotted)/g,
  /\/deep\//g,
  />>>/g
]

/** Names of the merged `display: none` declarations that must stay effective. */
const CRITICAL_HIDES = [
  '.q-tabs--not-scrollable .q-tabs__arrow',
  '.q-tabs--scrollable.q-tabs__arrows--inside .q-tabs__arrow--faded',
  '.q-drawer--mini .q-mini-drawer-hide',
  '.q-drawer--mobile .q-mini-drawer-only',
  '.q-drawer--standard .q-mini-drawer-only',
  '.hidden',
  '.q-field__after:empty',
  '.q-field__append:empty'
]

/**
 * The rule hiding `selector` — but only if the browser would actually apply it.
 * A rule whose selector list contains even one rejected selector is discarded
 * whole, so the other selectors in it are dead even though the CSS text still
 * shows them. Modelling that here is what makes this test able to fail: text
 * alone cannot tell a live declaration from a collateral one.
 */
const hideRuleFor = (css: string, selector: string): string | undefined => {
  for (const rule of css.split('}')) {
    const open = rule.indexOf('{')
    if (open === -1) continue
    const selectorList = rule.slice(0, open)
    const entries = selectorList.split(',').map((entry) => entry.trim())
    if (!entries.includes(selector)) continue
    // One unparseable selector discards everything sharing the rule.
    if (
      entries.some((entry) => REJECTED.some((pattern) => entry.match(pattern)))
    ) {
      continue
    }
    const declarations = rule.slice(open + 1)
    if (/display:\s*none/.test(declarations)) return `${rule}}`
  }
  return undefined
}

/** Every class name the preset knows, so each rule can fire. */
const allClassNames = (): string[] => {
  const names: string[] = []
  const push = (value: unknown): void => {
    if (typeof value === 'string') names.push(value)
    else if (Array.isArray(value)) value.forEach(push)
    else if (value instanceof Map) value.forEach(push)
    else if (value && typeof value === 'object') {
      Object.values(value).forEach(push)
    }
  }
  push(generated)
  return [...new Set(names)]
}

describe('no selector the browser rejects reaches the sheet', () => {
  let css = ''

  beforeAll(async () => {
    const uno = await createGenerator({
      presets: [QuasarPreset({ styles: QuasarStyleEntries })]
    })
    css = (await uno.generate(allClassNames().join(' '))).css
  }, 120_000)

  it('emits no selector the target browsers cannot parse', () => {
    const hits = REJECTED.flatMap((pattern) => css.match(pattern) ?? [])
    expect([...new Set(hits)]).toEqual([])
  })

  it('keeps every merged display: none declaration in that rule alive', () => {
    const lost = CRITICAL_HIDES.filter(
      (selector) => hideRuleFor(css, selector) === undefined
    )
    expect(lost).toEqual([])
  })
})
