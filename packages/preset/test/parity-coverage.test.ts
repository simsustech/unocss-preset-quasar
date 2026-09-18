// Reference parity: the preset must emit a rule for every dark-scoped and
// plugin-component selector the reference build emits.
//
// This is the cumulative coverage gate. It is created RED at step 1 (the
// fixture contains selectors nothing in the preset emits yet) and un-skipped at
// step 11 once every dark/plugin rule has been ported. The plan frames step 1's
// real gate as the extraction-script byte-diff (its "non-testable part"); this
// test is the long-run regression guard so a silently-dropped rule is caught.
//
// Why selector-coverage, not value-exact: the reference CSS is wind4-compiled,
// so its component declarations reference `var(--dark-*)` (the reference's token
// indirection) and `var(--un-*)` (wind4 internals). Our preset emits `var(--q-*)`
// and literals. A naive value comparison would be permanently red on correctly-
// ported rules. So: selector presence is the hard gate; for declarations that
// are pure literals (no `var(--dark-*)`/`var(--un-*)`) we additionally assert the
// value matches (whitespace-insensitive). Value correctness for the token-using
// rules is enforced by the per-family tests in steps 2-9.

import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createGenerator } from 'unocss'
import { QuasarPreset } from '../src/index.js'
import { quasarSafelist } from '../src/safelist.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const FIXTURE = JSON.parse(
  readFileSync(join(__dirname, 'fixtures', 'reference-selectors.json'), 'utf8')
) as {
  source: string
  bundleHash: string
  ruleCount: number
  rules: {
    selector: string
    media: string | null
    declarations: { property: string; value: string }[]
  }[]
}

// Env-gated selectors the preset cannot emit — they require runtime platform
// detection (body.desktop/body.electron/body.platform-ios). Marked unverifiable
// in plan (e); excluded from this gate.
const ENV_GATED = /\bbody\.(desktop|electron|platform-ios|q-ios-padding)\b/

// Normalize a reference selector to the form the preset emits:
//   body.body--dark .q-x  ->  .body--dark .q-x      (drop body element qualifier)
//   .body--dark .q-x      ->  .body--dark .q-x      (unchanged)
// Collapses internal whitespace so minified output matches.
function normSel(sel: string): string {
  return sel
    .replace(/\bbody\.body--dark\b/g, '.body--dark')
    .replace(/\s+/g, ' ')
    .trim()
}

// Split a comma selector-list into individuals, respecting () and [] depth.
function splitSel(sel: string): string[] {
  const out: string[] = []
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

// Parse flat CSS into Map<normalizedSelector, Map<property, value>>.
// Comma-joined blocks are split so each selector is addressable.
function parseCss(css: string): Map<string, Map<string, string>> {
  const out = new Map<string, Map<string, string>>()
  const re = /([^{}]+)\{([^{}]*)\}/g
  let m: RegExpExecArray | null
  while ((m = re.exec(css))) {
    const body = m[2]
    const props = new Map<string, string>()
    for (const decl of body.split(';')) {
      const idx = decl.indexOf(':')
      if (idx === -1) continue
      props.set(decl.slice(0, idx).trim(), decl.slice(idx + 1).trim())
    }
    for (const sel of splitSel(m[1])) {
      out.set(normSel(sel), props)
    }
  }
  return out
}

const collapse = (s: string) => s.replace(/\s+/g, '')

// Skipped at step 1 (red, nothing ported yet) — un-skipped at step 11.
describe.skip('reference parity (dark + plugin coverage)', () => {
  it('emits every dark/plugin selector the reference build emits', async () => {
    const gen = await createGenerator({ presets: [QuasarPreset({})] })
    const { css } = await gen.generate(quasarSafelist.join(' '), {
      preflights: false
    })
    const have = parseCss(css)

    const missing: string[] = []
    const valueMismatch: string[] = []

    for (const rule of FIXTURE.rules) {
      if (ENV_GATED.test(rule.selector)) continue
      const sel = normSel(rule.selector)
      const ours = have.get(sel)
      if (!ours) {
        missing.push(sel)
        continue
      }
      for (const { property, value } of rule.declarations) {
        // Skip value check for wind4-compiled / token-indirected values; those
        // are verified by per-family tests, not this coverage gate.
        if (/var\(--(dark|un)-/.test(value)) continue
        const ourVal = ours.get(property)
        if (ourVal === undefined) {
          valueMismatch.push(`${sel}: missing ${property}`)
          continue
        }
        if (collapse(ourVal) !== collapse(value)) {
          valueMismatch.push(
            `${sel}: ${property}=${value} (ref) vs ${ourVal} (ours)`
          )
        }
      }
    }

    if (missing.length) console.log('MISSING SELECTORS:\n' + missing.join('\n'))
    if (valueMismatch.length)
      console.log('VALUE MISMATCHES:\n' + valueMismatch.join('\n'))

    expect(missing, `missing ${missing.length} selectors`).toEqual([])
    expect(
      valueMismatch,
      `value mismatches in ${valueMismatch.length} rules`
    ).toEqual([])
  })
})
