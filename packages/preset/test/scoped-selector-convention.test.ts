// Scoped-selector convention: a `symbols.selector` yield must derive its
// selector from the argument UnoCSS passes in.
//
// A hardcoded string emits correct CSS today, but it no longer tracks the rule's
// own token. Re-key the rule and the yield silently keeps styling the old target
// with nothing failing — exactly how `/^q-btn-group > .q-btn$/` ended up keyed on
// a token that is not a runtime class Quasar adds, so it could never be
// safelisted and neither its declarations nor its dark override ever fired.
//
// 136 yields were converted to `${sel}`; the exceptions below are deliberate and
// listed with the reason a substitution is not appropriate. The list is exact in
// both directions: a new hardcoded yield fails, and a stale entry fails too.
import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = join(__dirname, '..', 'src')

interface Allowed {
  file: string
  selector: string
}

const ALLOWED: Allowed[] = [
  // Synthetic tokens that deliberately target element selectors, not a class.
  { file: 'src/core/typography/rules.ts', selector: 'body' },
  { file: 'src/core/typography/rules.ts', selector: '*,::before,::after' },
  // Self-target: the token already IS the dark scope, so `${sel}` is a no-op.
  { file: 'src/core/dark/rules.ts', selector: '.body--dark' },
  // Parent rules that also carry a modifier's dark rule. The modifier class is
  // always present alongside its base, so triggering on the parent is
  // equivalent to triggering on the modifier itself.
  {
    file: 'src/components/card/rules.ts',
    selector: '.body--dark .q-card--bordered'
  },
  {
    file: 'src/components/chip/rules.ts',
    selector: '.body--dark .q-chip__icon'
  },
  // dist states this one from the negative side: the border belongs to every
  // bottom bar *except* the nodata one, and the class that reaches the rule is
  // `q-table__bottom--nodata` — so `${sel}` would invert the meaning (AUD-023).
  {
    file: 'src/components/table/rules.ts',
    selector: '.q-table__bottom:not(.q-table__bottom--nodata)'
  },
  {
    file: 'src/components/linear-progress/rules.ts',
    selector: '.body--dark .q-linear-progress__track'
  },
  {
    file: 'src/components/tooltip/rules.ts',
    selector: '.body--dark .q-tooltip--style'
  }
]

function tsFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) return tsFiles(full)
    return entry.name.endsWith('.ts') ? [full] : []
  })
}

/** Every scoped yield whose selector literal contains no substitution. */
function hardcodedYields(): Allowed[] {
  const pattern =
    /\[symbols\.selector\]:\s*(?:\([^)]*\)\s*)?=>\s*(`[^`]*`|'[^']*'|"[^"]*")/g
  const found: Allowed[] = []
  for (const file of tsFiles(SRC)) {
    const text = readFileSync(file, 'utf8')
    for (const match of text.matchAll(pattern)) {
      const body = match[1].slice(1, -1)
      if (body.includes('${')) continue
      found.push({ file: relative(join(SRC, '..'), file), selector: body })
    }
  }
  return found
}

const key = (item: Allowed) => `${item.file}\u0000${item.selector}`

describe('scoped-selector convention', () => {
  it('uses the selector argument, except for the listed deliberate cases', () => {
    const found = hardcodedYields()
    expect(found.map(key).sort()).toEqual(ALLOWED.map(key).sort())
  })

  it('checks that every exemption still exists', () => {
    // Guards against a stale allowlist entry quietly permitting a regression
    // once the underlying rule is refactored away.
    const found = new Set(hardcodedYields().map(key))
    const stale = ALLOWED.filter((a) => !found.has(key(a)))
    expect(stale, 'stale allowlist entries').toEqual([])
  })
})
