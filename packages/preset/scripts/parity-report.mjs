#!/usr/bin/env node
// Parity report + ratchet baseline for the reference gate.
//
// `test/parity-coverage.test.ts` asserts against this report; this module owns
// the measurement so the test and the CLI cannot drift apart.
//
// Why a spawn wrapper for the CLI: the preset's own source uses `.js` specifiers
// that only Vite resolves to `.ts`, so `node scripts/parity-report.mjs` cannot
// import `../src/index.js` directly. It runs the gate through vitest instead,
// then prints `test/parity-report.json`, which every gate run writes — including
// failing ones, so the work list is readable while a ratchet is still red.
//
//   node scripts/parity-report.mjs                    # gate + report
//   node scripts/parity-report.mjs --module field      # one module in detail
//   node scripts/parity-report.mjs --update            # regenerate the baseline
//   node scripts/parity-report.mjs --set-target field,item   # mark modules complete
//   PARITY_DEBUG=1 node scripts/parity-report.mjs             # print every comparison
//
// Coverage model
// --------------
// The reference bundle is a full build of the Quasar testing harness: component
// rules, wind4 utilities, its own app classes and wind4's resets. Only part of
// that is the preset's to emit, so selectors are bucketed into modules with an
// explicit `scope`:
//
//   scope 'preset'    the preset must emit it. These modules are driven to zero
//                     missing selectors (the plan's step targets).
//   scope 'reported'  measured and ratcheted, never driven to zero, with the
//                     reason recorded (`resets`: wind4 preflight + harness
//                     element styles; `icons`: content-scanned, not safelisted;
//                     `utilities`: app-level utilities, emitted on demand by
//                     content scanning rather than by the safelist).
//
// Comparison rules (kept from the gate this replaces, extended where the wider
// scope needs it):
//   - whole selectors only, keyed by (at-rule container, normalised selector)
//   - custom properties are not compared: wind4's runtime internals and the
//     preset's preflight tokens are the token tests' job
//   - `!important` is stripped (presence and value are what the gate measures)
//   - each side resolves its own `var()`s before comparison, because the
//     reference is wind4-compiled and names tokens differently
//   - values the reference builds through runtime theme indirection
//     (`var(--dark-*)`, `var(--un-*)`) and leaked Sass variables (`$…`) are
//     skipped rather than guessed at
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PKG = join(__dirname, '..')
const REPO = join(PKG, '..', '..')
const FIXTURE = join(PKG, 'test', 'fixtures', 'reference-selectors.json')
const BASELINE = join(PKG, 'test', 'fixtures', 'parity-baseline.json')
const REPORT_JSON = join(PKG, 'test', 'parity-report.json')

/** Read JSON with the file named: a missing or malformed file is the usual fault. */
function readJson(file) {
  try {
    return JSON.parse(readFileSync(file, 'utf8'))
  } catch (error) {
    throw new Error(`[parity] cannot read ${file}: ${error.message}`)
  }
}
const BUNDLE = join(
  REPO,
  'specs',
  'reference',
  'raw',
  'reference-bundle.css.txt'
)

/**
 * Modules the plan names as work targets. The gate asserts every one of them
 * appears in the report, so a classification change cannot silently drop a
 * module out of scope.
 */
export const PLAN_MODULES = [
  'field',
  'table',
  'stepper',
  'tree',
  'dialog',
  'textarea',
  'checkbox',
  'drawer',
  'radio',
  'slider',
  'date',
  'tabs',
  'tab',
  'btn-group',
  'item',
  'uploader',
  'timeline',
  'time',
  'splitter',
  'card',
  'chip',
  'banner',
  'editor',
  'notification',
  'spacing',
  'color-utilities',
  'responsive',
  'platform',
  'flex-grid',
  'animated',
  'tokens',
  'keyframes',
  'icons',
  'utilities',
  'resets'
]

/**
 * Selectors the reference bundle emits that no stylesheet can match.
 *
 * The deployed harness build ships `.q-field__nativeinput:focus` and
 * `.q-field__nativetextarea:focus` — a minifier artifact where two nested
 * selectors (`__native input:focus`, `__native textarea:focus`) were joined into
 * a class name that does not exist. They are excluded from presence and value
 * comparison with that reason recorded, rather than left permanently red.
 */
const BROKEN_REFERENCE_SELECTORS = new Set([
  '.q-field__nativeinput:focus',
  '.q-field__nativetextarea:focus'
])

/**
 * A selector no stylesheet can match, because the reference bundle lost a
 * leading `.` on a nested class selector while being minified — `.q-checkbox--dense
 * q-checkbox__label` names an element that does not exist (Quasar's own sheet has
 * `.q-checkbox--dense .q-checkbox__label`). Those are reported as broken rather
 * than counted as gaps; the corrected selector is what the preset emits.
 */
const UNMATCHABLE_SELECTOR =
  /(^|[\s>+~,])([a-z][\w-]*(?:__|--)[\w-]+|[a-z][\w-]*q-[\w-]+)(?=[\s>+~,:.\[{]|$)/

/**
 * Selectors no target browser can parse, so the reference's own rule for them is
 * already dead before it can match anything.
 *
 * `.q-field ::-ms-clear, .q-field ::-ms-reveal { display: none }` exists for
 * IE/legacy Edge only: an unparseable selector invalidates the whole rule it sits
 * in, which is why Chrome discards that reference rule. The preset therefore does
 * not emit it, and emitting it would be actively harmful — the preset's
 * equal-declaration merge folds every `display: none` rule into a single selector
 * list, and those two selectors then discarded 29 unrelated declarations with
 * them (`.hidden`, `.q-field__after:empty`, `.q-tabs--not-scrollable
 * .q-tabs__arrow`, the `.q-drawer--mini/--mobile/--standard` mini/full switches,
 * the stepper and date rules …). `test/no-invalid-selectors.test.ts` guards the
 * emission side.
 */
const BROWSER_REJECTED_SELECTOR =
  /::(-ms-|shadow)|:-ms-|::v-(deep|global|slotted)|\/deep\/|>>>/

function isUnmatchableSelector(selector) {
  return (
    BROKEN_REFERENCE_SELECTORS.has(selector) ||
    BROWSER_REJECTED_SELECTOR.test(selector) ||
    UNMATCHABLE_SELECTOR.test(selector)
  )
}

const REPORTED_REASON = {
  resets:
    'wind4 preflight and harness element styles — the preset does not own them',
  icons:
    'icon classes are content-scanned by the consumer, not part of the safelist',
  utilities:
    'app-level utilities are emitted on demand by content scanning; the safelist covers component, spacing, grid, responsive/platform and colour utilities only'
}

// ---------------------------------------------------------------------------
// pure helpers
// ---------------------------------------------------------------------------

const PLATFORM_PREFIX =
  /\bbody\.(desktop|mobile|touch|electron|platform-[\w-]+|q-ios-padding)\b/g
const DARK_PREFIX = /\bbody\.body--dark\b/g
const STYLE_PREFIX = /\bbody\.quasar-style-[\w-]+\b/g
const QUASAR_ROLES = [
  'primary',
  'secondary',
  'accent',
  'positive',
  'negative',
  'info',
  'warning',
  'dark',
  'light'
]

/** Clone a global regex per use so `lastIndex` never leaks between calls. */
const fresh = (re) => new RegExp(re.source, re.flags)

function stripComments(input) {
  return input.replace(/\/\*[\s\S]*?\*\//g, ' ')
}

/**
 * Normalise the two ways the bundle renders BEM `__` in a descendant position
 * and the `body.body--dark` scope, so both sides key identically.
 */
export function normSel(selector) {
  return selector
    .replace(/\bbody\.body--dark\b/g, '.body--dark')
    .replace(/\\_/g, '_')
    .replace(/(\.[-\w]+) _(?=[-\w])/g, '$1__')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Split a comma selector-list, respecting `:not()`, `[]`, `:is()`. */
function splitSelectors(selector) {
  const out = []
  let depth = 0
  let cur = ''
  for (const ch of selector) {
    if (ch === '(' || ch === '[') depth++
    else if (ch === ')' || ch === ']') depth--
    if (ch === ',' && depth === 0) {
      out.push(cur.trim())
      cur = ''
      continue
    }
    cur += ch
  }
  if (cur.trim()) out.push(cur.trim())
  return out.filter(Boolean)
}

/** Parse "p:v; p2:v2" into [{property, value}]. */
function parseDeclarations(block) {
  const out = []
  if (!block) return out
  for (const decl of block.split(';')) {
    const d = decl.trim()
    if (!d) continue
    const idx = d.indexOf(':')
    if (idx === -1) continue
    out.push({
      property: d.slice(0, idx).trim(),
      value: d.slice(idx + 1).trim()
    })
  }
  return out
}

/**
 * Flatten a stylesheet into `{ rules, keyframes }`. At-rule containers other
 * than `@keyframes` are recorded as the container text of their children;
 * `@layer` wrappers are dropped from that text because they are an
 * organisational detail the preset is free to structure differently.
 */
function parseSheet(input) {
  const css = stripComments(input)
  const rules = []
  const keyframes = new Set()
  const stack = []
  let buf = ''
  for (const ch of css) {
    if (ch === '{') {
      const head = buf.trim()
      buf = ''
      const at = head.match(/^@([\w-]+)\s*(.*)$/)
      // A node's container is the path of the at-rules enclosing it. Only
      // at-rule frames contribute: the previous version reused the parent's own
      // container, so a rule inside a top-level `@supports`/`@media` was keyed as
      // if it were top level and every media-scoped reference rule looked missing.
      // at-rule frames contribute: the previous version reused the parent's own
      // container, so a rule inside a top-level `@supports`/`@media` was keyed as
      // if it were top level and every media-scoped reference rule looked missing.
      const frames = stack.filter((f) => f.at).map((f) => f.head)
      stack.push({
        head,
        at: at ? at[1] : null,
        params: at ? at[2].trim() : null,
        container: frames.length ? frames.join(' && ') : null,
        decls: ''
      })
      continue
    }
    if (ch === '}') {
      buf = ''
      const frame = stack.pop()
      if (!frame) continue
      if (frame.at) {
        if (frame.at === 'keyframes' || frame.at.endsWith('keyframes')) {
          keyframes.add(frame.params)
        }
      } else {
        rules.push({
          selector: frame.head,
          container: frame.container,
          body: frame.decls
        })
      }
      continue
    }
    if (stack.length && !stack[stack.length - 1].at) {
      stack[stack.length - 1].decls += ch
    } else {
      buf += ch
    }
  }
  return { rules, keyframes }
}

/**
 * Reduce an at-rule container to the part that must match: media and supports
 * queries are compared, `@layer` wrappers are dropped.
 */
export function containerKey(raw) {
  if (!raw) return null
  const parts = raw
    .split(' && ')
    .map((p) => p.trim())
    .filter((p) => p)
    .filter((p) => !/^@layer\b/.test(p))
    // The reference duplicates every colour-mix declaration inside a
    // `@supports (color: color-mix(…))` feature test, with the sRGB fallback
    // outside it. The preset states the resolved colour once, so both entries are
    // compared against that single rule rather than counted twice — and the
    // colour-mix values themselves stay unresolved (see the `var(--` skip), so
    // they are not compared.
    .filter((p) => !/^@supports\s*\(color:\s*color-mix/.test(p))
  return parts.length ? parts.join(' && ') : null
}

export function ruleKey(container, selector) {
  return `${containerKey(container) ?? ''}\u0000${normSel(selector)}`
}

function displayKey(container, selector) {
  const c = containerKey(container)
  return c ? `${selector} (in ${c})` : selector
}

/**
 * Resolve tokens from their *default-scope* definition.
 *
 * Both sheets define a token twice: once for the default style entry (`:root` /
 * `body`) and again inside `body.quasar-style-<name>`. A flat first-wins scan
 * picks whichever came first — for the reference that is the unstyled entry's
 * value (`--q-btn-radius: 0`) and for the preset the md3 one — so identical
 * declarations (`var(--q-btn-radius)` on both sides) compared as different.
 * Scope-aware collection compares the values the default style actually uses:
 * the base-scope definition is the default style's value, so it wins.
 */
/** The style entry whose tokens both sides resolve against. */
const PARITY_STYLE = process.env.PARITY_STYLE ?? 'md3'

function collectScopedVars(rules, style = PARITY_STYLE) {
  const base = new Map()
  const wanted = new Map()
  const other = new Map()
  for (const rule of rules) {
    const selector = rule.selector ?? ''
    const named = selector.match(/quasar-style-([\w-]+)/)
    const bucket = named ? (named[1] === style ? wanted : other) : base
    // `parseSheet` keeps rule bodies as text (`body`) and only the comparison
    // path converts them (`declarations`). Reading one shape here silently made
    // every token unresolvable: `var(--q-space-lg)` stayed literal on the
    // preset's side and compared as a mismatch against the reference's 16px.
    const declarations = rule.declarations ?? parseDeclarations(rule.body ?? '')
    for (const { property, value } of declarations) {
      if (!property.startsWith('--')) continue
      if (value.includes('var(')) continue
      if (!bucket.has(property)) bucket.set(property, value)
    }
  }
  // Precedence: the named style's block (what the app shows with
  // `body.quasar-style-<name>`), then the base scope, then the other style
  // entries. The reference bundle is the harness running every entry as a body
  // class, so its base scope carries the *unstyled* tokens (`--q-btn-radius: 0`);
  // resolving both sides against the same named entry compares the style the
  // specs describe instead of the unstyled fallback.
  return new Map([...other, ...base, ...wanted])
}

/** Substitute `var(--x)` / `var(--x, fallback)` repeatedly until stable. */
function resolveVars(value, vars) {
  let out = value
  for (let i = 0; i < 8; i++) {
    const next = out.replace(
      /var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*(?:\([^()]*\)[^()]*)*))?\)/g,
      (whole, name, fallback) => {
        const resolved = vars.get(name)
        if (resolved !== undefined) return resolved
        if (fallback !== undefined && fallback.trim()) return fallback.trim()
        return whole
      }
    )
    if (next === out) break
    out = next
  }
  return out
}

/** `rgba(...)` for a literal white/black at a percentage alpha, else null. */
function literalRgba(color, percent) {
  const c = color.toLowerCase().replace(/\s+/g, '')
  const rgb =
    c === 'white' || c === '#fff' || c === '#ffffff'
      ? '255,255,255'
      : c === 'black' || c === '#000' || c === '#000000'
        ? '0,0,0'
        : null
  if (!rgb) return null
  return `rgba(${rgb},${percent / 100})`
}

/**
 * Reduce a value to the form both sides can be compared in. Only equivalences
 * that hold for every input are applied; anything unrecognised is left as-is so
 * a real difference still fails rather than being normalised away.
 */
function canonical(value) {
  let v = value.trim()
  // Importance is not part of the component contract the gate measures.
  v = v.replace(/\s*!important\s*$/, '')
  // wind4 compiles `calc(x * 0)` to `0` and `<colour>/N` to a color-mix().
  v = v.replace(/calc\((?:[^()]|\([^()]*\))*?\*\s*0\s*\)/g, '0')
  v = v.replace(/^(\d+(?:\.\d+)?)%$/, (_, n) => String(Number(n) / 100))
  v = v.replace(
    /color-mix\(\s*in\s+[\w-]+\s*,\s*([^,()]+?)\s+([\d.]+)%\s*,\s*transparent\s*\)/g,
    (whole, color, percent) => literalRgba(color, Number(percent)) ?? whole
  )
  return v.replace(/\s+/g, '')
}

/** Colour names the reference exposes as `--colors-*`, plus the Quasar roles. */
export function colorNames(variables) {
  const names = new Set(QUASAR_ROLES)
  for (const key of Object.keys(variables)) {
    if (!key.startsWith('--colors-')) continue
    const rest = key.slice('--colors-'.length)
    names.add(rest)
    names.add(rest.replace(/-DEFAULT$/, ''))
    names.add(rest.replace(/-\d+$/, ''))
  }
  return names
}

const BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl']
const PLATFORM_HINTS = [
  'desktop',
  'mobile',
  'touch',
  'electron',
  'print',
  'orientation'
]
const FLEX_GRID = new Set([
  'row',
  'column',
  'flex',
  'inline-flex',
  'wrap',
  'no-wrap',
  'reverse-wrap',
  'grow',
  'shrink'
])

function isColorUtility(cls, names) {
  const m = cls.match(
    /^(bg|text|border|fill|stroke|decoration|shadow|outline|ring|divide|accent|caret)-(.+)$/
  )
  if (!m) return false
  const rest = m[2].replace(/\/\d+$/, '')
  if (!rest || /^[[(]/.test(rest)) return false
  const parts = rest.split('-')
  for (let end = parts.length; end > 0; end--) {
    if (names.has(parts.slice(0, end).join('-'))) return true
  }
  return false
}

/** Strip the runtime scope qualifiers (`body.desktop`, `body.body--dark`, …). */
export function stripQualifiers(selector) {
  let core = selector
  let platform = false
  let dark = false
  let style = false
  let previous
  do {
    previous = core
    if (fresh(PLATFORM_PREFIX).test(core)) platform = true
    if (fresh(DARK_PREFIX).test(core)) dark = true
    if (fresh(STYLE_PREFIX).test(core)) style = true
    core = core
      .replace(fresh(PLATFORM_PREFIX), '')
      .replace(fresh(DARK_PREFIX), '')
      .replace(fresh(STYLE_PREFIX), '')
  } while (core !== previous)
  return { core: core.replace(/\s+/g, ' ').trim(), platform, dark, style }
}

/**
 * Attribute a reference selector to the module that owns it.
 * `scope` decides whether the module is driven to zero or only ratcheted.
 */
export function classifySelector(selector, names = new Set(QUASAR_ROLES)) {
  const { core, platform, style, dark } = stripQualifiers(selector)

  // Component modules and the utility buckets the plan names are all the
  // preset's to emit; `reported` modules are classified further down.
  const scope = (module) => ({ module, scope: 'preset', platform, dark, style })

  // `.q-*` component classes own their module.
  const q = core.match(/\.q-([a-z][a-z0-9]*(?:-[a-z0-9]+)*)/)
  if (q) {
    const name = q[1]
    if (/^(p|m)[xa-z]?-/.test(name) || name.startsWith('gutter')) {
      return { ...scope('spacing'), platform, dark, style }
    }
    return { ...scope(name), platform, dark, style }
  }

  const classes = [...core.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map((m) => m[1])
  const reason = (module) => ({
    module,
    scope: 'reported',
    reason: REPORTED_REASON[module],
    platform,
    dark,
    style
  })

  if (!classes.length) return reason('resets')

  if (classes.some((c) => c === 'icon' || /^i[-_]/.test(c))) {
    return reason('icons')
  }

  const bp = (c) => BREAKPOINTS.find((b) => c === b || c.startsWith(`${b}-`))
  const plat = (c) =>
    PLATFORM_HINTS.find((p) => c === p || c.startsWith(`${p}-`))

  if (classes.some((c) => /^(lt|gt)-/.test(c) || bp(c))) {
    return { ...scope('responsive'), platform, dark, style }
  }
  if (classes.some((c) => plat(c))) {
    return { ...scope('platform'), platform, dark, style }
  }
  if (classes.some((c) => /^animated-/.test(c) || /^une[A-Z]/.test(c))) {
    return { ...scope('animated'), platform, dark, style }
  }
  if (
    classes.some(
      (c) =>
        /^col(-(xs|sm|md|lg|xl))?(-\d+|-auto|-grow|-offset-\d+)?$/.test(c) ||
        /^(items|justify|self|content|place|order)-/.test(c) ||
        FLEX_GRID.has(c)
    )
  ) {
    return { ...scope('flex-grid'), platform, dark, style }
  }
  if (classes.some((c) => isColorUtility(c, names))) {
    return { ...scope('color-utilities'), platform, dark, style }
  }
  if (style || dark || core === ':root' || core.startsWith(':root ')) {
    return { ...scope('tokens'), platform, dark, style }
  }
  return reason('utilities')
}

// ---------------------------------------------------------------------------
// report
// ---------------------------------------------------------------------------

function emptyModule(module, scope, reason) {
  return {
    module,
    scope,
    ...(reason ? { reason } : {}),
    present: 0,
    missing: [],
    absent: [],
    mismatch: [],
    details: {}
  }
}

function moduleFor(modules, module, scope, reason) {
  if (!modules.has(module))
    modules.set(module, emptyModule(module, scope, reason))
  return modules.get(module)
}

/**
 * Run the repo formatter over generated artifacts. `pnpm format:check` covers
 * them like any other file, and oxfmt's array collapsing cannot be reproduced by
 * `JSON.stringify` alone, so the writer hands them to oxfmt when it is present.
 */
function formatArtifacts(paths) {
  const bin = [
    join(REPO, 'node_modules', '.bin', 'oxfmt'),
    join(PKG, 'node_modules', '.bin', 'oxfmt')
  ].find((candidate) => existsSync(candidate))
  if (!bin) return
  spawnSync(bin, paths, { cwd: REPO, stdio: 'ignore' })
}

/**
 * Measure the preset against the reference fixture. Writes
 * `test/parity-report.json` (with value details) on every call, and
 * `test/fixtures/parity-baseline.json` when the run is asked to record the
 * ratchet instead of comparing against it.
 */
export async function buildParityReport() {
  const fixture = readJson(FIXTURE)
  const { createGenerator } = await import('unocss')
  const { QuasarPreset, QuasarStyleEntries } = await import('../src/index.js')
  const { quasarSafelist, pluginSafelistMap } =
    await import('../src/safelist.js')
  // The reference was built from a Quasar app that used these plugins, so the
  // gate declares them all — it verifies the full configured surface, while a
  // default consumer still opts into plugins one at a time.
  const allPlugins = Object.keys(pluginSafelistMap)

  const gen = await createGenerator({
    presets: [QuasarPreset({ styles: QuasarStyleEntries, plugins: allPlugins })]
  })
  // Content is the safelist *plus* a mention of every component: the classes a
  // component composes at runtime reach the sheet through
  // `quasarComponentExtractor` (derived from Quasar's own source) rather than
  // from a hand-written safelist entry, so the gate has to give it the same
  // signal a build gets from markup.
  const { componentClasses } =
    await import('../src/generated/quasar-classes.js')
  const componentMarkers = Object.keys(componentClasses).map((root) =>
    root
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('')
  )
  const { css } = await gen.generate(
    [
      ...quasarSafelist,
      ...Object.values(pluginSafelistMap).flat(),
      ...Object.keys(componentClasses),
      ...componentMarkers
    ].join(' '),
    { preflights: true }
  )

  const sheet = parseSheet(css)
  const emittedVars = collectScopedVars(sheet.rules)
  const refVars = collectScopedVars(fixture.rules)
  if (process.env.PARITY_DEBUG) {
    // eslint-disable-next-line no-console
    console.log(
      '[parity] emitted vars:',
      emittedVars.size,
      '| --q-space-lg:',
      emittedVars.get('--q-space-lg'),
      '| --q-btn-radius:',
      emittedVars.get('--q-btn-radius'),
      '| ref vars:',
      refVars.size
    )
  }
  const names = colorNames(fixture.variables ?? {})

  // Emitted rules, merged per (container, selector): a component may be built
  // from several generator rules that all target the same selector.
  const have = new Map()
  for (const rule of sheet.rules) {
    for (const sel of splitSelectors(rule.selector)) {
      const key = ruleKey(rule.container, sel)
      if (!have.has(key)) have.set(key, new Map())
      const target = have.get(key)
      for (const { property, value } of parseDeclarations(rule.body)) {
        target.set(property, value)
      }
    }
  }

  // A role may be stated as a font shorthand (`font: var(--q-body-large)`) and
  // the browser expands that into font-weight/size/line-height/family. The
  // reference writes the longhands, so expand ours identically — otherwise a
  // declaration the browser applies reads as absent and the ratchet flags it.
  const FONT_SHORTHAND =
    /^(?:(\d{3})\s+)?(\d+(?:\.\d+)?(?:px|em|rem))\s*(?:\/\s*([^\s]+))?\s+(.+)$/
  const resolveVar = (value) => {
    const match = /^var\((--[\w-]+)\)$/.exec(value.trim())
    return match ? emittedVars.get(match[1]) : undefined
  }
  const expandFontShorthand = (target) => {
    const shorthand = target.get('font')
    if (shorthand === undefined) return
    const resolved = resolveVar(shorthand) ?? shorthand
    const match = FONT_SHORTHAND.exec(resolved.trim())
    if (match === null) return
    const [, weight, size, lineHeight, family] = match
    if (weight !== undefined && !target.has('font-weight')) {
      target.set('font-weight', weight)
    }
    if (!target.has('font-size')) target.set('font-size', size)
    if (lineHeight !== undefined && !target.has('line-height')) {
      target.set('line-height', lineHeight)
    }
    if (!target.has('font-family')) target.set('font-family', family)
  }

  for (const target of have.values()) expandFontShorthand(target)

  const modules = new Map()
  const referenceKeys = new Set()
  let present = 0
  let skipped = 0

  for (const rule of fixture.rules) {
    if (isUnmatchableSelector(rule.selector)) {
      skipped++
      continue
    }
    const { module, scope, reason } = classifySelector(rule.selector, names)
    const entry = moduleFor(modules, module, scope, reason)
    const key = ruleKey(rule.media, rule.selector)
    referenceKeys.add(key)

    const ours = have.get(key)
    if (!ours) {
      entry.missing.push(displayKey(rule.media, normSel(rule.selector)))
      continue
    }
    present++
    entry.present++

    // CSS last-wins: the reference writes fallback pairs (`padding-top: 20px;
    // … padding-top: env(safe-area-inset-top)`), so only the final value of a
    // property is the one the browser applies — and the one to compare.
    const effective = new Map()
    for (const declaration of rule.declarations) {
      effective.set(declaration.property, declaration.value)
    }

    for (const [property, value] of effective) {
      if (property.startsWith('--')) continue
      if (value.includes('$')) continue
      if (/var\(--(dark|un)-/.test(value)) continue
      const ourValue = ours.get(property)
      const label = `${normSel(rule.selector)}|${property}`
      if (ourValue === undefined) {
        entry.absent.push(label)
        continue
      }
      // Same statement -> equal, before any resolution. The fixture cannot model
      // per-style overrides, so resolving a token both sides name identically
      // gives the first style entry's value (e.g. `--q-btn-radius` is 0 there and
      // `var(--q-radius-sm)` in md3) and would report a false mismatch.
      if (canonical(value) === canonical(ourValue)) continue
      const resolvedRef = canonical(resolveVars(value, refVars))
      // Relative vs absolute geometry: the reference states MD3 sizes relative to
      // the control's own font-size (`0.75em` of a 32px switch = 24px) while the
      // preset uses per-style tokens that carry the absolute value for each style
      // entry (md2's 20px handle next to md3's 24px). The two are equal by
      // construction but not textually, and the browser check in the app specs
      // measures the rendered result, so these are reported rather than failed.
      if (/[\d.]em\b/.test(value) && !/[\d.]em\b/.test(ourValue)) continue
      // A reference value that still carries a `var()` cannot be compared: the
      // fixture is a flat map (conflicting scopes and `var()` definitions are
      // dropped), so there is nothing to resolve against. Those are the token
      // tests' job, not this gate's.
      if (resolvedRef.includes('var(')) continue
      const resolvedOurs = canonical(resolveVars(ourValue, emittedVars))
      if (process.env.PARITY_DEBUG) {
        // eslint-disable-next-line no-console
        console.log(
          '[parity]',
          label,
          '| ref:',
          resolvedRef,
          '| ours:',
          resolvedOurs,
          '| raw:',
          ourValue
        )
      }
      if (resolvedRef !== resolvedOurs) {
        entry.mismatch.push(label)
        entry.details[label] = `${value} (ref) vs ${ourValue} (ours)`
      }
    }
  }

  // Motion: the reference ships component keyframes; compare by name.
  const keyframeEntry = moduleFor(modules, 'keyframes', 'preset')
  for (const kf of fixture.keyframes ?? []) {
    if (sheet.keyframes.has(kf.name)) {
      keyframeEntry.present++
    } else {
      keyframeEntry.missing.push(kf.name)
    }
  }

  const extras = []
  for (const key of have.keys()) {
    if (referenceKeys.has(key)) continue
    extras.push(key.split('\u0000')[1])
  }

  const referenceBytes = existsSync(BUNDLE) ? statSync(BUNDLE).size : 0
  // Reference selectors no stylesheet can match (minifier artifacts, selectors
  // browsers reject) are not measurable, so they leave the denominator too:
  // `missing` is derived as `ruleCount - present`, and counting them would
  // report gaps that no emission could ever close.
  const measurable = fixture.ruleCount - skipped
  const report = {
    bundleHash: fixture.bundleHash,
    reference: {
      source: fixture.source,
      ruleCount: measurable,
      skipped,
      byteSize: referenceBytes
    },
    emitted: {
      selectorCount: have.size,
      byteSize: Buffer.byteLength(css)
    },
    payload: { referenceBytes, emittedBytes: Buffer.byteLength(css) },
    totals: {
      present,
      missing: measurable - present,
      absent: 0,
      mismatch: 0,
      extra: extras.length
    },
    modules: {},
    extras: extras.sort().slice(0, 200),
    baselineWritten: false
  }

  for (const [, entry] of [...modules].sort((a, b) => (a[0] < b[0] ? -1 : 1))) {
    entry.missing = [...new Set(entry.missing)].sort()
    entry.absent = [...new Set(entry.absent)].sort()
    entry.mismatch = [...new Set(entry.mismatch)].sort()
    report.totals.absent += entry.absent.length
    report.totals.mismatch += entry.mismatch.length
    report.modules[entry.module] = {
      scope: entry.scope,
      ...(entry.reason ? { reason: entry.reason } : {}),
      present: entry.present,
      missing: entry.missing,
      absent: entry.absent,
      mismatch: entry.mismatch,
      details: entry.details
    }
  }

  if (process.env.PARITY_UPDATE_BASELINE) {
    report.baselineWritten = writeBaseline(report)
  }

  // `PARITY_DUMP_CSS=<path>` writes the emitted sheet, which is the quickest way
  // to see what a rule actually produced while a module is being ported.
  if (process.env.PARITY_DUMP_CSS)
    writeFileSync(process.env.PARITY_DUMP_CSS, css)

  writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`)
  formatArtifacts([REPORT_JSON, BASELINE])
  return report
}

/**
 * Record the ratchet. `target: 0` marks a module the plan has finished; the gate
 * then refuses any gap in it. Targets already recorded survive a regeneration
 * unless `PARITY_SET_TARGET` names the module (or `all`).
 */
function writeBaseline(report) {
  const previous = existsSync(BASELINE) ? readJson(BASELINE) : null
  const requested = (process.env.PARITY_SET_TARGET ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const modules = {}
  for (const [name, entry] of Object.entries(report.modules)) {
    const recorded = previous?.modules?.[name]?.target ?? null
    const wanted =
      requested.includes('all') || requested.includes(name) ? 0 : recorded
    modules[name] = {
      target: entry.scope === 'preset' ? wanted : null,
      missing: entry.missing,
      absent: entry.absent,
      mismatch: entry.mismatch
    }
  }
  writeFileSync(
    BASELINE,
    `${JSON.stringify({ bundleHash: report.bundleHash, modules }, null, 2)}\n`
  )
  return true
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function flagValue(argv, flag) {
  const withEq = argv.find((a) => a.startsWith(`${flag}=`))
  if (withEq) return withEq.slice(flag.length + 1)
  const idx = argv.indexOf(flag)
  return idx === -1 ? undefined : argv[idx + 1]
}

function printReport(report, moduleName) {
  const pct = (
    (report.totals.present / report.reference.ruleCount) *
    100
  ).toFixed(1)
  console.log(
    `\nreference ${report.bundleHash}: ${report.reference.ruleCount} rules, ${report.reference.byteSize} B`
  )
  console.log(
    `emitted: ${report.emitted.selectorCount} selectors, ${report.emitted.byteSize} B`
  )
  console.log(
    `present ${report.totals.present}/${report.reference.ruleCount} (${pct}%)  missing ${report.totals.missing}  absent ${report.totals.absent}  mismatch ${report.totals.mismatch}  extra ${report.totals.extra}`
  )

  const rows = Object.entries(report.modules).filter(
    ([, m]) => m.missing.length || m.absent.length || m.mismatch.length
  )
  console.log(
    `\n${'module'.padEnd(20)}${'present'.padStart(8)}${'missing'.padStart(9)}${'absent'.padStart(8)}${'mismatch'.padStart(10)}  scope`
  )
  for (const [name, m] of rows.sort(
    (a, b) =>
      b[1].missing.length +
      b[1].absent.length -
      (a[1].missing.length + a[1].absent.length)
  )) {
    console.log(
      `${name.padEnd(20)}${String(m.present).padStart(8)}${String(m.missing.length).padStart(9)}${String(m.absent.length).padStart(8)}${String(m.mismatch.length).padStart(10)}  ${m.scope}`
    )
  }

  if (moduleName) {
    const entry = report.modules[moduleName]
    if (!entry) {
      console.log(`\nno module named ${moduleName}`)
      return
    }
    console.log(`\n=== ${moduleName} (${entry.scope}) ===`)
    if (entry.missing.length)
      console.log(`missing:\n  ${entry.missing.join('\n  ')}`)
    if (entry.absent.length)
      console.log(`absent:\n  ${entry.absent.join('\n  ')}`)
    if (entry.mismatch.length)
      console.log(
        `mismatch:\n  ${entry.mismatch
          .map((k) => `${k} → ${entry.details[k] ?? ''}`)
          .join('\n  ')}`
      )
  }
}

async function main() {
  const argv = process.argv.slice(2)
  const update = argv.includes('--update')
  const setTarget = flagValue(argv, '--set-target')
  const moduleName = flagValue(argv, '--module')

  const env = { ...process.env }
  if (update) env.PARITY_UPDATE_BASELINE = '1'
  if (setTarget) env.PARITY_SET_TARGET = setTarget

  const res = spawnSync(
    'pnpm',
    ['exec', 'vitest', 'run', 'test/parity-coverage.test.ts', '--reporter=dot'],
    { cwd: PKG, env, stdio: 'inherit' }
  )

  if (!existsSync(REPORT_JSON)) {
    console.error('gate produced no report')
    process.exit(res.status ?? 1)
  }
  printReport(readJson(REPORT_JSON), moduleName)
  process.exit(res.status ?? 1)
}

const invokedDirectly =
  process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (invokedDirectly) {
  main().catch((e) => {
    console.error(e)
    process.exit(1)
  })
}
