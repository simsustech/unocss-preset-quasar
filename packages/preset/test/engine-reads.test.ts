import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { createGenerator } from 'unocss'
import { describe, expect, it } from 'vitest'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'
import { quasarSafelist } from '../src/safelist.js'
import {
  componentClasses,
  globalClasses
} from '../src/generated/quasar-classes.js'

/**
 * Who owns the defaults an engine-internal name needs.
 *
 * The declarations below used to read wind4's `--un-*` names directly. wind4
 * states those globally with the right *type* (`@property … syntax:"<percentage>"`,
 * `inherits:false`), so reading them was safe. mini states them per utility and
 * with the wrong type for half of them: `--un-bg-opacity: 1` is a number, so
 * `color-mix(… var(--un-bg-opacity) …)` — which needs a percentage — becomes
 * invalid on any element carrying a mini colour utility, and registers no
 * `@property`, so the number inherits into the subtree.
 *
 * Two rules follow, and this file guards both:
 *
 * - the opacity quartet reads our own `--q-*-opacity` outright (never engine-first);
 * - every other engine-internal read keeps the engine's value when it states one
 *   (`var(--un-X, var(--q-X))`), so a consumer's own utility still composes into a
 *   Quasar declaration, and our stated default renders when it does not.
 *
 * Names we *both* set and read (`--un-content`, `--un-border-left-opacity`) are
 * ours alone and move wholesale into the `--q-*` namespace.
 */
describe('engine-internal reads', () => {
  const sources = readdirSync('src', { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.ts'))
    .map((entry) => join(entry.parentPath, entry.name))

  it('never reads an engine opacity variable', () => {
    expect(sources.length).toBeGreaterThan(100)
    const offenders = sources.filter((file) =>
      /var\(--un-[\w-]*-opacity/.test(readFileSync(file, 'utf8'))
    )
    expect(offenders).toEqual([])
  })

  it('reads our own names for the pairs we declare ourselves', () => {
    const offenders = sources.filter((file) =>
      /var\(--un-(content|border-left-opacity)\)/.test(
        readFileSync(file, 'utf8')
      )
    )
    expect(offenders).toEqual([])
  })

  it('emits our default behind every engine-first read', async () => {
    const gen = await createGenerator({
      presets: [QuasarPreset({ styles: QuasarStyleEntries })]
    })
    const content = [
      ...quasarSafelist,
      ...Object.values(componentClasses).flat(),
      ...globalClasses
    ].join(' ')
    const { css } = await gen.generate(content, { preflights: true })

    for (const read of [
      'var(--un-outline-style, var(--q-outline-style))',
      'var(--un-inset-shadow, var(--q-inset-shadow))',
      'var(--un-inset-ring-shadow, var(--q-inset-ring-shadow))',
      'var(--un-ring-offset-shadow, var(--q-ring-offset-shadow))',
      'var(--un-ring-shadow, var(--q-ring-shadow))',
      'var(--un-shadow, var(--q-shadow))',
      'var(--un-translate-x, var(--q-translate-x))',
      'var(--un-translate-y, var(--q-translate-y))'
    ]) {
      expect(css, `${read} is emitted`).toContain(read)
    }

    // The opacity quartet reads ours outright. A sheet-wide negative check on
    // `var(--un-*-opacity)` would be a false positive: mini's *own* colour
    // utilities read their own name (`.bg-brown{--un-bg-opacity:1;background-color:
    // rgb(121 85 72 / var(--un-bg-opacity))}`), so the guarantee that none of
    // *our* rules does is the source scan above.
    for (const read of [
      'var(--q-bg-opacity)',
      'var(--q-text-opacity)',
      'var(--q-border-opacity)',
      'var(--q-outline-opacity)'
    ]) {
      expect(css, `${read} is read`).toContain(read)
    }
  })

  it('reads the theme colours with a literal fallback', async () => {
    const gen = await createGenerator({
      presets: [QuasarPreset({ styles: QuasarStyleEntries })]
    })
    const content = [
      ...quasarSafelist,
      ...Object.values(componentClasses).flat(),
      ...globalClasses
    ].join(' ')
    const { css } = await gen.generate(content, { preflights: true })

    // mini emits no `--colors-*` at all (it inlines the palette), so an
    // unguarded read would be invalid at computed-value time.
    // `--colors-light-primary` has no read site — the only mentions left in `src`
    // are comments — so the two that exist are the ones to guard.
    for (const read of [
      'var(--colors-white, #fff)',
      'var(--colors-black, #000)'
    ]) {
      expect(css, `${read} is emitted`).toContain(read)
    }
    expect(css).not.toMatch(/var\(--colors-(white|black)\)/)
  })
})
