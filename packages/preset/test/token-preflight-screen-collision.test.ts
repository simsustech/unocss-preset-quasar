import { describe, it, expect } from 'vitest'
import { createGenerator } from '@unocss/core'
import { QuasarPreset } from '../src/index.js'

/**
 * Regression test: the token preflight must NOT emit `--q-size-sm/md/lg` CSS
 * vars on `body` (or any scoped block).
 *
 * Quasar's Screen plugin reads its breakpoints from those vars via
 * `getComputedStyle(document.body)` (src/plugins/screen/Screen.js `start()`).
 * The preset's `sizeSm/Md/Lg` sizing tokens are 24/40/56px — emitting them
 * overrides the real breakpoint values (600/1024/1440px emitted on `:root` by
 * src/core/size.unocss.ts) and breaks `$q.screen` (e.g. `gt.sm` becomes true
 * on every viewport, which makes the Md3Layout drawer behave like desktop on
 * mobile screens).
 */
describe('token preflight vs Quasar Screen breakpoint vars', () => {
  async function generate(classes: string): Promise<string> {
    const uno = await createGenerator({
      presets: [QuasarPreset()]
    })
    const { css } = await uno.generate(classes)
    return css
  }

  it('does not emit --q-size-sm/md/lg sizing tokens on body', async () => {
    const css = await generate('q-btn')
    const bodyBlock = css.match(/body \{([^}]*)\}/)?.[1] ?? ''
    expect(bodyBlock).not.toContain('--q-size-sm')
    expect(bodyBlock).not.toContain('--q-size-md')
    expect(bodyBlock).not.toContain('--q-size-lg')
  })

  it('does not emit --q-size-sm/md/lg in scoped style blocks', async () => {
    const css = await generate('q-btn')
    // every body.quasar-style-* block must stay free of the sizing tokens
    const scopedBlocks =
      css.match(/body\.quasar-style-[a-z0-9-]+ \{([^}]*)\}/g) ?? []
    expect(scopedBlocks.length).toBeGreaterThan(0)
    for (const block of scopedBlocks) {
      expect(block).not.toContain('--q-size-sm')
      expect(block).not.toContain('--q-size-md')
      expect(block).not.toContain('--q-size-lg')
    }
  })

  it('emits the real breakpoint values on :root (Screen compatibility)', async () => {
    const css = await generate('q-btn')
    // the breakpoint block comes from src/core/size.unocss.ts — scan all
    // :root blocks for the Screen breakpoint vars
    const rootBlocks = css.match(/:root \{([^}]*)\}/g) ?? []
    expect(rootBlocks.length).toBeGreaterThan(0)
    const allRoot = rootBlocks.join('\n')
    expect(allRoot).toContain('--q-size-sm: 600px')
    expect(allRoot).toContain('--q-size-md: 1024px')
    expect(allRoot).toContain('--q-size-lg: 1440px')
  })
})
