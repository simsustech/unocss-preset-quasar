#!/usr/bin/env node
// Extract a normalised selector+declarations fixture from the reference bundle.
//
// Produces test/fixtures/reference-selectors.json:
//   { source, bundleHash, ruleCount, rules: [{ selector, media, declarations: [{property, value}] }] }
//
// "selector" is the normalised full selector. Comma-joined selector lists are
// split so each entry maps 1:1 to a block the preset must emit.
// "media" is the enclosing @media query text, or null.
// "declarations" is the list of {property, value} pairs in that block.
//
// Scope: only selectors containing a `.q-` component class are kept. The preset
// is responsible for component rules; wind4 utilities (*, ::before, .bg-*,
// @keyframes, @font-face, etc.) are out of scope and excluded so the parity
// test is not permanently red on rules the preset never emits.
//
// Usage:
//   node scripts/extract-reference-fixture.mjs            # reads /tmp/ref.css if present, else fetches
//   node scripts/extract-reference-fixture.mjs ./ref.css   # read a local file
//
// Idempotent: re-running on the same bundle byte-for-byte produces a byte-
// identical file (no timestamp in the output). Verified by the parity test.

import { readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(
  __dirname,
  '..',
  'test',
  'fixtures',
  'reference-selectors.json'
)

// Strip CSS comments to spaces (CSS has no nested comments).
function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, ' ')
}

/**
 * Tokenise a CSS string into a tree of nodes. Each node is either
 *   { type: 'rule', selector, declarations, rules: [] } or
 *   { type: 'media', query, rules: [] }.
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
      const at = head.match(/^@(\w+)\s*(.*)$/)
      const container = { rules: [] }
      if (at) {
        container.type = 'media'
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

/** Flatten a parsed tree into rules with media context. */
function flatten(nodes, media) {
  const out = []
  for (const node of nodes) {
    if (node.type === 'media') {
      out.push(...flatten(node.rules, node.query))
    } else if (node.type === 'rule') {
      const sels = splitSelectors(node.selector)
      const decls = parseDeclarations(node.declarations || '')
      for (const sel of sels) {
        out.push({
          selector: normalizeSelector(sel),
          media,
          declarations: decls
        })
      }
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

// Keep only rules the preset is responsible for: dark-scoped component
// overrides and plugin component classes. Media-responsive layout rules
// (dialog/layout breakpoints) live outside the preset and are excluded so the
// parity test is not permanently red on rules the preset never emits.
const PLUGIN = /\b(q-notification|q-message|q-loading)\b/
function isFixtureRule(sel) {
  return (sel.includes('body--dark') || PLUGIN.test(sel)) && /\.q-/.test(sel)
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

async function main() {
  let css
  let source
  const arg = process.argv[2]
  if (arg) {
    css = readFileSync(arg, 'utf8')
    source = `file:${arg}`
  } else if (process.env.REF_CSS_FILE) {
    css = readFileSync(process.env.REF_CSS_FILE, 'utf8')
    source = `file:${process.env.REF_CSS_FILE}`
  } else {
    try {
      css = readFileSync('/tmp/ref.css', 'utf8')
      source = 'file:/tmp/ref.css'
    } catch {
      const url =
        process.env.REF_URL ||
        'https://simsustech.github.io/quasar-testing-harness/assets/vue-2d8243d3.css'
      source = `url:${url}`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`fetch ${url} -> ${res.status}`)
      css = await res.text()
    }
  }

  const bundleHash = createHash('sha256').update(css).digest('hex').slice(0, 16)
  const tree = parse(css)
  // Variables come from the raw flatten: the bundle defines `:root` twice (an
  // earlier preset build's preflight, then wind4's), and `dedupe` keeps only one
  // entry per selector, which would drop the whole second block.
  const flat = flatten(tree, null)
  const allRules = dedupe(flat)
  const rules = allRules.filter((r) => isFixtureRule(r.selector))

  const fixture = {
    source,
    bundleHash,
    ruleCount: rules.length,
    variables: collectVariables(flat),
    rules
  }
  writeFileSync(OUT, `${JSON.stringify(fixture, null, 2)}\n`)
  console.log(
    `wrote ${OUT}: ${rules.length} component rules (${allRules.length} total, bundle ${bundleHash})`
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
