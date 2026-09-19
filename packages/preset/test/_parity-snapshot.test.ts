import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset } from '../src/index.js'
import { quasarSafelist } from '../src/safelist.js'
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fixture = JSON.parse(
  readFileSync(
    join(__dirname, '..', 'test', 'fixtures', 'reference-selectors.json'),
    'utf8'
  )
)

function normalize(s: string) {
  return s
    .replace(/\bbody\.body--dark\b/g, '.body--dark')
    .replace(/\s+/g, ' ')
    .trim()
}

// Env-gated selectors the preset cannot emit — they need runtime platform
// detection (body.desktop/body.electron/body.platform-ios). Excluded here for
// the same reason `parity-coverage.test.ts` excludes them, so this report
// measures only selectors the preset can actually control.
const ENV_GATED = /\bbody\.(desktop|electron|platform-ios|q-ios-padding)\b/

// @ts-expect-error -- pi-lens infers wrong type; vitest resolves TS correctly
const preset = QuasarPreset({})

describe('parity snapshot', () => {
  it('reports coverage', async () => {
    const gen = await createGenerator({ presets: [preset] })
    const { css } = await gen.generate(quasarSafelist.join(' '), {
      preflights: false
    })
    // Match whole selectors, not substrings: `.body--dark .q-editor__toolbar`
    // is a prefix of `.body--dark .q-editor__toolbar-group+...`, which made a
    // genuinely missing rule look present.
    const emitted = new Set<string>()
    for (const m of css.matchAll(/([^{}]+)\{/g)) {
      for (const part of m[1].split(',')) {
        const t = normalize(part)
        if (t) emitted.add(t)
      }
    }
    let missing = 0
    let found = 0
    const missingList: string[] = []
    for (const r of fixture.rules) {
      if (ENV_GATED.test(r.selector)) continue
      if (emitted.has(normalize(r.selector))) {
        found++
      } else {
        missing++
        missingList.push(r.selector.slice(0, 80))
      }
    }
    const considered = found + missing
    const pct = Math.round((found / considered) * 100)
    const byComp: Record<string, number> = {}
    for (const s of missingList) {
      const m = s.match(/\.q-([a-z]+)/)
      const comp = m ? m[1] : 'other'
      byComp[comp] = (byComp[comp] || 0) + 1
    }
    const report = [
      `=== PARITY: ${found}/${considered} (${pct}%) ===`,
      `(${fixture.ruleCount} in fixture; ${fixture.ruleCount - considered} env-gated)`,
      `Missing ${missing} selectors:`,
      ...missingList.map((s) => `  ${s}`),
      '',
      '--- BREAKDOWN ---',
      ...Object.entries(byComp)
        .sort((a, b) => b[1] - a[1])
        .map(([comp, count]) => `  ${comp}: ${count}`)
    ].join('\n')
    writeFileSync(
      join(__dirname, '..', 'test', 'parity-report.txt'),
      report + '\n'
    )
    expect(found).toBeGreaterThan(0)
  })
})
