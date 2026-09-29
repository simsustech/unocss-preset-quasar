// Quasar's Screen plugin reads its breakpoints out of the stylesheet:
// `ui/src/plugins/screen/Screen.js` parses `--q-size-{xs,sm,md,lg,xl}`, which
// `ui/src/css/core/size.sass` defines as 0 / 600px / 1024px / 1440px / 1920px
// (independent source: the literals in `ui/dist/quasar.css`).
//
// A consumer that builds with `disableSass: true` (petboarding) replaces
// quasar.css with this preset wholesale, so the preset has to emit those five
// itself. It used not to: the component size scale squatted on `--q-size-sm`
// with `24px`, `parseInt`-based screen detection read `xl` at every viewport,
// and `$q.screen.gt.sm` was true on a 390px phone. The component scale now
// lives on `--q-comp-*`, which Quasar does not reserve.
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'

async function sheet(): Promise<string> {
  const gen = await createGenerator({
    presets: [QuasarPreset({ styles: QuasarStyleEntries })]
  })
  return (await gen.generate('q-btn')).css
}

function rootBlocks(css: string): string {
  return [...css.matchAll(/:root\s*\{[^}]*\}/g)].map((m) => m[0]).join('\n')
}

describe('Quasar screen breakpoints', () => {
  it('emits the five breakpoint literals on :root, at Quasar’s values', async () => {
    const root = rootBlocks(await sheet())
    // Literal transcriptions of ui/dist/quasar.css, not derived from this preset.
    expect(root).toMatch(/--q-size-xs:\s*0(?![\d.])/)
    expect(root).toMatch(/--q-size-sm:\s*600px/)
    expect(root).toMatch(/--q-size-md:\s*1024px/)
    expect(root).toMatch(/--q-size-lg:\s*1440px/)
    expect(root).toMatch(/--q-size-xl:\s*1920px/)
  })

  it('keeps the component size scale on --q-comp-*', async () => {
    const css = await sheet()
    // md3's component scale (theme/index.ts sizing), no longer on Quasar's names
    expect(css).toMatch(/--q-comp-sm:\s*24px/)
    // and no component value may squat on a breakpoint name anywhere in the sheet
    for (const decl of css.match(/--q-size-(xs|sm|md|lg|xl):\s*[^;}]+/g) ??
      []) {
      expect(decl).toMatch(
        /--q-size-(xs:\s*0\b|sm:\s*600px|md:\s*1024px|lg:\s*1440px|xl:\s*1920px)/
      )
    }
  })

  it('unstyled zeroes the component scale while the breakpoints still stand', async () => {
    const css = await sheet()
    const unstyled = css.match(/body\.quasar-style-unstyled\s*\{[^}]*\}/)?.[0]
    expect(unstyled).toBeDefined()
    expect(unstyled).toMatch(/--q-comp-sm:\s*0(?![\d.])/)
    expect(rootBlocks(css)).toMatch(/--q-size-sm:\s*600px/)
  })

  it('emits no --q-size-* in the dark blocks', async () => {
    const css = await sheet()
    const darkBlocks = [...css.matchAll(/body\.body--dark[^{]*\{[^}]*\}/g)].map(
      (m) => m[0]
    )
    expect(darkBlocks.length).toBeGreaterThan(0)
    for (const block of darkBlocks) {
      expect(block).not.toMatch(/--q-size-/)
    }
  })
})
