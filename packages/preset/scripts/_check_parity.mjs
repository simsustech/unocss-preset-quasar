import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'
import { quasarSafelist } from '../src/safelist.js'
import { readFileSync } from 'fs'

const fixture = (() => {
  try {
    return JSON.parse(
      readFileSync('test/fixtures/reference-selectors.json', 'utf8')
    )
  } catch {
    throw new Error('Failed to parse fixture file')
  }
})()
const gen = await createGenerator({
  presets: [QuasarPreset({ styles: QuasarStyleEntries })]
})
const { css } = await gen.generate(quasarSafelist.join(' '), {
  preflights: false
})

function normalize(s) {
  return s
    .replace(/\bbody\.body--dark\b/g, '.body--dark')
    .replace(/\s+/g, ' ')
    .trim()
}

function hasSelector(css, sel) {
  return css.includes(normalize(sel)) || css.includes(sel)
}

let missing = 0
let found = 0
for (const r of fixture.rules) {
  if (hasSelector(css, r.selector)) {
    found++
  } else {
    missing++
    if (missing <= 20) console.log('MISSING:', r.selector.slice(0, 80))
  }
}
console.log(
  `\nCoverage: ${found}/${fixture.ruleCount} (${Math.round((found / fixture.ruleCount) * 100)}%)`
)
console.log(`Missing: ${missing} selectors`)
