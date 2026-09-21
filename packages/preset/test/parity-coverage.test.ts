// Reference parity gate: every selector the reference build emits, per module,
// measured against the preset's own output, with a ratchet that may only shrink.
//
// Replaces the old dark/plugin-only gate: `scripts/extract-reference-fixture.mjs`
// used to keep only `body--dark`-scoped rules plus the three plugin components,
// so 1,141 base selectors (field 121, table 72, animation 99, …) could go
// missing while the suite stayed green.
//
// Measurement lives in `scripts/parity-report.mjs` (shared with the CLI) because
// the preset's own source has to be resolved by Vite — a plain `node` run cannot
// import `../src/index.js`. The report is written to `test/parity-report.json` on
// every run, including failing ones, so the work list is always available:
//
//   node scripts/parity-report.mjs                 # run the gate + print the report
//   node scripts/parity-report.mjs --module field  # one module's gaps in detail
//   node scripts/parity-report.mjs --update        # regenerate the ratchet baseline
//
// The fixture (`fixtures/reference-selectors.json`) is generated from the
// vendored bundle at `specs/reference/raw/reference-bundle.css.txt` (sha256 pinned in
// `specs/reference/raw/MANIFEST.sha256`), never from the network.
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
// @ts-expect-error -- plain-JS helper; `tsc` only covers src/, vitest resolves it
import { buildParityReport, PLAN_MODULES } from '../scripts/parity-report.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const FIXTURE_PATH = join(__dirname, 'fixtures', 'reference-selectors.json')
const BASELINE_PATH = join(__dirname, 'fixtures', 'parity-baseline.json')

// The vendored reference bundle. `bundleHash` is the first 16 hex chars of the
// sha256 in MANIFEST.sha256 — bumping the reference is a deliberate act.
const EXPECTED_BUNDLE_HASH = '4a01f0ffbc51075f'
const FIXTURE_SOURCE = 'specs/reference/raw/reference-bundle.css.txt'
// The reference emits 2,464 split selectors; the old scoped fixture carried 163.
const MIN_FIXTURE_RULES = 2300

// `PARITY_UPDATE_BASELINE=1` regenerates the ratchet from the current state;
// that run records rather than compares, so the ratchet cases stand down.
const UPDATE_BASELINE = Boolean(process.env.PARITY_UPDATE_BASELINE)

const fixture = JSON.parse(readFileSync(FIXTURE_PATH, 'utf8')) as {
  source: string
  bundleHash: string
  ruleCount: number
  byteSize?: number
  variables: Record<string, string>
  keyframes?: { name: string }[]
  rules: {
    selector: string
    media: string | null
    declarations: { property: string; value: string }[]
  }[]
}

type ModuleReport = {
  scope: 'preset' | 'reported'
  reason?: string
  present: number
  missing: string[]
  absent: string[]
  mismatch: string[]
}

type ParityReport = {
  bundleHash: string
  totals: { present: number; missing: number }
  payload: { referenceBytes: number; emittedBytes: number }
  modules: Record<string, ModuleReport>
  baselineWritten: boolean
}

// Generating the emitted sheet takes ~1s, so the report is computed once and
// reused by every case here.
let reportPromise: Promise<ParityReport> | null = null
const getReport = (): Promise<ParityReport> =>
  (reportPromise ??= buildParityReport() as Promise<ParityReport>)

const baseline = existsSync(BASELINE_PATH)
  ? (JSON.parse(readFileSync(BASELINE_PATH, 'utf8')) as {
      bundleHash: string
      modules: Record<
        string,
        {
          target: number | null
          missing: string[]
          absent: string[]
          mismatch: string[]
        }
      >
    })
  : null

describe('reference parity — fixture integrity', () => {
  it('is extracted from the vendored bundle, not from the network', () => {
    expect(fixture.source).toBe(FIXTURE_SOURCE)
    expect(fixture.bundleHash).toBe(EXPECTED_BUNDLE_HASH)
    expect(existsSync(join(__dirname, '..', '..', '..', FIXTURE_SOURCE))).toBe(
      true
    )
  })

  it('covers the whole reference sheet', () => {
    expect(fixture.ruleCount).toBeGreaterThanOrEqual(MIN_FIXTURE_RULES)
    expect(fixture.rules.length).toBe(fixture.ruleCount)
  })

  it('carries declarations for every rule and dedupes media+selector', () => {
    const seen = new Set<string>()
    for (const rule of fixture.rules) {
      expect(rule.declarations.length).toBeGreaterThan(0)
      const key = `${rule.media ?? ''}\u0000${rule.selector}`
      expect(seen.has(key), `duplicate ${key}`).toBe(false)
      seen.add(key)
    }
  })

  it('captures the component keyframes separately from the rules', () => {
    const names = (fixture.keyframes ?? []).map((k) => k.name)
    expect(names).toContain('q-spin')
    expect(names).toContain('q-skeleton--fade')
    // Keyframe steps must not leak into the rule list as `0%` selectors.
    expect(fixture.rules.some((r) => r.selector === '0%')).toBe(false)
  })

  it('keeps the token values the declaration comparison resolves against', () => {
    expect(Object.keys(fixture.variables).length).toBeGreaterThan(100)
    expect(fixture.variables['--colors-grey-3']).toBe('#eeeeee')
  })
})

describe('reference parity — coverage ratchet', () => {
  it('never regresses against the recorded baseline', async () => {
    const report = await getReport()
    expect(report.bundleHash).toBe(EXPECTED_BUNDLE_HASH)
    if (UPDATE_BASELINE) {
      expect(report.baselineWritten, 'baseline was not written').toBe(true)
      return
    }
    expect(
      baseline,
      'parity-baseline.json is missing — run `node scripts/parity-report.mjs --update`'
    ).not.toBeNull()
    expect(baseline?.bundleHash).toBe(report.bundleHash)

    const regressions: string[] = []
    const newModules: string[] = []
    const incomplete: string[] = []

    for (const [name, live] of Object.entries(report.modules)) {
      const recorded = baseline?.modules[name]
      if (!recorded) {
        newModules.push(name)
        continue
      }
      for (const key of ['missing', 'absent', 'mismatch'] as const) {
        const known = new Set(recorded[key])
        for (const entry of live[key]) {
          if (!known.has(entry)) regressions.push(`${name} ${key}: ${entry}`)
        }
      }
      if (recorded.target === 0) {
        for (const key of ['missing', 'absent', 'mismatch'] as const) {
          if (live[key].length) {
            incomplete.push(`${name} ${key}: ${live[key].length} left`)
          }
        }
      }
    }

    if (regressions.length)
      console.log(`REGRESSIONS:\n${regressions.slice(0, 40).join('\n')}`)
    if (newModules.length)
      console.log(`NEW MODULES (baseline needs regenerating):\n${newModules}`)
    if (incomplete.length)
      console.log(`INCOMPLETE (target 0):\n${incomplete.join('\n')}`)

    expect(regressions).toEqual([])
    expect(newModules).toEqual([])
    expect(incomplete).toEqual([])
    expect(report.totals.present).toBeGreaterThan(0)
  })

  it('reports every module the plan names', async () => {
    const report = await getReport()
    const missing = (PLAN_MODULES as string[]).filter(
      (name) => !(name in report.modules)
    )
    expect(missing, `modules absent from the report: ${missing}`).toEqual([])
  })

  it('keeps the emitted sheet within 10% of the reference', async () => {
    const report = await getReport()
    const limit = report.payload.referenceBytes * 1.1
    expect(
      report.payload.emittedBytes,
      `emitted ${report.payload.emittedBytes} bytes vs limit ${Math.round(limit)}`
    ).toBeLessThanOrEqual(limit)
  })
})
