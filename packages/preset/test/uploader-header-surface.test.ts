// BUG-059: the uploader header painted white text on a transparent surface, so
// it stayed invisible until a `color` prop painted the *root* and the text
// happened to land on that fill. Upstream states the surface itself
// (QUploader.sass: `&__header { background-color: var(--q-primary) }`), and the
// text has to follow the scheme: our `--q-primary` flips to a light tint in dark
// mode, where white would measure 1.71:1 (core/colors/rules.ts), so the header
// takes `--q-on-primary` instead of the former `#fff` literal.
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import {
  QuasarPreset,
  QuasarStyleEntries,
  MaterialDesign2,
  Unstyled
} from '../src/index.js'
import type { QuasarStyleEntry } from '../src/index.js'

async function cssFor(
  tokens: string,
  style?: QuasarStyleEntry
): Promise<string> {
  const gen = await createGenerator({
    presets: [
      style
        ? QuasarPreset({ style })
        : QuasarPreset({ styles: QuasarStyleEntries })
    ]
  })
  const r = await gen.generate(tokens, { preflights: false })
  return r.css
}

/**
 * The declarations of every emitted block whose selector list carries `sel` as
 * a member. UnoCSS merges yields with identical bodies into one selector list
 * (`unstyled-migration.test.ts:53-75`), so a reset is found by its member
 * rather than as a standalone block.
 */
function block(css: string, sel: string): string {
  // Layer comments (`/* layer: quasar.styles */`) sit between blocks, where a
  // selector parse would read them as part of the next selector list.
  const source = css.replace(/\/\*[^*]*\*\//g, '')
  const found: string[] = []
  for (const [, selectors, declarations] of source.matchAll(
    /([^{}]+)\{([^{}]*)\}/g
  )) {
    if (selectors.split(',').some((member) => member.trim() === sel))
      found.push(declarations)
  }
  return found.join('\n')
}

describe('uploader header surface (BUG-059)', () => {
  it('paints the header with the primary surface', async () => {
    const b = block(await cssFor('q-uploader'), '.q-uploader__header')
    expect(b).toContain('background-color:var(--q-primary)')
  })

  it('states the scheme-aware on-colour, not the #fff literal', async () => {
    const b = block(await cssFor('q-uploader'), '.q-uploader__header')
    expect(b).toContain(
      'color:color-mix(in oklab, var(--q-on-primary) var(--q-text-opacity), transparent)'
    )
    expect(b).not.toContain('#fff')
  })

  it('carries the surface in the shared rule, so every listed style gets it', async () => {
    const md3 = block(await cssFor('q-uploader'), '.q-uploader__header')
    // A per-style fork would leave one entry's block empty and make the
    // assertion below pass for the wrong reason.
    expect(md3).toContain('background-color:var(--q-primary)')
    for (const style of [MaterialDesign2, Unstyled]) {
      const css = await cssFor('q-uploader', style)
      // Equality with `md3` is unassertable, not a coverage choice:
      // `quasarComponentExtractor` (src/extractor.ts) expands the `q-uploader`
      // token to its whole vocabulary, so `q-uploader__header` is matched in
      // both the plain `q-uploader` and the explicit `q-uploader
      // q-uploader__header` generations. The unstyled sheet therefore carries
      // the shared rule *plus* the reset, and `block()` concatenates them —
      // equality would only hold if the reset were absent, which the dedicated
      // unstyled-reset test below requires it not to be.
      expect(
        block(css, '.q-uploader__header'),
        `${style.name} header`
      ).toContain('background-color:var(--q-primary)')
    }
  })

  it('neutralises the new surface in the unstyled entry', async () => {
    const css = await cssFor('q-uploader q-uploader__header', Unstyled)
    const b = block(css, '.q-uploader__header')
    expect(b).toContain('background:none')
    expect(b).toContain('color:inherit')
  })

  it('keeps the header legible in dark mode through a scheme-aware on-colour', async () => {
    const gen = await createGenerator({
      presets: [QuasarPreset({ styles: QuasarStyleEntries })]
    })
    const rules = (await gen.generate('q-uploader', { preflights: false })).css
    const header = block(rules, '.q-uploader__header')
    // A literal (the former `#fff`) cannot flip with the scheme, so the rule
    // has to name the token.
    expect(header).toContain('var(--q-on-primary)')
    expect(header).not.toContain('#fff')
    const css = (await gen.generate('q-uploader', { preflights: true })).css
    // The light palette is aliased on `:root`; dark overrides land on
    // `body.body--dark` (theme/preflight.ts).
    const tokenIn = (selector: string): string | undefined => {
      for (const [, selectors, declarations] of css.matchAll(
        /([^{}]+)\{([^{}]*)\}/g
      )) {
        if (!selectors.split(',').some((member) => member.trim() === selector))
          continue
        const value = declarations.match(/--q-on-primary:\s*([^;]+);/)?.[1]
        if (value !== undefined) return value
      }
      return undefined
    }
    const light = tokenIn(':root')
    const dark = tokenIn('body.body--dark')
    expect(light).toBeDefined()
    expect(dark).toBeDefined()
    // White-on-light-primary is exactly what a hard-coded #fff text would give
    // in dark mode, so the token must actually flip.
    expect(dark).not.toBe(light)
  })
})
