// Spec conformance for button corners.
//
//   specs/buttons.json           -> corner_shape_token = md.sys.shape.corner.full
//                                   for every variant (implemented as 28px,
//                                   "Quasar convention" per SPEC_VERIFICATION_REPORT)
//   specs/md2/...specifications  -> contained/outlined/text button
//                                   border_radius_px = 4
// So the corner must come from the style token `--q-btn-radius`, never from a
// hardcoded legacy 3px: that literal overrode the token in every style and made
// the "Screenshot Review" button square (3px) instead of 28px.
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'
import { Unstyled, MaterialDesign2 } from '../src/styles/index.js'

async function cssFor(tokens: string, style?: any): Promise<string> {
  const gen = await createGenerator({
    presets: [
      style
        ? QuasarPreset({ style })
        : QuasarPreset({ styles: QuasarStyleEntries })
    ]
  })
  const r = await gen.generate(tokens)
  return r.css
}

function block(css: string, sel: string): string {
  const m = css.match(new RegExp(`\\${sel}\\{[^}]*\\}`, 'g'))
  return m ? m.join('\n') : ''
}

describe('QBtn corner spec conformance', () => {
  it('MD3 resolves the button corner to corner.full (28px)', async () => {
    const css = await cssFor('q-btn')
    expect(css).toMatch(/--q-btn-radius:\s*var\(--q-radius-xl\)/)
    expect(css).toMatch(/--q-radius-xl:\s*28px/)
    expect(block(css, '.q-btn')).toContain('border-radius:var(--q-btn-radius)')
  })

  it('MD2 resolves the button corner to the spec 4px', async () => {
    const css = await cssFor('q-btn', MaterialDesign2)
    expect(css).toMatch(/--q-btn-radius:\s*var\(--q-radius-sm\)/)
    expect(css).toMatch(/--q-radius-sm:\s*4px/)
  })

  it('unstyled zeroes the button corner', async () => {
    const css = await cssFor('q-btn', Unstyled)
    expect(css).toMatch(/--q-btn-radius:\s*0/)
  })

  it('never hardcodes a legacy 3px corner on q-btn--rectangle', async () => {
    for (const style of [undefined, MaterialDesign2, Unstyled]) {
      const css = await cssFor('q-btn--rectangle', style)
      const b = block(css, '.q-btn--rectangle')
      expect(b).not.toContain('border-radius:3px')
      if (b) expect(b).toContain('border-radius:var(--q-btn-radius)')
    }
  })

  // A grouped button used to get a hardcoded surface colour that the reference
  // does not have (Quasar: `.q-btn-group > .q-btn-item { border-radius: inherit;
  // align-self: stretch }`, no colour). Because that selector is two classes and
  // `.q-btn` is one, it beat the button's own `color: var(--q-btn-color)` — dark
  // on-surface text on the MD3/MD2 primary fill.
  it('leaves the grouped button its own colour token', async () => {
    const css = await cssFor('q-btn-group q-btn')
    const item = block(css, '.q-btn-group > .q-btn-item')
    expect(item).toContain('align-self:stretch')
    expect(item).not.toContain('color:')
  })

  it("pairs every style's button fill with its own on-colour", async () => {
    for (const style of [undefined, MaterialDesign2, Unstyled]) {
      const name = style?.name ?? 'MD3'
      const css = await cssFor('q-btn', style)
      const bg = /--q-btn-bg:\s*([^;]+);/.exec(css)?.[1]?.trim()
      const fg = /--q-btn-color:\s*([^;]+);/.exec(css)?.[1]?.trim()
      expect(bg, `bg token in ${name}`).toBeTruthy()
      expect(fg, `fg token in ${name}`).toBeTruthy()
      // Filled entries need their on-colour; the transparent one inherits, as
      // Quasar's own `.q-btn { color: inherit }` does.
      if (bg === 'transparent') expect(fg, name).toBe('inherit')
      else expect(fg, name).toBe('var(--q-on-primary)')
    }
  })

  // MD3 segmented control (plan step 7): the reference groups carry no fill
  // (`.q-btn-group > .q-btn-item { border-radius: inherit; align-self: stretch }`),
  // but every `.q-btn` here is filled with `--q-btn-bg` — the observed Day/Week
  // toggle painted the *unselected* "Day" rgb(0,95,175) primary while the
  // selected segment took the container treatment. The group scope resets the
  // fill to the reference value and paints the active segment on
  // secondary-container (light + dark pairing).
  it('groups carry no fill and the active segment wears secondary-container', async () => {
    const css = await cssFor('q-btn-group q-btn')

    // Grouped items reset the base button's fill to the reference's no-fill.
    const grouped = block(css, '.q-btn-group > .q-btn')
    expect(grouped, 'grouped buttons drop the primary fill').toContain(
      'background-color:transparent'
    )
    expect(grouped, 'never the base button fill').not.toContain(
      'var(--q-btn-bg)'
    )
    expect(grouped, 'text falls back to the page colour').toContain(
      'color:inherit'
    )

    // The selected segment: secondary-container in light, its dark pair in dark.
    // q-btn-toggle marks selection with aria-pressed — no q-btn--active class is
    // ever rendered (probed on the Day/Week toggle) — so the selector keys off
    // the ARIA state. Extracted without block(): [ ] is a regex character class.
    const activeBlock = (needle: string) => {
      // The dark selector *contains* the light one as a substring
      // (`.body--dark .q-btn-group > …`) and sorts first, so the light lookup
      // skips occurrences preceded by a space — only the dark block has that.
      let at = -1
      let from = 0
      for (;;) {
        const i = css.indexOf(needle, from)
        if (i < 0) break
        if (i === 0 || css[i - 1] !== ' ') {
          at = i
          break
        }
        from = i + 1
      }
      expect(at, `${needle} emitted`).toBeGreaterThan(-1)
      return css.slice(at, css.indexOf('}', at))
    }
    const active = activeBlock(
      '.q-btn-group > .q-btn-item[aria-pressed="true"]'
    )
    expect(active).toContain('--light-secondary-container')
    expect(active).toContain('--light-on-secondary-container')
    const darkActive = activeBlock(
      '.body--dark .q-btn-group > .q-btn-item[aria-pressed="true"]'
    )
    expect(darkActive).toContain('--q-secondary-container')
    expect(darkActive).toContain('--q-on-secondary-container')

    // Outer edges take the group's MD3 pill radius (inner corners stay square).
    expect(block(css, '.q-btn-group > .q-btn-item:first-child')).toContain(
      'border-top-left-radius:inherit'
    )
    expect(block(css, '.q-btn-group > .q-btn-item:last-child')).toContain(
      'border-top-right-radius:inherit'
    )
  })
})

// The round button's SHAPE. quasar.css: `.q-btn--round { border-radius: 50%;
// padding: 0; min-width: 3em; min-height: 3em }` — equal dimensions, i.e. a
// circle. The preset emitted `min-width: 3em` against `min-height:
// var(--q-control-height)`, and 3em is font-relative while the control height is
// absolute, so every round button measured (2026-09-29, live md2, 178 instances
// across both viewports) was an ellipse: 19/24/30/34/42 wide against 48 tall.
//
// The md2 spec states the button minimum width outright
// (`buttons.*.min_width_px: 64`), so md2 takes that as BOTH dimensions — 64x64,
// the spec's value and therefore a square. md3's pair was left byte-identical in the
// md2 run even though its round buttons are the same ellipse — recorded there,
// settled 2026-09-30 on the user's call ("round buttons need to be round"): dist pairs
// 3em with 3em, but our 48dp floor pins the height to an absolute (and md3's own
// button font is 14px, so 3em = 42 against 48 — an oval at default typography). The
// width now comes from that same floor, so min-width === min-height === 48 and the
// button is a circle at any font size.
describe('QBtn round geometry is a square, per the metric its spec states', () => {
  it('squares md2 round buttons at the spec width (64x64)', async () => {
    const css = await cssFor('q-btn q-btn--round', MaterialDesign2)
    expect(css).toMatch(/--q-btn-round-min-width:\s*64px/)
    expect(css).toMatch(/--q-btn-round-height:\s*64px/)
    const b = block(css, '.q-btn--round')
    expect(b).toContain('min-width:var(--q-btn-round-min-width)')
    expect(b).toContain('height:var(--q-btn-round-height)')
    // the 48dp floor must still be declared as min-height (control-height.test.ts)
    expect(b).toContain('min-height:var(--q-control-height)')
    // the font-relative literals must be gone from every round block
    expect(b).not.toContain('3em')
    expect(b).not.toContain('2.4em')
  })

  it('squares the md2 dense round button with the dense metric', async () => {
    const css = await cssFor('q-btn q-btn--dense q-btn--round', MaterialDesign2)
    expect(css).toMatch(/--q-btn-round-dense-min-width:\s*64px/)
    const b = block(css, '.q-btn--dense.q-btn--round')
    // dense keeps its own width token (md2's metric above; md3's is the floor —
    // see the circle test below, 2.4em against 48 was an oval at every font)
    expect(b).toContain('min-width:var(--q-btn-round-dense-min-width)')
    expect(b).toContain('height:var(--q-btn-round-height)')
    expect(b).toContain('min-height:var(--q-control-height)')
  })

  it('makes round buttons circular: both sides read one source (the 48dp floor)', async () => {
    for (const style of [undefined, Unstyled]) {
      const css = await cssFor('q-btn q-btn--round q-btn--dense', style)
      // one source for both sides => a circle; `auto` height stays content-driven,
      // which for square icon content tracks the width at every font size. In md3/
      // md2 that source is the 48dp floor; unstyled's control height is `auto` by
      // design (no floor), and the same source still keeps the box symmetric —
      // verified per style in a real engine (round-circle: 24/24 at 14–24px fonts)
      expect(css).toMatch(
        /--q-btn-round-min-width:\s*var\(--q-control-height\)/
      )
      expect(css).not.toMatch(/--q-btn-round-min-width:\s*3em/)
      expect(css).toMatch(
        /--q-btn-round-dense-min-width:\s*var\(--q-control-height\)/
      )
      expect(css).not.toMatch(/--q-btn-round-dense-min-width:\s*2\.4em/)
      expect(css).toMatch(/--q-btn-round-height:\s*auto/)
      const b = block(css, '.q-btn--round')
      // the48dp floor stays declared exactly as control-height.test.ts guards it
      expect(b).toContain('min-height:var(--q-control-height)')
      expect(b).toContain('min-width:var(--q-btn-round-min-width)')
    }
  })

  it('leaves the fab and mini-fab on their own square token', async () => {
    const css = await cssFor(
      'q-btn q-btn--fab q-btn--fab-mini',
      MaterialDesign2
    )
    const fab = block(css, '.q-btn--fab')
    expect(fab).toContain('min-width:var(--q-fab-size)')
    expect(fab).toContain('min-height:var(--q-fab-size)')
    expect(fab).not.toContain('--q-btn-round-min')
  })
})

// The md2 spec states its 64px minimum on the button variants it names —
// contained, outlined, text (`specs/md2/buttons.*.min_width_px`) — and the spec
// knows no pill at all: MD2 buttons are 4px-cornered rectangles (border_radius_px
// = 4), so a pill's width is spec-SILENT. The authority chain (ADR 0008: spec,
// then dist, then no-overlap) then puts it on dist, which declares no min-width
// anywhere in the `.q-btn` family. Both real Quasar implementations agree:
// v1.22.10 — the md2-era build, fetched from unpkg 2026-09-29 — carries zero
// min-width rules on `.q-btn`, and v2.33.2 dist carries none either.
//
// The release must NOT be scoped to `--rectangle`: QBtn's class assembly is
//   round ? 'round' : `rectangle${rounded ? ' q-btn--rounded' : ...}`
// so `q-btn--rectangle` sits on EVERY non-round button — it is the spec's
// text/outlined/contained, and stripping its floor would delete min_width_px
// from dialog actions and plain label buttons. Only the pill releases.
//
// Element this settles: the occupancy day cell (q-btn--outline q-btn--rectangle
// q-btn--rounded, measured 64x48 — a stadium) is a CALENDAR DATE, and MD2 sizes
// dates in the date-picker section, not the button section: mobile date bounding
// box 40x40dp, selected date 36x36dp, 4dp apart (m2.material.io date-pickers).
//
// FAB trap, from this file's own fab comment: Quasar adds `q-btn--rounded` to
// every fab and `--rounded` is emitted AFTER `--fab`, so the fab's min-width
// must outrank this release — hence `!important`, mirroring the fab's radius.
describe('QBtn pill releases the md2 button floor (spec-silent width -> dist)', () => {
  it('states content width on the pill in md2, md3 and unstyled alike', async () => {
    for (const style of [MaterialDesign2, Unstyled]) {
      const css = await cssFor('q-btn q-btn--rounded', style)
      const b = block(css, '.q-btn--rounded')
      expect(b, `pill in ${style?.name ?? 'style'}`).toContain('min-width:auto')
    }
    const md3 = block(await cssFor('q-btn q-btn--rounded'), '.q-btn--rounded')
    expect(md3).toContain('min-width:auto')
  })

  it('keeps the spec floor on the plain label button (rectangle is every button)', async () => {
    const css = await cssFor('q-btn q-btn--rectangle', MaterialDesign2)
    const b = block(css, '.q-btn--rectangle')
    // the rule state is the shared radius; the floor keeps coming from the base
    expect(block(css, '.q-btn')).toContain('min-width:var(--q-btn-min-width)')
    expect(css).toMatch(/--q-btn-min-width:\s*64px/)
    expect(b).not.toContain('min-width:auto')
  })

  it('outranks the release so fabs stay square (rounded emits after fab)', async () => {
    const css = await cssFor(
      'q-btn q-btn--rounded q-btn--fab q-btn--fab-mini',
      MaterialDesign2
    )
    expect(block(css, '.q-btn--fab')).toContain(
      'min-width:var(--q-fab-size) !important'
    )
    expect(block(css, '.q-btn--fab-mini')).toContain(
      'min-width:var(--q-fab-mini-size) !important'
    )
  })

  it('emits the pill release after the base floor, or it is inert', async () => {
    const css = await cssFor('q-btn q-btn--rounded', MaterialDesign2)
    const base = css.indexOf('.q-btn{')
    const pill = css.indexOf('.q-btn--rounded{')
    expect(base).toBeGreaterThanOrEqual(0)
    expect(pill).toBeGreaterThan(base)
  })
})
