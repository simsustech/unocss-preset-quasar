#!/usr/bin/env node
/**
 * generate-shared.mjs — Generate spec-driven shared templates + wrappers
 *
 * For each component in md3/components/:
 * 1. Read the original md3 source (most complete)
 * 2. Replace all $light-* → ${s('color.*')}, $dark-* → ${s('darkTokens.color.*')}
 * 3. Also replace $shape-* → ${s('shape.*')}
 * 4. Wrap in a make*Shortcuts(s) function
 * 5. Write to shared/components/Q*.unocss.ts
 * 6. Write thin wrappers to md3/components/, md2/components/, unstyled/components/
 */

import fs from 'fs'
import path from 'path'

const PRESET_DIR = new URL('..', import.meta.url).pathname
const MD3_DIR = path.join(PRESET_DIR, 'src/styles/md3/components')
const MD2_DIR = path.join(PRESET_DIR, 'src/styles/md2/components')
const SHARED_DIR = path.join(PRESET_DIR, 'src/styles/shared/components')
const UNSTYLED_DIR = path.join(PRESET_DIR, 'src/styles/unstyled/components')

// ─── Token mappings ────────────────────────────────────────────

const LIGHT_TOKENS = {
  primary: 'color.primary',
  'on-primary': 'color.onPrimary',
  'primary-container': 'color.primaryContainer',
  'on-primary-container': 'color.onPrimaryContainer',
  secondary: 'color.secondary',
  'on-secondary': 'color.onSecondary',
  'secondary-container': 'color.secondaryContainer',
  'on-secondary-container': 'color.onSecondaryContainer',
  tertiary: 'color.tertiary',
  'on-tertiary': 'color.onTertiary',
  'tertiary-container': 'color.tertiaryContainer',
  'on-tertiary-container': 'color.onTertiaryContainer',
  error: 'color.error',
  'on-error': 'color.onError',
  'error-container': 'color.errorContainer',
  'on-error-container': 'color.onErrorContainer',
  background: 'color.background',
  'on-background': 'color.onBackground',
  surface: 'color.surface',
  'on-surface': 'color.onSurface',
  'surface-variant': 'color.surfaceVariant',
  'on-surface-variant': 'color.onSurfaceVariant',
  'surface-container-lowest': 'color.surfaceContainerLowest',
  'surface-container-low': 'color.surfaceContainerLow',
  'surface-container': 'color.surfaceContainer',
  'surface-container-high': 'color.surfaceContainerHigh',
  'surface-container-highest': 'color.surfaceContainerHighest',
  outline: 'color.outline',
  'outline-variant': 'color.outlineVariant',
  'inverse-surface': 'color.inverseSurface',
  'inverse-on-surface': 'color.inverseOnSurface',
  'inverse-primary': 'color.inversePrimary',
  shadow: 'color.shadow',
  scrim: 'color.scrim',
  // Additional tokens (Quasar-specific)
  'dark-page': 'color.darkPage',
  brand: 'color.brand',
  accent: 'color.accent',
  positive: 'color.positive',
  negative: 'color.negative',
  info: 'color.info',
  warning: 'color.warning'
}

const SHAPE_TOKENS = {
  'corner-extra-small': 'shape.cornerExtraSmall',
  'corner-small': 'shape.cornerSmall',
  'corner-medium': 'shape.cornerMedium',
  'corner-large': 'shape.cornerLarge',
  'corner-extra-large': 'shape.cornerExtraLarge',
  'corner-full': 'shape.cornerFull'
}

const TYPOGRAPHY_TOKENS = {
  'font-family': 'typography.fontFamily',
  'display-large': 'typography.displayLarge',
  'display-medium': 'typography.displayMedium',
  'display-small': 'typography.displaySmall',
  'headline-large': 'typography.headlineLarge',
  'headline-medium': 'typography.headlineMedium',
  'headline-small': 'typography.headlineSmall',
  'title-large': 'typography.titleLarge',
  'title-medium': 'typography.titleMedium',
  'title-small': 'typography.titleSmall',
  'body-large': 'typography.bodyLarge',
  'body-medium': 'typography.bodyMedium',
  'body-small': 'typography.bodySmall',
  'label-large': 'typography.labelLarge',
  'label-medium': 'typography.labelMedium',
  'label-small': 'typography.labelSmall',
  'hover-opacity': 'typography.hoverOpacity',
  'focus-opacity': 'typography.focusOpacity',
  'pressed-opacity': 'typography.pressedOpacity',
  'dragged-opacity': 'typography.draggedOpacity'
}

/**
 * Convert $light-<kebab> and $dark-<kebab> to s() calls in template literals.
 * Handles both backtick strings and template expressions.
 */
function convertTokens(content) {
  let result = content

  // Build sorted patterns (longest first to avoid partial matches)
  const lightEntries = Object.entries(LIGHT_TOKENS).sort(
    (a, b) => b[0].length - a[0].length
  )
  const shapeEntries = Object.entries(SHAPE_TOKENS).sort(
    (a, b) => b[0].length - a[0].length
  )
  const typoEntries = Object.entries(TYPOGRAPHY_TOKENS).sort(
    (a, b) => b[0].length - a[0].length
  )

  // Pre-compile all replacements
  const replacements = []

  for (const [kebab, spec] of lightEntries) {
    const escaped = kebab.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    replacements.push({
      pattern: new RegExp(`\\$light-${escaped}`, 'g'),
      replacement: `\${s('${spec}')}`
    })
    replacements.push({
      pattern: new RegExp(`\\$dark-${escaped}`, 'g'),
      replacement: `\${s('darkTokens.${spec}')}`
    })
  }

  for (const [kebab, spec] of shapeEntries) {
    const escaped = kebab.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    replacements.push({
      pattern: new RegExp(`\\$shape-${escaped}`, 'g'),
      replacement: `\${s('${spec}')}`
    })
  }

  for (const [kebab, spec] of typoEntries) {
    const escaped = kebab.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    replacements.push({
      pattern: new RegExp(`\\$typography-${escaped}`, 'g'),
      replacement: `\${s('${spec}')}`
    })
  }

  // Apply all replacements
  for (const { pattern, replacement } of replacements) {
    result = result.replace(pattern, replacement)
  }

  return result
}

/**
 * Convert a component name to a make function name.
 * E.g., "QBtn" → "makeQBtnShortcuts", "QAjaxBar" → "makeQAjaxBarShortcuts"
 */
function makeFnName(component) {
  return `make${component}Shortcuts`
}

/**
 * Convert the md3 component source into a shared template.
 */
function generateSharedTemplate(componentName, md3Source) {
  // Convert all $light-*/$dark-*/$shape-*/$typography-* references to s() calls
  let body = convertTokens(md3Source)

  // The source should already export `const shortcuts = [...]` or similar
  // We need to wrap it in a make*Shortcuts(s) function

  // Build the function name
  const fnName = makeFnName(componentName)

  // Check if the source has preflights
  const hasPreflights =
    body.includes('const preflights:') || body.includes('const preflights ')

  // Remove the original export statement
  body = body.replace(/^export \{ shortcuts \}\s*$/m, '')
  body = body.replace(/^export \{ preflights, shortcuts \}\s*$/m, '')
  body = body.replace(/^export \{ shortcuts, preflights \}\s*$/m, '')

  // Generate the result
  let result = `/**
 * ${componentName}.unocss.ts — Unified ${componentName} style template
 *
 * Spec-driven version: uses the bound spec resolver \`s()\` to
 * interpolate token values at shortcut-build time.
 *
 * Each style module calls \`${fnName}(bindSpec(spec))\` and
 * merges the result into its own shortcut list.
 *
 * @module Styles
 */

import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import {
  componentCtxClass,
  componentClass,
  staticClass,
  qe
} from '../../_helpers.js'
import type { SpecResolver } from '../../_spec.js'

${body.trim()}

export function ${fnName}(s: SpecResolver): Shortcut<QuasarTheme>[] {
  return shortcuts
}
`

  if (hasPreflights) {
    result = `/**
 * ${componentName}.unocss.ts — Unified ${componentName} style template
 *
 * Spec-driven version: uses the bound spec resolver \`s()\` to
 * interpolate token values at shortcut-build time.
 *
 * Each style module calls \`${fnName}(bindSpec(spec))\` and
 * merges the result into its own shortcut list.
 *
 * @module Styles
 */

import type { Preflight, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import {
  componentCtxClass,
  componentClass,
  staticClass,
  qe
} from '../../_helpers.js'
import type { SpecResolver } from '../../_spec.js'

${body.trim()}

export function ${fnName}(s: SpecResolver): Shortcut<QuasarTheme>[] {
  return shortcuts
}
`
  }

  return result
}

/**
 * Generate a thin wrapper file for a specific style.
 */
function generateWrapper(componentName, style, hasPreflights) {
  const fnName = makeFnName(componentName)
  const sharedPath = `../../shared/components/${componentName}.unocss.js`

  if (!hasPreflights) {
    return `import type { QuasarTheme } from '../../../theme.js'
import { ${fnName} } from '${sharedPath}'
import { bindSpec } from '../../_spec.js'

const s = bindSpec('${style}')
export const shortcuts = ${fnName}(s)
`
  }

  return `import { type Preflight, type Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { ${fnName} } from '${sharedPath}'
import { bindSpec } from '../../_spec.js'

const s = bindSpec('${style}')
export const shortcuts = ${fnName}(s)
`
}

/**
 * Process all components.
 */
function processAll() {
  const files = fs.readdirSync(MD3_DIR).filter((f) => f.endsWith('.unocss.ts'))

  console.log(`Processing ${files.length} components...`)

  for (const file of files) {
    const match = file.match(/^Q(.+)\.unocss\.ts$/)
    if (!match) {
      console.log(`  SKIP (no Q match): ${file}`)
      continue
    }
    const componentName = `Q${match[1]}`
    const md3Path = path.join(MD3_DIR, file)
    const md2Path = path.join(MD2_DIR, file)
    const sharedPath = path.join(SHARED_DIR, file)
    const unstyledPath = path.join(UNSTYLED_DIR, file)

    // Read the md3 source (preferred source of truth)
    const md3Source = fs.readFileSync(md3Path, 'utf8')

    // Check if md2 exists
    const hasMd2 = fs.existsSync(md2Path)

    if (!hasMd2) {
      console.log(`  SKIP (no md2): ${file}`)
      continue
    }

    // Check for preflights
    const hasPreflights =
      md3Source.includes('const preflights:') ||
      md3Source.includes('const preflights ')

    // Generate shared template
    const sharedContent = generateSharedTemplate(componentName, md3Source)

    // Write shared template
    fs.mkdirSync(SHARED_DIR, { recursive: true })
    fs.writeFileSync(sharedPath, sharedContent)

    // Write md3 wrapper
    const md3Wrapper = generateWrapper(componentName, 'md3', hasPreflights)
    fs.writeFileSync(md3Path, md3Wrapper)

    // Write md2 wrapper
    if (hasMd2) {
      const md2Wrapper = generateWrapper(componentName, 'md2', hasPreflights)
      fs.writeFileSync(md2Path, md2Wrapper)
    }

    // Write unstyled wrapper if it exists
    if (fs.existsSync(unstyledPath)) {
      const unstyledWrapper = generateWrapper(
        componentName,
        'unstyled',
        hasPreflights
      )
      fs.writeFileSync(unstyledPath, unstyledWrapper)
    }

    console.log(`  OK: ${file}${hasPreflights ? ' (preflights)' : ''}`)
  }

  console.log('\nDone!')
}

processAll()
