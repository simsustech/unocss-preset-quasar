import { compile } from 'sass'
import { createGenerator } from 'unocss'
import { describe, expect, it } from 'vitest'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'

/**
 * The app extensions are a port, so the upstream stylesheet is the source of
 * truth: this compiles it from `node_modules` at test time and requires every
 * selector it produces to be emitted by the preset with the extension declared.
 * A new class in a library release turns this red instead of going unnoticed.
 *
 * Two things it checks in the other direction, both deliberate:
 *
 * - Upstream's dark fast path (`.q-dark div`, `.body--dark div`,
 *   `.q-calendar--dark`) must stay **unemitted**: it only restated the same
 *   declarations with `-dark` values, and the tokens already flip on
 *   `body.body--dark`. Asserting its absence keeps a dark rule from creeping
 *   back in and double-painting.
 * - Values are not asserted: they are deliberately re-themed, so a ported rule
 *   is free to read a token where upstream read a literal.
 */

const CALENDAR = 'node_modules/@quasar/quasar-ui-qcalendar/src/css/'
const MARKDOWN = 'node_modules/@quasar/quasar-ui-qmarkdown/src/components/'
const MEDIAPLAYER =
  'node_modules/@quasar/quasar-ui-qmediaplayer/src/components/'

/** Every upstream stylesheet the preset ports. */
const CALENDAR_FILES = [
  'q-calendar.scss',
  'calendar-day.scss',
  'calendar-month.scss',
  'calendar-month-mini.scss',
  'calendar-agenda.scss',
  'calendar-resource.scss',
  'calendar-scheduler.scss',
  'calendar-task.scss',
  'calendar-transitions.scss'
]

/** Every concrete selector an upstream stylesheet compiles to. */
const upstreamSelectors = (path: string): string[] => {
  const css = compile(path, { style: 'expanded' }).css.replace(
    /\/\*[\s\S]*?\*\//g,
    ''
  )
  const selectors = new Set<string>()
  for (const block of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    for (const selector of block[1].split(',')) {
      selectors.add(selector.trim().replace(/\s+/g, ' '))
    }
  }
  return [...selectors]
}

/**
 * Upstream's dark fast path, dropped on purpose (see the module comment).
 *
 * QMediaPlayer is the one library that states its `-dark` twins on a *modifier*
 * (`.q-media--dark`) rather than on a scheme selector; the port drops them too,
 * because the player's canvas is scheme-invariant by design, and the assertion
 * below keeps them from coming back.
 */
/**
 * The library's variable layer: a `:root` block the port does not restate, since
 * the preset ships those tokens as a preflight (asserted by
 * `test/app-extensions-scaffold.test.ts`).
 */
const isVariableLayer = (selector: string): boolean =>
  selector === ':root' || selector === 'html'

const isDarkFastPath = (selector: string): boolean =>
  /\.q-dark\b|\.body--dark\b|\.q-calendar--dark\b|\.q-media--dark\b/.test(
    selector
  )

const sheet = async (
  classes: string[],
  extension: 'qcalendar' | 'qmarkdown' | 'qmediaplayer'
): Promise<string> => {
  const gen = await createGenerator({
    presets: [
      QuasarPreset({ styles: QuasarStyleEntries, appExtensions: [extension] })
    ]
  })
  const { css } = await gen.generate(classes.join(' '), { preflights: false })
  return css
}

/**
 * A ported rule hangs off the root class of its file (`q-calendar`,
 * `q-calendar-day`, `q-markdown`, …) and expands its children from there, so the
 * sheet is generated with those roots as content — what real markup carries.
 */
const missingSelectors = async (
  extension: 'qcalendar' | 'qmarkdown' | 'qmediaplayer',
  paths: string[]
): Promise<{ missing: string[]; dark: string[] }> => {
  const selectors = paths.flatMap(upstreamSelectors)
  const roots = [
    ...new Set(
      selectors
        .filter((selector) => !isDarkFastPath(selector))
        .map((selector) => selector.match(/\.(q-[a-z0-9-]+)/)?.[1])
        .filter((name): name is string => Boolean(name))
        .map((name) => name.split('__')[0].split('--')[0])
    )
  ]
  const css = await sheet(roots, extension)
  expect(
    selectors.length,
    'the upstream compile produced selectors'
  ).toBeGreaterThan(15)
  const ported = selectors.filter(
    (s) => !isDarkFastPath(s) && !isVariableLayer(s)
  )
  return {
    missing: ported.filter((s) => !css.includes(s)),
    dark: selectors.filter((s) => isDarkFastPath(s) && css.includes(s))
  }
}

describe('the app extensions are ports of their stylesheets', () => {
  it('emits every calendar selector', async () => {
    const { missing } = await missingSelectors(
      'qcalendar',
      CALENDAR_FILES.map((f) => `${CALENDAR}${f}`)
    )
    expect(missing).toEqual([])
  })

  it('leaves the calendar’s dark fast path unemitted', async () => {
    const { dark } = await missingSelectors(
      'qcalendar',
      CALENDAR_FILES.map((f) => `${CALENDAR}${f}`)
    )
    expect(dark).toEqual([])
  })

  it('emits every QMarkdown selector', async () => {
    const { missing } = await missingSelectors('qmarkdown', [
      `${MARKDOWN}QMarkdown.scss`
    ])
    expect(missing).toEqual([])
  })

  it('emits every QMediaPlayer selector', async () => {
    const { missing, dark } = await missingSelectors('qmediaplayer', [
      `${MEDIAPLAYER}media-player.scss`
    ])
    expect(missing).toEqual([])
    // Its dark twins are dropped, like the calendar's.
    expect(dark).toEqual([])
  })

  it('scopes the Prism theme under .q-markdown', async () => {
    // Upstream ships Prism's theme as bare `.token.*` rules, i.e. global. The
    // port scopes them to the markdown root, which is where the tokens actually
    // appear, so they cannot style an unrelated `.token` elsewhere in the app.
    const css = await sheet(['q-markdown'], 'qmarkdown')
    const selectors = upstreamSelectors(`${MARKDOWN}prism-theme.scss`)
    expect(selectors.length).toBeGreaterThan(15)
    expect(
      selectors.filter((selector) => !css.includes(`.q-markdown ${selector}`))
    ).toEqual([])
  })
})
