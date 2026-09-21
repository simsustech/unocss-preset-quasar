import { describe, expect, it } from 'vitest'
import { quasarValueExtractor } from '../src/extractor.js'

/**
 * The classes Quasar builds from prop *values*. They are invisible to content
 * scanning (the value is what appears in the source) and cannot be safelisted
 * (an icon set is open-ended), so without this the page renders them unstyled.
 */
describe('quasar value extractor', () => {
  const extract = (code: string) =>
    quasarValueExtractor.extract!({ code } as never) as string[]

  it('turns an icon prop into the icon class', () => {
    expect(extract('<q-icon name="chevron-down" />')).toContain(
      'i-mdi-chevron-down'
    )
    expect(extract('<q-item icon="mdi-close" />')).toContain('i-mdi-close')
    expect(extract('<q-icon class="i-mdi-plus" />')).toContain('i-mdi-plus')
  })

  it('turns a transition prop into the six transition classes', () => {
    const classes = extract('<q-dialog transition-show="scale" />')
    for (const phase of [
      'enter-from',
      'enter-active',
      'enter-to',
      'leave-from',
      'leave-active',
      'leave-to'
    ]) {
      expect(classes).toContain(`q-transition--scale-${phase}`)
    }
  })

  it('does not invent classes from unrelated attributes', () => {
    expect(extract('<div class="row" data-name="x">y</div>')).not.toContain(
      'i-mdi-x'
    )
    expect(extract('<q-dialog :transition-show="null" />')).toEqual([])
  })
})
