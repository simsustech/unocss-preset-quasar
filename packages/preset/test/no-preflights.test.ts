// Step 3: the rewrite emits component styles through generator rules only.
// No component/core barrel may export preflights (theme tokens excepted —
// theme is not part of these barrels), and every Shortcuts export must be an
// empty array.
import { describe, it, expect } from 'vitest'
import * as componentModules from '../src/components/index.js'
import * as coreModules from '../src/core/index.js'

describe('no preflights outside theme, no shortcuts', () => {
  it('exports no *Preflight(s) from component or core barrels', () => {
    const leaked = Object.keys({ ...componentModules, ...coreModules }).filter(
      (k) => /preflights?$/i.test(k)
    )
    expect(leaked).toEqual([])
  })

  it('keeps every *Shortcuts export an empty array', () => {
    const mods = { ...componentModules, ...coreModules } as Record<
      string,
      unknown
    >
    const nonEmpty = Object.entries(mods)
      .filter(([k, v]) => /shortcuts$/i.test(k))
      .filter(([, v]) => !(Array.isArray(v) && v.length === 0))
      .map(([k]) => k)
    expect(nonEmpty).toEqual([])
  })
})
