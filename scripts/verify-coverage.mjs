#!/usr/bin/env node
/**
 * Completeness verification — verify no component selector from quasar.css
 * is missed in the port.
 */
import { readFileSync, readdirSync } from 'fs'

const css = readFileSync(
  'node_modules/.pnpm/quasar@2.30.1/node_modules/quasar/dist/quasar.css',
  'utf8'
)

const cssSelectors = new Set()
let i = 0
while (i < css.length) {
  if (css[i] === '/' && css[i + 1] === '*') {
    const end = css.indexOf('*/', i + 2)
    i = end + 2
    continue
  }
  if (/\s/.test(css[i])) {
    i++
    continue
  }

  const braceIndex = css.indexOf('{', i)
  if (braceIndex === -1) break

  const selector = css.slice(i, braceIndex).trim()
  if (selector) cssSelectors.add(selector)

  let depth = 1
  let j = braceIndex + 1
  while (j < css.length && depth > 0) {
    if (css[j] === '{') depth++
    else if (css[j] === '}') depth--
    j++
  }
  i = j
}

const rulePatterns = []
const ruleFiles = readdirSync('packages/preset/src/rules').filter((f) =>
  f.endsWith('.ts')
)
for (const file of ruleFiles) {
  const content = readFileSync(`packages/preset/src/rules/${file}`, 'utf8')
  const regexes = content.match(/\/\^[^\n]+\$\//g) || []
  regexes.forEach((r) => {
    const pattern = r.slice(1, -1)
    rulePatterns.push({ file, pattern, regex: new RegExp(pattern) })
  })
}

const preflightSelectors = new Set()
const preflightDirs = [
  'packages/preset/src/preflights',
  'packages/preset/src/preflights/components'
]
for (const dir of preflightDirs) {
  try {
    const files = readdirSync(dir).filter((f) => f.endsWith('.ts'))
    for (const file of files) {
      const content = readFileSync(`${dir}/${file}`, 'utf8')
      const matches = content.match(/`([^`]+)`/g) || []
      matches.forEach((m) => {
        const css = m.slice(1, -1)
        const selectors = css.match(/^[^{]+{/gm) || []
        selectors.forEach((s) => {
          const sel = s.replace('{', '').trim()
          if (sel) preflightSelectors.add(sel)
        })
      })
    }
  } catch {}
}

const uncovered = []
for (const selector of cssSelectors) {
  const coveredByRule = rulePatterns.some((p) => p.regex.test(selector))
  if (coveredByRule) continue

  const coveredByPreflight = preflightSelectors.has(selector)
  if (coveredByPreflight) continue

  uncovered.push(selector)
}

console.log(`Selectors in quasar.css: ${cssSelectors.size}`)
console.log(`Uncovered: ${uncovered.length}`)

if (uncovered.length > 0) {
  console.log('\nUncovered selectors (first 30):')
  uncovered.slice(0, 30).forEach((s) => console.log(`  ${s}`))
  process.exit(1)
} else {
  console.log('\n✓ Full coverage!')
  process.exit(0)
}
