// BUG-063: md3's `--q-btn-flat-color: var(--q-primary)` makes a flat action
// button on a `bg-primary` toolbar paint the bar's own fill, so the menu/dots
// glyphs vanish into the bar. The reference intends the bar's foreground to
// reach its actions; the carve-out sets the *variable* (not `color`), so a
// per-button `text-*` utility still wins by cascade order (utilities ship after
// component rules — `cascade-order.test.ts`) and md3's global flat text-button
// colour is untouched.
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import {
  QuasarPreset,
  QuasarStyleEntries,
  MaterialDesign2,
  MaterialDesign3
} from '../src/index.js'
import type { QuasarStyleEntry } from '../src/index.js'

async function cssFor(
  tokens: string,
  style?: QuasarStyleEntry,
  preflights = false
): Promise<string> {
  const gen = await createGenerator({
    presets: [
      style
        ? QuasarPreset({ style })
        : QuasarPreset({ styles: QuasarStyleEntries })
    ]
  })
  const r = await gen.generate(tokens, { preflights })
  return r.css
}

/**
 * The declarations of every emitted block whose selector list carries `sel` as
 * a member. UnoCSS merges yields with identical bodies into one selector list
 * (`unstyled-migration.test.ts:53-75`), so a rule is found by its member rather
 * than as a standalone block.
 */
function block(css: string, sel: string): string {
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

describe('toolbar flat action colour (BUG-063)', () => {
  it('inherits the bar foreground through a toolbar-scoped flat-colour variable', async () => {
    const b = block(
      await cssFor('q-toolbar q-btn--flat'),
      '.q-toolbar .q-btn--flat'
    )
    expect(b).toContain('--q-btn-flat-color:currentColor')
  })

  it('does not set a bare colour, so a text-* utility still wins', async () => {
    const b = block(
      await cssFor('q-toolbar q-btn--flat'),
      '.q-toolbar .q-btn--flat'
    )
    expect(b).not.toMatch(/(^|[;{])color:/)
  })

  it('leaves the md3 flat-button token intact', async () => {
    const css = await cssFor('q-toolbar q-btn--flat', MaterialDesign3, true)
    expect(css).toMatch(/--q-btn-flat-color:\s*var\(--q-primary\)/)
  })

  it('emits exactly one carve-out block', async () => {
    const md3 = await cssFor('q-toolbar q-btn--flat')
    expect(
      (md3.match(/\.q-toolbar \.q-btn--flat\{[^}]*\}/g) ?? []).length
    ).toBe(1)
  })

  it("leaves md2's own token value untouched", async () => {
    const md2 = await cssFor('q-toolbar q-btn--flat', MaterialDesign2, true)
    expect(block(md2, 'body')).toContain('--q-btn-flat-color: currentColor')
    const all = await cssFor('q-toolbar q-btn--flat', undefined, true)
    expect(block(all, 'body')).toContain('--q-btn-flat-color: var(--q-primary)')
  })
})
