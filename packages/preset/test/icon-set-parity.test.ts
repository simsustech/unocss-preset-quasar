// S2 — the generated per-library icon set table, against its source of truth.
//
// Seam: the emitted module `src/icons/quasar-icon-sets.generated.ts` (public
// export `QUASAR_ICON_SETS`), compared with `quasar/dist/icon-set/*.umd.prod.js`
// as installed in the preset's devDependencies. The generator is the only
// writer of the table; this test is what makes drift impossible to land.
import { describe, it, expect } from 'vitest'
import { createRequire } from 'node:module'
import { readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { QUASAR_ICON_SETS } from '../src/icons/quasar-icon-sets.generated.js'

const require = createRequire(import.meta.url)
const quasarDir = dirname(require.resolve('quasar/package.json'))
const ICON_SET_DIR = join(quasarDir, 'dist', 'icon-set')
const SUFFIX = '.umd.prod.js'

const libraries = readdirSync(ICON_SET_DIR)
  .filter((file) => file.endsWith(SUFFIX))
  .map((file) => file.slice(0, -SUFFIX.length))
  .sort()

type IconSetWindow = { Quasar: { IconSet: Record<string, unknown> } }

/** Import one Quasar icon set UMD and return the object it registered. */
const importQuasarSet = async (
  library: string
): Promise<Record<string, unknown>> => {
  const win = globalThis as unknown as { window?: IconSetWindow }
  win.window ??= { Quasar: { IconSet: {} } }
  const iconSet = win.window.Quasar.IconSet
  const before = new Set(Object.keys(iconSet))
  await import(pathToFileURL(join(ICON_SET_DIR, `${library}${SUFFIX}`)).href)
  const added = Object.keys(iconSet).filter((key) => !before.has(key))
  expect(added, `${library} must register exactly one key`).toHaveLength(1)
  return iconSet[added[0]] as Record<string, unknown>
}

describe('generated quasar icon sets', () => {
  it('contains every library quasar/dist/icon-set ships', () => {
    expect(Object.keys(QUASAR_ICON_SETS).sort()).toEqual(libraries)
  })

  it('mirrors each set from quasar with the same 20 keys and values', async () => {
    for (const library of libraries) {
      const source = await importQuasarSet(library)
      const generated = QUASAR_ICON_SETS[library]
      expect(
        generated,
        `${library} missing from QUASAR_ICON_SETS`
      ).toBeDefined()
      // Key order is not part of the contract; membership and values are.
      expect(
        Object.keys(generated as object).sort(),
        `${library} keys`
      ).toEqual(Object.keys(source).sort())
      expect(
        Object.keys(source),
        `${library} has 20 top-level keys`
      ).toHaveLength(20)
      expect(generated, `${library} values`).toEqual(source)
    }
  })
})
