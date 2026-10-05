import { readFileSync } from 'node:fs'
import { describe, it, expect, afterEach } from 'vitest'
import {
  defaultTheme,
  generateColorTokens,
  generateTheme,
  setThemeColors,
  type QuasarTheme
} from '../src/theme/index.js'

/**
 * `unocss-preset-quasar/theme` is published API, not an internal module:
 * `@modular-api/fastify-oidc` types its `themeColors` option as
 * `QuasarTheme['colors']`, `@modular-api/oidc-interactions` calls
 * `setThemeColors()` from it, and consumer CSS reads the `--light-*` /
 * `--dark-*` / `--*` custom properties it writes.
 *
 * The rewrite dropped the subpath while consumers still imported it, so the
 * app failed to start with `ERR_PACKAGE_PATH_NOT_EXPORTED`. These tests pin
 * the entry point, the exported names and the values/variables consumers
 * depend on.
 */
const pkg = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8')
) as { exports: Record<string, Record<string, string>> }

describe('unocss-preset-quasar/theme entry point', () => {
  it('is exported, with source/types/import targets that exist', () => {
    const entry = pkg.exports['./theme']
    expect(entry).toBeDefined()
    expect(entry.source).toBe('./src/theme/index.ts')
    expect(entry.types).toBe('./dist/types/theme/index.d.ts')
    expect(entry.import).toBe('./dist/theme/index.js')
    expect(entry.require).toBe('./dist/theme/index.js')
  })

  it('exposes QuasarTheme, defaultTheme, generateTheme and setThemeColors', () => {
    expect(typeof generateTheme).toBe('function')
    expect(typeof setThemeColors).toBe('function')
    expect(defaultTheme.colors.light.primary).toBeTypeOf('string')
  })
})

describe('generateTheme', () => {
  it('returns the documented theme shape', () => {
    const theme: QuasarTheme = generateTheme('#FF6F00')

    expect(theme.typography.font).toContain('Roboto')
    expect(theme.breakpoints.md).toBe('1024px')
    expect(theme.shape.corner.extraLarge).toBe('28px')
    expect(theme.quasar.z.notify).toBe(9500)
    // Palette entries are static defaults, carried from defaultTheme
    expect(theme.colors['blue-8']).toBe('#1976d2')
    expect(theme.colors['blue-grey-14']).toBe('#455a64')
  })

  it('derives its colors from generateColorTokens', () => {
    const theme = generateTheme('#FF6F00')
    const { light, dark, quasar } = generateColorTokens('#FF6F00')

    // Light and dark schemes are the full Material scheme
    expect(theme.colors.light).toEqual(light)
    expect(theme.colors.dark).toEqual(dark)
    // Scalar brand colors
    expect(theme.colors.primary).toBe(quasar.primary)
    expect(theme.colors.secondary).toBe(quasar.secondary)
    expect(theme.colors.accent).toBe(quasar.accent)
    expect(theme.colors.positive).toBe(quasar.positive)
    expect(theme.colors['dark-page']).toBe(dark.background)
  })

  it('changes with the source color', () => {
    expect(generateTheme('#FF6F00').colors.light.primary).not.toBe(
      generateTheme('#1976d2').colors.light.primary
    )
  })
})

/**
 * `setThemeColors` writes the primitives onto `document.body` (validated with
 * `instanceof Element`) and the semantic `--q-*` tier into a stylesheet injected
 * onto `document.head`, so the test supplies both globals.
 */
class FakeElement {
  props = new Map<string, string>()
  style = {
    setProperty: (name: string, value: string) => {
      this.props.set(name, value)
    }
  }
}

class FakeStyle {
  id = ''
  textContent = ''
}

const globals = globalThis as unknown as {
  document?: unknown
  Element?: unknown
}

afterEach(() => {
  delete globals.document
  delete globals.Element
})

describe('setThemeColors', () => {
  const applied = () => {
    const el = new FakeElement()
    const styles: FakeStyle[] = []
    globals.Element = FakeElement
    globals.document = {
      body: el,
      head: {
        appendChild: (child: FakeStyle) => {
          styles.push(child)
          return child
        }
      },
      createElement: () => new FakeStyle(),
      getElementById: (id: string) =>
        styles.find((style) => style.id === id) ?? null
    }
    const colors = generateTheme('#FF6F00').colors
    setThemeColors(colors)
    return { props: el.props, styles, colors }
  }

  it('writes the light and dark schemes as kebab-case primitives', () => {
    const { props } = applied()

    expect(props.get('--light-primary')).toBeTypeOf('string')
    expect(props.get('--light-on-primary-container')).toBeTypeOf('string')
    expect(props.get('--light-surface-container-highest')).toBeTypeOf('string')
    expect(props.get('--dark-primary')).toBeTypeOf('string')
    expect(props.get('--dark-surface-container-highest')).toBeTypeOf('string')
    // The scheme objects themselves are not variables
    expect(props.has('--light')).toBe(false)
    expect(props.has('--dark')).toBe(false)
  })

  it('writes the scalar colors and leaves the palette alone', () => {
    const { props } = applied()

    expect(props.get('--primary')).toBe(
      generateColorTokens('#FF6F00').quasar.primary
    )
    expect(props.get('--dark-page')).toBe(
      generateColorTokens('#FF6F00').dark.background
    )
    // Quasar palette entries go through the scalar loop too (historic behaviour)
    expect(props.get('--blue-8')).toBe('#1976d2')
  })

  it('restates the semantic --q-* tokens the components read', () => {
    const { styles, colors } = applied()

    // One injected stylesheet, light roles on :root and dark roles scoped to the
    // dark body — an inline value could not be conditional on `body.body--dark`.
    expect(styles).toHaveLength(1)
    const css = styles[0]!.textContent
    expect(css).toContain(`:root { `)
    expect(css).toContain(`body.body--dark { `)

    // Light scheme reaches the semantic tokens without a reload
    expect(css).toContain(`--q-primary: ${colors.light.primary};`)
    expect(css).toContain(
      `--q-surface-container-highest: ${colors.light.surfaceContainerHighest};`
    )
    // Dark scheme reaches them under body--dark
    expect(css).toContain(`--q-primary: ${colors.dark.primary};`)
    // The Quasar aliases ride the same sheet (light-scheme by contract)
    expect(css).toContain(`--q-secondary: ${colors.secondary};`)
  })

  it('reuses one stylesheet across calls', () => {
    const el = new FakeElement()
    const styles: FakeStyle[] = []
    globals.Element = FakeElement
    globals.document = {
      body: el,
      head: {
        appendChild: (child: FakeStyle) => {
          styles.push(child)
          return child
        }
      },
      createElement: () => new FakeStyle(),
      getElementById: (id: string) =>
        styles.find((style) => style.id === id) ?? null
    }

    setThemeColors(generateTheme('#FF6F00').colors)
    setThemeColors(generateTheme('#1976d2').colors)

    expect(styles).toHaveLength(1)
    expect(styles[0]!.textContent).toContain(
      `--q-primary: ${generateTheme('#1976d2').colors.light.primary};`
    )
  })
})
