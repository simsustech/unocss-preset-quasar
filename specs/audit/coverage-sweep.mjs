#!/usr/bin/env node
/**
 * dist-coverage sweep — the committed form of the audit's `/tmp/class-coverage2.mjs`.
 *
 * The question it answers: **which classes does Quasar's own shipped stylesheet
 * style that our emitted sheet never mentions?** (AUD-023.) Those are the
 * classes a Quasar consumer can use today that would render unstyled here.
 *
 * Method
 *   1. Take every class name out of `quasar/dist/quasar.css` (the arbiter).
 *   2. Feed *all* of them to this preset as candidates and generate the sheet.
 *      A class is only "coverable" if it is a candidate in the first place.
 *   3. Flag every dist class the sheet never emits.
 *   4. Classify each flag:
 *        - `wind4-covered`  — wind4 alone emits it, so the delegation rule
 *          applies and duplicating it here would be the defect.
 *        - `allowlisted`    — the vocabulary script carries it with a rationale
 *          (scraper vocabulary gaps, runtime-applied modifiers).
 *        - `static-channel` — emitted through the preflight CSS text rather than
 *          by a rule (the classes UnoCSS's token pipeline cannot route).
 *        - `equivalent`     — dist's selector form is covered by an equivalent
 *          selector this sheet emits (a modifier whose effect rides on its
 *          parent's selector is neither a gap nor a defect).
 *        - `deferred`       — known, recorded, deliberately not fixed here; the
 *          reason must be written in DISPOSITION.md.
 *        - `fix`            — dispositioned as a defect (the row must name the
 *          commit that fixed it; such a class must then no longer be flagged).
 *   5. Gate: every flag needs a row in `specs/audit/DISPOSITION.md`. A flag
 *      without one fails the run — "0 new flags" is not a completion criterion
 *      (it passes on pre-existing residue such as `float-left`).
 *
 * Usage
 *   node specs/audit/coverage-sweep.mjs --write   # regenerate flagged-classes.txt
 *   node specs/audit/coverage-sweep.mjs --check    # gate only (exit 1 on a gap)
 *
 * The preset must be built first (`pnpm --filter unocss-preset-quasar build`).
 */
import { createRequire } from 'node:module'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(HERE, '..', '..')
const PRESET_DIR = join(REPO, 'packages', 'preset')
const DIST_CSS = join(REPO, 'node_modules', '.pnpm')
const FLAGGED_FILE = join(HERE, 'flagged-classes.txt')
const DISPOSITION_FILE = join(HERE, 'DISPOSITION.md')

const write = process.argv.includes('--write')
const check = process.argv.includes('--check') || !write

/** Resolve dependencies from the preset package, where they are declared. */
const requireFromPreset = createRequire(join(PRESET_DIR, 'package.json'))
const load = async (specifier) =>
  import(requireFromPreset.resolve(specifier)).then((m) => m.default ?? m)

/** The installed Quasar stylesheet — the arbiter for "styled by Quasar". */
function quasarDistCss() {
  const direct = [
    join(PRESET_DIR, 'node_modules', 'quasar', 'dist', 'quasar.css'),
    join(REPO, 'node_modules', 'quasar', 'dist', 'quasar.css')
  ].find((path) => existsSync(path))
  if (direct) return readFileSync(direct, 'utf8')
  // pnpm layout: .pnpm/quasar@<version>/node_modules/quasar/dist/quasar.css
  if (existsSync(DIST_CSS)) {
    const pnpm = readdirSync(DIST_CSS).find((dir) => dir.startsWith('quasar@'))
    if (pnpm) {
      return readFileSync(
        join(DIST_CSS, pnpm, 'node_modules', 'quasar', 'dist', 'quasar.css'),
        'utf8'
      )
    }
  }
  throw new Error('quasar/dist/quasar.css not found — run pnpm install first')
}

/**
 * Every class name dist styles.
 *
 * Comments are stripped first: dist carries URLs and filenames in its banner
 * comments (`quasar.css`, `github.com`), and a naive `\.name` scan turns those
 * into "classes" — scanner false positives of exactly the kind the audit
 * recorded on the reference bundle.
 */
function distClasses(css) {
  const out = new Set()
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, ' ')
  for (const m of withoutComments.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) {
    out.add(m[1])
  }
  return out
}

/** Classes emitted by a generator for a candidate list. */
async function emit(generator, candidates) {
  return (await generator.generate([...candidates].join(' '))).css
}

const emittedFoo = (css) => (name) =>
  new RegExp(
    `\\.${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w-])`
  ).test(css)

/** Disposition rows read out of DISPOSITION.md: class -> disposition. */
function dispositions() {
  if (!existsSync(DISPOSITION_FILE)) return new Map()
  const rows = new Map()
  for (const line of readFileSync(DISPOSITION_FILE, 'utf8').split('\n')) {
    const m = line.match(
      /^\|\s*`([^`]+)`\s*\|\s*([a-z-]+)\s*\|\s*(.+?)\s*\|\s*$/
    )
    if (m) rows.set(m[1], { disposition: m[2], rationale: m[3] })
  }
  return rows
}

const VALID = new Set([
  'fix',
  'wind4-covered',
  'allowlisted',
  'static-channel',
  'equivalent',
  'deferred'
])

/** Entries from the vocabulary script's allowlist, matched structurally. */
async function allowlistMatchers() {
  const source = readFileSync(
    join(PRESET_DIR, 'scripts', 'audit-vocabulary.mjs'),
    'utf8'
  )
  const start = source.indexOf('const ALLOWLIST = [')
  const end = source.indexOf('\n]', start)
  if (start < 0 || end < 0) throw new Error('ALLOWLIST block not found')
  const block = source.slice(start, end)
  const patterns = []
  const entries = block.split(/\n  \{/).slice(1)
  for (const entry of entries) {
    const re = entry.match(/re:\s*(\/(?:[^/\\]|\\.)+\/[a-z]*)/)
    const why = entry.match(/why:\s*'([^']*)'/)
    if (!re) continue
    // eslint-disable-next-line no-eval -- the allowlist is this repo's own source
    patterns.push({ re: eval(re[1]), why: why ? why[1] : '' })
  }
  return patterns
}

async function main() {
  const { createGenerator } = await load('unocss')
  const presetWind4 = await load('@unocss/preset-wind4')
  const { QuasarPreset, QuasarStyleEntries } = await import(
    join(PRESET_DIR, 'dist', 'index.js')
  )

  const dist = distClasses(quasarDistCss())
  const ours = emittedFoo(
    await emit(
      await createGenerator({
        presets: [QuasarPreset({ styles: QuasarStyleEntries })]
      }),
      dist
    )
  )
  const wind = emittedFoo(
    await emit(await createGenerator({ presets: [presetWind4()] }), dist)
  )
  const allowlist = await allowlistMatchers()

  const flagged = [...dist].filter((c) => !ours(c)).sort()
  const rows = dispositions()

  const lines = [
    `dist classes: ${dist.size}; flagged (styled by Quasar, never emitted here): ${flagged.length}`,
    ''
  ]
  const seen = new Map()
  for (const cls of flagged) {
    const row = rows.get(cls)
    let disposition = row?.disposition
    let rationale = row?.rationale ?? ''
    if (!disposition) {
      const covered = wind(cls)
      const allowed = allowlist.find((entry) => entry.re.test(cls))
      if (covered) {
        disposition = 'wind4-covered'
        rationale = 'wind4 emits this class (delegation rule)'
      } else if (allowed) {
        disposition = 'allowlisted'
        rationale = allowed.why
      } else {
        disposition = 'UNDISPOSITIONED'
      }
    }
    seen.set(disposition, (seen.get(disposition) ?? 0) + 1)
    lines.push(
      `| \`${cls}\` | ${disposition} | ${rationale.replace(/\n/g, ' ')} |`
    )
  }

  lines.push('', 'summary by disposition:')
  for (const [k, v] of [...seen].sort()) lines.push(`  ${k.padEnd(20)} ${v}`)

  // A disposition of `fix` must have made the class stop being flagged.
  const stale = []
  for (const [cls, row] of rows) {
    if (row.disposition === 'fix' && !flagged.includes(cls)) stale.push(cls)
  }
  if (stale.length) {
    lines.push(
      '',
      `note: ${stale.length} row(s) claim \`fix\` for a class that is no longer flagged —`,
      'that is expected when the fix landed; keep the row as the record.'
    )
  }

  const undispositioned = [...seen.entries()].find(
    ([k]) => k === 'UNDISPOSITIONED'
  )
  const unknownDisposition = [...rows.entries()].filter(
    ([, row]) => !VALID.has(row.disposition)
  )

  console.log(lines.join('\n'))
  if (write) {
    writeFileSync(FLAGGED_FILE, flagged.map((c) => `${c}\n`).join(''))
    console.log(`\nwrote ${FLAGGED_FILE} (${flagged.length} classes)`)
  }
  if (check) {
    if (undispositioned) {
      console.error(
        `\nFAIL: ${undispositioned[1]} flagged class(es) have no disposition in specs/audit/DISPOSITION.md`
      )
      process.exitCode = 1
    }
    if (unknownDisposition.length) {
      console.error(
        `\nFAIL: unknown disposition(s): ${unknownDisposition
          .map(([cls, row]) => `${cls}=${row.disposition}`)
          .join(', ')}`
      )
      process.exitCode = 1
    }
    if (!process.exitCode)
      console.log('\nOK: every flagged class is dispositioned')
  }
}

await main()
