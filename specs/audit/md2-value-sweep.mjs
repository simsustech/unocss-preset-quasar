#!/usr/bin/env node
/**
 * md2 value sweep — the mechanical form of the two defect classes the md2 audit
 * proved by hand (specs/audit/md2-audit.md, rows AUD-MD2-001/002).
 *
 * The question it answers: **where does dist state a declaration absolutely while
 * this sheet routes it through something that varies by style** — and where does
 * dist keep two dimensions equal (a circle/square) while this sheet's two
 * dimensions resolve differently (an ellipse)?
 *
 * Method
 *   1. Load `quasar/dist/quasar.css` (the arbiter; same loader as
 *      coverage-sweep.mjs).
 *   2. Parse its rule blocks and keep two classes of statement:
 *        (A) a *circular* block that keeps two sides equal — dist's way of saying
 *            "this is a circle". Both ways dist states one are read, because it uses
 *            both: the min-* pair (`.q-btn--round { min-width: 3em; min-height: 3em }`)
 *            and the plain pair (`.q-avatar { width: 1em; height: 1em }`). Reading only
 *            the min-* pair covered 1 of dist's 28 circular rules, so 27 circles —
 *            avatars, checkboxes, calendar cells, the knob — sat outside a gate whose
 *            header claimed to check circles. A side is read as the *effective* one: an
 *            explicit `height`/`width` beats its own min-* floor, and a keyword
 *            (`auto`) falls through to the floor instead of being reported as a side;
 *        (B) a block declaring `padding-top` with an ABSOLUTE length — dist's way
 *            of stating a metric outright.
 *   3. Generate this sheet for md2 and md3 (the preset must be built first) and
 *      resolve every `var(--q-*)` through that sheet's own token block.
 *   4. Report, per statement, dist's value next to both styles' resolved value.
 *   5. Gate: every divergence needs a bucket. Buckets are the audit's authority
 *      model — `spec-declared` (specs/md2 decides), `dist-only` (dist decides),
 *      `invariant` (a shape/clearance rule the arbiter never contemplates),
 *      `palette-driven` and `preset-policy` (deliberately style-independent),
 *      `deferred` (recorded for another scope). Anything else fails the run, so
 *      a new divergence cannot slip through unclassified.
 *
 * Usage
 *   node specs/audit/md2-value-sweep.mjs            # report + gate
 *
 * The preset must be built first (`pnpm --filter unocss-preset-quasar build`).
 */
import { createRequire } from 'node:module'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(HERE, '..', '..')
const PRESET_DIR = join(REPO, 'packages', 'preset')
const DIST_CSS = join(REPO, 'node_modules', '.pnpm')

const requireFromPreset = createRequire(join(PRESET_DIR, 'package.json'))
const load = async (specifier) =>
  import(requireFromPreset.resolve(specifier)).then((m) => m.default ?? m)

function quasarDistCss() {
  const direct = [
    join(PRESET_DIR, 'node_modules', 'quasar', 'dist', 'quasar.css'),
    join(REPO, 'node_modules', 'quasar', 'dist', 'quasar.css')
  ].find((path) => existsSync(path))
  if (direct) return readFileSync(direct, 'utf8')
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

/** `selector { decls }` chunks, comments stripped. */
function parseRules(css) {
  const out = []
  for (const chunk of css.replace(/\/\*[\s\S]*?\*\//g, ' ').split('}')) {
    const open = chunk.indexOf('{')
    if (open === -1) continue
    const decls = new Map()
    for (const decl of chunk.slice(open + 1).split(';')) {
      const colon = decl.indexOf(':')
      if (colon === -1) continue
      decls.set(decl.slice(0, colon).trim(), decl.slice(colon + 1).trim())
    }
    out.push({
      selectors: chunk
        .slice(chunk.lastIndexOf('}') + 1, open)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      decls
    })
  }
  return out
}

/** Every `--q-*: value` in a sheet, last wins (the emitter writes one block). */
function tokenMap(css) {
  const map = new Map()
  for (const m of css.matchAll(/(--q-[\w-]+)\s*:\s*([^;}]+)/g)) {
    map.set(m[1], m[2].trim())
  }
  return map
}

/** Resolve nested `var(--q-*)` a few levels deep. */
function resolveValue(value, tokens, depth = 0) {
  if (depth > 6) return value
  const whole = /^var\((--[\w-]+)\)$/.exec(value.trim())
  if (!whole) return value
  const next = tokens.get(whole[1])
  return next === undefined ? value : resolveValue(next, tokens, depth + 1)
}

const ABSOLUTE = /^-?[\d.]+(px|em|rem)$/

/** Values that are not a length at all — a side stated as one of these falls through. */
const KEYWORDS = new Set([
  'auto',
  'none',
  'initial',
  'inherit',
  'unset',
  'revert',
  'min-content',
  'max-content',
  'fit-content'
])

/** Statements of class (A) and (B) that dist states.
 *
 * Restricted to selectors that name a Quasar *modifier* or *part* (`--`, `__`):
 * utilities such as `.q-pt-md` live in the delegated engine and are identical in
 * both entries (`calc(var(--spacing) * 4)`), so comparing their text would report
 * the engine, not this sheet. */
function distStatements(rules) {
  const squares = []
  const metrics = []
  for (const rule of rules) {
    if (!rule.selectors.some((s) => /\.[\w-]+(--|__)/.test(s))) continue
    // Equal dims are only a *shape* claim when the rule is circular: dist's
    // `.q-btn--dense` also keeps both at 2.4em, but a 4px radius makes that a
    // minimum size, not a circle, so a rectangle there is correct.
    //
    // Both ways dist states a circle are read, because it uses both: the min-*
    // pair (`.q-btn--round { min-width: 3em; min-height: 3em }`) and the plain
    // pair (`.q-avatar { width: 1em; height: 1em }`, `.q-date__calendar-item >
    // div { width: 30px; height: 30px }`). Reading only the min-* pair covered 1
    // of dist's 28 circular rules; the other 27 stayed outside the gate while its
    // header claimed to check circles.
    const radius = rule.decls.get('border-radius') ?? ''
    const circular = radius.includes('50%') || radius.includes('infinity')
    for (const pair of [
      ['width', 'height'],
      ['min-width', 'min-height']
    ]) {
      const [a, b] = pair
      const x = rule.decls.get(a)
      const y = rule.decls.get(b)
      if (circular && x && y && x === y && ABSOLUTE.test(x)) {
        squares.push({ selectors: rule.selectors, pair, value: x })
        break
      }
    }
    const pad = rule.decls.get('padding-top')
    if (pad && ABSOLUTE.test(pad)) {
      metrics.push({ selectors: rule.selectors, value: pad })
    }
  }
  return { squares, metrics }
}

const norm = (sel) => sel.replace(/\s+/g, ' ').trim()

/** The sheet's blocks whose selector list *exactly* matches one dist states.
 *
 * Exact matching matters: a class-subset match pulls in every rule that happens to
 * mention one of the same classes, which reported unrelated declarations (and
 * nearly buried the real finding) on the first run of this sweep. */
function ourBlocks(rules, selectors) {
  const wanted = new Set(selectors.map(norm))
  return rules.filter((rule) => rule.selectors.some((s) => wanted.has(norm(s))))
}

/**
 * The audit's authority model. A divergence must name its bucket, and the reason
 * must be checkable — `spec` cites specs/md2, `dist` cites quasar.css.
 */
const BUCKETS = new Map([
  // AUD-MD2-001: md2 must clear the floated label; dist's own 24px does not
  // (measured -1.2px), 28px does (+1.8px). The arbiter never contemplates it.
  [
    'q-field--labeled|padding-top|24px',
    'invariant: label and value may not intersect (AUD-MD2-001)'
  ],
  [
    'q-field--auto-height|padding-top|24px',
    'invariant: the labeled select/auto-height path, same clearance (AUD-MD2-001)'
  ],
  // AUD-MD2-002: md2 takes the spec's button min_width_px (64) as both round
  // dimensions; md3 keeps 3em/control-height, so md3 is the oval.
  [
    'q-btn--round|min-width',
    'spec-declared: specs/md2 buttons.*.min_width_px 64 (AUD-MD2-002)'
  ],
  [
    'q-btn--round|min-height',
    'deferred: md3 round buttons are equally oval — recorded, not changed in an md2-scoped run'
  ],
  // AUD-MD2-006/007: md2's spacing scale is deliberately compressed
  // (`--q-space-md` 8 vs 12, `--q-space-xl` 16 vs 24). Where dist states a plain
  // *spacing* (not a clearance metric) md2 renders tighter by design. The
  // distinction from AUD-MD2-001 is that 001 produced an overlap — a correctness
  // failure — while these only change breathing room (no clipping observed).
  [
    'q-btn--round|min-width|3em',
    'spec-declared: md2 takes specs/md2 buttons.*.min_width_px (64) as BOTH round sides — square (AUD-MD2-002); md3 keeps 3em x control-height and is deferred'
  ],
  [
    'q-btn--round|min-height|3em',
    'deferred: md3 round buttons are equally oval — recorded, not changed in an md2-scoped run'
  ],
  // AUD-MD2-006/007: md2's spacing scale is deliberately compressed
  // (`--q-space-md` 8 vs 12, `--q-space-xl` 16 vs 24). Where dist states a plain
  // *spacing* (not a clearance metric) md2 renders tighter by design. The
  // distinction from AUD-MD2-001 is that 001 produced an overlap — a correctness
  // failure — while these only change breathing room (no clipping observed).
  [
    'q-banner--dense|padding-top|12px',
    'preset-policy: md2 compressed space scale (AUD-MD2-006)'
  ],
  [
    'q-stepper__nav|padding-top|24px',
    'preset-policy: md2 compressed space scale (AUD-MD2-007)'
  ],
  // Shared by BOTH styles (md2 10px / md3 10px) — a pre-existing divergence from
  // dist, not an md2 finding, recorded rather than changed in this run.
  [
    'q-field--auto-height|padding-top|14px',
    'preset-policy: shared by both styles (10px), pre-existing — recorded, not md2-specific'
  ]
])

async function main() {
  const { createGenerator } = await load('unocss')
  const { QuasarPreset } = await import(join(PRESET_DIR, 'dist', 'index.js'))
  const { MaterialDesign2, MaterialDesign3 } = await import(
    join(PRESET_DIR, 'dist', 'styles', 'index.js')
  )

  const dist = parseRules(quasarDistCss())
  const { squares, metrics } = distStatements(dist)

  const sheet = async (style) => {
    const gen = await createGenerator({ presets: [QuasarPreset({ style })] })
    const css = (await gen.generate(distTokens.join(' '))).css
    return { css, rules: parseRules(css), tokens: tokenMap(css) }
  }
  const { rules: md2Rules, tokens: md2Tokens } = await sheet(MaterialDesign2)
  const { rules: md3Rules, tokens: md3Tokens } = await sheet(MaterialDesign3)

  /** The first Quasar modifier/part class of a selector — the bucket key. */
  const key = (selectors) =>
    selectors.join(',').match(/\.(q-[\w-]*(?:--|__)[\w-]*)/)?.[1] ?? null

  const report = { squares: [], metrics: [], unflagged: [] }
  /** Swept declarations that appeared in more than one emitted block. */
  const ambiguous = []

  const evaluate = (statement, property) => {
    const ours2 = ourBlocks(md2Rules, statement.selectors)
    const ours3 = ourBlocks(md3Rules, statement.selectors)
    /**
     * The declaration CSS would actually use: the LAST block that sets the property,
     * since a later rule of equal specificity wins.
     *
     * Not theoretical. The emitted sheet really does carry selectors in more than one
     * block with different values: `.q-date__view` declares `min-height: 290px` and
     * then `160px`, and `.q-date__calendar-days > div` declares `height: 16.66%` and
     * then `16.6666666667%`. Neither is swept today, so taking the first block happened
     * to be harmless — it would not have stayed harmless. When a swept selector is
     * ambiguous the comparison is reported as a note rather than resolved silently, so
     * a reader can see the verdict rests on cascade order.
     */
    const pick = (blocks, tokens) => {
      const hits = []
      for (const b of blocks) {
        const raw = b.decls.get(property)
        if (raw === undefined) continue
        hits.push({ raw, value: resolveValue(raw, tokens) })
      }
      if (hits.length === 0) return null
      if (hits.length > 1 && new Set(hits.map((h) => h.value)).size > 1) {
        ambiguous.push(
          `${property} of ${blocks[0].selectors[0]}: ${hits.map((h) => h.value).join(' -> ')}`
        )
      }
      return hits[hits.length - 1]
    }
    return { md2: pick(ours2, md2Tokens), md3: pick(ours3, md3Tokens) }
  }

  for (const sq of squares) {
    const id = key(sq.selectors)
    if (!id) continue
    // The square side is `height` when a style states one, else `min-height`:
    // the md2 fix keeps `min-height` on the 48dp floor token and puts the square
    // in `height`, so reading min-height alone would misreport it as 64x48.
    // The square side is the *effective* one: an explicit size beats its own
    // min-* floor. The md2 fix keeps `min-height` on the 48dp floor token and puts
    // the square in `height`, so reading min-height alone would misreport it as
    // 64x48 — a false positive of exactly the kind this sweep exists to avoid.
    const side = (style, property) => {
      const explicit =
        property === 'min-height'
          ? 'height'
          : property === 'min-width'
            ? 'width'
            : null
      for (const candidate of explicit ? [explicit, property] : [property]) {
        const hit = evaluate(sq, candidate)
        const value = style === 'md2' ? hit.md2 : hit.md3
        if (!value) continue
        // A keyword is not a side: md3's round button states `height: auto` (its square
        // side token is deliberately `auto` there), so the rendered side is its
        // min-height floor. Treating `auto` as the side would report md3 as
        // `3em x auto` instead of the `3em x 48px` a reader can check.
        if (KEYWORDS.has(value.value)) continue
        return value.value
      }
      return undefined
    }
    const m2 = { a: side('md2', sq.pair[0]), b: side('md2', sq.pair[1]) }
    const m3 = { a: side('md3', sq.pair[0]), b: side('md3', sq.pair[1]) }
    const row = {
      id,
      pair: sq.pair.join('/'),
      dist: `${sq.value} x ${sq.value}`,
      md2: `${m2.a ?? '—'} x ${m2.b ?? '—'}`,
      md3: `${m3.a ?? '—'} x ${m3.b ?? '—'}`
    }
    // A dimension this sheet never states is unverifiable here, not a pass — the
    // report says so rather than counting it as square.
    const square = (d) =>
      d.a === undefined || d.b === undefined
        ? 'not stated'
        : d.a === d.b
          ? 'square'
          : 'NOT SQUARE'
    row.verdict2 = square(m2)
    row.verdict3 = square(m3)
    if (row.verdict2 === 'NOT SQUARE' || row.verdict3 === 'NOT SQUARE') {
      row.bucket =
        BUCKETS.get(`${id}|min-width|${sq.value}`) ??
        BUCKETS.get(`${id}|min-height|${sq.value}`) ??
        BUCKETS.get(`${id}|width|${sq.value}`)
      report.squares.push(row)
    } else if (row.verdict2 === 'not stated' || row.verdict3 === 'not stated') {
      report.unflagged.push(row)
    }
  }

  for (const m of metrics) {
    const id = key(m.selectors)
    if (!id) continue
    const { md2, md3 } = evaluate(m, 'padding-top')
    if (!md2 || !md3) continue
    if (md2.value === m.value && md3.value === m.value) continue
    const bucket = BUCKETS.get(`${id}|padding-top|${m.value}`)
    report.metrics.push({
      id,
      dist: m.value,
      md2: md2.value,
      md3: md3.value,
      bucket
    })
  }

  const lines = []
  lines.push('md2 value sweep — dist vs the emitted sheets')
  lines.push('')
  lines.push(
    '(A) dist states a circle (a circular radius with equal sides), ours may not be:'
  )
  if (!report.squares.length)
    lines.push('    none — every circle dist states is square in both styles')
  for (const r of report.squares) {
    lines.push(
      `    ${r.id.padEnd(26)} ${r.pair.padEnd(18)} dist ${r.dist.padEnd(11)} md2 ${r.md2.padEnd(12)}${r.verdict2.padEnd(13)} | md3 ${r.md3.padEnd(12)}${r.verdict3}`
    )
    lines.push(`        bucket: ${r.bucket ?? 'UNDISPOSITIONED'}`)
  }
  if (report.unflagged.length) {
    lines.push('')
    lines.push(
      '    circles whose dimension this sheet never states (unverifiable here, not a pass):'
    )
    for (const r of report.unflagged)
      lines.push(
        `    ${r.id.padEnd(26)} ${r.pair.padEnd(18)} md2 ${r.verdict2} | md3 ${r.verdict3}`
      )
  }
  lines.push('')
  lines.push(
    '(B) dist states an absolute padding-top, ours may route it elsewhere:'
  )
  if (!report.metrics.length)
    lines.push(
      '    none — every absolute metric dist states is matched by both styles'
    )
  for (const r of report.metrics) {
    lines.push(
      `    ${r.id.padEnd(26)} dist ${r.dist.padEnd(8)} md2 ${r.md2.padEnd(8)} md3 ${r.md3.padEnd(8)}`
    )
    lines.push(`        bucket: ${r.bucket ?? 'UNDISPOSITIONED'}`)
  }

  const undispositioned = [...report.squares, ...report.metrics].filter(
    (r) => !r.bucket
  )
  if (ambiguous.length) {
    lines.push('')
    lines.push(
      'note: these swept declarations appear in more than one emitted block;'
    )
    lines.push(
      '      the LAST one was compared, because that is the one CSS would use:'
    )
    for (const note of new Set(ambiguous)) lines.push(`        ${note}`)
  }
  lines.push('')
  lines.push(
    `summary: ${report.squares.length} shape divergence(s), ${report.metrics.length} metric divergence(s), ${undispositioned.length} undispositioned`
  )

  console.log(lines.join('\n'))
  if (undispositioned.length) {
    console.error(
      `\nFAIL: ${undispositioned.length} divergence(s) have no bucket — add a row to specs/audit/md2-audit.md and BUCKETS here`
    )
    process.exitCode = 1
  } else {
    console.log('\nOK: every divergence carries a bucket')
  }
}

/** Candidate classes: everything dist styles, so nothing is invisible to us. */
const distTokens = [
  ...new Set(
    [
      ...quasarDistCss()
        .replace(/\/\*[\s\S]*?\*\//g, ' ')
        .matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)
    ].map((m) => m[1])
  )
]

await main()
