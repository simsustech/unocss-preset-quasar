// Reference parity: the preset must emit a rule for every dark-scoped and
// plugin-component selector the reference build emits, with matching values.
//
// Selector presence is the hard gate. Values are checked after resolving each
// side's own custom properties, because the reference is wind4-compiled:
//
//   - it names its tokens differently — `--shape-corner-extra-small` where the
//     preset emits `--q-corner-extra-small`, both `4px`
//   - it compiles utilities into literals — `calc(var(--spacing) * 0)` for `0`,
//     `color-mix(in srgb, #fff 12%, transparent)` for `rgba(255,255,255,0.12)`,
//     `60%` for `0.6`
//   - it marks some declarations `!important` that the preset states plainly
//
// So each side is normalised in its own context before comparison. The
// reference's own variables come from the fixture (`variables`), collected by
// `scripts/extract-reference-fixture.mjs`; the preset's come from its preflight.
//
// Deliberately NOT compared:
//   - rules under a media query: the preset emits no responsive plugin rules,
//     and the fixture carries them separately (e.g. the `.q-notification`
//     `max-width: 65vw` override inside `@media (min-width: 40rem)`)
//   - custom properties, which are wind4's runtime internals (`--un-leading`)
//     and not part of the component contract
//   - values the reference builds through wind4's theme indirection
//     (`var(--dark-*)`, `var(--un-*)`): they are theme-swapped at runtime and
//     are the per-family tests' job (steps 2-9)
//   - a Sass variable that leaked into the reference sheet (`$dark-primary`)
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
  variables: Record<string, string>
  rules: {
    selector: string
    media: string | null
    declarations: { property: string; value: string }[]
  }[]
}

const REF_VARS = new Map(Object.entries(FIXTURE.variables ?? {}))

// Env-gated selectors the preset cannot emit — they require runtime platform
// detection (body.desktop/body.electron/body.platform-ios).
const ENV_GATED = /\bbody\.(desktop|electron|platform-ios|q-ios-padding)\b/

// Normalize a reference selector to the form the preset emits:
//   body.body--dark .q-x  ->  .body--dark .q-x      (drop body element qualifier)
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

/**
 * Every `--name: value` in a sheet. The FIRST definition wins: the preflight
 * emits the default style's tokens first, then per-style overrides
 * (`--q-corner-extra-small` is `4px` by default, `3px` in MD2 and `0` in the
 * third style), and the plain component rules under test target the default
 * style. Last-wins would compare against `0`.
 */
function collectVars(css: string): Map<string, string> {
  const out = new Map<string, string>()
  for (const m of css.matchAll(/(--[\w-]+)\s*:\s*([^;}]+)/g)) {
    if (!out.has(m[1])) out.set(m[1], m[2].trim())
  }
  return out
}

/** Substitute `var(--x)` / `var(--x, fallback)` repeatedly until stable. */
function resolveVars(value: string, vars: Map<string, string>): string {
  let out = value
  for (let i = 0; i < 8; i++) {
    const next = out.replace(
      /var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*(?:\([^()]*\)[^()]*)*))?\)/g,
      (whole, name: string, fallback?: string) => {
        const resolved = vars.get(name)
        if (resolved !== undefined) return resolved
        if (fallback !== undefined && fallback.trim()) return fallback.trim()
        return whole
      }
    )
    if (next === out) break
    out = next
  }
  return out
}

/** `rgba(...)` for a literal white/black at a percentage alpha, else null. */
function literalRgba(color: string, percent: number): string | null {
  const c = color.toLowerCase().replace(/\s+/g, '')
  const rgb =
    c === 'white' || c === '#fff' || c === '#ffffff'
      ? '255,255,255'
      : c === 'black' || c === '#000' || c === '#000000'
        ? '0,0,0'
        : null
  if (!rgb) return null
  return `rgba(${rgb},${percent / 100})`
}

/**
 * Reduce a value to the form both sides can be compared in. Only equivalences
 * that hold for every input are applied; anything unrecognised is left as-is so
 * a real difference still fails rather than being silently normalised away.
 */
function canonical(value: string): string {
  let v = value.trim()
  // `calc(<anything> * 0)` is zero, whatever unit is inside.
  v = v.replace(/calc\((?:[^()]|\([^()]*\))*?\*\s*0\s*\)/g, '0')
  // A percentage alpha is the same number: `60%` == `0.6`, `0%` == `0`.
  v = v.replace(/^(\d+(?:\.\d+)?)%$/, (_, n: string) => String(Number(n) / 100))
  // wind4 compiles `<colour>/N` into a color-mix() against transparent.
  v = v.replace(
    /color-mix\(\s*in\s+[\w-]+\s*,\s*([^,()]+?)\s+([\d.]+)%\s*,\s*transparent\s*\)/g,
    (whole, color: string, percent: string) =>
      literalRgba(color, Number(percent)) ?? whole
  )
  return v.replace(/\s+/g, '')
}

/** Whether both sides state the same value, tokens resolved first. */
function sameValue(
  refValue: string,
  ourValue: string,
  ourVars: Map<string, string>
) {
  return (
    canonical(resolveVars(refValue, REF_VARS)) ===
    canonical(resolveVars(ourValue, ourVars))
  )
}

describe('reference parity (dark + plugin coverage)', () => {
  it('emits every dark/plugin selector the reference build emits', async () => {
    const gen = await createGenerator({ presets: [QuasarPreset({})] })
    const { css } = await gen.generate(quasarSafelist.join(' '), {
      preflights: false
    })
    const withPreflights = await gen.generate(quasarSafelist.join(' '), {})
    const ourVars = collectVars(withPreflights.css)

    const have = parseCss(css)
    const missing: string[] = []
    const valueMismatch: string[] = []
    let checked = 0

    for (const rule of FIXTURE.rules) {
      if (ENV_GATED.test(rule.selector)) continue
      if (rule.media) continue
      const sel = normSel(rule.selector)
      const ours = have.get(sel)
      if (!ours) {
        missing.push(sel)
        continue
      }
      for (const { property, value } of rule.declarations) {
        if (property.startsWith('--')) continue
        if (value.includes('$')) continue
        // Theme-swapped by wind4 at runtime; per-family tests cover these.
        if (/var\(--(dark|un)-/.test(value)) continue
        checked++
        const ourVal = ours.get(property)
        if (ourVal === undefined) {
          valueMismatch.push(`${sel}: missing ${property}`)
          continue
        }
        if (!sameValue(value, ourVal, ourVars)) {
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
    expect(checked).toBeGreaterThan(100)
  })
})
