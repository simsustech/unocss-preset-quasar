import { describe, it, expect } from 'vitest'
import { gridRules } from '../src/core/grid/rules.js'

/** Helper: find a rule by its regex test and invoke the matcher (handles generators) */
function matchRule(selector: string): Record<string, string> | undefined {
  for (const entry of gridRules) {
    const regex = entry[0] as RegExp
    const matcher = entry[1] as any
    if (
      !(regex instanceof RegExp) ||
      !regex.test(selector) ||
      typeof matcher !== 'function'
    )
      continue
    const m = regex.exec(selector)
    const out: Record<string, string> = {}
    const symbols = {
      selector: Symbol('selector'),
      variants: Symbol('variants')
    }
    let res: any
    try {
      res = matcher(m ?? [selector], { symbols })
    } catch {
      res = matcher()
    }
    if (res != null && typeof res[Symbol.iterator] === 'function') {
      for (const chunk of res) {
        if (chunk && typeof chunk === 'object') {
          for (const [k, v] of Object.entries(chunk)) {
            if (typeof k === 'string' && !(k in out)) out[k] = v as string
          }
        }
        break // only base declarations; symbols.selector companions ship separately
      }
      return out
    }
    if (res && typeof res === 'object') return res as Record<string, string>
    return undefined
  }
  return undefined
}

describe('gridRules', () => {
  it('row has display flex and flex-direction row', () => {
    const css = matchRule('row')
    expect(css).toBeDefined()
    expect(css!.display).toBe('flex')
    expect(css!['flex-direction']).toBe('row')
    expect(css!['flex-wrap']).toBe('wrap')
  })

  it('column has display flex and flex-direction column', () => {
    const css = matchRule('column')
    expect(css).toBeDefined()
    expect(css!.display).toBe('flex')
    expect(css!['flex-direction']).toBe('column')
  })

  it('col has flex 1 1 0% and max-width 100%', () => {
    const css = matchRule('col')
    expect(css).toBeDefined()
    expect(css!.flex).toBe('1 1 0%')
    expect(css!['max-width']).toBe('100%')
  })

  it('col-auto has flex 0 0 auto and width auto', () => {
    const css = matchRule('col-auto')
    expect(css).toBeDefined()
    expect(css!.flex).toBe('0 0 auto')
    expect(css!.width).toBe('auto')
  })

  it('col-6 uses --q-col-span variable', () => {
    const css = matchRule('col-6')
    expect(css).toBeDefined()
    expect(css!['--q-col-span']).toBe('6')
    expect(css!.flex).toContain('var(--q-col-span)')
    expect(css!['max-width']).toContain('var(--q-col-span)')
  })

  it('col-1 uses --q-col-span variable', () => {
    const css = matchRule('col-1')
    expect(css).toBeDefined()
    expect(css!['--q-col-span']).toBe('1')
  })

  it('col-12 uses --q-col-span variable', () => {
    const css = matchRule('col-12')
    expect(css).toBeDefined()
    expect(css!['--q-col-span']).toBe('12')
  })

  it('q-gutter-md uses the wind4 spacing step for md custom property', () => {
    const css = matchRule('q-gutter-md')
    expect(css).toBeDefined()
    expect(css!['column-gap']).toBe('calc(var(--spacing) * 4)')
  })

  it('q-gutter-x-sm uses the wind4 spacing step for sm for column-gap', () => {
    const css = matchRule('q-gutter-x-sm')
    expect(css).toBeDefined()
    expect(css!['column-gap']).toBe('calc(var(--spacing) * 2)')
  })

  it('q-gutter-y-lg uses the wind4 spacing step for lg for row-gap', () => {
    const css = matchRule('q-gutter-y-lg')
    expect(css).toBeDefined()
    expect(css!['row-gap']).toBe('calc(var(--spacing) * 6)')
  })

  it('q-gutter-none has zero gap', () => {
    const css = matchRule('q-gutter-none')
    expect(css).toBeDefined()
    expect(css!['column-gap']).toBe('calc(var(--spacing) * 0)')
  })

  it('wrap sets flex-wrap wrap', () => {
    const css = matchRule('wrap')
    expect(css).toBeDefined()
    expect(css!['flex-wrap']).toBe('wrap')
  })

  it('no-wrap sets flex-wrap nowrap', () => {
    const css = matchRule('no-wrap')
    expect(css).toBeDefined()
    expect(css!['flex-wrap']).toBe('nowrap')
  })

  it('flex-center centers both axes', () => {
    const css = matchRule('flex-center')
    expect(css).toBeDefined()
    expect(css!['justify-content']).toBe('center')
    expect(css!['align-items']).toBe('center')
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
