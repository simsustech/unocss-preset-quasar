#!/usr/bin/env node
/**
 * Derive Quasar's class vocabulary from its own source.
 *
 * The preset carries a safelist of classes "Quasar adds at runtime, so they
 * never appear in source that UnoCSS scans". That list is hand-maintained, and
 * it is why nothing verified the classes it missed — a page could render an
 * unstyled class while every check stayed green.
 *
 * Quasar's source knows the answer: every component's classes appear in its own
 * files (`QBtn.sass` declares `q-btn--flat`, `QBtn.js` adds it), and the global
 * ones (`body--dark`, `hide-scrollbar`, `no-touch`, `q-anchor--skip`) live in
 * `src/css/`. So this scrapes them, per component, and `quasarComponentExtractor`
 * then derives them from the markup: mention `<q-btn>` and its whole vocabulary
 * is generated.
 *
 *   node scripts/generate-quasar-classes.mjs [--quasar <path>] [--check]
 *
 * `--check` exits non-zero when the generated file is out of date, which is what
 * the test suite runs, so the data cannot silently drift from the source.
 *
 * Source: the Quasar UI checkout. Defaults to `$QUASAR_UI` or
 * `~/Projects/quasar/ui`.
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const argv = process.argv.slice(2)
const flag = (name, fallback = undefined) => {
  const i = argv.indexOf(`--${name}`)
  return i >= 0 ? argv[i + 1] : fallback
}
const quasarRoot = flag(
  'quasar',
  process.env.QUASAR_UI ?? path.join(os.homedir(), 'Projects', 'quasar', 'ui')
)
const check = argv.includes('--check')
const OUT = path.join('src', 'generated', 'quasar-classes.ts')

if (!fs.existsSync(quasarRoot)) {
  console.error(`[classes] no Quasar checkout at ${quasarRoot}`)
  process.exit(1)
}

/**
 * Class tokens, taken from the two places Quasar actually writes them: a
 * `.selector` in its stylesheets, and a quoted string in its JS (`'q-btn--flat'`).
 * Scanning for "words that look like classes" instead pulls in every CSS
 * property name, which is why this reads from selector/string context.
 */
const SELECTOR_CLASS = /\.(-?[a-zA-Z][\w-]*)/g
const QUOTED_CLASS = /['"`]([a-z][a-z0-9]*(?:__|--)[a-z0-9-]+)['"`]/g
const QUOTED_QUASAR = /['"`](q-[a-z0-9-]+)['"`]/g

/** Files worth reading; `.sass`/`.js`/`.vue` hold selectors and class strings. */
function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules') continue
      walk(full, acc)
    } else if (/\.(sass|scss|js|ts|vue)$/.test(entry.name)) {
      // Quasar's own tests are included on purpose: they assert the exact class
      // vocabulary (`expect(classes).toContain('q-btn--flat')`), and those
      // modifiers are otherwise composed from prop *values* at runtime — the one
      // place the source spells them out.
      acc.push(full)
    }
  }
  return acc
}

/**
 * Class names Quasar builds by interpolation, e.g.
 *
 *   `q-btn--${design.value}`                 // q-btn--flat, q-btn--outline, …
 *   'q-fab--label--' + props.labelPosition   // q-fab--label--external, …
 *
 * The literal fragment gives the root and separator; the values come from the
 * variable being interpolated, resolved in three steps that stay inside the
 * component's own directory:
 *
 *   fragment -> variable -> its assignment -> the option list it reads
 *
 * `design` is assigned `getBtnDesign(props, 'standard')`, and that function
 * returns from `btnDesignOptions = ['flat', 'outline', 'push', 'unelevated']`,
 * so `design` is those four plus the `'standard'` fallback.
 *
 * Pairing every fragment with every value in the file would be easier and
 * wrong: it produces `q-btn--round--dense`, which Quasar never emits.
 */
const INTERPOLATED = /(q-[a-z0-9-]+(?:__|--))\$\{\s*(?:props\.|this\.)?(\w+)/g
const CONCATENATED =
  /['"`](q-[a-z0-9-]+(?:__|--))['"`]\s*\+\s*(?:props\.|this\.)?(\w+)/g
const OPTION_LIST = /const\s+(\w+Options?)\s*=\s*\[([^\]]*)\]/g
const FUNCTION_BODY = /function\s+(\w+)\s*\([^)]*\)\s*\{([\s\S]*?)\n\}/g
const ASSIGNMENT = /const\s+(\w+)\s*=\s*([^\n]*)/g
const NAME = /\b(\w+Options?)\b/g
/** A candidate *value* (`flat`, `fab-mini`). Never a class: those carry `--`/`__`. */
const VALUE = /['"`]([a-z][a-z0-9-]*)['"`]/g
const isValue = (name) => !name.includes('--') && !name.includes('__')

function dynamicClasses(text) {
  /** `btnDesignOptions` -> its values. */
  const options = new Map()
  for (const match of text.matchAll(OPTION_LIST)) {
    options.set(
      match[1],
      [...match[2].matchAll(VALUE)].map((v) => v[1]).filter(isValue)
    )
  }
  /** The values a function body pulls in, one hop: `getBtnDesign` -> its list. */
  const fromFunction = new Map()
  for (const match of text.matchAll(FUNCTION_BODY)) {
    const values = new Set()
    for (const name of match[2].matchAll(NAME)) {
      for (const value of options.get(name[1]) ?? []) values.add(value)
    }
    if (values.size > 0) fromFunction.set(match[1], values)
  }
  /** `design` -> the values its assignment can produce. */
  const byVariable = new Map()
  for (const match of text.matchAll(ASSIGNMENT)) {
    const [, variable, expression] = match
    const values = new Set()
    for (const name of expression.matchAll(NAME)) {
      for (const value of options.get(name[1]) ?? []) values.add(value)
    }
    for (const call of expression.matchAll(/\b(\w+)\s*\(/g)) {
      for (const value of fromFunction.get(call[1]) ?? []) values.add(value)
    }
    for (const literal of expression.matchAll(VALUE)) {
      if (isValue(literal[1])) values.add(literal[1])
    }
    if (values.size > 0) byVariable.set(variable, values)
  }

  const generated = []
  for (const pattern of [INTERPOLATED, CONCATENATED]) {
    for (const match of text.matchAll(pattern)) {
      const [, fragment, variable] = match
      const values = byVariable.get(variable)
      if (values === undefined) continue
      for (const value of values) {
        const name = `${fragment}${value}`
        // BEM allows one element separator and one modifier: `q-fab__label--top`
        // is a class, `q-btn--round--dense` is not. Quasar's own tests enumerate
        // combinations (round + dense) that no rendering produces, so a second
        // `--` means the pairing came from a test matrix, not from the CSS.
        if ((name.match(/--/g) ?? []).length > 1) continue
        generated.push(name)
      }
    }
  }
  return generated
}

function classesIn(files) {
  const found = new Set()
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8')
    for (const name of dynamicClasses(text)) found.add(name)
    for (const name of quotedClasses(text)) found.add(name)
    const style = styleText(file, text)
    if (style === undefined) continue
    for (const match of style.matchAll(SELECTOR_CLASS)) found.add(match[1])
    for (const name of nestedClasses(style)) found.add(name)
  }
  return [...found].sort()
}

/**
 * The CSS a file actually contains, or `undefined` when it carries none.
 *
 * A `.sass`/`.scss` file is all style. A `.vue` SFC is not: only its `<style>`
 * block is CSS, and the `<template>`/`<script>` around it is Vue markup and
 * JavaScript. Scanning those as CSS is what put `col`, `calories`, `cols`,
 * `key`, `label`, `name`, `page` into `q-table`'s vocabulary — they are object
 * keys in the component's own test fixtures
 * (`{{ scope.row.calories }}`, `scope.col.label`), read as `.class` selectors by
 * `SELECTOR_CLASS`. Those fake names then made `compose-safelist.mjs` treat the
 * real `col` flexgrid class as extractor-supplied and drop it from
 * `src/safelist.ts`.
 */
function styleText(file, text) {
  if (/\.(sass|scss)$/.test(file)) return text
  if (!/\.vue$/.test(file)) return undefined
  const blocks = [...text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
  return blocks.length > 0
    ? blocks.map((match) => match[1]).join('\n')
    : undefined
}

/**
 * BEM classes in quoted strings: `'q-btn--flat'` and `'q-fab__label--top'`.
 * Scanning a Sass *selector* is not enough on its own — Quasar composes many
 * modifiers from prop values at runtime, and its own tests are the one place
 * that spells the result out (`expect(classes).toContain('q-btn--flat')`).
 */
function quotedClasses(text) {
  const found = new Set()
  for (const match of text.matchAll(QUOTED_CLASS)) found.add(match[1])
  for (const match of text.matchAll(QUOTED_QUASAR)) found.add(match[1])
  return found
}

/**
 * Classes a Sass file builds by nesting `&` inside a block.
 *
 *   .q-table
 *     &__card        ->  q-table__card
 *       &--dark      ->  q-table__card--dark
 *     .q-field       ->  (its own block; `&` there is q-field)
 *       &__control   ->  q-field__control
 *
 * The expansion target is the NEAREST ENCLOSING selector, tracked on a stack
 * keyed by indentation — not every `.q-*` the file mentions. Pairing a suffix
 * with every root in the file is what produced combinatorial garbage: in
 * `QTable.sass` the roots include `.q-table`, `.q-markup-table`, `.q-separator`,
 * `.q-field`, `.q-inner-loading`, `.q-linear-progress` and the `--dark`/`--loading`
 * variants, and each of the file's ~38 suffixes was multiplied against all of
 * them (`q-separator__sort-icon`, `q-table--dark__card`, `q-field__progress`).
 * Those fake names then read as "the extractors supply them" in
 * `compose-safelist.mjs`, which silently dropped the real `col`/`col-all`/
 * `col-auto` flexgrid entries from `src/safelist.ts`.
 *
 * Only the *tail* of the enclosing selector matters: `&` in Sass is the parent
 * selector, and for a class name the parent's compound resolves to its last
 * class token (`.a .b` -> `.b`, `&.fullscreen` -> the block root).
 */
function nestedClasses(text) {
  const found = new Set()
  /** Innermost-first stack of { indent, root, isMember }. */
  const stack = []
  for (const rawLine of text.split('\n')) {
    const line = rawLine.replace(/\/\/.*$/, '')
    if (line.trim() === '') continue
    const indent = line.match(/^\s*/)[0].length
    // A declaration line (`color: red`) never opens or continues a block.
    if (/^\s*[\w-]+\s*:/.test(line)) continue
    // Pop blocks this line has left (its indent no longer sits inside them).
    while (stack.length > 0 && indent <= stack[stack.length - 1].indent) {
      stack.pop()
    }
    const selector = line.trim()
    const suffixes = [...selector.matchAll(/&(__|--)([\w-]+)/g)]
    const parent = stack.length > 0 ? stack[stack.length - 1] : undefined

    if (suffixes.length > 0 && parent !== undefined) {
      for (const [, separator, suffix] of suffixes) {
        const name = `${parent.root}${separator}${suffix}`
        // Same BEM rule as the interpolated names: nesting a modifier inside a
        // modifier (`.q-btn--round { &--actionable }`) pairs a root with a
        // suffix that never combines. Literals are exempt — one Quasar wrote
        // down is evidence, whoever wrote it.
        if ((name.match(/--/g) ?? []).length > 1) continue
        found.add(name)
        // The block this line opens continues from the expanded name, so a
        // deeper `&--x` nests on the member (`&__sort-icon { &--left }`).
        stack.push({ indent, root: name, isMember: true })
      }
      continue
    }

    // A plain selector line. Only its last class token can be a `&` parent.
    const roots = [...selector.matchAll(/\.(-?[a-zA-Z_][\w-]*)/g)]
    const last = roots.length > 0 ? roots[roots.length - 1][1] : undefined
    if (last !== undefined) {
      stack.push({ indent, root: last, isMember: false })
    }
  }
  return found
}

const components = {}
const componentsDir = path.join(quasarRoot, 'src', 'components')
for (const entry of fs.readdirSync(componentsDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue
  const root = `q-${entry.name}`
  // Every class the component's own files mention, not only those that carry the
  // component's prefix: Quasar composes shared ones too (`q-btn-item`,
  // `q-focus-helper`, `q-anchor--skip`), and a file that names a class is
  // evidence the component applies it.
  const classes = classesIn(walk(path.join(componentsDir, entry.name)))
  if (classes.length > 0) components[root] = classes
}

/**
 * App-extension libraries: the third-party Quasar UI packages whose CSS this
 * preset ports. A root here is the tag a consumer writes in markup, and the
 * files are the ones that root's component composes, so mentioning `<q-markdown>`
 * generates the markdown vocabulary and `<q-calendar-month>` the month view's
 * (the shared `q-calendar*` classes come with it — the extractor matches a root
 * by prefix, exactly as `q-btn` catches `q-btn-group`).
 *
 * Both halves of a package carry classes: its SCSS declares them, its bundle
 * names the ones the component adds while rendering. The packages are installed
 * dependencies, not a checkout, so they are read from `node_modules` — and the
 * versions land in the generated header, which is what makes a dependency bump
 * fail `--check` until the vocabulary is regenerated.
 */
const EXTRA_SOURCES = [
  {
    package: '@quasar/quasar-ui-qcalendar',
    roots: {
      'q-calendar': [
        'src/QCalendar.scss',
        'src/css/q-calendar.scss',
        'src/css/calendar-transitions.scss',
        'dist/QCalendar.esm.js'
      ],
      'q-calendar-month': [
        'src/QCalendarMonth.scss',
        'src/css/calendar-month.scss',
        'src/css/calendar-month-mini.scss',
        'dist/QCalendarMonth.esm.js'
      ],
      'q-calendar-day': [
        'src/QCalendarDay.scss',
        'src/css/calendar-day.scss',
        'dist/QCalendarDay.esm.js'
      ],
      'q-calendar-agenda': [
        'src/QCalendarAgenda.scss',
        'src/css/calendar-agenda.scss',
        'dist/QCalendarAgenda.esm.js'
      ],
      'q-calendar-resource': [
        'src/QCalendarResource.scss',
        'src/css/calendar-resource.scss',
        'dist/QCalendarResource.esm.js'
      ],
      'q-calendar-scheduler': [
        'src/QCalendarScheduler.scss',
        'src/css/calendar-scheduler.scss',
        'dist/QCalendarScheduler.esm.js'
      ],
      'q-calendar-task': [
        'src/QCalendarTask.scss',
        'src/css/calendar-task.scss',
        'dist/QCalendarTask.esm.js'
      ]
    }
  },
  {
    package: '@quasar/quasar-ui-qmarkdown',
    roots: {
      'q-markdown': [
        'src/index.scss',
        'src/QMarkdown.scss',
        'src/components/QMarkdown.scss',
        'src/components/prism-theme.scss',
        'dist/index.esm.js'
      ]
    }
  },
  {
    package: '@quasar/quasar-ui-qmediaplayer',
    roots: {
      'q-media-player': [
        'src/index.scss',
        'src/QMediaPlayer.scss',
        'src/components/media-player.scss',
        'src/components/media-player-variables.scss',
        'dist/index.esm.js'
      ]
    }
  }
]

/** Versions, for the generated header — the thing that makes a bump visible. */
const extraVersions = []
const extraClasses = new Set()
for (const source of EXTRA_SOURCES) {
  const dir = path.join('node_modules', source.package)
  if (!fs.existsSync(dir)) {
    console.error(
      `[classes] app-extension package ${source.package} is not installed`
    )
    process.exit(1)
  }
  // pnpm links every package into its store; resolve so the reads see files.
  const root = fs.realpathSync(dir)
  let version = 'unknown'
  try {
    version = JSON.parse(
      fs.readFileSync(path.join(root, 'package.json'), 'utf8')
    ).version
  } catch (error) {
    console.error(`[classes] cannot read ${source.package}: ${error}`)
    process.exit(1)
  }
  extraVersions.push(`${source.package}@${version}`)
  for (const [name, files] of Object.entries(source.roots)) {
    const classes = classesIn(files.map((file) => path.join(root, file)))
    if (classes.length > 0) components[name] = classes
    for (const className of classes) extraClasses.add(className)
  }
}

/**
 * The classes Quasar applies without a component being named: its stylesheets,
 * plugins (Notify, Loading, LoadingBar) and directives.
 */
const globalDirs = [
  'css',
  'directives',
  'platform',
  'plugins',
  'composables',
  'utils'
]
  .map((dir) => path.join(quasarRoot, 'src', dir))
  .filter((dir) => fs.existsSync(dir))
const globalClasses = classesIn(globalDirs.flatMap((dir) => walk(dir))).filter(
  (c) => !/^q-[a-z]+(__|--)/.test(c)
)

/**
 * Every class Quasar's source mentions anywhere. This is the arbiter for
 * whether a hand-written safelist entry is real: a name that appears in none of
 * Quasar's files is not a class Quasar can ever emit.
 */
const knownClasses = [
  ...new Set([
    ...classesIn(walk(path.join(quasarRoot, 'src'))),
    ...extraClasses
  ])
].sort()

const componentCount = Object.keys(components).length
const classCount = Object.values(components).reduce((n, c) => n + c.length, 0)

const file = `// Generated by scripts/generate-quasar-classes.mjs — do not edit by hand.
//
// Quasar's class vocabulary, scraped from its own source: per component, the
// classes it composes at runtime (\`q-btn\` -> \`q-btn--flat\`, \`q-btn--round\`, …)
// and the global ones from \`src/css\`.
//
// \`quasarComponentExtractor\` uses this to derive the classes from markup that
// mentions a component, so the hand-maintained safelist no longer has to carry
// them — and, more importantly, so a class Quasar adds at runtime is generated
// where a human would not have remembered to list it.
//
// Source: ${path.relative(os.homedir(), quasarRoot)} (${componentCount} components, ${classCount} classes).
//
// App extensions: ${extraVersions.join(', ')}.
// A version bump there fails \`--check\` until this file is regenerated.

export const componentClasses: Record<string, string[]> = ${JSON.stringify(components, null, 2)}

export const globalClasses: string[] = ${JSON.stringify(globalClasses, null, 2)}

export const knownClasses: string[] = ${JSON.stringify(knownClasses, null, 2)}
`

if (check) {
  // The file is written through oxfmt (the last line of this script), so the raw
  // template is never byte-identical to it — quote style alone made this report
  // drift on a file it had just produced. Format a probe copy the same way the
  // real write does, then compare like with like.
  const probe = path.join(path.dirname(OUT), '.quasar-classes.check.ts')
  let normalised = ''
  try {
    fs.writeFileSync(probe, file)
    execFileSync('pnpm', ['exec', 'oxfmt', '--write', probe], {
      stdio: 'ignore'
    })
    normalised = fs.readFileSync(probe, 'utf8')
  } finally {
    fs.rmSync(probe, { force: true })
  }
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : ''
  if (current !== normalised) {
    console.error(
      `[classes] ${OUT} is out of date — run: node scripts/generate-quasar-classes.mjs`
    )
    process.exit(1)
  }
  console.log(`[classes] ${OUT} is up to date`)
  process.exit(0)
}

fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, file)
console.log(
  `[classes] ${OUT}: ${componentCount} components, ${classCount} classes, ` +
    `${globalClasses.length} global, ${knownClasses.length} known`
)
execFileSync('pnpm', ['exec', 'oxfmt', '--write', OUT], { stdio: 'ignore' })
