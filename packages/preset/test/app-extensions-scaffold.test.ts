import { createGenerator } from 'unocss'
import { describe, expect, it } from 'vitest'
import { QuasarPreset } from '../src/index.js'

/**
 * An app extension is opt-in: a consumer names it in `appExtensions` and gets
 * its rules and its variable preflight, or names nothing and gets output
 * identical to the preset without the feature (the whole point of the gate).
 *
 * The names are the preset's own (`--q-calendar-*`, `--q-mediaplayer-*`), not
 * upstream's (`--calendar-*`, `--mediaplayer-*`, `--big-play-button-*`), and the
 * values are themed: slots the style specs define per style use the style token
 * for that slot, the rest use the shared colour roles. See
 * `src/app-extensions/qcalendar/variables.ts` for the slot table.
 */

type Extension = 'qcalendar' | 'qmarkdown' | 'qmediaplayer'

const sheet = async (appExtensions?: Extension[]): Promise<string> => {
  const gen = await createGenerator({
    presets: [QuasarPreset(appExtensions ? { appExtensions } : {})]
  })
  const { css } = await gen.generate('', { preflights: true })
  return css
}

/**
 * Every block in the sheet, as `{ selector, body }`. The sheet carries many
 * blocks named `:root` and `body` (the preset's own token preflights), so an
 * extension's block has to be found by the marker it declares rather than by
 * being the first or last one to match a selector.
 */
const allBlocks = (css: string): { selector: string; body: string }[] =>
  [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((match) => ({
    selector: match[1].trim(),
    body: match[2]
  }))

/** This extension's blocks for a selector — the ones declaring its tokens. */
const ourBlocks = (css: string, selector: string): string =>
  allBlocks(css)
    .filter((block) => block.selector === selector)
    .map((block) => block.body)
    .filter(
      (body) =>
        body.includes('--q-calendar-') || body.includes('--q-mediaplayer-')
    )
    .join('\n')

/** The extension's tokens found anywhere under a dark selector. */
const ourDarkDeclarations = (css: string): string[] =>
  allBlocks(css)
    .filter((block) => block.selector.includes('body--dark'))
    .flatMap((block) =>
      [...block.body.matchAll(/--q-(?:calendar|mediaplayer)-[a-z0-9-]+/g)].map(
        (match) => match[0]
      )
    )

const declaration = (block: string, name: string): string | undefined =>
  block.match(new RegExp(`\\s${name}: ([^;]+);`))?.[1]

describe('app extensions are opt-in', () => {
  it('declares the calendar tokens when qcalendar is declared', async () => {
    const css = await sheet(['qcalendar'])
    const root = ourBlocks(css, ':root')

    // The divider slot is the style token, not a role: md3 is
    // `outline-variant`, md2 is `rgba(0, 0, 0, .12)`, unstyled is transparent.
    expect(declaration(root, '--q-calendar-border')).toBe(
      'var(--q-separator-color) 1px solid'
    )
    expect(declaration(root, '--q-calendar-selected-background')).toBe(
      'var(--q-item-active-bg)'
    )
    expect(declaration(root, '--q-calendar-selected-color')).toBe(
      'var(--q-item-active-color)'
    )
    expect(root).not.toContain('--calendar-border')
  })

  it('keeps no palette literal in the calendar’s colours', async () => {
    // Upstream ships its own palette (`#027be3`, `#cce7ff`, `#606c71`). Every
    // one of those slots is a role or a style token now, so the only literals
    // left are the fixed measurements.
    const root = ourBlocks(await sheet(['qcalendar']), ':root')
    const values = root
      .split(';')
      .map((declaration) => declaration.split(':')[1]?.trim())
      .filter((value): value is string => Boolean(value))

    expect(values.filter((value) => /#[0-9a-f]{3,8}\b/i.test(value))).toEqual(
      []
    )
  })

  it('declares nothing when no extension is declared', async () => {
    const css = await sheet()
    expect(css).not.toContain('--q-calendar-')
    expect(css).not.toContain('--q-mediaplayer-')
  })

  it('gates each library on its own name', async () => {
    const calendarOnly = await sheet(['qcalendar'])
    expect(calendarOnly).toContain('--q-calendar-selected-background')
    expect(calendarOnly).not.toContain('--q-mediaplayer-')

    const playerOnly = await sheet(['qmediaplayer'])
    expect(
      declaration(
        ourBlocks(playerOnly, ':root'),
        '--q-mediaplayer-error-background'
      )
    ).toBe('var(--q-negative)')
    expect(playerOnly).not.toContain('--q-calendar-')
  })

  it('keeps the media canvas literal, and the error surface themed', async () => {
    const root = ourBlocks(await sheet(['qmediaplayer']), ':root')
    // A video canvas is not a theme surface: `#000000` is the canvas in either
    // scheme. `#90a4ae` is Quasar's `$blue-grey-4` (node_modules/quasar's
    // variables.sass), upstream's own choice for the play button on it.
    expect(declaration(root, '--q-mediaplayer-background')).toBe('#000000')
    expect(declaration(root, '--q-mediaplayer-color')).toBe('#ffffff')
    expect(
      declaration(root, '--q-mediaplayer-big-play-button-background')
    ).toBe('#90a4ae')
    expect(declaration(root, '--q-mediaplayer-error-background')).toBe(
      'var(--q-negative)'
    )
  })

  it('re-resolves themed tokens on `body`, so they follow the colour scheme', async () => {
    // A custom property's `var()` is substituted on the element that declares
    // it, so a `:root`-only theme would keep `:root`'s light value inside
    // `body.body--dark` (measured in Chromium: #1a1c1e where the dark palette
    // has #e3e2e6). Themed tokens are therefore declared twice, and the
    // measurement-only tokens just once.
    const css = await sheet(['qcalendar', 'qmediaplayer'])
    const body = ourBlocks(css, 'body')

    expect(declaration(body, '--q-calendar-selected-background')).toBe(
      'var(--q-item-active-bg)'
    )
    expect(declaration(body, '--q-mediaplayer-error-background')).toBe(
      'var(--q-negative)'
    )
    expect(declaration(body, '--q-calendar-head-font-weight')).toBeUndefined()
  })

  it('needs no dark block of its own', async () => {
    // The tokens it references are re-stated on `body.body--dark` by the
    // preset's own preflight, so nothing here has to name a dark selector.
    expect(ourDarkDeclarations(await sheet(['qcalendar']))).toEqual([])
  })
})
