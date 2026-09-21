// Spec conformance for lists.
//
// The preset had NO `.q-list*` matcher at all, so bordered/separator lists drew
// nothing between rows, and `.q-item__section--side` never got its
// on-surface-variant colour (the reported "wrong text colour").
//
//   specs/reference/normalized/md3-lists.json
//     - side/leading icon colour = md.sys.color.on-surface-variant
//     - label = on-surface, supporting/overline = on-surface-variant
//     - leading 16 / trailing 16 / between 12 spacing
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset } from '../src/index.js'
import { Unstyled, MaterialDesign2 } from '../src/styles/index.js'

async function cssFor(tokens: string, style?: unknown): Promise<string> {
  const gen = await createGenerator({
    presets: [
      style ? QuasarPreset({ style: style as never }) : QuasarPreset({})
    ]
  })
  const r = await gen.generate(tokens)
  return r.css
}

describe('QList spec conformance', () => {
  it('emits the list container and the inter-item separator rule', async () => {
    const css = await cssFor('q-list q-list--separator q-item-type')
    expect(css).toMatch(/\.q-list\{/)
    // The divider between rows is what was missing: no rule matched q-list at all.
    // UnoCSS groups both sibling selectors into one comma-joined rule, so match the
    // plain sibling form by its prefix (the virtual-scroll variant inserts
    // `.q-virtual-scroll__content` before it).
    expect(css).toContain('.q-list--separator > .q-item-type + .q-item-type')
    // Reference value, transcribed in `src/components/list/rules.ts`.
    expect(css).toContain('border-top:1px solid rgba(0, 0, 0, 0.12)')
  })

  it('gives bordered lists a border', async () => {
    const css = await cssFor('q-list--bordered')
    // The reference states the border as longhands, so the port does too: the
    // gate compares the declaration it names, and a `border` shorthand would
    // leave `border-style`/`border-width` absent.
    expect(css).toContain('.q-list--bordered{')
    expect(css).toContain('border-style:solid')
    expect(css).toContain('border-width:1px')
  })

  it('colours the side section on-surface-variant, not the label colour', async () => {
    const css = await cssFor('q-item__section--side')
    expect(css).toMatch(
      /\.q-item__section--side\{[^}]*color:var\(--q-on-surface-variant\)/
    )
  })

  it('styles the header label with the overline role', async () => {
    const css = await cssFor('q-item__label--header')
    // The dark override is a separate *descendant* rule
    // (`.q-item--dark .q-item__label--header`), so match the base rule by its
    // exact selector rather than the last block that mentions the class.
    const block =
      [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)].find(
        ([, selector]) => selector.trim() === '.q-item__label--header'
      )?.[2] ?? ''
    expect(block).toContain('color:var(--q-on-surface-variant)')
    expect(block).not.toContain('font-weight:600')
  })

  it('offsets the toggle label from the control in every style', async () => {
    for (const style of [undefined, MaterialDesign2, Unstyled]) {
      const css = await cssFor('q-toggle__label', style)
      expect(css).toContain('.q-toggle .q-toggle__label')
      expect(css).toContain('.q-toggle.reverse .q-toggle__label')
    }
  })
})
