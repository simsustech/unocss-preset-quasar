import { createGenerator } from 'unocss'
import { describe, expect, it } from 'vitest'
import {
  quasarComponentExtractor,
  quasarValueExtractor
} from '../src/extractor.js'
import { QuasarPreset, QuasarStyleEntries } from '../src/index.js'

/**
 * Proof that the preset's `extractors` are live, not merely declared.
 *
 * The safelist cannot mask these: `q-transition--scale-*` has never been in it
 * (it cannot be — the transition names are app-authored). So if the sheet has
 * those classes only when a `transition-show` value is present, the extractor
 * path is doing the work.
 *
 * The component extractor's own classes cannot be discriminated this way while
 * the safelist still carries them, which is exactly what trimming it is for;
 * `extractor.test.ts` covers it directly in the meantime.
 */
describe('extractors', () => {
  it('are declared on the preset', () => {
    const preset = QuasarPreset({ styles: QuasarStyleEntries })
    expect(preset.extractors?.map((e) => e.name)).toEqual([
      'quasar-component-extractor',
      'quasar-value-extractor'
    ])
    expect(quasarComponentExtractor.extract).toBeTypeOf('function')
    expect(quasarValueExtractor.extract).toBeTypeOf('function')
  })

  it('supply classes the safelist never could', async () => {
    const gen = await createGenerator({
      presets: [QuasarPreset({ styles: QuasarStyleEntries })]
    })
    const sheetFor = async (content: string) =>
      (await gen.generate(content, { preflights: false })).css

    // `q-transition--*` has never been in the safelist — it cannot be, since the
    // transition names are app-authored — and there is no component tag here for
    // the component extractor to latch onto. So the only thing that can turn the
    // `transition-show` value into a class is the value extractor.
    const withProp = await sheetFor('transition-show="slide-right"')
    const withoutProp = await sheetFor('<div>plain</div>')
    expect(withProp).toContain('.q-transition--slide-right-enter-from')
    expect(withProp).toContain('.q-transition--slide-right-leave-active')
    expect(withoutProp).not.toContain('.q-transition--slide-right-enter-from')

    // And the extractor does not care whether our rules happen to enumerate the
    // name: it hands UnoCSS the candidate, and a name we have no rule for simply
    // gets no declarations.
    const candidates = quasarValueExtractor.extract!({
      code: 'transition-show="whatever-this-app-invented"'
    } as never) as string[]
    expect(candidates).toContain(
      'q-transition--whatever-this-app-invented-enter-from'
    )

    // Icons are the other open-ended set, the value naming the class.
    const icons = quasarValueExtractor.extract!({
      code: '<q-icon name="chevron-down" />'
    } as never) as string[]
    expect(icons).toContain('i-mdi-chevron-down')
  })
})
