import { describe, it, expect } from 'vitest'
import { createTokenPreflight } from '../src/theme/preflight.js'
import { md3Style, md2Style } from '../src/theme/index.js'

const params = {
  colors: {
    light: { primary: '#6750a1' },
    dark: { primary: '#d0bcff' },
    quasar: {}
  },
  defaultStyle: md3Style,
  styles: [md3Style, md2Style]
} as any

describe('createTokenPreflight', () => {
  it('emits the default style tokens on body, not :root', () => {
    const css = createTokenPreflight(params).getCSS({} as any)
    // --q-btn-radius comes from the style token block (not shared colors),
    // so it must be scoped on body where runtime setThemeColors overrides apply
    expect(css).toMatch(/body\s*\{[^}]*--q-btn-radius/)
    expect(css).not.toMatch(/:root\s*\{[^}]*--q-btn-radius/)
  })

  it('emits shadow primitives on body', () => {
    const css = createTokenPreflight(params).getCSS({} as any)
    expect(css).toContain('--q-shadow-umbra')
    expect(css).toContain('--q-shadow-color: #000')
    expect(css).toContain('--q-dark-shadow-color: #fff')
  })

  it('emits dark color overrides on body.body--dark', () => {
    const css = createTokenPreflight(params).getCSS({} as any)
    expect(css).toMatch(/body\.body--dark\s*\{[^}]*--q-primary/)
  })
})

describe('builtinStyles', () => {
  it('includes md3, md2 and unstyled so all body classes get overrides', async () => {
    const { builtinStyles } = await import('../src/theme/index.js')
    expect(builtinStyles.map((s) => s.name).sort()).toEqual(
      ['md2', 'md3', 'unstyled'].sort()
    )
  })

  it('emits a body.quasar-style-unstyled override block', async () => {
    const { builtinStyles } = await import('../src/theme/index.js')
    const unstyled = builtinStyles.find((s) => s.name === 'unstyled')
    const css = createTokenPreflight({
      ...params,
      styles: builtinStyles
    }).getCSS({} as any)
    expect(unstyled).toBeDefined()
    expect(css).toMatch(
      /body\.quasar-style-unstyled\s*\{[^}]*--q-btn-bg:\s*transparent/
    )
  })
})

describe('dark brand aliases', () => {
  it('overrides --q-dark-page/--q-dark/--q-accent on body.body--dark', async () => {
    const { builtinStyles } = await import('../src/theme/index.js')
    const { generateColorTokens } = await import('../src/theme/colors.js')
    const colors = generateColorTokens('#6750a1')
    const css = createTokenPreflight({
      colors,
      defaultStyle: builtinStyles[0],
      styles: builtinStyles
    }).getCSS({} as any)
    expect(css).toMatch(
      /body\.body--dark\s*\{[^}]*--q-dark-page:\s*#[0-9a-f]{6}/i
    )
    // dark-page must differ from the light background (not resolve light)
    const lightBg = (colors.light as any).background
    expect(css).not.toMatch(
      new RegExp(`body\\.body--dark\\s*\\{[^}]*--q-dark-page:\\s*${lightBg}`)
    )
  })
})
