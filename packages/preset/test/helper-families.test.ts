// Step 7 (AUD-002, AUD-008, AUD-011, AUD-015, AUD-020, AUD-021, AUD-022, AUD-023):
// the helper families the audit found styled by quasar/dist/quasar.css, absent
// from this sheet, and not provided by wind4.
//
// Every expected value is dist's, read out of `quasar@2.31.0/dist/quasar.css`
// during the run. The overlap cases (`rotate-*`, `delay-*`, `float-*`,
// `cursor-*`) are asserted as *winners*: the emitted declaration has to be
// dist's, not wind4's near-miss.
//
// `norm` collapses whitespace on both sides of every comparison: UnoCSS emits
// the same declarations with different line breaks depending on the layer and
// the loader, and the assertions are about declarations, not formatting.
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import presetWind4 from '@unocss/preset-wind4'
import { QuasarPreset } from '../src/index.js'
import { platformRules } from '../src/core/platform/rules.js'
import { animationHelperRules } from '../src/core/motion/animation.js'

/** Collapse whitespace so comparisons describe declarations, not formatting. */
const norm = (value: string): string =>
  value
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};])\s*/g, '$1')
    .trim()

type Block = { selectors: string[]; body: string }

/** UnoCSS merges rules with identical declarations into multi-selector blocks. */
const blocks = (css: string): Block[] =>
  [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({
    selectors: m[1].split(',').map(norm).filter(Boolean),
    body: norm(m[2]).replace(/;$/, '')
  }))

const bodiesFor = (css: string, selector: string): string[] =>
  blocks(css)
    .filter((b) => b.selectors.includes(norm(selector)))
    .map((b) => b.body)

const declFor = (css: string, selector: string): string | undefined =>
  bodiesFor(css, selector)[0]

const generator = async (presets: unknown[]) =>
  createGenerator({ presets: presets as never })

/** One token, composed preset, no preflight layer (its nested at-rules break a
 * flat block parser). */
const sheet = async (token: string): Promise<string> =>
  (
    await (
      await generator([QuasarPreset({})])
    ).generate(token, { preflights: false })
  ).css

const fullSheet = async (token: string): Promise<string> =>
  (await (await generator([QuasarPreset({})])).generate(token)).css

/** A yielded declaration set, read straight off one of the preset's matchers. */
type MatcherYield = Record<string, unknown>

const matcherYields = (rules: unknown, candidate: string): MatcherYield[] => {
  const entry = (rules as [RegExp, (...args: never[]) => unknown][]).find(
    ([re]) => re.test(candidate)
  )
  if (!entry) return []
  const match = entry[0].exec(candidate) as RegExpMatchArray
  const symbols = { selector: '$$symbol-selector' }
  const out: MatcherYield[] = []
  const produced = entry[1](
    match as never,
    { symbols } as never
  ) as Iterable<MatcherYield>
  for (const chunk of produced)
    out.push({ ...chunk, __symbols: symbols.selector })
  return out
}

/** The selector a yielded chunk targets (its own `symbols.selector` transform). */
const yieldedSelector = (chunk: MatcherYield, candidate: string): string =>
  (chunk[chunk.__symbols as string] as (sel: string) => string)(`.${candidate}`)

/**
 * A sheet from one of this preset's rule modules alone.
 *
 * `native-mobile-hide` and `.animated` cannot be asserted through the composed
 * preset: before the rule layer, UnoCSS splits candidates on `-` as a variant
 * separator, and whether `native-mobile` / `animated` parse as a variant depends
 * on which copy of the nested presets the loader resolves — the same token
 * routes through the pinned build and not through the vitest resolution
 * (measured, per token, both ways). Isolating the module tests what this preset
 * owns without that noise; the composed sheet is asserted for the overlap cases,
 * which is what (d)7 asks to verify there.
 */
const isolated = async (rules: unknown, token: string): Promise<string> =>
  (
    await (
      await generator([{ name: 'isolated', rules }])
    ).generate(token, { preflights: false })
  ).css

describe('helper families (dist-derived)', () => {
  it('ships the pointer helpers dist declares (!important included)', async () => {
    const css = await sheet('no-pointer-events--children')
    expect(declFor(css, '.no-pointer-events--children')).toBe(
      'pointer-events:none !important'
    )
    expect(declFor(css, '.no-pointer-events--children *')).toBe(
      'pointer-events:none !important'
    )
    // `all-pointer-events` reaches the sheet through the static CSS channel:
    // UnoCSS drops `all-*` candidates before the rule layer in this composition
    // (see mouseHelperCss for the measurement).
    expect(norm(await fullSheet('all-pointer-events'))).toContain(
      '.all-pointer-events{pointer-events:all !important}'
    )
  })

  it('covers every platform hide/only pair dist declares', async () => {
    for (const platform of [
      'desktop',
      'mobile',
      'touch',
      'electron',
      'native-mobile',
      'capacitor',
      'cordova',
      'within-iframe'
    ]) {
      const hide = matcherYields(platformRules, `${platform}-hide`)
      expect(hide.length, `${platform}-hide`).toBe(1)
      expect(yieldedSelector(hide[0], `${platform}-hide`), platform).toBe(
        `body.${platform} .${platform}-hide`
      )
      expect(hide[0].display).toBe('none !important')

      const only = matcherYields(platformRules, `${platform}-only`)
      expect(only.length, `${platform}-only`).toBe(1)
      expect(yieldedSelector(only[0], `${platform}-only`), platform).toBe(
        `body:not(.${platform}) .${platform}-only`
      )
      expect(only[0].display).toBe('none !important')
    }
    // The iOS/Android pair shipped only its `-hide` half before this step.
    for (const platform of ['ios', 'android']) {
      const only = matcherYields(platformRules, `platform-${platform}-only`)
      expect(only.length, platform).toBe(1)
      expect(yieldedSelector(only[0], `platform-${platform}-only`)).toBe(
        `body:not(.platform-${platform}) .platform-${platform}-only`
      )
    }
    // No composed-sheet assertion here: whether a `native-mobile-*` /
    // `desktop-*` candidate survives UnoCSS's `-`-as-variant-separator split
    // depends on the loader's copy of the nested presets (measured both ways),
    // which is why this family is asserted at the matcher and recorded as a
    // routing caveat rather than as a rule defect.
  })

  it('states the animation helpers the way dist does: combined with .animated', async () => {
    const combos: [string, string][] = [
      ['infinite', 'animation-iteration-count:infinite'],
      ['hinge', 'animation-duration:2s'],
      ['faster', 'animation-duration:calc(var(--animate-duration) / 2)'],
      ['fast', 'animation-duration:calc(var(--animate-duration) * 0.8)'],
      ['slow', 'animation-duration:calc(var(--animate-duration) * 2)'],
      ['slower', 'animation-duration:calc(var(--animate-duration) * 3)'],
      ['repeat-1', 'animation-iteration-count:var(--animate-repeat)'],
      ['repeat-2', 'animation-iteration-count:calc(var(--animate-repeat) * 2)'],
      ['repeat-3', 'animation-iteration-count:calc(var(--animate-repeat) * 3)'],
      ['delay-1s', 'animation-delay:var(--animate-delay)'],
      ['delay-2s', 'animation-delay:calc(var(--animate-delay) * 2)'],
      ['delay-5s', 'animation-delay:calc(var(--animate-delay) * 5)']
    ]
    for (const [cls, decl] of combos) {
      const yields = matcherYields(animationHelperRules, cls)
      expect(yields.length, cls).toBe(1)
      // dist states every one of them combined with `.animated`.
      expect(yieldedSelector(yields[0], cls), cls).toBe(`.animated.${cls}`)
      const [property, ...rest] = decl.split(':')
      expect(yields[0][property], cls).toBe(rest.join(':'))
    }

    // `.animated` itself yields the plain utility block first (no selector
    // transform) and the `[class*=Out]` companion second.
    const animated = matcherYields(animationHelperRules, 'animated')
    expect(animated.length).toBe(2)
    expect(animated[0]['animation-duration']).toBe('var(--animate-duration)')
    expect(animated[0]['animation-fill-mode']).toBe('both')
    expect(yieldedSelector(animated[1], 'animated')).toBe(
      '.animated[class*=Out]'
    )
    expect(animated[1].opacity).toBe('0')
    // The composed preset keeps animated-unocss's own `.animated` (a static rule,
    // consulted before the rule layer): the base class is delegated, the combos
    // above are this preset's.
    expect(await sheet('animated')).toContain('--une-animated-duration')
  })

  it('veils with dimmed/light-dimmed :after, as dist does', async () => {
    const css = await sheet('dimmed')
    expect(declFor(css, '.dimmed:after')).toContain(
      'background:rgba(0, 0, 0, 0.4) !important'
    )
    expect(declFor(css, '.dimmed:after')).toContain('right:0 /* rtl:ignore */')
    // `light-dimmed` is static-channel: its `light-` prefix is read as wind4's
    // theme variant first, which wrapped the utility in `.body--light`.
    expect(norm(await fullSheet('light-dimmed'))).toContain(
      '.light-dimmed:after{'
    )
  })

  it('runs the Quasar animation classes and the rotate family', async () => {
    expect(declFor(await sheet('q-animate--fade'), '.q-animate--fade')).toBe(
      'animation:q-fade 0.2s /* rtl:ignore */'
    )
    expect(declFor(await sheet('q-animate--scale'), '.q-animate--scale')).toBe(
      'animation:q-scale 0.15s;animation-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1)'
    )
    for (const deg of [45, 135, 270]) {
      expect(
        declFor(await sheet(`rotate-${deg}`), `.rotate-${deg}`),
        String(deg)
      ).toBe(`transform:rotate(${deg}deg) /* rtl:ignore */`)
    }
  })

  it('wins the rotate-45 overlap against wind4 (transform, not rotate)', async () => {
    const wind = await generator([presetWind4()])
    const windCss = (await wind.generate('rotate-45')).css
    expect(windCss).toContain('rotate:45deg')
    // enforce: 'post' keeps ours in front, so the emitted utility is dist's.
    const css = await sheet('rotate-45')
    expect(declFor(css, '.rotate-45')).toBe(
      'transform:rotate(45deg) /* rtl:ignore */'
    )
    expect(css).not.toMatch(/(^|[,{])rotate:45deg/)
  })

  it('delegates the names wind4 already provides, and records the divergence', async () => {
    const wind = await generator([presetWind4()])
    const windCss = (
      await wind.generate(
        'cursor-none cursor-not-allowed float-left float-right inline-block'
      )
    ).css
    expect(windCss).toContain('.cursor-none{cursor:none;}')
    expect(windCss).toContain('.cursor-not-allowed{cursor:not-allowed;}')
    expect(windCss).toContain('.float-left{float:left;}')
    expect(windCss).toContain('.float-right{float:right;}')
    expect(windCss).toContain('.inline-block{display:inline-block;}')
    // dist's versions carry `!important`; wind4's do not. Delegation was chosen
    // (the plan's (b)7 disposition) and the divergence is recorded rather than
    // papered over by duplicating the utility.
    expect(declFor(await sheet('inline-block'), '.inline-block')).toBe(
      'display:inline-block'
    )
  })

  it('ships the helper residue dist styles', async () => {
    const scrollbar = await sheet('hide-scrollbar')
    expect(declFor(scrollbar, '.hide-scrollbar')).toBe('scrollbar-width:none')
    expect(declFor(scrollbar, '.hide-scrollbar::-webkit-scrollbar')).toBe(
      'width:0;height:0;display:none'
    )
    expect(declFor(await sheet('z-fab'), '.z-fab')).toBe('z-index:990')

    const inset = await sheet('inset-shadow')
    expect(declFor(inset, '.inset-shadow')).toBe(
      'box-shadow:0 7px 9px -7px var(--q-shadow-inset) inset'
    )
    expect(declFor(inset, '.body--dark .inset-shadow')).toBe(
      'box-shadow:0 7px 9px -7px var(--q-dark-shadow-inset) inset'
    )
    expect(
      declFor(await sheet('inset-shadow-down'), '.inset-shadow-down')
    ).toBe('box-shadow:0 -7px 9px -7px var(--q-shadow-inset) inset')

    expect(
      declFor(await sheet('q-morph--internal'), '.q-morph--internal')
    ).toBe(
      'opacity:0 !important;pointer-events:none !important;position:fixed !important;right:200vw !important;bottom:200vh !important'
    )
    expect(
      declFor(await sheet('q-morph--invisible'), '.q-morph--invisible')
    ).toContain('position:fixed !important')

    expect(declFor(await sheet('responsive'), 'img.responsive')).toBe(
      'max-width:100%;height:auto'
    )
    expect(
      declFor(await sheet('scroll--mobile'), 'body.mobile .scroll--mobile')
    ).toBe('overflow:auto')
    expect(
      declFor(await sheet('q-safe-area-padding'), 'body.q-safe-area-padding')
    ).toBe(
      '--q-safe-area-inset-top:var(--safe-area-inset-top, env(safe-area-inset-top, 0px));--q-safe-area-inset-bottom:var(--safe-area-inset-bottom, env(safe-area-inset-bottom, 0px))'
    )
  })

  it('ships the component residue the audit pinned', async () => {
    expect(
      declFor(
        await sheet('q-table__bottom--nodata'),
        '.q-table__bottom:not(.q-table__bottom--nodata)'
      )
    ).toBe('border-top:1px solid rgba(0, 0, 0, 0.12)')
    expect(
      declFor(
        await sheet('q-table__bottom-nodata-icon'),
        '.q-table__bottom-nodata-icon'
      )
    ).toBe('font-size:200%;margin-right:8px')
    expect(
      declFor(
        await sheet('q-field__messages--animated'),
        '.q-field__messages--animated'
      )
    ).toBe('animation:q-field-message 0.6s cubic-bezier(0.86, 0, 0.07, 1)')
    expect(
      declFor(
        await sheet('q-slider--enabled'),
        '.q-slider.q-slider--enabled .q-slider__track-container:hover .q-slider__pin'
      )
    ).toBe('opacity:1')
    expect(
      declFor(
        await sheet('q-transition--flip-enter-active'),
        '.q-transition--flip-enter-active'
      )
    ).toBe(
      '--q-transition-duration:.3s;--q-transition-easing:cubic-bezier(0.215, 0.61, 0.355, 1)'
    )
    expect(
      declFor(
        await sheet('q-transition--flip-leave-active'),
        '.q-transition--flip-leave-active'
      )
    ).toBe(
      '--q-transition-duration:.3s;--q-transition-easing:cubic-bezier(0.215, 0.61, 0.355, 1);position:absolute'
    )
    // The keyframe ships with the class that names it (AUD-008/009 family).
    expect(await fullSheet('q-field__messages--animated')).toContain(
      '@keyframes q-field-message'
    )
  })
  // These bare names are in the *theme palette*, not hand-written rules: the engine
  // has no `brown` in any form and spells its own palette `gray`, so every
  // Quasar-named colour utility exists only because `paletteColors()` hands it our
  // palette. The shaded forms (`brown-5`) were already there; the bare entries were
  // commented out in `quasar-theme.ts`, which is why the coverage sweep's "emitted
  // on demand by content scanning" allowance never held for them.
  //
  // Asserting the *colour*, not the emission form: mini resolves the palette entry
  // into a literal, wind4 into `var(--colors-<name>)` declared on `:root`. Both
  // spell dist's colour, so whichever form the engine emits is resolved first.
  it('emits the bare Quasar colours the engine has no name for, from the theme palette', async () => {
    const cases: [string, string, string, string][] = [
      ['bg-brown', 'background-color', 'brown', '#795548'],
      ['text-brown', 'color', 'brown', '#795548'],
      ['bg-grey', 'background-color', 'grey', '#9e9e9e'],
      ['text-grey', 'color', 'grey', '#9e9e9e'],
      ['bg-separator', 'background-color', 'separator', 'rgba(0, 0, 0, 0.12)'],
      ['text-separator', 'color', 'separator', 'rgba(0, 0, 0, 0.12)'],
      [
        'bg-dark-separator',
        'background-color',
        'dark-separator',
        'rgba(255, 255, 255, 0.28)'
      ],
      [
        'text-dark-separator',
        'color',
        'dark-separator',
        'rgba(255, 255, 255, 0.28)'
      ]
    ]

    // The numeric components of a colour, so `#795548` and `rgb(121 85 72)` compare
    // equal whatever notation the engine chose.
    const components = (colour: string): string => {
      const hex = colour.match(/^#([0-9a-f]{6})$/i)
      if (hex) {
        const int = Number.parseInt(hex[1], 16)
        return [int >> 16, (int >> 8) & 255, int & 255]
          .map((channel) => String(channel & 255))
          .join(',')
      }
      const channels = (colour.match(/-?[\d.]+/g) ?? []).map(Number)
      // `rgb(121 85 72 / 1)` is the opaque spelling of `#795548`.
      return (
        channels.length === 4 && channels[3] === 1
          ? channels.slice(0, 3)
          : channels
      ).join(',')
    }

    for (const [token, property, name, value] of cases) {
      const css = await sheet(token)
      const block = blocks(css).filter((b) => b.selectors.includes(`.${token}`))
      expect(block.length, `${token} block count`).toBeGreaterThan(0)
      const declarations = block
        .flatMap((b) => b.body.split(';'))
        .filter((declaration) => declaration.trim().startsWith(`${property}:`))
        .map((declaration) =>
          declaration.slice(declaration.indexOf(':') + 1).trim()
        )
      expect(
        declarations.length,
        `${token} declares ${property}`
      ).toBeGreaterThan(0)
      // The engine may leave the opacity to a variable it declares in the same
      // block (`--un-bg-opacity: 0.12`) or take the whole colour from the theme
      // (`var(--colors-brown)`), so both are substituted before comparing: what
      // matters is the colour the declaration resolves to.
      const full = await fullSheet(token)
      const blockBody = block.map((b) => b.body).join(';')
      const lookup = (name: string): string | undefined =>
        blockBody.match(new RegExp(`${name}\\s*:\\s*([^;]+)`))?.[1]?.trim() ??
        full.match(new RegExp(`${name}\\s*:\\s*([^;}]+)`))?.[1]?.trim()
      const resolved = declarations.map((declaration) =>
        declaration
          .replace(
            /var\((--[\w-]+)(?:\s*,[^)]*)?\)/g,
            (whole, name: string) => lookup(name) ?? whole
          )
          .replace(/\s*!important$/, '')
      )
      expect(
        resolved.map(components),
        `${token} resolves to ${value}`
      ).toContain(components(value))
    }
  })
})
