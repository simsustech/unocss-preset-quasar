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
