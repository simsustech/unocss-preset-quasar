#!/usr/bin/env node
// audit-vocabulary.mjs — static hallucination check (audit plan, step 2).
//
// Every selector class token in `src/**/rules.ts` must be either
//
//   (1) part of Quasar's own class vocabulary — `src/generated/quasar-classes.ts`
//       (the scraper's `componentClasses` keys/values plus `globalClasses` and
//       `knownClasses`), or
//   (2) on the explicit allowlist below — every entry carries a rationale
//       comment naming where that family is legitimate, or
//   (3) reported as `unknown` — the review worklist. Any unknown exits 1, so a
//       planted hallucinated selector (`q-fake-thing`) fails the run while the
//       triaged real tree exits 0.
//
// Parsing is raw-text and keyed like the gate's `normSel` (imported from
// `parity-report.mjs`, the module this script mirrors): comments are blanked
// in place (offsets preserved, so file:line stays truthful), then
//
//   - quoted/template literals that read as selectors yield their `.class`
//     tokens (and whole-literal bare `q-*` class strings),
//   - matcher regex literals yield their static kebab tokens and their
//     `.class` tokens.
//
// Known limit, stated rather than hidden: a bare single-word token buried in a
// regex alternation with no dot or dash (`/^(row|wrap)$/`) is not extracted —
// parsing regex ASTs buys little here because a hallucinated component class is
// virtually always `q-` kebab or a dotted selector. The allowlist below covers
// the legitimate bare words that do appear as `.row`/`.column` style literals.
//
// Usage:
//   node scripts/audit-vocabulary.mjs            # scan src/
//   node scripts/audit-vocabulary.mjs <dir>      # scan a copy (self-test)

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { normSel } from './parity-report.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PKG = join(__dirname, '..')
const SRC = process.argv[2] ? resolve(process.argv[2]) : join(PKG, 'src')
const CLASSES = join(PKG, 'src', 'generated', 'quasar-classes.ts')

/**
 * Selector tokens that are legitimate without being Quasar component
 * vocabulary. Each entry names the place that establishes it — no silent
 * entries: a new pattern needs a new rationale.
 */
const ALLOWLIST = [
  // plan (b)1 explicit entries
  {
    re: /^body--dark$/,
    why: 'dark-scope wrapper emitted via symbols.selector (plan (b); parity-report DARK_PREFIX)'
  },
  {
    re: /^quasar-style-[\w-]+$/,
    why: 'style entries unstyled/md2/md3 scoping (plan (b); parity-report STYLE_PREFIX)'
  },
  {
    re: /^q-transition--[\w-]+$/,
    why: 'transitions module classes (plan (b))'
  },
  {
    re: /^q-ripple__inner--(enter|leave)$/,
    why: 'ripple directive runtime modifier: quasar/dist/quasar.css styles both, the scraper vocabulary does not carry them (src/components/ripple/rules.ts)'
  },
  {
    re: /^(row|column|flex|inline-flex|wrap|no-wrap|reverse-wrap|grow|shrink)$/,
    why: '.row/.column flex-grid utilities (plan (b); parity-report FLEX_GRID)'
  },
  // wind4 utility families the gate classifies as `flex-grid`/`responsive`/
  // `platform`/`animated`/`color-utilities`/`spacing` — app-level utilities
  // emitted on demand, not component vocabulary (parity-report
  // classifySelector + REPORTED_REASON.utilities).
  {
    re: /^(col(-(xs|sm|md|lg|xl))?(-\d+|-auto|-grow|-shrink)?|offset(-\d+|-xs-\d+|-sm-\d+|-md-\d+|-lg-\d+|-xl-\d+))$/,
    why: 'wind4 grid columns and Quasar row offsets (parity-report flex-grid; offsets are dist-nested under .row)'
  },
  {
    re: /^(items|justify|self|content|place|order)-/,
    why: 'wind4 flex alignment utilities (parity-report flex-grid)'
  },
  {
    re: /^(lt|gt)-(xs|sm|md|lg|xl)(-|$)/,
    why: 'wind4 responsive visibility (parity-report responsive)'
  },
  {
    re: /^(xs|sm|md|lg|xl)(-|$)/,
    why: 'wind4 breakpoints (parity-report responsive)'
  },
  {
    re: /^(desktop|mobile|touch|electron|platform-[\w-]+|q-ios-padding)(-|$)/,
    why: 'platform scoping classes (parity-report platform)'
  },
  {
    re: /^(print|orientation)(-|$)/,
    why: 'media-hint platform classes (parity-report platform)'
  },
  { re: /^animated-/, why: 'wind4 animation classes (parity-report animated)' },
  {
    re: /^une[A-Z]/,
    why: 'wind4 une-* entrance/exit animations (parity-report animated)'
  },
  {
    re: /^(bg|text|border|fill|stroke|decoration|shadow|outline|ring|divide|accent|caret)-/,
    why: 'wind4 colour/text utility families, emitted on demand by content scanning (parity-report color-utilities/utilities)'
  },
  {
    re: /^q-(p|m)[a-z]?(-|$)/,
    why: 'spacing utilities q-p-*/q-m-* (parity-report spacing module)'
  },
  {
    re: /^q-gutter/,
    why: 'gutter spacing utilities (parity-report spacing module)'
  },
  {
    re: /^i[-_]/,
    why: 'iconify icon classes, content-scanned by the consumer (parity-report icons)'
  },
  {
    re: /^hidden$/,
    why: 'display utility, content-scanned (parity-report utilities module)'
  },
  // --- step-2 triage confirmations (2026-09-22) --------------------------------
  // Each group's `why` records the arbiter evidence from the triage run: a
  // grep against Quasar's own source/docs, the reference stylesheet class set,
  // or an AUDIT-BUGS.md row. Remove a `filed:` entry when its fix lands.
  {
    re: /^(?:col-shrink|cursor-pointer|q-autofill|q-checkbox__inner--indet|q-checkbox__inner--truthy|q-chip__icon--left|q-chip__icon--remove|q-date__arrow|q-fab__actions--down|q-fab__actions--up|q-field__input--padding|q-item__label--caption|q-item__label--header|q-item__label--overline|q-message-container|q-message-text-content|q-notification__actions--with-media|q-radio__inner--truthy|q-stepper__step|q-stepper__tab--disabled|q-tabs__arrow--left|q-tabs__arrow--right|q-timeline__entry--left|q-timeline__entry--right|q-time__link--active|q-tree__vguide--line|ellipsis-2-lines|ellipsis-3-lines|cursor-inherit)$/,
    why: 'confirmed in Quasar ui source/docs (grep ~/Projects/quasar/ui + docs/src): component string literals, Sass &-composed helpers (css/core/visibility.sass `&-2-lines`, css/core/mouse.sass `.cursor &-inherit`), and documented helper classes — scraper literal-grep gaps'
  },
  {
    re: /^(?:gutter-x|gutter-y)$/,
    why: 'static prefixes of the Quasar q-gutter-{x,y}-<size> matcher family (core/grid/rules.ts:211,219; Quasar gutter utilities)'
  },
  {
    re: /^q-body$/,
    why: 'synthetic safelisted matcher stem (safelist.ts:148; pattern documented in core/typography/rules.ts:20) — composes q-body--* on <body>, never a DOM class itself'
  },
  {
    re: /^(?:q-body--force-scrollbar-x|q-body--force-scrollbar-y|q-body--prevent-scroll|q-fab__icon-holder--opened|q-slider__thumb--h|q-slider__thumb--v|q-slider__track-container--h|q-slider__track-container--v|vertical-bottom|vertical-middle|vertical-top)$/,
    why: 'present in the reference stylesheet class set (specs/reference/raw/reference-bundle.css.txt), absent from the scraper vocabulary'
  },
  {
    re: /^q$/,
    why: 'editor parity shim: reference minifier corrupted `.q-editor .q-btn` into `.q btn`; preset emits BOTH the reference form and the correct `.q-btn` (components/editor/rules.ts:21-25; Quasar ui QEditor.sass:46)'
  },
  {
    re: /^pointer-events-all$/,
    why: 'standard UnoCSS/wind4 pointer-events utility, provenance documented in core/mouse/rules.ts header (ported from core/mouse.unocss.ts)'
  },
  {
    re: /^(?:q-chat-message|row-reverse|column-reverse)$/,
    why: 'filed as AUD-001/AUD-003 (phantom selectors, tracked in AUDIT-BUGS.md) — remove this entry when the fix plan lands'
  }
]

// ---------------------------------------------------------------------------
// source scanning: blank comments in place, then collect literals
// ---------------------------------------------------------------------------

/**
 * Replace comment content with spaces (newlines kept) so every offset in the
 * result maps 1:1 to the original file and reported lines stay truthful.
 * String/template/regex literals are respected so `//` inside one survives.
 */
function blankComments(src) {
  const out = src.split('')
  let state = 'code' // code | line | block | sq | dq | tpl | tplExpr
  let tplDepth = 0
  let prev = '' // last non-space code char, for regex-vs-division
  for (let i = 0; i < src.length; i++) {
    const c = src[i]
    const n = src[i + 1]
    if (state === 'code') {
      if (c === '/' && n === '/') {
        out[i] = ' '
        out[i + 1] = ' '
        state = 'line'
        continue
      }
      if (c === '/' && n === '*') {
        out[i] = ' '
        out[i + 1] = ' '
        state = 'block'
        continue
      }
      if (c === "'") state = 'sq'
      else if (c === '"') state = 'dq'
      else if (c === '`') state = 'tpl'
      else if (c === '/' && (prev === '' || '=(,:[!&|?{};\n'.includes(prev))) {
        // regex literal start — scan to unescaped closing slash + flags
        let j = i + 1
        let esc = false
        let closed = false
        while (j < src.length) {
          const r = src[j]
          if (esc) esc = false
          else if (r === '\\') esc = true
          else if (r === '\n') break // unterminated -> was division after all
          else if (r === '/') {
            j++
            while (j < src.length && /[a-z]/.test(src[j])) j++
            closed = true
            break
          }
          j++
        }
        if (closed) {
          i = j - 1
          prev = '/'
          continue
        }
      }
      if (!/\s/.test(c)) prev = c
      continue
    }
    if (state === 'line') {
      if (c === '\n') {
        state = 'code'
        prev = '\n'
      } else out[i] = ' '
      continue
    }
    if (state === 'block') {
      if (c === '*' && n === '/') {
        out[i] = ' '
        out[i + 1] = ' '
        state = 'code'
        i++
      } else if (c !== '\n') out[i] = ' '
      continue
    }
    if (state === 'sq') {
      if (c === '\\') i++
      else if (c === "'") state = 'code'
      continue
    }
    if (state === 'dq') {
      if (c === '\\') i++
      else if (c === '"') state = 'code'
      continue
    }
    if (state === 'tpl') {
      if (c === '\\') i++
      else if (c === '`') state = 'code'
      else if (c === '$' && n === '{') {
        // keep the text intact: template content is the literal we extract
        // from, and classTokens drops `${...}` spans itself
        state = 'tplExpr'
        tplDepth = 1
        i++
      }
      continue
    }
    if (state === 'tplExpr') {
      if (c === '{') tplDepth++
      else if (c === '}') {
        tplDepth--
        if (tplDepth === 0) state = 'tpl'
      } else if (c === "'" || c === '"') {
        // skip nested string inside interpolation
        const q = c
        let j = i + 1
        while (j < src.length && src[j] !== q) j++
        i = j
      }
      continue
    }
  }
  return out.join('')
}

/** Collect { kind, text, index } for every string/template/regex literal. */
function collectLiterals(src) {
  const out = []
  let i = 0
  let prev = ''
  while (i < src.length) {
    const c = src[i]
    if (c === "'" || c === '"') {
      let j = i + 1
      let esc = false
      while (j < src.length) {
        if (esc) esc = false
        else if (src[j] === '\\') esc = true
        else if (src[j] === c) break
        j++
      }
      out.push({ kind: 'str', text: src.slice(i + 1, j), index: i })
      i = j + 1
      prev = c
      continue
    }
    if (c === '`') {
      let j = i + 1
      let esc = false
      while (j < src.length) {
        if (esc) esc = false
        else if (src[j] === '\\') esc = true
        else if (src[j] === '`') break
        j++
      }
      out.push({ kind: 'tpl', text: src.slice(i + 1, j), index: i })
      i = j + 1
      prev = c
      continue
    }
    if (c === '/' && (prev === '' || '=(,:[!&|?{};\n'.includes(prev))) {
      let j = i + 1
      let esc = false
      let body = ''
      let ok = false
      while (j < src.length) {
        const r = src[j]
        if (esc) esc = false
        else if (r === '\\') {
          body += r + (src[j + 1] ?? '')
          j += 2
          continue
        } else if (r === '\n') break
        else if (r === '/') {
          ok = true
          break
        }
        body += r
        j++
      }
      if (ok) {
        out.push({ kind: 'regex', text: body, index: i })
        i = j + 1
        while (i < src.length && /[a-z]/.test(src[i])) i++
        prev = '/'
        continue
      }
    }
    if (!/\s/.test(c)) prev = c
    i++
  }
  return out
}

// ---------------------------------------------------------------------------
// token extraction + arbitration
// ---------------------------------------------------------------------------

/** Class tokens from selector-ish text: every `.ident` (pseudo tails dropped). */
function classTokens(text) {
  const withoutInterp = text.replace(/\$\{[^}]*\}/g, ' ')
  const out = []
  const re = /\.([A-Za-z_][\w-]*)/g
  let m
  while ((m = re.exec(withoutInterp))) out.push(m[1])
  return out
}

/** Static kebab tokens from a regex body (`q-btn--flat`, never `p-(\d`). */
function kebabTokens(text) {
  const out = []
  const re = /[a-z][a-z0-9]*(?:[-_]{1,2}[a-z0-9]+)+/g
  let m
  while ((m = re.exec(text))) out.push(m[0])
  return out
}

function loadVocabulary() {
  // The generated file is TypeScript with type annotations, so (like the gate)
  // it cannot be imported from plain node — parse its string literals after
  // blanking comments, which yields componentClasses keys/values,
  // globalClasses and knownClasses alike.
  const src = blankComments(readFileSync(CLASSES, 'utf8'))
  const set = new Set()
  for (const lit of collectLiterals(src)) {
    if (lit.kind === 'str' && lit.text) set.add(lit.text)
  }
  return set
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (entry === 'rules.ts') out.push(p) // plan (b)1: `src/**/rules.ts` only
  }
  return out
}

function lineOf(src, index) {
  let line = 1
  for (let i = 0; i < index && i < src.length; i++) if (src[i] === '\n') line++
  return line
}

function main() {
  const vocab = loadVocabulary()
  const files = walk(SRC).sort()

  const inVocab = new Map() // token -> example site
  const allowlisted = new Map() // token -> why
  const unknown = [] // { token, file, line, excerpt }

  for (const file of files) {
    const src = blankComments(readFileSync(file, 'utf8'))
    const rel = file.slice(SRC.length + 1)

    for (const lit of collectLiterals(src)) {
      const candidates = []
      if (lit.kind === 'tpl') {
        // only templates that wrap the rule's own selector (or start like a
        // selector) carry class tokens; log/warn templates do not
        const isSelectorish =
          /\$\{selector\}/.test(lit.text) ||
          /^\s*[.#]/.test(lit.text) ||
          /^\s*(body|html|:root)\b/.test(lit.text)
        if (isSelectorish) candidates.push(...classTokens(normSel(lit.text)))
      } else if (lit.kind === 'str') {
        const t = lit.text.trim()
        // relative import/export specifiers are paths, not selectors
        if (!/^\.\.?\//.test(t)) {
          // whole-literal bare component class (`'q-toggle__thumb'`)
          if (/^q-[a-z][\w-]*$/.test(t)) candidates.push(t)
          if (/^[.#]/.test(t) || /^(body|html|:root)\b/.test(t)) {
            candidates.push(...classTokens(normSel(t)))
          }
        }
      } else if (lit.kind === 'regex') {
        // char classes and pseudo selectors are matcher syntax, not class names
        const body = lit.text
          .replace(/\[[^\]]*\]/g, ' ')
          .replace(/::?[A-Za-z-][\w-]*/g, ' ')
        candidates.push(...kebabTokens(body), ...classTokens(body))
      }

      for (const token of candidates) {
        // trailing `-`/`_` means a dynamic prefix (`platform-${x}`), not a class
        if (!token || /[-_]$/.test(token)) continue
        if (vocab.has(token)) {
          if (!inVocab.has(token))
            inVocab.set(token, `${rel}:${lineOf(src, lit.index)}`)
          continue
        }
        const hit = ALLOWLIST.find((a) => a.re.test(token))
        if (hit) {
          if (!allowlisted.has(token)) allowlisted.set(token, hit.why)
          continue
        }
        unknown.push({
          token,
          file: rel,
          line: lineOf(src, lit.index),
          excerpt: lit.text.slice(0, 80).replace(/\s+/g, ' ')
        })
      }
    }
  }

  const seen = new Set()
  const uniqUnknown = unknown.filter((u) => {
    const k = `${u.token}@${u.file}`
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })

  console.log(`audit-vocabulary: scanned ${files.length} files under ${SRC}`)
  console.log(`  in-vocabulary:  ${inVocab.size} distinct tokens`)
  console.log(`  allowlisted:    ${allowlisted.size} distinct tokens`)
  console.log(
    `  unknown:        ${uniqUnknown.length} distinct token/file pairs`
  )
  if (allowlisted.size) {
    console.log('\n== allowlisted (rationale) ==')
    for (const [token, why] of [...allowlisted].sort())
      console.log(`  ${token}\n      ${why}`)
  }
  if (uniqUnknown.length) {
    console.log('\n== unknown (review worklist) ==')
    for (const u of uniqUnknown.sort(
      (a, b) => a.file.localeCompare(b.file) || a.line - b.line
    )) {
      console.log(`  ${u.token}  @ ${u.file}:${u.line}  in \`${u.excerpt}\``)
    }
    process.exit(1)
  }
  process.exit(0)
}

main()
