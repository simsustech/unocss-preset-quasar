import { describe, it, expect } from 'vitest'
import { gridRules } from '../src/core/grid/rules.js'

/** Helper: find a rule by its regex test and invoke the matcher */
function matchRule(selector: string): Record<string, string> | undefined {
  for (const entry of gridRules) {
    const regex = entry[0]
    const matcher = entry[1]
    if (
      regex instanceof RegExp &&
      regex.test(selector) &&
      typeof matcher === 'function'
    ) {
      return (matcher as () => Record<string, string>)()
    }
  }
  return undefined
}

describe('gridRules', () => {
  it('row has display flex and flex-direction row', () => {
    const css = matchRule('row')
    expect(css).toBeDefined()
    expect(css!.display).toBe('flex')
    expect(css!.flexDirection).toBe('row')
    expect(css!.flexWrap).toBe('wrap')
  })

  it('column has display flex and flex-direction column', () => {
    const css = matchRule('column')
    expect(css).toBeDefined()
    expect(css!.display).toBe('flex')
    expect(css!.flexDirection).toBe('column')
  })

  it('col has flex 1 1 0% and max-width 100%', () => {
    const css = matchRule('col')
    expect(css).toBeDefined()
    expect(css!.flex).toBe('1 1 0%')
    expect(css!.maxWidth).toBe('100%')
  })

  it('col-auto has flex 0 0 auto and width auto', () => {
    const css = matchRule('col-auto')
    expect(css).toBeDefined()
    expect(css!.flex).toBe('0 0 auto')
    expect(css!.width).toBe('auto')
  })

  it('col-6 has flex-basis 50% and max-width 50%', () => {
    const css = matchRule('col-6')
    expect(css).toBeDefined()
    expect(css!.flex).toBe('0 0 50%')
    expect(css!.maxWidth).toBe('50%')
  })

  it('col-1 has flex-basis 8.3333% and max-width 8.3333%', () => {
    const css = matchRule('col-1')
    expect(css).toBeDefined()
    expect(css!.flex).toBe('0 0 8.3333%')
    expect(css!.maxWidth).toBe('8.3333%')
  })

  it('col-12 has flex-basis 100% and max-width 100%', () => {
    const css = matchRule('col-12')
    expect(css).toBeDefined()
    expect(css!.flex).toBe('0 0 100%')
    expect(css!.maxWidth).toBe('100%')
  })

  it('q-gutter-md uses --q-space-md custom property', () => {
    const css = matchRule('q-gutter-md')
    expect(css).toBeDefined()
    expect(css!.gap).toBe('var(--q-space-md)')
  })

  it('q-gutter-x-sm uses --q-space-sm for column-gap', () => {
    const css = matchRule('q-gutter-x-sm')
    expect(css).toBeDefined()
    expect(css!.columnGap).toBe('var(--q-space-sm)')
  })

  it('q-gutter-y-lg uses --q-space-lg for row-gap', () => {
    const css = matchRule('q-gutter-y-lg')
    expect(css).toBeDefined()
    expect(css!.rowGap).toBe('var(--q-space-lg)')
  })

  it('q-gutter-none has zero gap', () => {
    const css = matchRule('q-gutter-none')
    expect(css).toBeDefined()
    expect(css!.gap).toBe('var(--q-space-none)')
  })

  it('wrap sets flex-wrap wrap', () => {
    const css = matchRule('wrap')
    expect(css).toBeDefined()
    expect(css!.flexWrap).toBe('wrap')
  })

  it('no-wrap sets flex-wrap nowrap', () => {
    const css = matchRule('no-wrap')
    expect(css).toBeDefined()
    expect(css!.flexWrap).toBe('nowrap')
  })

  it('flex-center centers both axes', () => {
    const css = matchRule('flex-center')
    expect(css).toBeDefined()
    expect(css!.justifyContent).toBe('center')
    expect(css!.alignItems).toBe('center')
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
