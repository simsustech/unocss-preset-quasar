import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { createGenerator } from 'unocss'
import { describe, expect, it } from 'vitest'
import { QuasarPreset } from '../src/index.js'

/**
 * The nested engine is `@unocss/preset-mini`, and that is public behaviour: it
 * decides the value form of every non-Quasar utility (`p-4`, `bg-red-500/50`,
 * `shadow-lg`), which selector `dark:` hangs off, and whether a base reset
 * ships. These assertions pin the reason the engine is mini and not wind4 —
 * wind4 registers `--un-*` on demand through `@property` (so a Quasar-only page
 * references declarations nobody defined), ships a base reset (which clobbers
 * Quasar's buttons) and defines a bare `col-N` grid rule (which would shadow
 * Quasar's flexbox `col-N`) — plus the absence of the dependency in `src/`, so
 * the swap cannot silently come back.
 */
describe('the nested engine is preset-mini', () => {
  it('nests preset-mini and no wind4 preset', () => {
    const names = QuasarPreset({}).presets?.map((p) => p.name) ?? []
    expect(names).toContain('@unocss/preset-mini')
    expect(
      names.filter((name) => typeof name === 'string' && name.includes('wind4'))
    ).toEqual([])
  })

  it('has no wind4 import left in src/', () => {
    const files = readdirSync('src', { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith('.ts'))
      .map((entry) => join(entry.parentPath, entry.name))
    // Guard against a vacuous pass if the scan stops finding sources.
    expect(files.length).toBeGreaterThan(100)
    // An *import* of the package, not a mention of its name: the docs in
    // `src/index.ts` cite the installed path when they explain wind4's option
    // normalisation.
    const importsWind4 = (source: string): boolean =>
      /(?:^|\n)\s*(?:import|export)[^;\n]*from\s*['"]@unocss\/preset-wind4['"]/.test(
        source
      ) || /\bimport\(\s*['"]@unocss\/preset-wind4['"]/.test(source)
    expect(
      files.filter((file) => importsWind4(readFileSync(file, 'utf8')))
    ).toEqual([])
  })

  it('routes `dark:` through Quasar’s own scheme selectors', async () => {
    const gen = await createGenerator({ presets: [QuasarPreset({})] })
    const { css } = await gen.generate('dark:bg-black', { preflights: false })
    expect(css).toMatch(/\.body--dark[^{]*\{[^}]*background-color/)
  })

  it('keeps Quasar’s own `col-6`', async () => {
    const gen = await createGenerator({ presets: [QuasarPreset({})] })
    const { css } = await gen.generate('col-6', { preflights: false })
    // Quasar's `.col-6` is the flexbox span; a grid-family engine would emit
    // `grid-column: 6` for the same class instead.
    expect(css).toContain('--q-col-span')
    expect(css).not.toContain('grid-column: 6')
  })
})
