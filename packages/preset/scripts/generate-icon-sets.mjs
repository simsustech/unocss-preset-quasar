#!/usr/bin/env node
/**
 * Capture every icon set Quasar ships into the preset.
 *
 *   node scripts/generate-icon-sets.mjs
 *
 * Reads `quasar/dist/icon-set/<library>.umd.prod.js` (the `quasar` devDep —
 * never `@quasar/extras`, which stays out of this package), lets each UMD
 * register itself on a scratch `window.Quasar.IconSet`, and emits
 * `src/icons/quasar-icon-sets.generated.ts`: the nested name → icon maps
 * Quasar's components read at runtime, keyed by library.
 *
 * The generator is the only writer of that file. Output is deterministic
 * (libraries and keys sorted at every level), so `test/icon-set-parity.test.ts`
 * can compare it against the installed quasar byte-for-byte.
 */
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const SUFFIX = '.umd.prod.js'
const OUT = join('src', 'icons', 'quasar-icon-sets.generated.ts')

const require = createRequire(import.meta.url)
const quasarDir = dirname(require.resolve('quasar/package.json'))
const quasarVersion = JSON.parse(
  readFileSync(join(quasarDir, 'package.json'), 'utf8')
).version
const iconSetDir = join(quasarDir, 'dist', 'icon-set')

// The UMD builds write to `window.Quasar.IconSet.*`; give them one to write to.
globalThis.window ??= { Quasar: { IconSet: {} } }
globalThis.window.Quasar ??= { IconSet: {} }
globalThis.window.Quasar.IconSet ??= {}

/** Recursively sort object keys so the emitted bytes never depend on source order. */
const sortDeep = (value) => {
  if (Array.isArray(value)) return value.map(sortDeep)
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, sortDeep(value[key])])
    )
  }
  return value
}

const iconSet = globalThis.window.Quasar.IconSet
const sets = {}

for (const file of readdirSync(iconSetDir).sort()) {
  if (!file.endsWith(SUFFIX)) continue
  const library = file.slice(0, -SUFFIX.length)
  const before = new Set(Object.keys(iconSet))
  await import(pathToFileURL(join(iconSetDir, file)).href)
  const added = Object.keys(iconSet).filter((key) => !before.has(key))
  if (added.length !== 1) {
    console.error(
      `[icon-sets] ${file} registered ${added.length} keys (${added.join(', ')}) — expected exactly 1`
    )
    process.exit(1)
  }
  sets[library] = iconSet[added[0]]
}

const header = `// AUTO-GENERATED from quasar ${quasarVersion} — do not edit.
//
// Every icon set in quasar/dist/icon-set, captured verbatim: the nested
// name → icon maps Quasar's components read at runtime. The generator is the
// only writer — regenerate with \`pnpm generate:icon-sets\`; and
// test/icon-set-parity.test.ts fails when this drifts from the installed quasar.
`

const source = `${header}
export type QuasarIconSetShape = string | { [key: string]: QuasarIconSetShape }

export const QUASAR_ICON_SETS: Record<string, QuasarIconSetShape> = ${JSON.stringify(sortDeep(sets), null, 2)}
`

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, source)
execFileSync('pnpm', ['exec', 'oxfmt', '--write', OUT], { stdio: 'ignore' })
console.log(
  `[icon-sets] ${OUT}: ${Object.keys(sets).length} libraries from quasar ${quasarVersion}`
)
