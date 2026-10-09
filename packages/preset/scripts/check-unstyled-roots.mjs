import { readdir, readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const componentsDir = resolve(root, 'src/components')
const resetFile = resolve(root, 'src/styles/unstyled/rules/index.ts')
const componentDirs = (await readdir(componentsDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)

const hasRootMatcher = (source, rootName) => source.includes(`/^${rootName}$/`)

const roots = []
for (const name of componentDirs) {
  const file = resolve(componentsDir, name, 'rules.ts')
  try {
    const source = await readFile(file, 'utf8')
    const rootName = `q-${name}`
    if (hasRootMatcher(source, rootName)) roots.push(rootName)
  } catch {
    // Some folders hold helper modules rather than component rules.
  }
}

const resetSource = await readFile(resetFile, 'utf8')
const missing = roots.filter(
  (rootName) => !hasRootMatcher(resetSource, rootName)
)
const STYLE_ONLY_OR_STRUCTURAL = new Set([
  // Components whose root does not paint a literal theme role under the base
  // component rule walk. State-specific/member paint is covered separately by
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
const uncovered = missing.filter(
  (rootName) => !STYLE_ONLY_OR_STRUCTURAL.has(rootName)
)
if (uncovered.length > 0) {
  console.error(`Missing unstyled root reset matchers: ${uncovered.join(', ')}`)
  process.exitCode = 1
} else {
  console.log(
    `Checked ${roots.length} core component roots; ${missing.length} are explicitly documented structural/style-only exclusions: ${missing.join(', ')}.`
  )
}
