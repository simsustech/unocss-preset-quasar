#!/usr/bin/env node
/**
 * Write `src/safelist.ts`: the classes that exist but nothing can extract.
 *
 * A class exists when Quasar's own source names it (`knownClasses`), when a page
 * actually carries it (the harness's class-coverage JSON), or when the reference
 * bundle styles it. Quasar never applies a name its source never mentions, so
 * `q-date__header-btn--happy` is not a class at all — it does not matter that one
 * of our rules is broad enough to emit CSS for it.
 *
 * The list keeps the classes those arbiters know about, plus Quasar's runtime
 * globals and utility families (`globalClasses`, `utilityClasses`, which Quasar
 * applies or markup writes with no signal a scan can use) and the preset's own
 * triggers (`q-body`). Everything else is dropped: names that accumulated here
 * without ever being classes.
 *
 * Deciding that is the whole rule, because of how UnoCSS emits: rules whose
 * declarations are identical are *merged* into one comma-separated selector
 * (`.cursor-pointer, .q-btn--actionable, .q-color-picker__palette-rows--editable
 * .q-color-picker__cube, …` all declare `cursor:pointer`, each from its own rule
 * in `src/`). Every class therefore needs its own candidate to get its own rule,
 * and a class whose candidate is missing reads as unstyled. That is why the DOM
 * coverage check is this file's verifier — and why comparing emitted selector
 * *lists* proves nothing: removing one member's candidacy merely shortens a merged
 * list while every other member keeps its body.
 *
 * So verify a change with both sides:
 *
 *   node scripts/parity-report.mjs
 *     no lost reference selectors (the gate's ratchet)
 *   cd ~/Projects/quasar-testing-harness && pnpm exec playwright test class-coverage
 *     every class a page carries still resolves to a rule
 *
 * Prerequisite: `knownClasses` has to be complete for the families it decides.
 * It is scraped from Quasar's source, and that scrape still misses classes inside
 * multi-token strings (`class: 'q-date__view q-date__months flex flex-center'`)
 * and Sass `@each` interpolations (`.q-gutter-#{$name}`). Until those are
 * resolved the script treats such names as "not a class" and drops entries the
 * harness reports as unstyled (`q-date__calendar`, `q-parallax__content`,
 * `q-stepper__content`).
 *
 * Input is whatever `src/safelist.ts` currently holds, so re-deriving the full
 * list means starting from the committed one:
 *
 *   git checkout HEAD -- packages/preset/src/safelist.ts
 *   pnpm build && node scripts/compose-safelist.mjs --dom <coverage.json>
 *
 * Usage: node scripts/compose-safelist.mjs --dom <coverage.json> [--check] [--list-dropped]
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const presetDir = path.join(here, '..')
const OUT = path.join(presetDir, 'src', 'safelist.ts')
const argv = process.argv.slice(2)
const valueOf = (flag) => {
  const i = argv.indexOf(flag)
  return i === -1 ? null : argv[i + 1]
}

const domPath = valueOf('--dom')
if (domPath === null) {
  console.error(
    'usage: node scripts/compose-safelist.mjs --dom <coverage.json>'
  )
  process.exit(1)
}

const { quasarSafelist } = await import(
  path.join(presetDir, 'dist', 'safelist.js')
)
const { knownClasses, globalClasses, utilityClasses } = await import(
  path.join(presetDir, 'dist', 'generated', 'quasar-classes.js')
)

/** Classes the preset keys its own base rules on; no consumer writes them. */
const PRESET_TRIGGERS = ['q-body']

// Two shapes are in circulation: the harness's per-style report (`{dom, unstyled}`,
// what `tests/class-coverage.spec.ts` writes to `test-results/`) and the recorded
// baseline (`{md3: {dom}, md2: {dom}}`). Reading the wrong one yields `undefined`,
// which does not throw — `new Set(undefined)` is empty — so the DOM evidence the
// derivation rests on disappears silently. Both are accepted; an empty set is not.
const domJson = JSON.parse(fs.readFileSync(domPath, 'utf8'))
const domOf = (json) =>
  Array.isArray(json.dom) ? json.dom : (json.md3 ?? json.md2)?.dom
const domList = domOf(domJson)
if (!Array.isArray(domList) || domList.length === 0) {
  console.error(
    `[compose] no DOM classes in ${domPath} — expected {dom} or {md3:{dom}}`
  )
  process.exit(1)
}

const referenced = new Set()
for (const rule of JSON.parse(
  fs.readFileSync(
    path.join(presetDir, 'test', 'fixtures', 'reference-selectors.json'),
    'utf8'
  )
).rules) {
  for (const match of rule.selector.matchAll(/\.(-?[a-zA-Z_][\w-]*)/g)) {
    referenced.add(match[1])
  }
}

/** A class Quasar can apply, whatever a scan can see. */
const real = new Set([
  ...knownClasses,
  ...globalClasses,
  ...utilityClasses,
  ...referenced,
  ...domList,
  ...PRESET_TRIGGERS
])

const keep = [
  ...new Set(quasarSafelist.filter((name) => real.has(name)))
].sort()
const dropped = [
  ...new Set(quasarSafelist.filter((name) => !real.has(name)))
].sort()

const header = `/**
 * Classes that exist but nothing can extract.
 *
 * UnoCSS extracts what markup writes, and the extractors in \`src/extractor.ts\`
 * cover what markup cannot express: one mention of \`<q-btn>\`, \`QBtn\` or
 * \`$q.dialog\` brings in a component's whole vocabulary, and a value that names a
 * class (\`icon="chevron-down"\`, \`transition-show="scale"\`) is turned into it.
 * \`globalClasses\` — Quasar's runtime-applied body and platform classes — is
 * spread in separately by \`src/index.ts\`.
 *
 * What remains is carried here: classes Quasar's own source names, classes a page
 * carries, and classes the reference bundle styles. \`scripts/compose-safelist.mjs\`
 * re-derives the list from those arbiters.
 */
export const quasarSafelist: string[] = [
`
const lines = []
let line = '  '
for (const name of keep) {
  const piece = `'${name}', `
  if (line.length + piece.length > 80) {
    lines.push(line.trimEnd())
    line = '  '
  }
  line += piece
}
if (line.trim() !== '') lines.push(line.trimEnd())
const sheet = `${header}/** ${keep.length} entries. */\n${lines.join('\n')}\n]\n`

if (argv.includes('--check')) {
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : ''
  if (current !== sheet) {
    console.error('[compose] src/safelist.ts is out of date')
    process.exit(1)
  }
  console.log('[compose] src/safelist.ts is up to date')
  process.exit(0)
}

fs.writeFileSync(OUT, sheet)
console.log(
  `[compose] ${quasarSafelist.length} entries -> ${keep.length} kept, ` +
    `${dropped.length} dropped as names no arbiter knows ` +
    `(${domList.length} DOM classes, ${knownClasses.length} in Quasar's source)`
)
console.log(
  '  verify: node scripts/parity-report.mjs, then the harness class-coverage spec'
)
if (argv.includes('--list-dropped')) console.log(dropped.join('\n'))
