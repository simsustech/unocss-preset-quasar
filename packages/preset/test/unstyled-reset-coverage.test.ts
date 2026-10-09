import { readFile, readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const presetRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const componentsDir = resolve(presetRoot, 'src/components')
const unstyledRulesFile = resolve(
  presetRoot,
  'src/styles/unstyled/rules/index.ts'
)
const STYLE_ONLY_OR_STRUCTURAL = new Set([
  // These roots are structural or style-owned; their base matcher does not
  // state a literal paint role. Member/state paint is checked separately by
  // core-unstyled-contract.test.ts.
  'q-avatar',
  'q-breadcrumbs',
  'q-color',
  'q-file',
  'q-icon',
  'q-infinite-scroll',
  'q-layout',
  'q-list',
  'q-panel-parent',
  'q-parallax',
  'q-popup-edit',
  'q-pull-to-refresh',
  'q-ripple',
  'q-splitter',
  'q-tabs',
  'q-textarea'
])

const hasRootMatcher = (source: string, root: string) =>
  source.includes(`/^${root}$/`)

const coreRoots = async () => {
  const entries = await readdir(componentsDir, { withFileTypes: true })
  const roots: string[] = []
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    try {
      const source = await readFile(
        resolve(componentsDir, entry.name, 'rules.ts'),
        'utf8'
      )
      const root = `q-${entry.name}`
      if (hasRootMatcher(source, root)) roots.push(root)
    } catch {
      // Non-component folders need not export component rules.
    }
  }
  return roots
}

describe('unstyled core-root reset coverage', () => {
  it('has a root neutralizer unless explicitly structural/style-only', async () => {
    const roots = await coreRoots()
    const unstyledRules = await readFile(unstyledRulesFile, 'utf8')
    const missing = roots.filter(
      (root) =>
        !hasRootMatcher(unstyledRules, root) &&
        !STYLE_ONLY_OR_STRUCTURAL.has(root)
    )

    expect(missing).toEqual([])
    expect(roots.filter((root) => STYLE_ONLY_OR_STRUCTURAL.has(root))).toEqual(
      expect.arrayContaining([...STYLE_ONLY_OR_STRUCTURAL])
    )
  })
})
