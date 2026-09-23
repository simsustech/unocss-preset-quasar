import { describe, it, expect } from 'vitest'
import { gridRules } from '../src/core/grid/rules.js'
import { createGenerator } from 'unocss'
import presetWind4 from '@unocss/preset-wind4'
import { QuasarPreset } from '../src/index.js'

/** Helper: find a rule by its regex test and invoke the matcher (handles generators) */
function matchRule(selector: string): Record<string, string> | undefined {
  for (const entry of gridRules) {
    const regex = entry[0] as RegExp
    const matcher = entry[1] as any
    if (
      !(regex instanceof RegExp) ||
      !regex.test(selector) ||
      typeof matcher !== 'function'
    )
      continue
    const m = regex.exec(selector)
    const out: Record<string, string> = {}
    const symbols = {
      selector: Symbol('selector'),
      variants: Symbol('variants')
    }
    let res: any
    try {
      res = matcher(m ?? [selector], { symbols })
    } catch {
      res = matcher()
    }
    if (res != null && typeof res[Symbol.iterator] === 'function') {
      for (const chunk of res) {
        if (chunk && typeof chunk === 'object') {
          for (const [k, v] of Object.entries(chunk)) {
            if (typeof k === 'string' && !(k in out)) out[k] = v as string
          }
        }
        break // only base declarations; symbols.selector companions ship separately
      }
      return out
    }
    if (res && typeof res === 'object') return res as Record<string, string>
    return undefined
  }
  return undefined
}

describe('gridRules', () => {
  it('row has display flex and flex-direction row', () => {
    const css = matchRule('row')
    expect(css).toBeDefined()
    expect(css!.display).toBe('flex')
    expect(css!['flex-direction']).toBe('row')
    expect(css!['flex-wrap']).toBe('wrap')
  })

  it('column has display flex and flex-direction column', () => {
    const css = matchRule('column')
    expect(css).toBeDefined()
    expect(css!.display).toBe('flex')
    expect(css!['flex-direction']).toBe('column')
  })

  it('col has flex 1 1 0% and max-width 100%', () => {
    const css = matchRule('col')
    expect(css).toBeDefined()
    expect(css!.flex).toBe('1 1 0%')
    expect(css!['max-width']).toBe('100%')
  })

  it('col-auto has flex 0 0 auto and width auto', () => {
    const css = matchRule('col-auto')
    expect(css).toBeDefined()
    expect(css!.flex).toBe('0 0 auto')
    expect(css!.width).toBe('auto')
  })

  it('col-6 uses --q-col-span variable', () => {
    const css = matchRule('col-6')
    expect(css).toBeDefined()
    expect(css!['--q-col-span']).toBe('6')
    expect(css!.flex).toContain('var(--q-col-span)')
    expect(css!['max-width']).toContain('var(--q-col-span)')
  })

  it('col-1 uses --q-col-span variable', () => {
    const css = matchRule('col-1')
    expect(css).toBeDefined()
    expect(css!['--q-col-span']).toBe('1')
  })

  it('col-12 uses --q-col-span variable', () => {
    const css = matchRule('col-12')
    expect(css).toBeDefined()
    expect(css!['--q-col-span']).toBe('12')
  })

  it('q-gutter-md uses the wind4 spacing step for md custom property', () => {
    const css = matchRule('q-gutter-md')
    expect(css).toBeDefined()
    expect(css!['column-gap']).toBe('calc(var(--spacing) * 4)')
  })

  it('q-gutter-x-sm uses the wind4 spacing step for sm for column-gap', () => {
    const css = matchRule('q-gutter-x-sm')
    expect(css).toBeDefined()
    expect(css!['column-gap']).toBe('calc(var(--spacing) * 2)')
  })

  it('q-gutter-y-lg uses the wind4 spacing step for lg for row-gap', () => {
    const css = matchRule('q-gutter-y-lg')
    expect(css).toBeDefined()
    expect(css!['row-gap']).toBe('calc(var(--spacing) * 6)')
  })

  it('q-gutter-none has zero gap', () => {
    const css = matchRule('q-gutter-none')
    expect(css).toBeDefined()
    expect(css!['column-gap']).toBe('calc(var(--spacing) * 0)')
  })

  it('wrap sets flex-wrap wrap', () => {
    const css = matchRule('wrap')
    expect(css).toBeDefined()
    expect(css!['flex-wrap']).toBe('wrap')
  })

  it('no-wrap sets flex-wrap nowrap', () => {
    const css = matchRule('no-wrap')
    expect(css).toBeDefined()
    expect(css!['flex-wrap']).toBe('nowrap')
  })

  it('flex-center centers both axes', () => {
    const css = matchRule('flex-center')
    expect(css).toBeDefined()
    expect(css!['justify-content']).toBe('center')
    expect(css!['align-items']).toBe('center')
  })

  it('order-first sets order -1', () => {
    const css = matchRule('order-first')
    expect(css).toBeDefined()
    expect(css!.order).toBe('-1')
  })

  it('returns undefined for unknown selectors', () => {
    expect(matchRule('not-a-real-class')).toBeUndefined()
  })
})

// ---------------------------------------------------------------------------
// Step 6 (AUD-016): the grid grammar gaps, asserted on the emitted sheet —
// the candidate has to survive rule matching, not just the matcher call above.
//
// Verified against quasar/dist/quasar.css (the arbiter) and against
// `@unocss/preset-wind4` alone (the delegation rule):
//   * `col-xs-*` and the bare `col-<bp>` names: dist styles them, wind4 emits
//     nothing, and this preset had no matcher.
//   * `offset-{0..12}` / `offset-<bp>-{0..12}`: dist nests every one of them
//     under `.row >`, so the emitted selector is row-qualified.
//   * `items-*` / `justify-*` / `content-*` / `self-*`: NOT a gap — they are
//     implemented in `flex-align.ts` and wind4 also provides them; the audit's
//     "unstyled" claim came from sweeping `grid/rules.ts` alone. The sheet value
//     is still pinned here so the overlap cannot silently diverge from dist.
describe('grid grammar (dist-derived)', () => {
  const sheet = async (tokens: string): Promise<string> => {
    const gen = await createGenerator({ presets: [QuasarPreset({})] })
    return (await gen.generate(tokens)).css
  }

  // UnoCSS merges rules with identical declarations into one multi-selector
  // list (`.col-lg,\n.col-md,\n.col-xs{…}`), so a rule is looked up by the
  // selector list it belongs to, not by a `.\.class{` substring.
  type Block = { selectors: string[]; body: string }
  const blocks = (css: string): Block[] =>
    [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({
      selectors: m[1]
        .split(',')
        .map((sel) => sel.trim())
        .filter(Boolean),
      body: m[2].trim()
    }))
  const declFor = (css: string, selector: string): string | undefined =>
    blocks(css)
      .find((b) => b.selectors.includes(selector))
      ?.body.replace(/;$/, '')

  it('ships the whole xs breakpoint family', async () => {
    const tokens = [
      ...Array.from({ length: 12 }, (_, i) => `col-xs-${i + 1}`),
      'col-xs-auto',
      'col-xs-grow',
      'col-xs-shrink'
    ]
    const css = await sheet(tokens.join(' '))
    for (const t of tokens) expect(declFor(css, `.${t}`), t).toBeDefined()
    // dist's `.col-xs-6 { flex: 0 0 auto }` is the row-scoped counterpart; this
    // preset's single-class form carries the span in the variable.
    expect(declFor(css, '.col-xs-6')).toBe(
      '--q-col-span:6;flex:0 0 calc(var(--q-col-span) / 12 * 100%);max-width:calc(var(--q-col-span) / 12 * 100%)'
    )
  })

  it('bare breakpoint columns grow like col', async () => {
    const css = await sheet('col-xs col-sm col-md col-lg col-xl')
    for (const bp of ['xs', 'sm', 'md', 'lg', 'xl']) {
      expect(declFor(css, `.col-${bp}`), bp).toBe(
        'flex:1 1 0%;flex-grow:1;max-width:100%'
      )
    }
  })

  it('offsets are row-qualified at dist steps', async () => {
    const expected: Record<string, string> = {
      'offset-0': '0%',
      'offset-1': '8.3333%',
      'offset-2': '16.6667%',
      'offset-6': '50%',
      'offset-11': '91.6667%',
      'offset-12': '100%',
      'offset-xs-3': '25%',
      'offset-sm-4': '33.3333%',
      'offset-md-6': '50%',
      'offset-lg-9': '75%',
      'offset-xl-12': '100%'
    }
    const css = await sheet(Object.keys(expected).join(' '))
    for (const [cls, pct] of Object.entries(expected)) {
      // dist has no bare `.offset-N`: only `.row > .offset-N`.
      expect(declFor(css, `.row > .${cls}`), cls).toBe(`margin-left:${pct}`)
    }
  })

  it('rejects out-of-range steps instead of emitting a broken track', async () => {
    const css = await sheet('col-xs-13 offset-13 offset-xs-13')
    expect(css).not.toContain('.col-xs-13')
    expect(css).not.toContain('.offset-13')
  })

  it('keeps the already-implemented alignment family at the dist values', async () => {
    const dist: Record<string, string> = {
      'items-baseline': 'align-items:baseline',
      'self-baseline': 'align-self:baseline',
      'justify-around': 'justify-content:space-around',
      'justify-evenly': 'justify-content:space-evenly',
      'content-start': 'align-content:flex-start',
      'content-end': 'align-content:flex-end',
      'content-center': 'align-content:center',
      'content-stretch': 'align-content:stretch',
      'content-between': 'align-content:space-between',
      'content-around': 'align-content:space-around'
    }
    const css = await sheet(Object.keys(dist).join(' '))
    for (const [cls, decl] of Object.entries(dist)) {
      expect(declFor(css, `.${cls}`), cls).toBe(`${decl}`)
    }
  })

  it('delegates only the names wind4 does not carry', async () => {
    const wind = await createGenerator({ presets: [presetWind4()] })
    const windCss = (await wind.generate('items-baseline justify-around')).css
    // Asserted as a substring on purpose: these two names declare different
    // properties, so nothing merges them and the block is stable. (The preset's
    // own sheet goes through `declFor`, which is merge-agnostic.)
    expect(windCss).toContain('.items-baseline{align-items:baseline;}')
    // wind4 has no grid-column grammar for Quasar's col-/offset- names, which is
    // why they need rules here at all.
    const windGrid = (await wind.generate('col-xs-6 offset-2 col-sm')).css
    expect(windGrid).not.toContain('.col-xs-6')
    expect(windGrid).not.toContain('.offset-2')
  })
})
