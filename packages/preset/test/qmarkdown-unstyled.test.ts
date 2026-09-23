// The ported qmarkdown sheet is where a stub carried a *group* of selectors and
// only its first member got the `body.quasar-style-unstyled` prefix. The rest
// matched in every style and — emitted after the base palette — won on equal
// specificity, so a `.token` rendered `color: inherit` instead of its Prism
// colour. That hit md3 apps that never listed `Unstyled` at all.
//
// The assertions read the emitted sheet, split into comma members: scoping is
// only correct when it covers every member, and inclusion is only explicit when
// an md3-only app carries no reset.
import { describe, expect, it } from 'vitest'
import { createGenerator } from 'unocss'
import { MaterialDesign3, QuasarPreset, Unstyled } from '../src/index.js'
import type { QuasarStyleEntry } from '../src/index.js'

const UNSTYLED = 'body.quasar-style-unstyled '

/**
 * Every selector member in the sheet, comma groups split and comments dropped.
 *
 * Membership of a group is not by itself evidence of scoping: UnoCSS merges
 * selectors that share a declaration body, and a base rule that also states
 * `color: inherit` (`.q-markdown--heading .q-markdown--link`) lands in the same
 * group as the resets. The delta a style adds is the honest signal.
 */
function selectorMembers(css: string): string[] {
  return [...css.replace(/\/\*[^*]*\*\//g, '').matchAll(/([^{}]+)\{/g)].flatMap(
    (block) =>
      block[1]
        .split(',')
        .map((member) => member.trim().replace(/\s+/g, ' '))
        .filter(Boolean)
  )
}

/** Members of the blocks whose body resets a colour — the reset signature. */
function resetMembers(css: string): string[] {
  return [
    ...css.replace(/\/\*[^*]*\*\//g, '').matchAll(/([^{}]+)\{([^{}]*)\}/g)
  ]
    .filter((block) => block[2].includes('color:inherit'))
    .flatMap((block) =>
      block[1]
        .split(',')
        .map((member) => member.trim().replace(/\s+/g, ' '))
        .filter(Boolean)
    )
}

async function sheet(
  styles: QuasarStyleEntry[],
  extensions: 'qmarkdown'[] = ['qmarkdown']
): Promise<string> {
  const gen = await createGenerator({
    presets: [QuasarPreset({ styles, appExtensions: extensions })]
  })
  return (await gen.generate('q-markdown', { preflights: false })).css
}

describe('the qmarkdown resets follow the style', () => {
  it('scopes every member of a reset group', async () => {
    const withoutUnstyled = new Set(
      selectorMembers(await sheet([MaterialDesign3]))
    )
    const added = selectorMembers(
      await sheet([MaterialDesign3, Unstyled])
    ).filter((member) => !withoutUnstyled.has(member))
    // The resets are there to be checked at all — the ported sheet has ~25 of
    // them, and a group of them per theme area.
    expect(added.length).toBeGreaterThan(30)
    expect(added.filter((member) => !member.startsWith(UNSTYLED))).toEqual([])
  })

  it('ships no reset for an app that does not list Unstyled', async () => {
    const css = await sheet([MaterialDesign3])
    expect(css).toContain('.q-markdown .token')
    expect(css).not.toContain('quasar-style-unstyled')
  })

  it('leaves the token palette alone in an md3-only app', async () => {
    const css = await sheet([MaterialDesign3])
    const offenders = resetMembers(css).filter(
      (member) =>
        !member.startsWith(UNSTYLED) && member.includes('.q-markdown .token')
    )
    expect(offenders).toEqual([])
    // The palette itself is still there — the base rule, not a reset.
    expect(css).toContain('color:#c92c2c')
  })
})
