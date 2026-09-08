import { describe, it, expect } from 'vitest'
import { resetPreflight } from '../src/preflights/reset.js'

// resetPreflight.getCSS ignores its context argument (it's a static reset),
// so we pass an empty object cast to satisfy the type.
const getCSS = () => resetPreflight.getCSS({} as any)

describe('resetPreflight', () => {
  it('emits a @layer reset block', () => {
    const css = getCSS()
    expect(css).toContain('@layer reset')
  })

  it('applies box-sizing border-box to all elements and pseudo-elements', () => {
    const css = getCSS()
    expect(css).toContain(':where(*, ::before, ::after, ::backdrop)')
    expect(css).toContain('box-sizing: border-box')
  })

  it('resets margin and padding to zero on all elements', () => {
    const css = getCSS()
    expect(css).toContain('margin: 0')
    expect(css).toContain('padding: 0')
  })

  it('sets line-height and font-family on html', () => {
    const css = getCSS()
    expect(css).toContain('line-height: 1.5')
    expect(css).toContain('font-family: var(--default-font-family')
  })

  it('resets font-size and weight on headings', () => {
    const css = getCSS()
    // h1-h6 should inherit font-size and font-weight
    expect(css).toMatch(/h1.*h6/)
    expect(css).toContain('font-size: inherit')
    expect(css).toContain('font-weight: inherit')
  })

  it('resets link color and text-decoration', () => {
    const css = getCSS()
    expect(css).toContain('color: inherit')
    expect(css).toContain('text-decoration: inherit')
  })

  it('resets button and input font styles', () => {
    const css = getCSS()
    expect(css).toContain('font-family: inherit')
    expect(css).toContain('font-size: 100%')
  })

  it('sets replaced elements to display block', () => {
    const css = getCSS()
    expect(css).toContain('img, svg, video')
    expect(css).toContain('display: block')
  })

  it('constrains images and videos to parent width', () => {
    const css = getCSS()
    expect(css).toContain('max-width: 100%')
    expect(css).toContain('height: auto')
  })

  it('sets quasar root styles on html, body, #q-app', () => {
    const css = getCSS()
    expect(css).toContain('html, body, #q-app')
    expect(css).toContain('width: 100%')
  })
})
