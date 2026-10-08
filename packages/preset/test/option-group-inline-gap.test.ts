// BUG-062: an inline QOptionGroup tiled its options edge-to-edge — at 375px a
// wrapped row's radio ring started on the previous label's last pixel (0px
// column gap) and rows touched (0px row gap). Upstream QOptionGroup.sass states
// only `.q-option-group--inline > div { display: inline-block }`, so the
// inter-item spacing is the preset's to add on the inline container.
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries, Unstyled } from '../src/index.js'
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

describe('inline option group gaps (BUG-062)', () => {
  it('spaces the inline options with the preset gap token', async () => {
    const b = block(await cssFor('q-option-group'), '.q-option-group--inline')
    expect(b).toContain('display:flex')
    expect(b).toContain('flex-wrap:wrap')
    expect(b).toContain('column-gap:var(--q-space-sm)')
    expect(b).toContain('row-gap:var(--q-space-sm)')
  })

  it("keeps upstream's inline-block child declaration", async () => {
    const b = block(
      await cssFor('q-option-group'),
      '.q-option-group--inline > div'
    )
    expect(b).toContain('display:inline-block')
  })

  it('leaves the non-inline group without a display declaration', async () => {
    const css = (await cssFor('q-option-group')).replace(/\/\*[^*]*\*\//g, '')
    // The gap rule must be scoped to `--inline`. An exact member match keeps
    // the scoped unstyled reset (`body.quasar-style-unstyled .q-option-group`)
    // out of the inspection; if the container rule ever targeted the bare
    // group, its `display:flex` would land here and fail.
    expect(block(css, '.q-option-group')).not.toContain('display')
  })

  it('keeps the gap paint-free in unstyled through the zeroed token', async () => {
    const u = block(
      await cssFor('q-option-group', Unstyled),
      '.q-option-group--inline'
    )
    expect(u).toContain('var(--q-space-sm)')
    expect(u).not.toMatch(/\d+px/)
  })
})
