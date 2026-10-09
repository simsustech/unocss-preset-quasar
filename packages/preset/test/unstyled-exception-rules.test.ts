import { createGenerator } from 'unocss'
import { describe, expect, it } from 'vitest'
import {
  MaterialDesign3,
  QuasarPreset,
  QuasarStyleEntries
} from '../src/index.js'
import type { QuasarStyleEntry } from '../src/index.js'

type Block = { selector: string; declarations: Map<string, string> }

const blocksOf = (css: string): Map<string, Block> => {
  const blocks = new Map<string, Block>()
  for (const match of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const declarations = new Map(
      match[2]
        .split(';')
        .map((entry) => entry.trim())
        .filter(Boolean)
        .map((entry) => {
          const split = entry.indexOf(':')
          return [
            entry.slice(0, split).trim(),
            entry.slice(split + 1).trim()
          ] as [string, string]
        })
    )
    for (const raw of match[1].split(',')) {
      const selector = raw.trim().replace(/\s+/g, ' ')
      const prior = blocks.get(selector)
      blocks.set(selector, {
        selector,
        declarations: prior
          ? new Map([...prior.declarations, ...declarations])
          : declarations
      })
    }
  }
  return blocks
}

const sheet = async (
  classes: string[],
  styles: QuasarStyleEntry[] = QuasarStyleEntries
) => {
  const generator = await createGenerator({
    presets: [QuasarPreset({ styles })]
  })
  const { css } = await generator.generate(classes.join(' '), {
    preflights: false
  })
  return blocksOf(css)
}

describe('unstyled exception rules', () => {
  it('neutralizes all painted uploader overlay declarations', async () => {
    const all = await sheet(['q-uploader', 'q-uploader__overlay'])
    const md3 = await sheet(
      ['q-uploader', 'q-uploader__overlay'],
      [MaterialDesign3]
    )
    const resets = [...all.values()].filter((block) => !md3.has(block.selector))
    const reset = resets.find((block) =>
      block.selector.includes('body.quasar-style-unstyled .q-uploader__overlay')
    )
    expect(reset).toBeDefined()
    expect(reset?.declarations.get('background')).toBe('none')
    expect(reset?.declarations.get('color')).toBe('inherit')
  })

  it('neutralizes stepper disabled and header-border paint, but not structural connectors', async () => {
    const classes = [
      'q-stepper',
      'q-stepper__header--border',
      'q-stepper__tab--disabled',
      'q-stepper__dot',
      'q-stepper__label',
      'q-stepper__line'
    ]
    const all = await sheet(classes)
    const md3 = await sheet(classes, [MaterialDesign3])
    const resets = [...all.values()].filter((block) => !md3.has(block.selector))
    const reset = (selector: string) =>
      resets.find((block) => block.selector.endsWith(selector))

    expect(
      reset('.q-stepper__header--border')?.declarations.get(
        'border-bottom-color'
      )
    ).toBe('transparent')
    expect(
      reset('.q-stepper__tab--disabled .q-stepper__dot')?.declarations.get(
        'background'
      )
    ).toBe('transparent')
    expect(
      reset('.q-stepper__tab--disabled .q-stepper__label')?.declarations.get(
        'color'
      )
    ).toBe('inherit')
    expect(
      [...all.values()].some(
        (block) =>
          block.selector.includes(
            '.q-stepper--horizontal .q-stepper__line:before'
          ) && block.declarations.get('background') === 'rgba(0, 0, 0, 0.12)'
      )
    ).toBe(true)
  })
})
