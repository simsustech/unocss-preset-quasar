#!/usr/bin/env node
/**
 * Audit the hand-written safelist against Quasar's own source.
 *
 * Answers three questions per entry:
 *
 *   known      — does Quasar's source mention it at all? If not, it is a name
 *                nobody can emit: a fabrication or a leftover.
 *   derived    — is it in the generated per-component or global vocabulary, i.e.
 *                can `quasarComponentExtractor` produce it from markup instead?
 *   needed     — neither: it is one of our own preset's classes that Quasar
 *                applies at runtime (`flex`, `col-6`, `q-page`), which the
 *                safelist exists for.
 *
 *   node scripts/audit-safelist.mjs [--json <path>] [--sample <n>]
 *
 * Regenerate the data first: node scripts/generate-quasar-classes.mjs
 */
import fs from 'node:fs'
import {
  componentClasses,
  globalClasses,
  knownClasses
} from '../src/generated/quasar-classes.ts'
import { quasarSafelist } from '../src/safelist.ts'

const argv = process.argv.slice(2)
const flag = (name, fallback) => {
  const i = argv.indexOf(`--${name}`)
  return i >= 0 ? argv[i + 1] : fallback
}
const sampleSize = Number(flag('sample', 20))

const known = new Set(knownClasses)
const derived = new Set([
  ...globalClasses,
  ...Object.values(componentClasses).flat()
])

const unknown = quasarSafelist.filter((c) => !known.has(c))
const derivable = quasarSafelist.filter((c) => known.has(c) && derived.has(c))
const needed = quasarSafelist.filter((c) => known.has(c) && !derived.has(c))

const suspicious = unknown.filter((c) => /^(q-|body--|q__)/.test(c)).sort()

console.log(`safelist entries            ${quasarSafelist.length}`)
console.log(
  `  known to Quasar's source  ${quasarSafelist.length - unknown.length}`
)
console.log(`  derivable (drop)          ${derivable.length}`)
console.log(`  needed (our own classes)  ${needed.length}`)
console.log(`  unknown (inspect)         ${unknown.length}`)
console.log(
  `  of which Quasar-shaped    ${suspicious.length}` +
    (suspicious.length ? ` — e.g. ${suspicious.slice(0, 3).join(' ')}` : '')
)
if (unknown.length) {
  console.log(`\nfirst ${sampleSize} of the unknown entries:`)
  console.log(unknown.slice(0, sampleSize).join(' '))
}
const json = flag('json')
if (json) {
  fs.writeFileSync(
    json,
    `${JSON.stringify({ derivable, needed, unknown }, null, 2)}\n`
  )
  console.log(`\nwrote ${json}`)
}
