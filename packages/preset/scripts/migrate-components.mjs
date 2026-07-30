#!/usr/bin/env node
/**
 * migrate-components.mjs
 *
 * Migrates all Quasar UnoCSS component files to spec-driven templates.
 * For each component in md3+md2:
 * 1. Create shared template in shared/components/
 * 2. Replace md3/md2 files with thin wrappers
 * 3. Replace unstyled files with thin wrappers
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(__dirname, '..')
const SRC = path.join(REPO, 'src/styles')

const COMPONENT_DIRS = {
  md3: path.join(SRC, 'md3/components'),
  md2: path.join(SRC, 'md2/components'),
  unstyled: path.join(SRC, 'unstyled/components')
}
const SHARED_DIR = path.join(SRC, 'shared/components')

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function readFile(file) {
  if (!fs.existsSync(file)) return null
  return fs.readFileSync(file, 'utf-8')
}

function componentName(filename) {
  return filename.replace(/\.unocss\.ts$/, '')
}

function makeFuncName(name) {
  return `make${name}Shortcuts`
}
function makePreFuncName(name) {
  return `make${name}Preflights`
}

/**
 * Replace UnoCSS $variable references with s() calls.
 * Handles patterns like:
 *   $light-primary          → ${s('color.primary')}
 *   $dark-on-primary        → ${s('darkTokens.color.onPrimary')}
 *   $light-surface-container-low → ${s('color.surfaceContainerLow')}
 *   $shape-corner-large     → ${s('shape.cornerLarge')}
 *   $shape-corner-extra-large → ${s('shape.cornerExtraLarge')}
 */
function replaceUnoVariables(str) {
  // Replace $light-XXX.YYY → s('color.XXX.YYY') but $light-XXX is the common form
  // $light-primary → ${s('color.primary')}
  // $light-on-primary → ${s('color.onPrimary')}
  // $light-surface-container-low → ${s('color.surfaceContainerLow')}
  // $light-primary-container → ${s('color.primaryContainer')}
  str = str.replace(
    /\$light-([a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9])/g,
    (match, name) => {
      // Convert kebab-case to camelCase: "surface-container-low" → "surfaceContainerLow"
      const camelName = name.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
      return `\${s('color.${camelName}')}`
    }
  )

  // $dark-primary → ${s('darkTokens.color.primary')}
  str = str.replace(
    /\$dark-([a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9])/g,
    (match, name) => {
      const camelName = name.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
      return `\${s('darkTokens.color.${camelName}')}`
    }
  )

  // $shape-corner-large → ${s('shape.cornerLarge')}
  // $shape-corner-extra-large → ${s('shape.cornerExtraLarge')}
  str = str.replace(/\$shape-([a-zA-Z-]+)/g, (match, name) => {
    const camelName = name.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    return `\${s('shape.${camelName}')}`
  })

  return str
}

/**
 * Detect which helpers are actually used in the template content.
 */
function detectImports(md3Content, md2Content) {
  const all = (md3Content || '') + (md2Content || '')
  const helpers = []
  const check = (name) => all.includes(name)

  if (check('componentCtxClass')) helpers.push('  componentCtxClass,')
  if (check('componentClass')) helpers.push('  componentClass,')
  if (check('staticClass')) helpers.push('  staticClass,')
  if (
    check('qe`') ||
    check('qe(') ||
    all.includes('qe`') ||
    all.includes('qe(')
  ) {
    helpers.push('  qe,')
  }

  return helpers
}

function detectUnoContent(md3Content, md2Content) {
  const all = (md3Content || '') + (md2Content || '')
  return (
    all.includes('$light-') || all.includes('$dark-') || all.includes('$shape-')
  )
}

/**
 * Extract the shortcuts array body (including surrounding brackets).
 * Works with SimpleShortcutMatcher and DynamicShortcutMatcher.
 */
function extractShortcutsArray(content) {
  if (!content) return null

  // For the pattern: const shortcuts: Shortcut<QuasarTheme>[] = [...]
  const match = content.match(
    /(?:const|export)\s+(?:const\s+)?shortcuts\s*:\s*(?:Shortcut<QuasarTheme>\[\]|Shortcut<QuasarTheme>\w*\[\])\s*=\s*(\[[\s\S]*?\])\s*(?:;|\n|$)/
  )
  if (match) return match[1]

  return null
}

function extractPreflightsArray(content) {
  if (!content) return null
  const match = content.match(
    /(?:const|export)\s+(?:const\s+)?preflights\s*:\s*(?:Preflight<QuasarTheme>\[\]|Preflight<QuasarTheme>\w*\[\])\s*=\s*(\[[\s\S]*?\])\s*(?:;|\n|$)/
  )
  if (match) return match[1]
  return null
}

/**
 * Generate shared template content.
 */
function createSharedTemplate(compName, md3Content, md2Content) {
  const funcName = makeFuncName(compName)
  const preFuncName = makePreFuncName(compName)

  // Extract shortcuts array - prefer md3 structure
  const shortcutsArray =
    extractShortcutsArray(md3Content) || extractShortcutsArray(md2Content)
  const preflightsArray =
    extractPreflightsArray(md3Content) || extractPreflightsArray(md2Content)

  if (!shortcutsArray) {
    console.log(`  ERROR: Cannot extract shortcuts from ${compName}`)
    return null
  }

  const hasPre = !!preflightsArray

  // Replace UnoCSS $variables with s() calls
  let processedShortcuts = replaceUnoVariables(shortcutsArray)

  // Detect imports
  const helpers = detectImports(md3Content, md2Content)
  const importList = `import type { Shortcut${hasPre ? ', Preflight' : ''} } from '@unocss/core'\n`

  let output = `/**
 * ${compName}.unocss.ts — Unified ${compName} style template
 *
 * Spec-driven version: uses the bound spec resolver \`s()\` to
 * interpolate token values at shortcut-build time.
 *
 * Each style module calls \`${funcName}(bindSpec(spec))\` and
 * merges the result into its own shortcut list.
 *
 * @module Styles
 */
${importList}import type { QuasarTheme } from '../../../theme.js'
import {
${helpers.join('\n')}
} from '../../_helpers.js'
import type { SpecResolver } from '../../_spec.js'

/**
 * Generate ${compName} shortcuts bound to a specific style's spec.
 *
 * @param s - The bound spec resolver from \`bindSpec(spec)\`.
 * @returns An array of UnoCSS shortcuts.
 */
export function ${funcName}(s: SpecResolver): Shortcut<QuasarTheme>[] {
  return ${processedShortcuts}
}
`

  if (hasPre) {
    let processedPreflights = replaceUnoVariables(preflightsArray)
    output += `
/**
 * Generate ${compName} preflights bound to a specific style's spec.
 */
export function ${preFuncName}(s: SpecResolver): Preflight<QuasarTheme>[] {
  return ${processedPreflights}
}
`
  }

  return output
}

/**
 * Create a thin wrapper for a specific style.
 */
function createWrapper(compName, style, hasPre) {
  const funcName = makeFuncName(compName)
  const preFuncName = makePreFuncName(compName)
  const sharedPath = `../../shared/components/${compName}.unocss.js`

  if (hasPre) {
    return `import { type Preflight, type Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { ${funcName}, ${preFuncName} } from '${sharedPath}'
import { bindSpec } from '../../_spec.js'

const s = bindSpec('${style}')
export const shortcuts = ${funcName}(s)
export const preflights = ${preFuncName}(s)
`
  }

  return `import type { QuasarTheme } from '../../../theme.js'
import { ${funcName} } from '${sharedPath}'
import { bindSpec } from '../../_spec.js'

const s = bindSpec('${style}')
export const shortcuts = ${funcName}(s)
`
}

/**
 * Process a single component file.
 */
function processComponent(filename) {
  const compName = componentName(filename)
  const md3Content = readFile(path.join(COMPONENT_DIRS.md3, filename))
  const md2Content = readFile(path.join(COMPONENT_DIRS.md2, filename))

  if (!md3Content || !md2Content) {
    console.log(`  SKIP ${compName}: missing in md3 or md2`)
    return false
  }

  const hasPre =
    !!extractPreflightsArray(md3Content) || !!extractPreflightsArray(md2Content)

  // Create shared template
  const sharedContent = createSharedTemplate(compName, md3Content, md2Content)
  if (!sharedContent) {
    console.log(`  FAILED ${compName}: could not create shared template`)
    return false
  }

  fs.writeFileSync(path.join(SHARED_DIR, filename), sharedContent)

  // Create md3 wrapper
  fs.writeFileSync(
    path.join(COMPONENT_DIRS.md3, filename),
    createWrapper(compName, 'md3', hasPre)
  )

  // Create md2 wrapper
  fs.writeFileSync(
    path.join(COMPONENT_DIRS.md2, filename),
    createWrapper(compName, 'md2', hasPre)
  )

  // Create unstyled wrapper if exists
  const unstyledFile = path.join(COMPONENT_DIRS.unstyled, filename)
  if (fs.existsSync(unstyledFile)) {
    fs.writeFileSync(unstyledFile, createWrapper(compName, 'unstyled', hasPre))
  }

  const hasUno = detectUnoContent(md3Content, md2Content)
  const diffType = md3Content === md2Content ? 'identical' : 'different'
  console.log(
    `  ${compName}: ${diffType}${hasUno ? ' (has $vars)' : ''}${hasPre ? ' [preflights]' : ''}`
  )
  return true
}

function main() {
  ensureDir(SHARED_DIR)

  const md3Files = fs
    .readdirSync(COMPONENT_DIRS.md3)
    .filter((f) => f.endsWith('.unocss.ts'))
    .sort()

  console.log(`Found ${md3Files.length} components\n`)

  let success = 0
  let failed = 0
  for (const filename of md3Files) {
    if (processComponent(filename)) success++
    else failed++
  }

  console.log(`\nProcessed: ${success} OK, ${failed} failed`)
}

main()
