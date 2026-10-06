import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'

async function cssFor(tokens: string): Promise<string> {
  const gen = await createGenerator({
    presets: [QuasarPreset({ styles: QuasarStyleEntries })]
  })
  return (await gen.generate(tokens, { preflights: false })).css
}

/**
 * The declaration block of the rule whose selector *is* `needle`.
 *
 * Exact, not substring: the generator emits `.body--dark .q-dialog__inner>.q-card`
 * before `.q-dialog__inner`, so a `includes()` match silently returns the dark
 * variant's declarations.
 */
function block(css: string, needle: string): string {
  const blocks = Array.from(css.matchAll(/([^{}]+)\{([^{}]*)\}/g)).map((m) => [
    m[1].trim(),
    m[2]
  ])
  const exact = blocks.find(([sel]) => sel === needle)
  if (exact) return exact[1]
  const partial = blocks.find(([sel]) => sel.includes(needle))
  return partial ? partial[1] : ''
}

/**
 * A dialog paints one surface: its own card. Everything behind it is a scrim.
 *
 * Both regressions documented here come from giving a *full-viewport* element a
 * surface:
 *
 * - **The backdrop** (`.q-dialog__backdrop`, fixed inset 0) was derived from
 *   `--q-dark` — the MD3 *surface* role (light `#fcfcff`) — so in the light
 *   scheme the scrim was a 32 % **white** veil over the page instead of a dim.
 *   The comment above it asserted `--q-dark` "stays dark in both schemes";
 *   `theme/colors.ts` derives `dark` from `light.surface`, so it does not.
 *   The reference is scheme-independent: `rgba(0, 0, 0, 0.4)`.
 *
 * - **The inner** (`.q-dialog__inner`) is rendered by Quasar as
 *   `… standard fixed-full flex-center` (QDialog.js `standard:`) — i.e. *inset 0*,
 *   the whole viewport, where stock Quasar gives it no background and the card is
 *   the only surface. The surface-era design added `var(--q-surface)` **and** a
 *   `max-width: 90vw` / `max-height: 90vh` clamp to this box: the background
 *   painted a visible white 90vw × 90vh panel behind every dialog (measured on
 *   the add-payment dialog: inner `1296×810` at (0,0) with `rgb(252, 252, 255)`
 *   and radius 16, while the real card was `400×418` centred inside it), and the
 *   clamp outlived the surface move — under `fixed-full` a clamped box is
 *   over-constrained, so it pinned to (0, 0) at 90vw × 90vh and `flex-center`
 *   centred every card inside that off-centre box (5vw/5vh drift, measured
 *   45.7 vs 100.3 left/right at 546×1146). Both are gone now: the background
 *   lives on the card, and the clamp was removed by this fix (ADR 0015 and the
 *   comment in `dialog/rules.ts`).
 *
 * Elevation therefore travels with the surface: the MD3 dialog carries
 * `level_3` ambient shadow on the card — which is where this file already puts
 * the `surface-container-high` background.
 */
describe('dialog surfaces', () => {
  it('scrim: the backdrop is the reference alpha, not a --q-dark mix', async () => {
    const css = await cssFor('q-dialog')
    const backdrop = block(css, '.q-dialog__backdrop')

    expect(backdrop).toContain('rgba(0, 0, 0, 0.4)')
    // The mechanism that made the light scheme white:
    expect(backdrop).not.toContain('--q-dark')
    expect(backdrop).not.toContain('color-mix')
    // Layering invariants that must survive the colour change.
    expect(backdrop).toContain('pointer-events:all !important')
    expect(backdrop).toContain('z-index:-1')
  })

  it('the inner paints no surface of its own', async () => {
    const css = await cssFor('q-dialog')
    const inner = block(css, '.q-dialog__inner')

    // The positioning box Quasar's `fixed-full flex-center` needs — and nothing
    // that sizes it: a max-* clamp on a fixed inset:0 box is over-constrained
    // (left/top win), pins the box top-left and drifts every dialog off-centre
    // by 5vw/5vh. Fit belongs to `.q-dialog__inner > div`, not to this box.
    expect(inner).toContain('display:flex')
    expect(inner).not.toContain('max-width')
    expect(inner).not.toContain('max-height')
    // A transparent positioning box must not carry a surface or its elevation.
    expect(inner).not.toContain('background-color')
    expect(inner).not.toContain('box-shadow')
    expect(inner).not.toContain('var(--q-surface)')
  })

  it('the card is the dialog surface: container-high plus elevation', async () => {
    const css = await cssFor('q-dialog')
    const card = block(css, '.q-dialog__inner>.q-card')

    expect(card).toContain(
      'background-color:color-mix(in oklab, var(--q-surface-container-high)'
    )
    // The MD3 ambient shadow must sit on the surface, not be cancelled.
    expect(card).toContain('var(--q-elevation-level3)')
  })
})
