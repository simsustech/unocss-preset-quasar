// Step 8ii (AUD-001, AUD-003, AUD-014, AUD-026): the dead-matcher family.
//
// Five of the six members were matchers whose regex demanded a *state* (`:focus`,
// `.disabled`), a *combinator* (`>`), or a *combined class* (`a.b`) inside the
// candidate token. UnoCSS matches candidates, not selector text — the extractor
// splits `class="q-list--bordered q-list--separator"` into two tokens and the
// safelist has no combined entries — so none of them could ever fire. The sixth
// (`row-reverse` / `column-reverse`) was the opposite mistake: a standalone
// matcher for a class Quasar only ever composes (`.row.reverse`).
//
// The repairs move the state into the *emitted selector* (`symbols.selector`) and
// keep the matcher on a token the extractor actually produces. This file pins
// both halves: the repairs by name, and a generic sweep so the next member of the
// family cannot be written by accident.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { createGenerator } from 'unocss'
import { QuasarPreset } from '../src/index.js'

const HERE = dirname(fileURLToPath(import.meta.url))
const SRC = join(HERE, '..', 'src')

const ruleFiles = (dir = SRC, out: string[] = []): string[] => {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) ruleFiles(path, out)
    else if (entry === 'rules.ts') out.push(path)
  }
  return out
}

const sources = (): Map<string, string> =>
  new Map(ruleFiles().map((file) => [file, readFileSync(file, 'utf8')]))

/** Every matcher pattern this preset declares: `[ /^…$/, …]` and `new RegExp`. */
function matcherPatterns(source: string): string[] {
  const patterns: string[] = []
  for (const line of source.split('\n')) {
    const literal = line.match(/^\s*\/\^(.+?)\/,\s*$/)
    if (literal) patterns.push(literal[1])
    for (const m of line.matchAll(/new RegExp\(`\^(.+?)\$`\)/g)) {
      patterns.push(m[1])
      void m
    }
  }
  return patterns
}

const sheet = async (token: string): Promise<string> =>
  (
    await (
      await createGenerator({ presets: [QuasarPreset({})] })
    ).generate(token, { preflights: false })
  ).css

const norm = (value: string): string =>
  value
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};])\s*/g, '$1')
    .trim()

/**
 * Declaration blocks, with the selector list split. UnoCSS merges rules that
 * declare the same thing into one block (`.a,\n.b{…}`), so a repaired selector
 * has to be looked up *within* a list, not as a `selector{` substring.
 */
const blocks = (css: string): { selectors: string[]; body: string }[] =>
  [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({
    selectors: m[1]
      .split(',')
      .map((sel) => sel.trim().replace(/\s+/g, ' '))
      .filter(Boolean),
    body: m[2].trim().replace(/\s+/g, ' ').replace(/;$/, '')
  }))

const declFor = (css: string, selector: string): string | undefined =>
  blocks(css).find((b) => b.selectors.includes(selector))?.body

describe('dead-matcher repairs (step 8ii)', () => {
  it('no matcher token carries a state, a combinator or a combined class', () => {
    const offenders: string[] = []
    for (const [file, source] of sources()) {
      for (const pattern of matcherPatterns(source)) {
        // A raw `>`/whitespace/`:` in the token part, or a dot that is not
        // escaped (an escaped dot is a literal class-name dot in a selector, a
        // raw one matches any character and hides the same mistake).
        // Template-built matchers (`q-${prefix.charAt(0)}${side}-${size}`) are
        // dynamic by construction: only their literal part can carry a mistake.
        const literalPart = pattern
          .replace(/\$\{[^}]*\}/g, 'x') // template holes
          .replace(/\(\?[:=!<]/g, '') // regex group syntax, not a selector part
        const suspects = [
          /[\s>:]/.test(literalPart) ? 'separator/combinator' : null,
          /(?<!\\)\./.test(literalPart) ? 'unescaped dot' : null
        ].filter(Boolean)
        if (suspects.length) {
          offenders.push(
            `${file.split('/src/')[1]} :: /^${pattern}$/ (${suspects.join(', ')})`
          )
        }
      }
    }
    expect(offenders.join('\n')).toBe('')
  })

  it('keeps none of the six dead matchers by name', () => {
    const all = [...sources().values()].flatMap(matcherPatterns).join('\n')
    for (const dead of [
      'q-list--bordered.q-list--separator',
      'q-textarea\\.disabled',
      'q-toggle.disabled',
      'q-toggle--dense.reverse',
      'q-item > .q-item__section--thumbnail',
      'q-link--focusable:focus-visible'
    ]) {
      expect(all, dead).not.toContain(dead)
    }
  })

  it('textarea keeps the disabled resize through the component token', async () => {
    const css = norm(await sheet('q-textarea'))
    expect(
      declFor(
        await sheet('q-textarea'),
        '.q-textarea.disabled .q-field__native'
      )
    ).toBe('resize:none')
  })

  it('toggle keeps both disabled states', async () => {
    const css = await sheet('q-toggle')
    expect(declFor(css, '.q-toggle.disabled')).toBe('opacity:0.75 !important')
    expect(declFor(css, '.q-toggle--dense.reverse .q-toggle__label')).toBe(
      'padding-left:0;padding-right:0.5em'
    )
  })

  it('item bleeds the thumbnail to the row edge, exactly once per edge', async () => {
    const css = await sheet('q-item')
    // The dead `q-item > …` matcher was a duplicate of this coverage; removing it
    // is what keeps one deterministic value per edge (dist: -16px).
    for (const [selector, decl] of [
      [
        '.q-item > .q-item__section--thumbnail:first-child',
        'margin-left:-16px'
      ],
      [
        '.q-item > .q-focus-helper + .q-item__section--thumbnail',
        'margin-left:-16px'
      ],
      [
        '.q-item > .q-item__section--thumbnail:last-of-type',
        'margin-right:-16px'
      ]
    ]) {
      const bodies = blocks(css)
        .filter((b) => b.selectors.includes(selector))
        .map((b) => b.body)
      expect(bodies, selector).toEqual([decl])
    }
  })

  it('q-link--focusable carries dist underline and the reference outline', async () => {
    const css = await sheet('q-link--focusable')
    const body = declFor(css, '.q-link--focusable:focus-visible')
    expect(body).toContain('outline:auto')
    expect(body).toContain('text-decoration:underline dashed currentColor 1px')
  })

  it('row-reverse and column-reverse no longer emit standalone rules', async () => {
    for (const token of ['row-reverse', 'column-reverse']) {
      const selectors = blocks(await sheet(token)).flatMap((b) => b.selectors)
      expect(selectors, token).not.toContain(`.${token}`)
    }
    // The combined form Quasar actually composes still does.
    expect(declFor(await sheet('row'), '.row.reverse')).toBe(
      'flex-direction:row-reverse'
    )
  })

  it('the v1 chat module is gone and q-message still covers the family', async () => {
    const files = [...sources().keys()].map((f) => f.split('/src/')[1])
    expect(files.some((f) => f.startsWith('components/chat/'))).toBe(false)
    const selectors = blocks(await sheet('q-message')).flatMap(
      (b) => b.selectors
    )
    for (const expected of [
      '.q-message',
      '.q-message-text-content--sent',
      '.q-message-container--sent'
    ]) {
      expect(selectors, expected).toContain(expected)
    }
    // Every class is its own candidate, so the sub-classes are asked for by name.
    for (const cls of [
      'q-message-name',
      'q-message-stamp',
      'q-message-label'
    ]) {
      expect(
        blocks(await sheet(cls)).flatMap((b) => b.selectors),
        cls
      ).toContain(`.${cls}`)
    }
    // dist styles exactly this family and carries no `q-chat*` selector at all.
    expect(selectors.some((sel) => sel.includes('q-chat-message'))).toBe(false)
  })
})
