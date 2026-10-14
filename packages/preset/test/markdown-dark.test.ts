import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'

/**
 * QMarkdown's dark block is ported from the library's own `QMarkdown.scss`
 * (`.body--dark .q-markdown`), where BODY TEXT is `$grey-2` (#eeeeee) and the
 * code/table surfaces are `$grey-9` (#212121). The port mapped the body-text
 * literal onto `--q-surface-container-low` — a SURFACE role, which resolves to
 * `#1c1b1e` in dark, i.e. exactly the page colour. Every heading, paragraph and
 * list item was therefore painted in its own background and vanished: measured
 * live on the harness SSG target, `.q-markdown`/`h1`/`p` computed
 * `rgb(28,27,30)` on `rgb(28,27,30)` while `body` was `rgb(255,255,255)`.
 *
 * The mirrored mistake — a LIGHT text role used as a background — is
 * `--q-on-surface-variant` (`#cac4cf` in dark) behind `.q-markdown code` and
 * the striped table rows, which is what made the corrected text colour
 * light-on-light.
 *
 * These assertions scan the whole generated markdown CSS rather than a
 * selector-adjacent slice: UnoCSS merges rules with identical bodies into
 * shared selector lists, so an adjacent assertion can pass while the shipped
 * rule is folded into a block emitted elsewhere — the exact failure mode that
 * hid the q-date dark defect (`test/date-time-dark.test.ts`).
 */
async function cssFor(tokens: string): Promise<string> {
  const gen = await createGenerator({
    // app extensions are opt-in, exactly as the consuming app declares them
    presets: [
      QuasarPreset({
        styles: QuasarStyleEntries,
        appExtensions: ['qmarkdown']
      })
    ]
  })
  const r = await gen.generate(tokens, { preflights: false })
  return r.css
}

describe('QMarkdown dark mode', () => {
  it('never paints markdown text with a surface role', async () => {
    const css = await cssFor('q-markdown')
    expect(css).toContain('body.body--dark .q-markdown')
    // surface-container-low is a BACKGROUND role (#1c1b1e in dark). Anchor on
    // the declaration, not the substring: `background-color:var(…)` contains
    // `color:var(…)`, and `bg-surface-container-low` is a legitimate utility the
    // safelist carries (a surface role as a *fill* is the card's own recipe).
    expect(css).not.toMatch(/(?:[;{])color:var\(--q-surface-container-low\)/)
    expect(css).toContain('color:var(--q-on-surface)')
  })

  it('never puts a light text role behind text as a background', async () => {
    const css = await cssFor('q-markdown')
    // on-surface-variant is #cac4cf in dark, i.e. a text role, not a surface
    expect(css).not.toContain('background:var(--q-on-surface-variant)')
    expect(css).not.toContain('background-color:var(--q-on-surface-variant)')
    expect(css).toContain('background:var(--q-surface-container-high)')
  })
})
