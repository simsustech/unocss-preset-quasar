import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Values that belong to a role must come from the token layer, so a style switch
 * reaches them. A literal freezes one style's value into every style: that is how
 * the MD3 easing declaration sat unused while 29 rules hardcoded MD2's curve, and
 * how the chip restated a forked label role.
 *
 * A literal is legitimate when Quasar owns the value rather than a role — 2px
 * indicators, 19px paddings, 0.36s field transitions, relative scalings such as
 * 0.75em. Those are marked `// quasar:` inline, in the same yield, and this test
 * permits exactly those. Everything else in a watched property must be a
 * `var(--q-…)` reference.
 */

/** Properties whose values are role- or scale-driven. */
const WATCHED = [
  'font-size',
  'line-height',
  'font-weight',
  'min-height',
  'height',
  'padding',
  'padding-inline',
  'padding-block',
  'padding-top',
  'padding-bottom',
  'border-radius'
]

/** Values that carry no role: nothing to fork, nothing to mark. */
const EXEMPT = ['0', 'auto', 'none', 'inherit', 'normal', '100%', '50%']

type Offender = { line: number; property: string; value: string }

/** Watched literals with no `// quasar:` marker in their yield. */
const unmarked = (source: string): Offender[] => {
  const offenders: Offender[] = []
  let marked = false
  source.split('\n').forEach((line, index) => {
    if (line.includes('yield {')) marked = false
    if (line.includes('// quasar:')) {
      marked = true
      return
    }
    const match = /^\s*'([a-z-]+)':\s*'([^']+)'/.exec(line)
    if (match === null) return
    const [, property, value] = match as unknown as [string, string, string]
    if (!WATCHED.includes(property)) return
    if (value.includes('var(') || EXEMPT.includes(value)) return
    if (!marked) offenders.push({ line: index + 1, property, value })
  })
  return offenders
}

const ruleFiles = (dir: string): string[] => {
  const out: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...ruleFiles(full))
    else if (entry === 'rules.ts') out.push(full)
  }
  return out
}

describe('role values come from tokens, not literals', () => {
  const files = ruleFiles(join(__dirname, '..', 'src'))

  it('scans the whole preset, not an empty set', () => {
    expect(files.length).toBeGreaterThan(30)
  })

  it('finds no unmarked watched literal', () => {
    const report = files
      .map((file) => ({
        file,
        offenders: unmarked(readFileSync(file, 'utf8'))
      }))
      .filter((entry) => entry.offenders.length > 0)
      .map(
        ({ file, offenders }) =>
          `${file.replace(/.*\/src\//, 'src/')}: ${offenders
            .slice(0, 4)
            .map((o) => `${o.property}: ${o.value} (line ${o.line})`)
            .join(', ')}`
      )
    expect(report).toEqual([])
  })

  // The guard is only worth having if it can fail: stripping the markers from a
  // file must surface its literals again.
  it('fails when the markers are removed', () => {
    const marked = files.filter((file) =>
      readFileSync(file, 'utf8').includes('// quasar:')
    )
    expect(
      marked.length,
      'the preset must mark Quasar-owned values'
    ).toBeGreaterThan(0)
    const sample = readFileSync(marked[0] as string, 'utf8')
    const stripped = sample.replace(/\/\/ quasar:/g, '')
    expect(unmarked(stripped).length).toBeGreaterThan(0)
  })
})
