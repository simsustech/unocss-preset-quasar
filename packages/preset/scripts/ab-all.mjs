/**
 * A/B every component's rules: HEAD's per-class rules vs the codemod's single
 * rule, over the component's own class list.
 *
 * Two things are compared:
 *
 *   declarations — the selector -> sorted declaration sets must match, so no
 *                  body can have been altered by the rewrite;
 *   override order — within one rule uno sorts yields by selector, so cascade
 *                  order inside a component is alphabetical rather than author
 *                  order. Where HEAD let a later rule win (`--opened` neutralises
 *                  `--right`'s translateX), that flip is a real visual change and
 *                  is listed as an inversion.
 *
 * Caveats: a selector whose second root has no candidate here shows as `LOST`
 * even though the real sheet has that candidate (the safelist or the component's
 * vocabulary supplies it) — verify against a live sheet before acting; and an
 * inversion is only meaningful when both selectors can apply to one element
 * (state classes usually cannot).
 *
 *   node scripts/ab-all.mjs [--only fab,btn]
 */
import { execFileSync, spawnSync } from 'node:child_process'
import { mkdirSync, readdirSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createGenerator } from 'unocss'

const ONLY =
  process.argv
    .find((a) => a.startsWith('--only'))
    ?.split('=')[1]
    ?.split(',') ?? null
const TMP = '/tmp/ab-rules'
mkdirSync(TMP, { recursive: true })

const { componentClasses } = await import('../dist/generated/quasar-classes.js')

/** Parse a stylesheet into an ordered list of { selectors, decls: Map }. */
function parse(css) {
  const rules = []
  for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selectors = m[1]
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .split(',')
      .map((s) => s.replace(/\s+/g, ' ').trim())
      .filter(Boolean)
    const decls = new Map()
    for (const pair of m[2].split(';')) {
      const at = pair.indexOf(':')
      if (at === -1) continue
      decls.set(
        pair.slice(0, at).trim(),
        pair
          .slice(at + 1)
          .replace(/\s+/g, ' ')
          .trim()
      )
    }
    rules.push({ selectors, decls })
  }
  return rules
}

/** selector -> multiset of "prop:value", order-insensitive. */
function declarations(rules) {
  const out = new Map()
  for (const r of rules)
    for (const sel of r.selectors) {
      if (!out.has(sel)) out.set(sel, [])
      out.get(sel).push(
        [...r.decls]
          .map(([p, v]) => `${p}:${v}`)
          .sort()
          .join(';')
      )
    }
  for (const v of out.values()) v.sort()
  return out
}

/**
 * For every property set with different values by two selectors, the sheet order
 * of that pair. Two sheets that disagree on which one comes last disagree on the
 * cascade.
 */
function cascade(rules) {
  const last = new Map()
  rules.forEach((r, index) => {
    for (const sel of r.selectors)
      for (const [prop, value] of r.decls) {
        const key = `${sel}|${prop}`
        last.set(key, { index, value, prop })
      }
  })
  return last
}

/** The rules export: an array of [RegExp, body] tuples, not a `*Css` string array. */
function loadRules(file) {
  return import(file).then((mod) =>
    Object.values(mod).find(
      (v) =>
        Array.isArray(v) &&
        v.length > 0 &&
        Array.isArray(v[0]) &&
        v[0][0] instanceof RegExp
    )
  )
}

const dirs = readdirSync('src/components').filter((d) =>
  existsSync(join('src/components', d, 'rules.ts'))
)
const report = { declDiffs: [], inversions: [], skipped: [] }

for (const dir of dirs) {
  if (ONLY && !ONLY.includes(dir)) continue
  // The generated data is keyed by the component class (`q-fab`), not the folder —
  // and some components are not in it at all, so HEAD's own matchers supply names too.
  const classes = new Set(
    componentClasses[`q-${dir}`] ?? componentClasses[dir] ?? []
  )

  let head
  try {
    const source = execFileSync(
      'git',
      ['show', `HEAD:packages/preset/src/components/${dir}/rules.ts`],
      { encoding: 'utf8' }
    )
    // Type annotations inside bodies need a real transpile: tsc, not a regex.
    const tsFile = join(TMP, `${dir}-head.mts`)
    writeFileSync(tsFile, source)
    // tsc exits non-zero on ambient type errors while still emitting JS; the
    // artifact, not the exit code, is what tells us the transpile happened.
    const jsFile = join(TMP, `${dir}-head.mjs`)
    const run = spawnSync(
      'pnpm',
      [
        'exec',
        'tsc',
        '--ignoreConfig',
        '--target',
        'esnext',
        '--module',
        'esnext',
        '--outDir',
        TMP,
        tsFile
      ],
      { encoding: 'utf8' }
    )
    if (!existsSync(jsFile)) {
      throw new Error(
        `tsc emitted nothing: ${(run.stderr ?? '').split('\n')[0]}`
      )
    }
    head = await loadRules(pathToFileURL(jsFile).href)
    if (!head) throw new Error('no rules array exported')
    for (const rule of head) {
      const src = rule[0].source
      const exact =
        src.startsWith('^') && src.endsWith('$') ? src.slice(1, -1) : null
      // Exact matchers are class names; anything with a quantifier is left alone.
      if (exact !== null && /^[-a-z0-9_]+$/.test(exact)) classes.add(exact)
    }
  } catch (error) {
    report.skipped.push(`${dir}: ${String(error.message).slice(0, 60)}`)
    continue
  }

  if (classes.size === 0) {
    report.skipped.push(`${dir}: no classes to test`)
    continue
  }
  const content = [...classes].join(' ')
  const current = await loadRules(
    pathToFileURL(join(process.cwd(), 'dist', 'components', dir, 'rules.js'))
      .href
  ).catch(() => null)
  if (!current) {
    report.skipped.push(`${dir}: no built rules`)
    continue
  }

  const generate = async (rules) =>
    parse(
      (
        await (
          await createGenerator({ presets: [], rules })
        ).generate(content, { preflights: false })
      ).css
    )
  const [headCss, nowCss] = await Promise.all([
    generate(head),
    generate(current)
  ])

  // 1. declarations
  const a = declarations(headCss)
  const b = declarations(nowCss)
  for (const [sel, decls] of a) {
    const other = b.get(sel)
    if (!other) report.declDiffs.push(`LOST  ${dir}: ${sel}`)
    else if (JSON.stringify(decls) !== JSON.stringify(other)) {
      const head = decls.find((d) => !other.includes(d)) ?? decls[0]
      const now = other.find((d) => !decls.includes(d)) ?? other[0]
      report.declDiffs.push(
        `CHANGED ${dir}: ${sel}\n      HEAD: ${head.slice(0, 130)}\n      NOW : ${now.slice(0, 130)}`
      )
    }
  }
  for (const sel of b.keys())
    if (!a.has(sel)) report.declDiffs.push(`added ${dir}: ${sel}`)

  // 2. cascade order for shared selectors setting the same property
  const ca = cascade(headCss)
  const cb = cascade(nowCss)
  const shared = [...ca.keys()].filter((k) => cb.has(k))
  for (const k of shared) {
    const x = ca.get(k)
    const y = cb.get(k)
    if (x.index === y.index || x.value !== y.value) continue
    // Only meaningful when some other shared selector competes for the property.
    const rivals = shared.filter((r) => r !== k && ca.get(r).prop === x.prop)
    for (const r of rivals) {
      const rx = ca.get(r)
      const ry = cb.get(r)
      if (rx.value === ry.value) continue
      const headAfter = rx.index > x.index
      const nowAfter = ry.index > y.index
      if (headAfter !== nowAfter) {
        report.inversions.push(
          `${dir}: ${x.prop} — ${r.split('|')[0]} (${headAfter ? 'was after' : 'was before'}) vs ${k.split('|')[0]}`
        )
      }
    }
  }
}

const uniq = (xs) => [...new Set(xs)]
console.log(
  `components scanned: ${dirs.length - (ONLY ? dirs.length - ONLY.length : 0)}`
)
console.log(`declaration diffs: ${report.declDiffs.length}`)
for (const d of uniq(report.declDiffs).slice(0, 25)) console.log('  ', d)
console.log(`cascade inversions: ${uniq(report.inversions).length}`)
for (const d of uniq(report.inversions).slice(0, 40)) console.log('  ', d)
if (report.skipped.length > 0)
  console.log(`skipped: ${report.skipped.join('; ')}`)
