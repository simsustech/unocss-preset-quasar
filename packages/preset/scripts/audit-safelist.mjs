#!/usr/bin/env node
/**
 * Audit the hand-written safelist, with two independent arbiters per entry.
 *
 *   1. Quasar's own source — can Quasar emit this class at all?
 *   2. The sheet our own rules produce — does the preset style it?
 *
 * Crossing them says what to do with each entry:
 *
 *   derivable    Quasar's source has it *and* the generated vocabulary has it, so
 *                `quasarComponentExtractor` produces it from markup: redundant.
 *   needed       Quasar's source has it, but not as a component's own BEM
 *                vocabulary — shared classes like `q-btn-item`, `q-focus-helper`.
 *   ours         Our rules style it and Quasar's source never mentions it: the
 *                preset's own classes (`flex`, `col-6`, `q-page`), which is what
 *                the safelist is for.
 *   scraper gap  Quasar-shaped but absent from the scrape — either my extraction
 *                missed it or nobody can emit it.
 *   dead         Neither: it selects no rule and names no real class, so it emits
 *                nothing at all. Safe to delete.
 *
 *   node scripts/audit-safelist.mjs [--json <path>] [--sample <n>]
 *
 * Run `pnpm build` first (the script reads the built package), and regenerate
 * the data with `node scripts/generate-quasar-classes.mjs` when Quasar moves.
 */
import fs from 'node:fs'
// The built package, not `src`: our imports use `.js` specifiers that map to
// `.ts` in the bundler, which plain Node does not resolve. Run `pnpm build`
// first.
import {
  componentClasses,
  globalClasses,
  knownClasses
} from '../dist/generated/quasar-classes.js'
import { QuasarPreset } from '../dist/index.js'
import { quasarSafelist } from '../dist/safelist.js'

const argv = process.argv.slice(2)
const flag = (name, fallback) => {
  const i = argv.indexOf(`--${name}`)
  return i >= 0 ? argv[i + 1] : fallback
}
const sampleSize = Number(flag('sample', 14))

const { createGenerator } = await import('unocss')
const generator = await createGenerator({ presets: [QuasarPreset({})] })
// Preflights included: some of the classes in question (the platform and
// responsive visibility ones, `body--dark`) come from our preflights rather than
// from a rule, and with `preflights: false` they looked like dead entries.
const { css: sheet } = await generator.generate(quasarSafelist.join(' '), {
  preflights: true
})
/** The classes our own rules emit. */
const styled = new Set(
  [...sheet.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map((match) => match[1])
)

const known = new Set(knownClasses)
const derived = new Set([
  ...globalClasses,
  ...Object.values(componentClasses).flat()
])

const derivable = quasarSafelist.filter((c) => known.has(c) && derived.has(c))
const needed = quasarSafelist.filter((c) => known.has(c) && !derived.has(c))
const ours = quasarSafelist.filter((c) => !known.has(c) && styled.has(c))
const dead = quasarSafelist.filter((c) => !known.has(c) && !styled.has(c))

const quasarShaped = (list) =>
  list.filter((c) => /^(q-[a-z]|body--|q__)/.test(c))
const shapedDead = quasarShaped(dead)
const plainDead = dead.filter((c) => !shapedDead.includes(c))

const rows = [
  ['safelist entries', quasarSafelist.length],
  ['  derivable (drop — the extractor covers them)', derivable.length],
  ['  needed (shared Quasar classes)', needed.length],
  ['  ours (the preset styles them)', ours.length],
  ['  DEAD (select no rule, name no Quasar class)', dead.length],
  ['    of the dead, Quasar-shaped (scraper gap?)', shapedDead.length],
  ['    of the dead, plain', plainDead.length]
]
for (const [label, value] of rows) {
  console.log(String(value).padStart(6) + '  ' + label)
}

console.log(
  `\nQuasar-shaped dead (first ${sampleSize}):\n  ` +
    (shapedDead.slice(0, sampleSize).join(' ') || '(none)')
)
console.log(
  `\nplain dead (first ${sampleSize}):\n  ` +
    (plainDead.slice(0, sampleSize).join(' ') || '(none)')
)

const json = flag('json')
if (json) {
  fs.writeFileSync(
    json,
    `${JSON.stringify(
      { derivable, needed, ours, dead, shapedDead, plainDead },
      null,
      2
    )}\n`
  )
  console.log(`\nwrote ${json}`)
}
