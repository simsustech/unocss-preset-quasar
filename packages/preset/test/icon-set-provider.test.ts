// S1 — preset public API: the icon provider behind `QuasarPreset({ iconSet })`.
//
// Seam: the provider's public exports (`src/icons/libraries.ts`,
// later `src/icons/index.ts`), exercised the way a consumer's config would
// import them — never the internals.
//
// Source of truth for library coverage: the installed `@quasar/extras`
// package's `QuasarExtrasIcons` union, read from disk. The preset must not
// depend on `@quasar/extras` at runtime (see ADR-0017), so the table is a
// transcription — this test is what keeps the transcription honest.
import { describe, it, expect, vi } from 'vitest'
import { readFileSync, globSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { LIBRARY_ICONIFY } from '../src/icons/libraries.js'
import { quasarIconSet } from '../src/index.js'

const REPO_ROOT = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  '..'
)

/** The installed `@quasar/extras` type declarations, wherever pnpm laid them out. */
const extrasDts = globSync(
  join(
    REPO_ROOT,
    'node_modules',
    '.pnpm',
    '@quasar+extras@*',
    'node_modules',
    '@quasar',
    'extras',
    'index.d.ts'
  )
).sort()[0]

/** Members of the `QuasarExtrasIcons` union, verbatim. */
const extrasIcons = (): string[] => {
  if (extrasDts === undefined) return []
  const dts = readFileSync(extrasDts, 'utf8')
  const block =
    dts.match(/export type QuasarExtrasIcons =([\s\S]*?);/)?.[1] ?? ''
  return [...block.matchAll(/\|\s*"([^"]+)"/g)].map((match) => match[1])
}

describe('icon set provider — library table', () => {
  it('reads the QuasarExtrasIcons union from the installed @quasar/extras', () => {
    // Guards the fixture itself: a silent parse failure would make every
    // coverage assertion below pass against an empty list.
    expect(extrasIcons().length).toBeGreaterThan(20)
  })

  it('covers every @quasar/extras icon library and nothing else', () => {
    expect(Object.keys(LIBRARY_ICONIFY).sort()).toEqual(
      [...extrasIcons()].sort()
    )
  })

  it('maps each library to its iconify collection', () => {
    expect(LIBRARY_ICONIFY['mdi-v7'].collection).toBe('mdi')
    expect(LIBRARY_ICONIFY['bootstrap-icons'].collection).toBe('bi')
    expect(LIBRARY_ICONIFY['fontawesome-v7'].collection).toBe('fa7-solid')
    expect(LIBRARY_ICONIFY['svg-mdi-v7'].collection).toBe('mdi')

    // Decision (run P6): iconify ships no themify collection — skip it.
    // Set values stay font classes; there is no `@iconify-json/ti` to install.
    expect(LIBRARY_ICONIFY['themify'].collection).toBeNull()
    expect(LIBRARY_ICONIFY['svg-themify'].collection).toBeNull()
  })
})

describe('icon set provider — quasarIconSet (step 3)', () => {
  it('maps bare names to iconify classes instead of a Material ligature', () => {
    const provider = quasarIconSet('mdi-v7')
    expect(provider.iconMapFn('star')).toEqual({ icon: 'i-mdi-star' })
    // An unknown name must still resolve to a class — `undefined` would fall
    // back to the ligature and render the name as text (BUG-003). The
    // collection simply has no CSS for the class, so it renders empty.
    expect(provider.iconMapFn('AUDIT')).toEqual({ icon: 'i-mdi-AUDIT' })
    // Set values carry the library prefix; normalize strips it exactly once.
    expect(provider.iconMapFn('mdi-arrow-up')).toEqual({
      icon: 'i-mdi-arrow-up'
    })
    // Quasar calls iconMapFn on the value it renders — including set values that
    // are already iconify classes (BUG-A: `i-mdi-i-mdi-*`). A value that already
    // starts with `i-` is an iconify class and must pass through unchanged.
    expect(provider.iconMapFn('i-mdi-star')).toEqual({ icon: 'i-mdi-star' })
  })

  it('rewrites every set leaf to its iconify class and collects the classes', () => {
    const provider = quasarIconSet('mdi-v7')
    const set = provider.iconSet as {
      arrow: { up: string }
      type: { positive: string }
    }
    // Observed in quasar's mdi-v7 set: arrow.up = `mdi-arrow-up`,
    // type.positive = `mdi-check-circle`.
    expect(set.arrow.up).toBe('i-mdi-arrow-up')
    expect(set.type.positive).toBe('i-mdi-check-circle')
    expect(provider.classes).toContain('i-mdi-arrow-up')
    expect(provider.classes).toContain('i-mdi-check-circle')
    // The whole set is collected, not a sample (74 distinct classes observed
    // in quasar 2.34.0's mdi-v7); a floor, not a pinned count, so a quasar
    // bump that trims a few icons does not cry wolf.
    expect(provider.classes.length).toBeGreaterThan(20)
    // The set's own `name` identifies it — it is not an icon and must not be
    // prefixed (BUG-D: QMediaPlayer resolves `$q.iconSet.name` against its
    // `iconSetLoaders`, which knows `mdi-v7`, not `i-mdi-v7`).
    expect((provider.iconSet as { name: string }).name).toBe('mdi-v7')
    // …and the identifier must not leak into the safelist as a bogus class.
    expect(provider.classes).not.toContain('i-mdi-v7')
  })

  it('names the missing @iconify-json pack instead of crashing', async () => {
    // "The consumer did not install the pack" (plan §e). pnpm auto-installs
    // these optional peers into the preset workspace, so the absent-pack state
    // cannot occur naturally here — simulate the environment (resolution
    // failing), not the module: stub the require probe, then load a fresh
    // provider so memoisation does not swallow the warning.
    vi.resetModules()
    const resolution = vi.spyOn(process, 'getBuiltinModule').mockImplementation(
      () =>
        ({
          createRequire: () => ({
            resolve: () => {
              throw new Error('ENOENT: pack not installed')
            }
          })
        }) as never
    )
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      const fresh = await import('../src/index.js')
      const provider = fresh.quasarIconSet('mdi-v7')
      expect(warn).toHaveBeenCalledTimes(1)
      expect(String(warn.mock.calls[0]?.[0])).toContain('@iconify-json/mdi')
      // …and the classes are emitted anyway — no crash, no swallowed output.
      expect(provider.classes).toContain('i-mdi-arrow-up')
    } finally {
      warn.mockRestore()
      resolution.mockRestore()
    }
  })

  it('keeps svg-* sets as inline SVG data and skips themify (no collection)', () => {
    // svg-* leaves are path data, not icon names — they render through
    // Quasar's svg path support, never the ligature, so they pass through.
    const svg = quasarIconSet('svg-mdi-v7')
    expect(JSON.stringify(svg.iconSet)).toContain('M13 14H11V9H13')
    expect(JSON.stringify(svg.iconSet)).not.toContain('i-mdi-M13')

    // Decision (run P6): iconify ships no themify collection — the set stays
    // font classes, and bare names render empty rather than as text.
    const themify = quasarIconSet('themify')
    const set = themify.iconSet as { arrow: { up: string } }
    expect(set.arrow.up).toBe('ti-arrow-up')
    expect(themify.iconMapFn('anything')).toEqual({ icon: 'none' })
  })
})
