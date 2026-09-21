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
/**
 * Sass nesting: `.q-avatar { &__content { … } }` never spells out
 * `q-avatar__content`, so the literal-name scan misses it. The suffix and the
 * block's root are both in the file; the generated class is their concatenation.
 */
const NESTED_SUFFIX = /&(__|--)([\w-]+)/g
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

function classesIn(files) {
  const found = new Set()
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8')
    const isStyle = /\.(sass|scss|vue)$/.test(file)
    const patterns = isStyle
      ? [SELECTOR_CLASS, QUOTED_CLASS, QUOTED_QUASAR]
      : [QUOTED_CLASS, QUOTED_QUASAR]
    for (const pattern of patterns) {
      for (const match of text.matchAll(pattern)) found.add(match[1])
    }
    if (isStyle) {
      // Rebuild nested classes from the file's own roots.
      const roots = new Set(
        [...text.matchAll(/\.(q-[a-z0-9-]+)(?![-_])/g)].map((m) => m[1])
      )
      for (const match of text.matchAll(NESTED_SUFFIX)) {
        for (const root of roots) found.add(`${root}${match[1]}${match[2]}`)
      }
    }
  }
  return [...found].sort()
}

const components = {}
const componentsDir = path.join(quasarRoot, 'src', 'components')
for (const entry of fs.readdirSync(componentsDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue
  const root = `q-${entry.name}`
  const classes = classesIn(walk(path.join(componentsDir, entry.name))).filter(
    (c) => c === root || c.startsWith(`${root}--`) || c.startsWith(`${root}__`)
  )
  if (classes.length > 0) components[root] = classes
}

/**
 * The classes Quasar applies without a component being named: its stylesheets,
 * plugins (Notify, Loading, LoadingBar) and directives.
 */
const globalDirs = ['css', 'directives', 'plugins', 'composables', 'utils']
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
const knownClasses = classesIn(walk(path.join(quasarRoot, 'src')))

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

export const componentClasses: Record<string, string[]> = ${JSON.stringify(components, null, 2)}

export const globalClasses: string[] = ${JSON.stringify(globalClasses, null, 2)}

export const knownClasses: string[] = ${JSON.stringify(knownClasses, null, 2)}
`

if (check) {
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : ''
  if (current !== file) {
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
