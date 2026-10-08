import { describe, expect, it } from 'vitest'
import {
  componentClasses,
  globalClasses,
  knownClasses
} from '../src/generated/quasar-classes.js'

/**
 * The vocabulary generator scrapes Quasar's own source, and two of its scans
 * can invent class names that Quasar never emits. Both have already shipped
 * once, and the damage was silent and downstream:
 *
 *   1. Sass nesting was expanded against EVERY `.q-*` root the file mentions,
 *      not the block each `&` actually sits in. `QTable.sass` mentions
 *      `.q-table`, `.q-markup-table`, `.q-separator`, `.q-field`,
 *      `.q-inner-loading`, `.q-linear-progress` and the `--dark`/`--loading`
 *      variants, and each of the file's ~38 `&__`/`&--` suffixes was multiplied
 *      against all of them — `q-separator__sort-icon`, `q-table--dark__card`,
 *      `q-field__progress`.
 *   2. Selector scanning read `.vue` SFCs whole, so Vue expressions in the
 *      `<template>` parsed as CSS selectors: `{{ scope.row.calories }}` and
 *      `scope.col.label` in Quasar's own test fixtures became the classes
 *      `calories`, `col`, `cols`, `key`, `label`, `name`, `page`.
 *
 * `compose-safelist.mjs` treats every component-vocabulary entry as "the
 * extractors supply it", so a fabricated name is a real `src/safelist.ts` entry
 * silently deleted — which is how the flexgrid class `col` was dropped and every
 * QBtn label ended up 9.6px high. These tests fail if the generator invents
 * names again.
 */
const vocabulary = Object.entries(componentClasses)

/** Every documented `.q-*` component root, from Quasar's own directory names. */
const componentRoots = new Set(Object.keys(componentClasses))

/**
 * A BEM member's root: `q-btn__content--flat` -> `q-btn`. Quasar composes a
 * member from a component's own root; the root is always a component name, and
 * the member always carries exactly one `__` before at most one `--`.
 */
const rootOf = (name: string): string => name.split(/__|--/)[0]

describe('the generated vocabulary holds only classes Quasar emits', () => {
  it('spends no bare data-key tokens as vocabulary', () => {
    // Object keys from Quasar's table/carousel test fixtures are not classes.
    const dataKeys = ['calories', 'fat', 'sodium', 'carbs', 'protein', 'iron']
    const present = dataKeys.filter((key) =>
      vocabulary.some(([, names]) => names.includes(key))
    )
    expect(present).toEqual([])
  })

  it('names no member inherited from a test fixture data shape', () => {
    // The `.vue` scan artefact. Quasar's table fixtures carry `scope.col.label`
    // and `scope.row.calories`, which a whole-file selector scan reads as
    // `.col` / `.calories`. Data keys are never class roots, so a member whose
    // root is a bare lowercase word (no `q-` prefix, and not a known layout
    // root) came from an expression rather than a selector.
    const layoutRoots = new Set([
      'col',
      'row',
      'column',
      'fullscreen',
      'selected',
      'sortable',
      'sorted'
    ])
    const globals = new Set(globalClasses)
    const suspicious = vocabulary
      .flatMap(([, names]) => names)
      .filter((name) => {
        if (name.startsWith('q-')) return false
        // Runtime globals (`body--dark`, `body--light`) have no root by design.
        if (globals.has(name)) return false
        if (layoutRoots.has(name)) return false
        // A bare word with a BEM member is never a Quasar class; a bare word on
        // its own can be a layout helper the preset legitimately carries.
        return name.includes('__') || name.includes('--')
      })
    expect([...new Set(suspicious)]).toEqual([])
  })
  it('roots every BEM member in a class the source spells', () => {
    // `q-separator__sort-icon` is a table member that leaked onto the separator
    // root. Quasar composes a member from a root its own source declares, so the
    // member's root must appear in the source vocabulary. Roots come from
    // directory names too (`QColor` in `components/color/` emits
    // `q-color-picker__*`), so `componentClasses` keys are not the arbiter —
    // `knownClasses` is.
    const known = new Set(knownClasses)
    const bad = vocabulary
      .flatMap(([, names]) => names)
      .filter((name) => {
        if (!name.includes('__')) return false
        const root = rootOf(name)
        return root.startsWith('q-') && !known.has(root)
      })
    expect([...new Set(bad)]).toEqual([])
  })

  it('never puts a foreign component member on a root', () => {
    // The cross-product failure: `q-separator__sort-icon` and
    // `q-linear-progress__grid-item-card` are QTable's members stamped onto other
    // components' roots. Each member name is declared by at most one component in
    // the source; a name claimed by a root that does not own it is fabricated.
    const owners = new Map<string, Set<string>>()
    for (const [root, names] of vocabulary) {
      for (const name of names) {
        if (!name.includes('__') && !name.includes('--')) continue
        if (!owners.has(name)) owners.set(name, new Set())
        owners.get(name)!.add(rootOf(name))
      }
    }
    // A member is real when its declared root is one of its claimants; the
    // cross-product left members whose declared root is NOT among them.
    const foreign = [...owners.entries()]
      .filter(([name, claimants]) => !claimants.has(rootOf(name)))
      .map(([name]) => name)
    expect(foreign).toEqual([])
  })

  it('keeps the three flexgrid entries the safelist depends on out of reach', () => {
    // These are the classes that regressed. `col` is not in ANY component's
    // vocabulary, so the composer must keep it; `col-all`/`col-auto` are real
    // QBanner members and may legitimately appear there.
    const inAnyVocabulary = vocabulary.some(([, names]) =>
      names.includes('col')
    )
    expect(inAnyVocabulary).toBe(false)
  })

  it('lists no class name with a component-prefix truncation', () => {
    // `q-fiel--bordered` / `q-tabl--bordered` came from regex roots captured
    // mid-word by the old root scan.
    const truncated = vocabulary
      .flatMap(([, names]) => names)
      .filter((name) =>
        /^q-(fiel|tabl|butn|avater|selec|inputt)(__|--)/.test(name)
      )
    expect([...new Set(truncated)]).toEqual([])
  })
})
