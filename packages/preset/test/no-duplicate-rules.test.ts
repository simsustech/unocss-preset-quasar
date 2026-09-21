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
import { mergeDuplicateRules } from '../src/rules/merge.js'
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

/** CSS for a synthetic rule list, so the guard does not depend on a component. */
async function cssForRules(rules: Rule[], token: string): Promise<string> {
  const gen = await createGenerator({ rules: mergeDuplicateRules(rules) })
  const r = await gen.generate(token, { preflights: false })
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

  it('pins the duplicated matchers still to fold (may only shrink)', () => {
    // The invariant is ONE entry per regex in the effective list — that is what
    // `mergeDuplicateRules` guarantees, and what this file's header promises.
    // Checked on the merged list it would be tautological, so check the source
    // modules instead: every regex declared more than once is a group whose
    // properties are unioned with later-wins, which means a conflicting value
    // in an earlier entry is dead text — and when the later entry is a literal
    // copy, a token loses. Fold a group by collapsing it to a single
    // token-driven rule, then lower this number.
    //
    // Folded so far: btn-group (8 -> 1), radio (8 groups), checkbox (12
    // groups), item (10 groups), field (29 groups), slider (22), date (24),
    // time (39). Note the fold is NOT always output-neutral: within
    // one matcher UnoCSS merges multiple yields first-wins per property, while
    // across entries the merge is later-wins, so a conflicting property that
    // the later entry used to win can flip to the earlier one. Always diff the
    // emitted sheet and review each change.
    // Still to do: time/date/timeline/pull-to-refresh 4x, field 29 dupes,
    // slider 22, fab/tabs 9.
    const counts = new Map<string, number>()
    for (const rule of sourceRules()) {
      const [matcher] = rule as [unknown]
      if (matcher instanceof RegExp) {
        counts.set(matcher.source, (counts.get(matcher.source) ?? 0) + 1)
      }
    }
    const duplicated = [...counts.entries()].filter(([, n]) => n > 1).length
    // 64 distinct regexes are declared more than once. 268 duplicated matchers
    // when counted per file (a regex repeated in two modules counts once here).
    expect(duplicated).toBe(64)
  })

  it('retains declarations from every duplicate for the same class', async () => {
    // A synthetic pair: the first entry carries `gap`, the second adds padding.
    // Last-wins alone used to drop the gap entirely, and UnoCSS itself keeps
    // only the last rule registered for a regex.
    const css = await cssForRules(
      [
        [/^q-fixture$/, () => ({ gap: 'var(--q-space-md)' })],
        [
          /^q-fixture$/,
          () => ({
            'min-height': 'var(--q-item-dense-min-height)',
            'padding-inline': '16px'
          })
        ]
      ],
      'q-fixture'
    )
    const b = block(css, '.q-fixture')
    expect(b).toContain('gap:var(--q-space-md)')
    expect(b).toContain('padding-inline:16px')
    expect(b).toContain('min-height:var(--q-item-dense-min-height)')
  })

  it('folds repeated properties into one, with the later entry winning', async () => {
    const css = await cssForRules(
      [
        [/^q-fixture$/, () => ({ 'min-height': '28px' })],
        [
          /^q-fixture$/,
          () => ({ 'min-height': 'auto', 'padding-block': '2px' })
        ]
      ],
      'q-fixture'
    )
    const minHeights = block(css, '.q-fixture').match(/min-height:[^;]+/g)
    // One merged declaration set: the later entry's value wins, and the other
    // entry's declarations survive (previous test).
    expect(minHeights).toEqual(['min-height:auto'])
    expect(block(css, '.q-fixture')).toContain('padding-block:2px')
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
    // Step 6 ported the reference's own elevation pair, so the util now carries
    // the literal shadow instead of the token alias.
    expect(util).toContain(
      'box-shadow:0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'
    )
    // These belong to the scoped selectors, not to the util itself.
    expect(util).not.toContain('--q-on-surface')
    expect(util).not.toContain('z-index')
  })
})
