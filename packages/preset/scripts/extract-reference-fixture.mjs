#!/usr/bin/env node
// Extract a normalised selector+declarations fixture from the reference bundle.
//
// Produces test/fixtures/reference-selectors.json:
//   {
//     source, bundleHash, sha256, byteSize, ruleCount,
//     variables: { --name: value },
//     keyframes: [{ name, steps: [{ selector, declarations }] }],
//     rules:     [{ selector, media, declarations: [{ property, value }] }]
//   }
//
// "selector" is the normalised full selector. Comma-joined selector lists are
// split so each entry maps 1:1 to a block the preset must emit.
// "media" is the enclosing at-rule text (nested containers joined with " && "),
// or null. `@layer` wrappers are kept here and normalised away by the report,
// which compares containers with `containerKey()`.
// "declarations" is the list of {property, value} pairs in that block.
//
// Scope: every rule block in the reference sheet that carries declarations, plus
// the component `@keyframes`. This used to be narrowed to dark-scoped rules and
// three plugin components (`isFixtureRule`), which let 1,141 base selectors go
// missing while the parity gate stayed green. The report buckets selectors into
// modules instead, and marks the ones the preset does not own as `reported`.
//
// Input: the vendored bundle, never the network — the deployed harness renames
// its assets, and a fixture that changes under the gate is not a gate:
//
//   node scripts/extract-reference-fixture.mjs                      # vendored bundle
//   node scripts/extract-reference-fixture.mjs --ref ./some/other.css
//   REF_CSS_FILE=./other.css node scripts/extract-reference-fixture.mjs
//
// Idempotent: re-running on the same bundle byte-for-byte produces a byte-
// identical file (no timestamp in the output). Verified by the parity test.

import { readFileSync, writeFileSync, statSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PKG = join(__dirname, '..')
const REPO = join(PKG, '..', '..')
const OUT = join(PKG, 'test', 'fixtures', 'reference-selectors.json')

// Vendored reference build (see specs/reference/README.md and MANIFEST.sha256).
// The `.txt` suffix follows the repo's convention for verbatim raw evidence: it
// keeps the formatter and lint hooks from rewriting bytes the manifest pins.
const VENDORED = join(
  REPO,
  'specs',
  'reference',
  'raw',
  'reference-bundle.css.txt'
)
const VENDORED_SOURCE = 'specs/reference/raw/reference-bundle.css.txt'

// Strip CSS comments to spaces (CSS has no nested comments).
function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, ' ')
}

/**
 * Tokenise a CSS string into a tree of nodes. Each node is either
 *   { type: 'rule', selector, declarations }        a style rule
 *   { type: 'at', at, params, rules, declarations } an at-rule container
 * Handles nested @media / @supports / @layer via an explicit container stack.
 */
function parse(input) {
  const css = stripComments(input)
  const root = []
  let current = { rules: root } // virtual root; its .rules is the top-level array
  const stack = []
  let buf = ''
  let i = 0
  const n = css.length

  const flush = () => {
    const t = buf.trim()
    buf = ''
    return t
  }

  while (i < n) {
    const c = css[i]
    if (c === '{') {
      const head = flush()
      const at = head.match(/^@([\w-]+)\s*(.*)$/)
      const container = { rules: [] }
      if (at) {
        container.type = 'at'
        container.at = at[1]
        container.params = at[2].trim()
        container.query = head.trim()
      } else {
        container.type = 'rule'
        container.selector = head.trim()
      }
      current.rules.push(container)
      stack.push(current)
      current = container
      i++
    } else if (c === '}') {
      current.declarations = flush()
      current = stack.pop()
      i++
    } else {
      buf += c
      i++
    }
  }
  return root
}

/** Split a comma selector-list into individual selectors (respecting :not(), attr[]). */
function splitSelectors(sel) {
  const out = []
  let depth = 0
  let cur = ''
  for (const ch of sel) {
    if (ch === '(' || ch === '[') depth++
    else if (ch === ')' || ch === ']') depth--
    if (ch === ',' && depth === 0) {
      out.push(cur.trim())
      cur = ''
      continue
    }
    cur += ch
  }
  const t = cur.trim()
  if (t) out.push(t)
  return out.filter(Boolean)
}

/** Parse "p:v; p2:v2" into [{property,value}] — tolerant of trailing semicolons. */
function parseDeclarations(block) {
  const out = []
  if (!block) return out
  for (const decl of block.split(';')) {
    const d = decl.trim()
    if (!d) continue
    const idx = d.indexOf(':')
    if (idx === -1) continue
    out.push({
      property: d.slice(0, idx).trim(),
      value: d.slice(idx + 1).trim()
    })
  }
  return out
}

/**
 * Flatten a parsed tree into rules with their enclosing at-rule context, and
 * collect `@keyframes` separately — their steps (`0%`, `100%`) are not
 * selectors and must never enter the rule list.
 */
function flatten(nodes, media, out) {
  for (const node of nodes) {
    if (node.type === 'at') {
      const frame = media ? `${media} && ${node.query}` : node.query
      if (node.at === 'keyframes' || node.at.endsWith('keyframes')) {
        out.keyframes.push({
          name: node.params,
          steps: (node.rules ?? []).map((step) => ({
            selector: step.selector,
            declarations: parseDeclarations(step.declarations || '')
          }))
        })
        continue
      }
      flatten(node.rules, frame, out)
      continue
    }
    if (node.type !== 'rule') continue
    const decls = parseDeclarations(node.declarations || '')
    // Native CSS nesting: wind4 emits `.q-gutter-y-lg{:where(&>…){…}}`, so the
    // outer rule carries no declarations of its own. Both sides are parsed the
    // same way — the nested child is not a selector the preset is compared on —
    // so a declaration-less rule has nothing to measure and is dropped.
    if (!decls.length) continue
    for (const sel of splitSelectors(node.selector)) {
      out.rules.push({
        selector: normalizeSelector(sel),
        media: media ?? null,
        declarations: decls
      })
    }
  }
  return out
}

/**
 * Normalise the two ways the reference bundle renders BEM `__` in a descendant
 * position. Both name elements real Quasar ships as `.q-field__inner`,
 * `.q-notification__badge--bottom-left`, etc:
 *
 *   `.q-field _inner`        `__inner` rendered as a descendant element selector
 *   `.q-layout\_\_shadow`    `__` CSS-escaped (equivalent escaping, not a class)
 *
 * Without this the fixture demands selectors no component should ever emit —
 * a bare `_inner` element selector — so the gate could never go green.
 */
function normalizeSelector(sel) {
  return (
    sel
      // `\_` is just an escaped underscore: same selector once unescaped.
      .replace(/\\_/g, '_')
      // Re-join a descendant `_part` onto the preceding class as BEM `__part`.
      .replace(/(\.[-\w]+) _(?=[-\w])/g, '$1__')
  )
}

function dedupe(rules) {
  const seen = new Set()
  const out = []
  for (const r of rules) {
    const key = `${r.media ?? ''}\u0000${r.selector}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push(r)
  }
  return out
}

/**
 * Custom properties the reference defines with a literal value, across all
 * scopes. The parity gate resolves `var(--x)` on both sides before comparing
 * values, because the reference is wind4-compiled and names its tokens
 * differently from the preset (`--shape-corner-extra-small` where the preset
 * emits `--q-corner-extra-small`, both `4px`).
 *
 * A property whose literal differs between scopes is dropped rather than guessed
 * at, since this flat map cannot model scope. `--un-*` internals are left out:
 * they belong to wind4's runtime, not to the component contract.
 */
function collectVariables(rules) {
  const values = new Map()
  const conflicting = new Set()
  for (const rule of rules) {
    for (const { property, value } of rule.declarations) {
      if (!property.startsWith('--')) continue
      if (property.startsWith('--un-')) continue
      if (value.includes('var(')) continue
      const seen = values.get(property)
      if (seen === undefined) values.set(property, value)
      else if (seen !== value) conflicting.add(property)
    }
  }
  for (const name of conflicting) values.delete(name)
  return Object.fromEntries([...values].sort(([a], [b]) => (a < b ? -1 : 1)))
}

function resolveInput() {
  const idx = process.argv.indexOf('--ref')
  const arg = idx === -1 ? undefined : process.argv[idx + 1]
  const path = arg ?? process.env.REF_CSS_FILE
  if (path) return { path, source: `file:${path}` }
  return { path: VENDORED, source: VENDORED_SOURCE }
}

function main() {
  const { path, source } = resolveInput()
  const css = readFileSync(path, 'utf8')
  const sha256 = createHash('sha256').update(css).digest('hex')
  const bundleHash = sha256.slice(0, 16)
  const tree = parse(css)
  // Variables come from the raw flatten: the bundle defines `:root` twice (an
  // earlier preset build's preflight, then wind4's), and `dedupe` keeps only one
  // entry per selector, which would drop the whole second block.
  const flat = flatten(tree, null, { rules: [], keyframes: [] })
  const allRules = dedupe(flat.rules)
  // Dedupe by name: `dedupe` keys on (media, selector), which every keyframe
  // block would share, so it would collapse the whole list into one entry.
  const seenKeyframes = new Set()
  const keyframes = flat.keyframes.filter((k) => {
    if (seenKeyframes.has(k.name)) return false
    seenKeyframes.add(k.name)
    return true
  })

  const fixture = {
    source,
    bundleHash,
    sha256,
    byteSize: statSync(path).size,
    ruleCount: allRules.length,
    variables: collectVariables(flat.rules),
    keyframes,
    rules: allRules
  }
  writeFileSync(OUT, `${JSON.stringify(fixture, null, 2)}\n`)
  console.log(
    `wrote ${OUT}: ${allRules.length} rules, ${keyframes.length} keyframes (${flat.rules.length} before dedupe, bundle ${bundleHash})`
  )
}

main()
