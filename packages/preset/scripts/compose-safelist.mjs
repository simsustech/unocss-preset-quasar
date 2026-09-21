#!/usr/bin/env node
/** Compose `src/safelist.ts`: the generated globals plus the entries nothing else supplies. */
import fs from 'node:fs'
import {
  componentClasses,
  globalClasses
} from '../dist/generated/quasar-classes.js'
import { readFileSync } from 'node:fs'

const auditPath = process.argv.includes('--audit')
  ? process.argv[process.argv.indexOf('--audit') + 1]
  : '/tmp/safelist-audit.json'
const audit = JSON.parse(readFileSync(auditPath, 'utf8'))
console.log(
  `[compose] reading ${auditPath} (from: node scripts/audit-safelist.mjs --json <path>)`
)
const componentSupplied = new Set(Object.values(componentClasses).flat())
// `globalClasses` is spread into the export separately — including it here would
// list every global twice (it did).
const hand = [...new Set([...audit.needed, ...audit.ours])]
  .filter((name) => !componentSupplied.has(name))
  .filter((name) => !globalClasses.includes(name))
  .sort()

const blocks = hand.map((name) => `  '${name}',`).join('\n')
const file = `/**
 * The safelist: classes that no build can extract, and nothing else.
 *
 * Everything else reaches the sheet from source UnoCSS scans — a class the
 * markup writes, an icon or transition named by a *value*
 * (\`quasarValueExtractor\`), or the vocabulary of a component the markup
 * mentions, scraped from Quasar's own source (\`quasarComponentExtractor\`).
 *
 * What is left is what none of that supplies:
 *
 *   - Quasar's own classes, applied whatever the source says: the platform and
 *     responsive visibility families, \`body--dark\`, the plugin classes. Those
 *     come from \`generated/quasar-classes.ts\`, scraped from Quasar rather than
 *     hand-written.
 *   - ${new Set(audit.needed).size} shared classes Quasar's source names but assigns to no single component
 *     (\`q-btn-item\`, \`q-focus-helper\`).
 *   - ${new Set(audit.ours).size} classes this preset defines that Quasar applies at runtime without
 *     naming them anywhere scannable (\`row\`, \`flex\`, \`col-6\`, \`q-page\`).
 *
 * This file states ${hand.length} entries plus the generated globals, where the hand-written list
 * held 2,381: ${new Set(audit.derivable).size} of those the extractors now supply, ${new Set(audit.dead).size} selected no
 * rule at all (they emitted nothing, so removing them changed nothing), and the
 * rest were duplicates.
 *
 * \`scripts/audit-safelist.mjs\` re-derives the classification;
 * \`scripts/generate-quasar-classes.mjs\` regenerates the globals;
 * \`test/extractors-live.test.ts\` proves the extractor path actually fires.
 */

import { globalClasses } from './generated/quasar-classes.js'

/** Classes only this preset and Quasar can supply: see the note above. */
const impliedByQuasar: string[] = [
${blocks}
]

export const quasarSafelist: string[] = [
  ...globalClasses,
  ...impliedByQuasar
]
`
fs.writeFileSync('src/safelist.ts', file)
console.log(
  `safelist: ${new Set(globalClasses).size} generated globals + ${hand.length} entries (${new Set(quasarSafelistOf(hand, globalClasses)).size} total)`
)
function quasarSafelistOf(hand, globalClasses) {
  return [...globalClasses, ...hand]
}
