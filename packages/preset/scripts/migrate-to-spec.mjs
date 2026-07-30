#!/usr/bin/env node
/**
 * Migration script: converts all component files to spec-driven templates.
 *
 * For each component that exists in both md3 and md2:
 * 1. Fixes shared template to export make*Shortcuts(s) function
 * 2. Fixes shared template to export make*Preflights(s) if applicable
 * 3. Replaces md3 and md2 files with thin wrappers
 * 4. Handles unstyled wrappers
 *
 * Run: node scripts/migrate-to-spec.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { basename, join } from 'path'
import { execSync } from 'child_process'

const CWD = process.cwd()
const STYLES = join(CWD, 'src/styles')
const SHARED = join(STYLES, 'shared/components')
const MD3 = join(STYLES, 'md3/components')
const MD2 = join(STYLES, 'md2/components')
const UNSTYLED = join(STYLES, 'unstyled/components')

function ls(dir) {
  const out = execSync(`ls "${dir}"/*.unocss.ts 2>/dev/null || true`, {
    encoding: 'utf-8'
  })
  return out.trim().split('\n').filter(Boolean).sort()
}

function read(p) {
  try {
    return readFileSync(p, 'utf-8')
  } catch {
    return null
  }
}

function nameOf(path) {
  return basename(path, '.unocss.ts')
}

function exists(p) {
  try {
    readFileSync(p)
    return true
  } catch {
    return false
  }
}

/**
 * Fix a shared template: ensure it exports make*Shortcuts(s) and make*Preflights(s)
 * The shared template should use `s()` for token values (we don't change the values,
 * just ensure the function wrapper exists).
 */
function fixSharedTemplate(compName, md3Content) {
  const sharedPath = join(SHARED, `${compName}.unocss.ts`)
  let content = read(sharedPath)
  if (!content) return null

  const fnName = `make${compName}Shortcuts`
  const pfName = `make${compName}Preflights`
  const hasPf =
    md3Content.includes('preflights:') || md3Content.includes('preflights =')

  // If it already has the function, it's fine (even if it ignores _s)
  if (content.includes(`function ${fnName}`)) {
    return content
  }

  // Content has the shortcuts/preflights defined as const
  // Wrap them in a function
  // Remove any existing `export { shortcuts }` or similar lines
  content = content.replace(/^export \{ [^}]+\}$/gm, '')

  // Remove old-style header comment if exists
  // Add our wrapper
  if (hasPf) {
    content += `

export function ${fnName}(_s: any) {
  return shortcuts
}

export function ${pfName}(_s: any) {
  return preflights
}
`
  } else {
    content += `

export function ${fnName}(_s: any) {
  return shortcuts
}
`
  }

  writeFileSync(sharedPath, content)
  return content
}

/**
 * Generate a thin wrapper for any style file
 */
function wrapperFor(compName, style, hasPf) {
  const fn = `make${compName}Shortcuts`
  const pfFn = `make${compName}Preflights`

  let r = `import { type Shortcut${hasPf ? ', type Preflight' : ''} } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { ${fn}${hasPf ? `, ${pfFn}` : ''} } from '../../shared/components/${compName}.unocss.js'
import { bindSpec } from '../../_spec.js'

const s = bindSpec('${style}')

export const shortcuts = ${fn}(s)
`
  if (hasPf) {
    r += `export const preflights = ${pfFn}(s)
`
  }
  return r
}

// ===== MAIN =====

console.log('=== Migration: spec-driven wrappers ===\n')

const md3Files = ls(MD3)
const md2Files = ls(MD2)
const md3Names = new Set(md3Files.map(nameOf))
const md2Names = new Set(md2Files.map(nameOf))
const all = [...md3Names].filter((n) => md2Names.has(n)).sort()

console.log(
  `Components: ${md3Names.size} md3, ${md2Names.size} md2, ${all.length} common\n`
)

let fixed = 0
let wrapperCount = 0
let skipped = 0

for (const compName of all) {
  const md3Content = read(join(MD3, `${compName}.unocss.ts`))
  const hasPf =
    md3Content &&
    (md3Content.includes('preflights:') || md3Content.includes('preflights ='))

  // 1. Fix shared template
  const fixedContent = fixSharedTemplate(compName, md3Content || '')
  if (!fixedContent) {
    console.log(`  SKIP (no shared): ${compName}`)
    skipped++
    continue
  }
  fixed++

  // 2. Write md3 wrapper
  writeFileSync(
    join(MD3, `${compName}.unocss.ts`),
    wrapperFor(compName, 'md3', hasPf)
  )
  wrapperCount++

  // 3. Write md2 wrapper
  writeFileSync(
    join(MD2, `${compName}.unocss.ts`),
    wrapperFor(compName, 'md2', hasPf)
  )
  wrapperCount++

  // 4. Write unstyled wrapper if exists
  if (exists(join(UNSTYLED, `${compName}.unocss.ts`))) {
    writeFileSync(
      join(UNSTYLED, `${compName}.unocss.ts`),
      wrapperFor(compName, 'unstyled', hasPf)
    )
    wrapperCount++
  }

  process.stdout.write('.')
}

console.log(
  `\n\nFixed: ${fixed}, Wrappers: ${wrapperCount}, Skipped: ${skipped}`
)
console.log('Run: pnpm test')
