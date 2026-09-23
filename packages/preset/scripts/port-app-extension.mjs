/**
 * Port an upstream stylesheet into a rules module, mechanically.
 *
 * The judgement lives in the theming table below and in `variables.ts`; the
 * translation itself is not a judgement call, and doing it by hand for ~4,500
 * lines of SCSS would only add transcription errors. Upstream's dark fast path
 * is dropped (the tokens flip on `body.body--dark`), and every selector is
 * emitted, which `test/app-extensions-coverage.test.ts` verifies against the
 * compiled source.
 *
 *   node .port-view.mjs <upstream-scss> <exportName> [outFile]
 */
import { compile } from 'sass'
import fs from 'node:fs'

const args = process.argv.slice(2)
const flag = (name) => {
  const at = args.indexOf(`--${name}`)
  return at >= 0 ? args[at + 1] : undefined
}
// Selectors with no class of their own (Prism's `.token.*` in QMarkdown) are
// scoped under this root as descendants: `.token.comment` -> `.q-markdown .token.comment`.
const fallbackRoot = flag('root')
const positional = args.filter((arg, index) =>
  !arg.startsWith('--') && index > 0
    ? !args[index - 1].startsWith('--') || args[index - 1] === '--root'
    : true
)
const [input, exportName, outFile] = positional

/** Selectors upstream states only to apply a `-dark` twin. */
const DARK_FAST_PATH = new RegExp(
  [
    '\\.q-dark\\b',
    '\\.body--dark\\b',
    '\\.q-calendar--dark\\b',
    // `--dark <pattern>` extends this, e.g. QMediaPlayer states its twins on a
    // `.q-media--dark` modifier rather than on a scheme selector.
    flag('dark') ?? '(?!)'
  ].join('|')
)

/** Value literals whose role is known: the theming decisions, in one place. */
const COLOUR_TOKENS = new Map([
  ['#027be3', 'var(--q-primary)'],
  ['#027be3ff', 'var(--q-primary)'],
  ['#cce7ff', 'var(--q-item-active-bg)'],
  ['#cce7ffff', 'var(--q-item-active-bg)'],
  ['#e0e0e0', 'var(--q-separator-color)'],
  ['#606c71', 'var(--q-on-surface)'],
  ['#a1a1a1', 'var(--q-on-surface-variant)'],
  ['#bebebe', 'var(--q-outline)'],
  ['#eeeeee', 'var(--q-surface-container)'],
  ['#888888', 'var(--q-outline)'],
  ['#555555', 'var(--q-on-surface-variant)'],
  ['#00000000', 'transparent'],
  ['#fff', 'var(--q-surface)'],
  ['#ffffff', 'var(--q-surface)'],
  // QMarkdown's structural colours: Quasar palette values that have a role.
  ['#1976d2', 'var(--q-primary)'],
  ['#212121', 'var(--q-on-surface)'],
  ['#424242', 'var(--q-on-surface-variant)'],
  ['#616161', 'var(--q-on-surface-variant)'],
  ['#f5f5f5', 'var(--q-surface-container-low)'],
  ['#fafafa', 'var(--q-surface-container)']
])

/** Properties the preset polices: a literal here needs a `// quasar:` marker. */
const WATCHED = new Set([
  'font-size',
  'line-height',
  'font-weight',
  'min-height',
  'height',
  'padding',
  'padding-inline',
  'padding-block',
  'padding-top',
  'padding-bottom',
  'border-radius'
])
const EXEMPT = new Set([
  '0',
  'auto',
  'none',
  'inherit',
  'normal',
  '100%',
  '50%'
])

const file = input
  .split('/')
  .pop()
  .replace(/\.scss$/, '')

/** A value that is only a `-dark` twin of the light declaration. */
const DARK_TWIN =
  /^var\(--(?:calendar|mediaplayer|big-play-button|q-markdown)[\w-]*-?dark\)(\s*!important)?$/
const isTwin = (declaration) =>
  DARK_TWIN.test(declaration.slice(declaration.indexOf(':') + 1).trim())

/** Compare declarations without `!important` or the `-dark` infix. */
const comparable = (declaration) =>
  declaration
    .replace(/\s*!important/g, '')
    .replace(/--calendar-([\w-]+?)-dark\b/g, '--calendar-$1')
    .replace(/\s+/g, ' ')
    .trim()

/** Upstream's dark prefix, so a dark selector can be attributed to a root. */
const stripDark = (selector) =>
  selector.replace(
    /^(?:\.q-dark|\.body--dark|\.q-calendar--dark|\.q-media--dark)\s*(?:div\s*)?/,
    ''
  )

/**
 * Upstream's rule blocks: the light ones to port, and the dark-only
 * declarations a token flip does not reproduce.
 *
 * A dark block is a twin of its light block — same structure, `-dark` values —
 * so it is dropped. What is *not* dropped is the residue: a declaration whose
 * light counterpart does not exist (the scheduler's `border-top: none` on a
 * range edge, the mini calendar's `border-bottom: unset` on the week wrapper).
 * Those become `.body--dark` yields, which is what the plan's dark rule asks
 * for.
 */
function lightBlocks(scssPath) {
  const css = compile(scssPath, { style: 'expanded' }).css.replace(
    /\/\*[\s\S]*?\*\//g,
    ''
  )
  const blocks = []
  const darkOnly = []
  const skipped = new Set()
  for (const match of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const all = match[1]
      .split(',')
      .map((s) => s.trim().replace(/\s+/g, ' '))
      .filter(Boolean)
    const declarations = match[2]
      .split(';')
      .map((d) => d.trim())
      .filter(Boolean)
      .map((raw) => {
        const at = raw.indexOf(':')
        // sass's expanded output wraps long values across lines; a CSS value is
        // whitespace-insensitive, but a TS string literal is not.
        const value = raw
          .slice(at + 1)
          .trim()
          .replace(/\s+/g, ' ')
        return { prop: raw.slice(0, at).trim(), value, raw }
      })
    const light = all.filter((s) => !DARK_FAST_PATH.test(s))
    // A `:root` block is the library's variable layer, which the preset ships as
    // a preflight instead (step 1); porting it here would re-declare the tokens
    // under a descendant selector and fight the preflight.
    if (light.length > 0 && light.every((s) => s === ':root' || s === 'html')) {
      continue
    }
    if (light.length === 0) {
      for (const selector of all) skipped.add(selector)
      if (declarations.length > 0)
        darkOnly.push({ selectors: all, declarations })
      continue
    }
    for (const selector of all) {
      if (DARK_FAST_PATH.test(selector)) skipped.add(selector)
    }
    if (declarations.length > 0) blocks.push({ selectors: light, declarations })
  }

  // What the light rules already state, per selector.
  const lightDeclarations = new Map()
  for (const block of blocks) {
    for (const selector of block.selectors) {
      if (!lightDeclarations.has(selector))
        lightDeclarations.set(selector, new Set())
      for (const declaration of block.declarations) {
        lightDeclarations.get(selector).add(comparable(declaration.raw))
      }
    }
  }

  const fixups = []
  for (const { selectors, declarations } of darkOnly) {
    const residue = declarations.filter(
      (declaration) => !isTwin(declaration.raw)
    )
    if (residue.length === 0) continue
    for (const selector of selectors) {
      const target = stripDark(selector)
      const known = lightDeclarations.get(target)
      const missing = residue.filter(
        (declaration) => !known || !known.has(comparable(declaration.raw))
      )
      if (missing.length > 0)
        fixups.push({ selector: target, declarations: missing })
    }
  }

  return { blocks, fixups, skipped: [...skipped] }
}

/** The class a selector hangs off: `.q-calendar-day__head` -> `q-calendar-day`. */
const rootOf = (selector) => {
  const found = selector.match(/\.(q-[a-z0-9-]+)/)
  return found ? found[1].split('__')[0].split('--')[0] : undefined
}

const THEMED = (value) => {
  let out = value
    .replaceAll('--calendar-', '--q-calendar-')
    // QMediaPlayer's own names, and the play button's unprefixed ones.
    .replaceAll('--big-play-button-', '--q-mediaplayer-big-play-button-')
    .replaceAll('--mediaplayer-', '--q-mediaplayer-')
  if (args.includes('--no-color-tokens')) return out
  for (const [literal, token] of COLOUR_TOKENS) {
    if (out.toLowerCase() === literal) out = `${token}`
  }
  return out
}

const quote = (text) =>
  text.includes("'")
    ? `"${text.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
    : `'${text.replace(/\\/g, '\\\\')}'`

const key = (prop) => (prop.includes('-') ? quote(prop) : prop)

const escapeSelector = (text) =>
  text.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')

const selectorTemplate = (selector, root) => {
  const at = selector.indexOf(`.${root}`)
  if (at < 0) {
    return { before: '', after: ` ${escapeSelector(selector)}`, isBase: false }
  }
  const before = selector.slice(0, at)
  const after = selector
    .slice(at + root.length + 1)
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')
  return { before, after, isBase: before === '' && after === '' }
}

/** Properties a stub may reset — the two-layer contract's allowed set. */
const RESET_KEYS = ['color', 'background-color', 'border-color', 'box-shadow']
const RESET_VALUES = {
  color: 'inherit',
  'background-color': 'transparent',
  'border-color': 'currentColor',
  'box-shadow': 'none'
}
const LITERAL_COLOUR = /#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i

/** The literal theming declarations a token flip cannot neutralise. */
const literalTheming = (declarations) =>
  declarations.filter((declaration) => {
    // The decision is made on the value that ships: a mapped literal
    // (`#f5f5f5` -> `var(--q-surface-container-low)`) is a token, and the token
    // layer already neutralises it, so it needs no stub.
    const shipped = THEMED(declaration.value)
    return (
      RESET_KEYS.includes(declaration.prop) &&
      !shipped.includes('var(') &&
      LITERAL_COLOUR.test(shipped)
    )
  })

const renderStub = (selectorExpression, declarations, indent) => {
  const keys = literalTheming(declarations)
  if (keys.length === 0) return undefined
  const lines = keys.map(
    ({ prop }) => `${indent}${key(prop)}: ${quote(RESET_VALUES[prop])},`
  )
  return `      yield {\n        [symbols.selector]: (selector) =>\n          \`body.quasar-style-unstyled ${selectorExpression}\`,\n${lines.join('\n')}\n      }`
}

const renderDeclarations = (declarations, indent) => {
  const lines = []
  let marked = false
  for (const { prop, value } of declarations) {
    const themed = THEMED(value)
    const bare = themed.replace(/\s*!important$/, '')
    const literal =
      WATCHED.has(prop) && !bare.includes('var(') && !EXEMPT.has(bare)
    if (literal && !marked) {
      lines.push(`${indent}// quasar: upstream's own value, not a forked role`)
      marked = true
    }
    lines.push(`${indent}${key(prop)}: ${quote(themed)},`)
  }
  return lines
}

const { blocks, fixups, skipped } = lightBlocks(input)

/** root -> its blocks, in source order. */
const byRoot = new Map()
for (const block of blocks) {
  for (const selector of block.selectors) {
    const root = rootOf(selector) ?? fallbackRoot
    if (root === undefined) {
      console.error(`[port] no root class in ${selector}`)
      process.exit(1)
    }
    if (!byRoot.has(root)) byRoot.set(root, [])
    const group = byRoot.get(root)
    const last = group.at(-1)
    if (last && last.block === block) last.selectors.push(selector)
    else group.push({ block, selectors: [selector] })
  }
}

const matchers = []
for (const [root, groups] of byRoot) {
  const yields = []
  for (const { block, selectors } of groups) {
    const base = selectors.filter(
      (selector) => selectorTemplate(selector, root).isBase
    )
    if (base.length > 0) {
      yields.push(
        `      // .${root}\n      yield {\n${renderDeclarations(block.declarations, '        ').join('\n')}\n      }`
      )
      const stub = renderStub('${selector}', block.declarations, '        ')
      if (stub !== undefined) yields.push(stub)
    }
    const scoped = selectors
      .map((selector) => ({ selector, ...selectorTemplate(selector, root) }))
      .filter((entry) => !entry.isBase)
    if (scoped.length === 0) continue
    const template = scoped
      .map(({ before, after }) => `${before}\${selector}${after}`)
      .join(', ')
    yields.push(
      `      yield {\n        [symbols.selector]: (selector) =>\n          \`${template}\`,\n${renderDeclarations(block.declarations, '        ').join('\n')}\n      }`
    )
    const stub = renderStub(template, block.declarations, '        ')
    if (stub !== undefined) yields.push(stub)
  }
  // Dark-only residue: the declarations upstream states *only* in a dark block
  // and that a token flip does not produce (see `lightBlocks`).
  for (const { selector, declarations } of fixups) {
    if (rootOf(selector) !== root) continue
    const { before, after } = selectorTemplate(selector, root)
    yields.push(
      `      // Dark-only in upstream: ${selector}\n      yield {\n        [symbols.selector]: (selector) =>\n          \`body.body--dark ${before}\${selector}${after}\`,\n${renderDeclarations(declarations, '        ').join('\n')}\n      }`
    )
    const stub = renderStub(
      `body.body--dark ${before}\${selector}${after}`,
      declarations,
      '        '
    )
    if (stub !== undefined) yields.push(stub)
  }
  matchers.push(
    `  [\n    /^${root}$/u,\n    function* (_, { symbols }) {\n${yields.join('\n')}\n    }\n  ]`
  )
}

const header = `import type { Rule } from '@unocss/core'

/**
 * \`${file}.scss\` — ported from the library's own stylesheet.
 *
 * Structural colours read the preset's tokens, which are themed and
 * scheme-aware, so upstream's palette literals and its \`-dark\` twins are not
 * carried. Upstream's dark fast path (${skipped.length} selectors across
 * \`.q-dark div\`, \`.body--dark div\` and \`.q-calendar--dark\`) is dropped for
 * the same reason; the residue a token flip does not reproduce is emitted as a
 * \`body.body--dark\` yield.
 */

export const ${exportName} = [\n${matchers.join(',\n')}\n] as Rule[]
`

if (outFile) {
  fs.writeFileSync(outFile, header)
  console.log(
    `[port] ${outFile}: ${byRoot.size} roots, ${blocks.length} blocks, ${skipped.length} dark selectors skipped`
  )
} else {
  process.stdout.write(header)
}
