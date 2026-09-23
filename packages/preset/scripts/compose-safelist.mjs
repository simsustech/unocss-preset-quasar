#!/usr/bin/env node
/**
 * Write `src/safelist.ts`: the classes that exist, that nothing extracts.
 *
 * The test is the extractor. `src/extractor.ts` supplies two open-ended families
 * that a hand-written list cannot enumerate:
 *
 *   - a component's whole vocabulary, once the markup mentions the component
 *     (`<q-btn>`, `QBtn`), so `q-btn--flat`, `q-btn__icon` and the rest need no
 *     entry;
 *   - classes a value names: `icon="chevron-down"` -> `i-mdi-chevron-down`,
 *     `transition-show="scale"` -> `q-transition--scale-*`, which is why icon sets
 *     and transition names never appear here.
 *
 * What is left is carried in the file: classes Quasar applies at runtime with no
 * signal in the consuming source (`q-body--force-scrollbar-x`), classes the
 * preset keys its own base rules on (`q-body`), and the components an app drives
 * through a plugin API (`$q.dialog()`, `$q.notify()`) — a plugin call writes no
 * tag for the component extractor to key on.
 *
 * An entry is also dropped when no arbiter knows it. A class exists when Quasar's
 * own source names it (`knownClasses`), a page carries it (the harness's
 * class-coverage JSON), or the reference bundle styles it; Quasar never applies a
 * name its source never mentions, so `q-date__header-btn--happy` is not a class,
 * whatever our rules emit for it.
 *
 * A third drop: a BEM member (`__element`/`--modifier`) that no rule matcher can
 * fire on is inert as a lone candidate. Each component's rule matches only its
 * base and yields the members inside, so the member's styling flows from the base
 * whenever the component is used — carrying the member in the safelist supplies a
 * candidate nothing consumes.
 *
 * Deciding that is enough because of how UnoCSS emits: rules whose declarations
 * are identical are *merged* into one comma-separated selector (`.cursor-pointer,
 * .q-btn--actionable, …` all declare `cursor:pointer`, each from its own rule in
 * `src/`). Every class needs its own candidate to get its own rule, and a class
 * whose candidate is missing reads as unstyled — so the harness's DOM coverage is
 * a sound verifier, while comparing emitted selector *lists* proves nothing:
 * dropping one member's candidacy shortens a merged list and leaves the other
 * members' bodies intact.
 *
 * Verify with both sides:
 *
 *   node scripts/parity-report.mjs
 *     no lost reference selectors (the gate's ratchet)
 *   cd ~/Projects/quasar-testing-harness && pnpm exec playwright test class-coverage
 *     every class a page carries still resolves to a rule
 *
 * Prerequisite: `knownClasses` must be complete for the families it decides. It is
 * scraped from Quasar's source, and that scrape still misses classes inside
 * multi-token strings (`class: 'q-date__view q-date__months flex flex-center'`) and
 * Sass `@each` interpolations (`.q-gutter-#{$name}`), so it reads those as "not a
 * class" and drops entries the harness then reports as unstyled
 * (`q-date__calendar`, `q-parallax__content`, `q-stepper__content`).
 *
 * Input is whatever `src/safelist.ts` currently holds, so re-deriving the full list
 * starts from the committed one:
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

// The input is the *whole* current safelist: the base and the plugin map. Reading
// only one export makes re-derivation non-idempotent — after the first split, the
// plugin classes live only in the map, so a base-only read would drop them.
const { quasarSafelist: baseList, pluginSafelistMap: pluginMap } = await import(
  path.join(presetDir, 'dist', 'safelist.js')
)
const quasarSafelist = [
  ...baseList,
  ...Object.values(pluginMap ?? {})
    .flat()
    .filter((name) => typeof name === 'string')
]
const { componentClasses, knownClasses, globalClasses } = await import(
  path.join(presetDir, 'dist', 'generated', 'quasar-classes.js')
)

// After the one-rule-per-base rewrite, a component's rules match only its base
// (`/^q-carousel$/`) and yield every `__element`/`--modifier` inside. So a BEM
// member (`rootOf(name) !== name`) that no rule matcher can fire on is inert as a
// lone candidate: it emits nothing by itself, and its styling flows from the base
// whenever the component is used. Such entries are dropped below — they are
// candidates nothing can consume, e.g. `q-carousel__navigation--top` and the
// unstyled-but-real `q-breadcrumbs--last`.
const { QuasarPreset, QuasarStyleEntries } = await import(
  path.join(presetDir, 'dist', 'index.js')
)
const matchers = QuasarPreset({ styles: QuasarStyleEntries })
  .rules.filter((r) => Array.isArray(r) && r[0] instanceof RegExp)
  .map((r) => r[0])
const rootOf = (name) => {
  const i = name.search(/__|--/)
  return i === -1 ? name : name.slice(0, i)
}
const firesRule = (name) =>
  matchers.some((re) => {
    re.lastIndex = 0
    return re.test(name)
  })
/** A BEM member no rule can fire on: inert as a candidate, carried by its base. */
const inertMember = (name) => rootOf(name) !== name && !firesRule(name)

/** Classes the preset keys its own base rules on; no consumer writes them. */
const PRESET_TRIGGERS = ['q-body']

/**
 * Components an app drives through a plugin API rather than a tag, so the
 * component extractor's mention test cannot fire for them.
 */
const PLUGIN_DRIVEN = new Set([
  'q-dialog',
  'q-loading',
  'q-loading-bar',
  'q-notification'
])

/** Read JSON with the file named: a missing or malformed file is the usual fault. */
const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch (error) {
    throw new Error(`[compose] cannot read ${file}: ${error.message}`)
  }
}

// Two coverage shapes are in circulation: the harness's per-style report
// (`{dom, unstyled}`, written to `test-results/`) and the recorded baseline
// (`{md3: {dom}, md2: {dom}}`). Reading the wrong one yields `undefined`, which
// does not throw — `new Set(undefined)` is empty — so the DOM evidence the
// derivation rests on disappears silently. Both are accepted; an empty set is not.
const domJson = readJson(domPath)
const domOf = (json) =>
  Array.isArray(json.dom) ? json.dom : (json.md3 ?? json.md2)?.dom
const domList = domOf(domJson)
if (!Array.isArray(domList) || domList.length === 0) {
  console.error(
    `[compose] no DOM classes in ${domPath} — expected {dom} or {md3:{dom}}`
  )
  process.exit(1)
}

/** Every class the reference bundle's selectors name. */
const referenced = new Set()
const fixture = readJson(
  path.join(presetDir, 'test', 'fixtures', 'reference-selectors.json')
)
for (const rule of fixture.rules) {
  for (const match of rule.selector.matchAll(/\.(-?[a-zA-Z_][\w-]*)/g)) {
    referenced.add(match[1])
  }
}

/** A class Quasar can apply, whatever a scan can see. */
const real = new Set([
  ...knownClasses,
  ...globalClasses,
  ...referenced,
  ...domList,
  ...PRESET_TRIGGERS
])

/** What the extractors supply, so the safelist does not have to. */
const extractable = new Set()
for (const [root, vocabulary] of Object.entries(componentClasses)) {
  if (PLUGIN_DRIVEN.has(root)) continue
  for (const name of vocabulary) extractable.add(name)
}
for (const name of quasarSafelist) {
  if (/^i-[a-z0-9]+-/.test(name) || /^q-transition--/.test(name)) {
    extractable.add(name)
  }
}

const keep = [
  ...new Set(
    quasarSafelist.filter(
      (name) => real.has(name) && !extractable.has(name) && !inertMember(name)
    )
  )
].sort()
const dropped = [
  ...new Set(
    quasarSafelist.filter(
      (name) => !real.has(name) || extractable.has(name) || inertMember(name)
    )
  )
].sort()
const droppedExtractable = dropped.filter((name) =>
  extractable.has(name)
).length
const droppedInert = dropped.filter((name) => inertMember(name)).length

const header = `/**
 * Classes that exist and nothing extracts.
 *
 * The extractors in \`src/extractor.ts\` supply two open-ended families: a
 * component's whole vocabulary once the markup mentions the component
 * (\`<q-btn>\`, \`QBtn\`), and the classes a value names
 * (\`icon="chevron-down"\` -> \`i-mdi-chevron-down\`,
 * \`transition-show="scale"\` -> \`q-transition--scale-*\`). \`globalClasses\` \u2014
 * Quasar's runtime-applied body and platform classes \u2014 is spread in separately by
 * \`src/index.ts\`.
 *
 * What remains is below: classes Quasar applies with no signal in the consuming
 * source, classes the preset keys its own base rules on, and the components an app
 * drives through a plugin API, whose name never reaches the extractor. Entries are
 * removed only when no arbiter knows them \u2014 not Quasar's source, not a rendered
 * page, not the reference bundle. \`scripts/compose-safelist.mjs\` re-derives the
 * list, and the harness's \`tests/class-coverage.spec.ts\` is what verifies it.
 */
export const quasarSafelist: string[] = [
`
// The safelist splits by what asks for it: the base (always on) and the classes
// a Quasar plugin drives ($q.dialog(), $q.notify(), …), which join only when the
// app declares the plugin — the way `main` couples `pluginSafelistMap`.
const PLUGIN_BY_ROOT = {
  'q-dialog': 'Dialog',
  'q-notification': 'Notify',
  'q-notifications': 'Notify',
  'q-loading': 'Loading',
  'q-loading-bar': 'LoadingBar',
  'q-bottom-sheet': 'BottomSheet'
}
const pluginOf = (name) => PLUGIN_BY_ROOT[rootOf(name)]
const baseKeep = keep.filter((name) => !pluginOf(name))
const pluginGroups = new Map()
for (const name of keep) {
  const plugin = pluginOf(name)
  if (plugin === undefined) continue
  if (!pluginGroups.has(plugin)) pluginGroups.set(plugin, [])
  pluginGroups.get(plugin).push(name)
}

/** Pack names into 80-col `'name', ` lines. */
const pack = (names) => {
  const out = []
  let line = '  '
  for (const name of names) {
    const piece = `'${name}', `
    if (line.length + piece.length > 80) {
      out.push(line.trimEnd())
      line = '  '
    }
    line += piece
  }
  if (line.trim() !== '') out.push(line.trimEnd())
  return out
}

/** One plugin's list: inline when short, packed across lines when long. */
const renderPlugin = (plugin, names) => {
  if (names.length <= 4)
    return `  ${plugin}: [${names.map((n) => `'${n}'`).join(', ')}]`
  const rows = []
  let line = ''
  for (const n of names) {
    const piece = `'${n}', `
    if (line.length + piece.length > 74) {
      rows.push(line.trimEnd())
      line = ''
    }
    line += piece
  }
  if (line.trim() !== '') rows.push(line.trimEnd())
  // Each row already ends in a trailing comma, so join with a bare newline.
  const indented = rows.map((r) => `    ${r}`).join('\n')
  return `  ${plugin}: [\n${indented}\n  ]`
}

const baseLines = pack(baseKeep)
const pluginBlocks = [...pluginGroups.entries()].map(([p, n]) =>
  renderPlugin(p, n)
)
const baseArray = `${header}/** ${baseKeep.length} base entries. */\n${baseLines.join('\n')}\n]`
const pluginDoc = `/**
 * Classes a Quasar plugin drives, keyed by plugin. Only the plugins the app
 * declares join the safelist (QuasarPreset({ plugins })), matching how main
 * couples pluginSafelistMap — an app that never calls $q.notify() never carries
 * the notification classes.
 */`
const mapBlock = `export const pluginSafelistMap: Record<string, string[]> = {\n${pluginBlocks.join(',\n')}\n}`
const sheet = `${baseArray}\n\n${pluginDoc}\n${mapBlock}\n`
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
  `[compose] ${quasarSafelist.length} entries -> ${baseKeep.length} base + ` +
    `${keep.length - baseKeep.length} plugin-coupled across ${pluginGroups.size} plugins`
)
console.log(
  `  dropped ${droppedExtractable} the extractors supply, ` +
    `${droppedInert} inert (B)EM members no rule fires on, ` +
    `${dropped.length - droppedExtractable - droppedInert} that no arbiter knows ` +
    `(${domList.length} DOM classes, ${knownClasses.length} in Quasar's source)`
)
console.log(
  '  verify: node scripts/parity-report.mjs, then the harness class-coverage spec'
)
if (argv.includes('--list-dropped')) console.log(dropped.join('\n'))
