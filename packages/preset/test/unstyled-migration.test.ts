// The unstyled resets belong to the style, not to every component file.
//
// Each ported rule that states a literal colour or shadow carries a
// `body.quasar-style-unstyled …` stub beside its base rule, so the reset ships
// whether or not the app lists `Unstyled` — the sheet cannot tell the two apart.
// Moving the stubs into the style entry makes inclusion the only switch and
// leaves the component rules about their own theming. The cascade has to survive
// the move: the reset still comes after the base rule it neutralises.
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { createGenerator } from 'unocss'
import { MaterialDesign3, QuasarPreset, Unstyled } from '../src/index.js'
import type { QuasarStyleEntry } from '../src/index.js'

const HERE = dirname(fileURLToPath(import.meta.url))
const COMPONENTS = join(HERE, '..', 'src', 'components')

/** Every `rules.ts` under the component modules, at any depth. */
function ruleFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return ruleFiles(path)
    return entry.name === 'rules.ts' ? [path] : []
  })
}

async function sheet(
  styles: QuasarStyleEntry[],
  content = 'q-btn'
): Promise<string> {
  const gen = await createGenerator({ presets: [QuasarPreset({ styles })] })
  return (await gen.generate(content, { preflights: false })).css
}

describe('the unstyled resets belong to the style', () => {
  it('leaves no unstyled stub behind in the component rules', () => {
    const offenders = ruleFiles(COMPONENTS)
      .filter((file) =>
        readFileSync(file, 'utf8').includes('quasar-style-unstyled')
      )
      .map((file) => file.slice(COMPONENTS.length + 1))
    expect(offenders).toEqual([])
  })

  it('ships no unstyled reset when Unstyled is not listed', async () => {
    const css = await sheet([MaterialDesign3])
    expect(css).toContain('.q-btn{')
    expect(css).not.toContain('quasar-style-unstyled')
  })

  it('ships the scoped reset when Unstyled is listed', async () => {
    const css = await sheet([MaterialDesign3, Unstyled])
    // UnoCSS groups yields with identical bodies into one selector list, so the
    // reset is found by its member, not as a standalone block.
    const stub = css.indexOf('body.quasar-style-unstyled .q-btn')
    expect(stub).toBeGreaterThan(-1)
    const declarations = css.slice(
      css.indexOf('{', stub) + 1,
      css.indexOf('}', stub)
    )
    expect(declarations).toContain('background:none')
    expect(declarations).toContain('color:inherit')
  })

  it('applies the reset unscoped when Unstyled is the baseline', async () => {
    // The baseline's tokens land on `body` with no class, so its resets have to
    // as well: listing `Unstyled` first is the only switch an app sets.
    const css = await sheet([Unstyled])
    const start = css.indexOf('.q-btn{')
    const block = css.slice(start, css.indexOf('}', start))
    expect(block).toContain('background:none')
    expect(block).toContain('color:inherit')
  })
})
