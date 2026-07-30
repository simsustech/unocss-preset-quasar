/**
 * spec-inventory.mjs
 *
 * Static extraction of hardcoded stylistic literals from every
 * style per-component unocss.ts files. The report drives the
 * StyleSpec schema curation: every px, rgba, timing, and fixed
 * value found in component shortcuts is inventoried per component
 * and selector.
 *
 * Usage: node scripts/spec-inventory.mjs [--json]
 *   --json  output as JSON (default: markdown table)
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const PRESET_ROOT = resolve(import.meta.dirname, '..')
const STYLES_DIR = join(PRESET_ROOT, 'src', 'styles')

// Literal patterns we care about: px values, rgba values, timing, fixed dimensions
const LITERAL_RE =
  /(?:^|[\s,(])(\d+(?:\.\d+)?)(px|em|rem|%|ms|s)\b|rgba?\([^)]+\)|cubic-bezier\([^)]+\)/gi

// Tokens / vars — skip these
const TOKEN_RE = /^\$[\w-]+|var\(--/i

function extractLiterals(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const literals = []
  let currentSelector = null
  let inShortcut = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Track current regex/selector context
    const selectorMatch = line.match(/\/\^(.+?)\/\s*,/)
    if (selectorMatch) {
      currentSelector = selectorMatch[1]
    }

    // Find literal values in class strings (backtick strings or parentheses)
    const classStrMatch = line.match(/`([^`]*)`/)
    if (classStrMatch) {
      const classStr = classStrMatch[1]
      let m
      LITERAL_RE.lastIndex = 0
      while ((m = LITERAL_RE.exec(classStr)) !== null) {
        const raw = m[0].trim()
        if (!TOKEN_RE.test(raw)) {
          literals.push({
            line: i + 1,
            selector: currentSelector,
            value: raw,
            context: classStr
              .substring(Math.max(0, m.index - 20), m.index + raw.length + 20)
              .trim()
          })
        }
      }
    }
  }

  return literals
}

function scanComponentFiles(dir) {
  const inventory = {}

  if (!existsSync(dir)) return inventory

  const entries = readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.name.endsWith('.unocss.ts')) {
      const filePath = join(dir, entry.name)
      const componentName = entry.name.replace('.unocss.ts', '')
      const literals = extractLiterals(filePath)
      if (literals.length > 0) {
        inventory[componentName] = literals
      }
    }
  }

  // Recurse into subdirectories
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const sub = scanComponentFiles(join(dir, entry.name))
      for (const [k, v] of Object.entries(sub)) {
        inventory[k] = v
      }
    }
  }

  return inventory
}

function scanAllStyles() {
  const all = {}

  const styleDirs = readdirSync(STYLES_DIR, { withFileTypes: true })
  for (const entry of styleDirs) {
    if (entry.isDirectory() && entry.name !== 'shared') {
      const componentsDir = join(STYLES_DIR, entry.name, 'components')
      if (existsSync(componentsDir)) {
        all[entry.name] = scanComponentFiles(componentsDir)
      }
    }
  }

  // Also scan shared components
  const sharedComponentsDir = join(STYLES_DIR, 'shared', 'components')
  if (existsSync(sharedComponentsDir)) {
    all.shared = scanComponentFiles(sharedComponentsDir)
  }

  return all
}

function printMarkdown(inventory) {
  const styles = Object.keys(inventory).sort()
  for (const style of styles) {
    console.log(`\n## ${style}\n`)
    const components = Object.keys(inventory[style]).sort()
    for (const component of components) {
      const literals = inventory[style][component]
      console.log(`### ${component} (${literals.length} literals)\n`)
      console.log('| Line | Selector | Value | Context |')
      console.log('|------|----------|-------|---------|')
      for (const lit of literals.slice(0, 30)) {
        const ctx = lit.context.replace(/\|/g, '\\|').substring(0, 80)
        console.log(
          `| ${lit.line} | ${lit.selector || ''} | \`${lit.value}\` | ${ctx} |`
        )
      }
      if (literals.length > 30) {
        console.log(`| … | … | _+${literals.length - 30} more_ | … |`)
      }
      console.log()
    }
  }
}

function printJSON(inventory) {
  process.stdout.write(JSON.stringify(inventory, null, 2))
}

// Main
const allInventory = scanAllStyles()

if (process.argv.includes('--json')) {
  printJSON(allInventory)
} else {
  console.log('# StyleSpec Inventory Report')
  console.log(`\nGenerated: ${new Date().toISOString()}`)
  console.log(`\nScanned: ${STYLES_DIR}`)

  const totalComponents = Object.values(allInventory).reduce(
    (acc, style) => acc + Object.keys(style).length,
    0
  )
  const totalLiterals = Object.values(allInventory).reduce(
    (acc, style) =>
      acc + Object.values(style).reduce((a, comp) => a + comp.length, 0),
    0
  )
  console.log(
    `\n**${totalComponents} components, ${totalLiterals} literal values found.**`
  )

  printMarkdown(allInventory)
}
