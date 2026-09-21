// Structural guard: the EFFECTIVE rule list must register each regex once.
//
// UnoCSS keeps only the last rule registered for a given regex and silently
// discards the earlier ones. The rewrite declared 42 regexes more than once
// (71 lost entries) — that is how `.q-header` lost its base declarations and
// several other components lost styling nobody could find.
//
// `mergeDuplicateRules` collapses those groups at assembly, so the same regex
// may appear in more than one module as long as every declaration survives.
// These tests pin both halves: uniqueness of the effective list, and survival
// of the declarations the duplicates used to swallow — including the scoped
// (`symbols.selector`) yields that carry dark-mode rules.
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import type { Rule } from '@unocss/core'
import { QuasarPreset } from '../src/index.js'
import * as componentModules from '../src/components/index.js'
import * as coreModules from '../src/core/index.js'

const modules = { ...componentModules, ...coreModules } as Record<
  string,
  unknown
>

const isRuleList = (value: unknown): value is Rule[] =>
  Array.isArray(value) &&
  value.every(
    (entry) =>
      typeof entry === 'string' ||
      (Array.isArray(entry) &&
        (entry[0] instanceof RegExp || typeof entry[0] === 'string'))
  )

/** Source rule lists exactly as the modules declare them (pre-merge). */
function sourceRules(): Rule[] {
  return Object.entries(modules)
    .filter(([name]) => name.endsWith('Rules'))
    .flatMap(([, value]) => (isRuleList(value) ? value : []))
}

async function cssFor(tokens: string): Promise<string> {
  const gen = await createGenerator({ presets: [QuasarPreset({})] })
  const r = await gen.generate(tokens, { preflights: false })
  return r.css
}

function block(css: string, sel: string): string {
  const m = css.match(new RegExp(`\\${sel}\\{[^}]*\\}`, 'g'))
  return m ? m.join('\n') : ''
}

describe('duplicate rule matchers', () => {
  it('keeps no async matchers (the merge only handles sync yield)', () => {
    const asyncOnes = sourceRules().filter(
      (rule) =>
        Array.isArray(rule) &&
        typeof rule[1] === 'function' &&
        (
          rule[1] as { constructor?: { name?: string } }
        ).constructor?.name?.startsWith('Async')
    )
    expect(asyncOnes).toEqual([])
  })

  it('retains declarations from every duplicate for the same class', async () => {
    // `q-item--dense` is declared twice: the first entry carries `gap`, the
    // second overrides `min-height` and adds padding. Last-wins used to drop
    // the gap entirely.
    const css = await cssFor('q-item--dense')
    const b = block(css, '.q-item--dense')
    expect(b).toContain('gap:var(--q-space-md)')
    // The dense padding is spelled with logical longhands, as the reference
    // declares it, so it does not collide with the base rule's `gap`.
    expect(b).toContain('padding-inline:16px')
    expect(b).toContain('padding-block:2px')
    expect(b).toContain('min-height:28px')
  })

  it('folds repeated properties into one, with the later entry winning', async () => {
    const css = await cssFor('q-item--dense')
    const minHeights = block(css, '.q-item--dense').match(/min-height:[^;]+/g)
    // One merged declaration set: the second entry's value overrides the first
    // (identical to the old last-wins result), while the first entry's `gap`
    // side by side is preserved by the previous test.
    expect(minHeights).toEqual(['min-height:28px'])
  })

  it('keeps scoped yields separate when merging duplicate matchers', async () => {
    // UnoCSS control keys are plain strings (`$$symbol-selector`), not JS
    // symbols. Detecting scoped yields with `Object.getOwnPropertySymbols`
    // never matched, so `delegateMatchers` folded every scoped yield into the
    // util's declaration object: only the LAST selector survived, carrying the
    // properties of all the others. `.body--dark` rules vanished that way.
    const css = await cssFor('q-btn-group')
    expect(css).toContain('.body--dark .q-btn-group > .q-btn-item')
    expect(css).toContain('.q-btn-group > .q-btn-item:before')
    expect(css).toContain('.q-btn-group > .q-btn-group:not(:first-child)')
    expect(css).toContain('.q-btn-group > .q-btn-group:not(:last-child)')
    expect(css).toContain('.q-btn-group > .q-btn-item.q-btn--standard:before')
  })

  it('leaves scoped declarations out of the merged util block', async () => {
    const css = await cssFor('q-btn-group')
    const util = block(css, '.q-btn-group')
    expect(util).toContain('display:inline-flex')
    expect(util).toContain('box-shadow:var(--q-elevation-1)')
    // These belong to the scoped selectors, not to the util itself.
    expect(util).not.toContain('--q-on-surface')
    expect(util).not.toContain('z-index')
  })
})
