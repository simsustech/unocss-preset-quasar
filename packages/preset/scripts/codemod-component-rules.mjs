/**
 * One UnoCSS rule per component: the root class matches, and every BEM member of
 * the component is yielded with a selector function that rewrites the root.
 *
 * Before: 419 rules, one per class —
 *   [[/^q-fab--mini$/, () => ({ width: 'var(--q-fab-mini-size)', … })], …]
 * After: one rule per component —
 *   [[/^q-fab$/, function* (_, { symbols }) {
 *      yield { display: 'inline-flex', … }                     // .q-fab
 *      yield {
 *        [symbols.selector]: (selector) => `${selector}--mini`,
 *        width: 'var(--q-fab-mini-size)', height: 'var(--q-fab-mini-size)'
 *      }
 *   }]]
 *
 * The consequence is the point: a component needs one candidate — its root — and
 * everything else follows from the yields, so no class of a component has to be
 * listed anywhere to get its CSS.
 *
 * Declarations are copied verbatim. A yield that already rewrites the selector
 * gets its `${sel}` rewritten to `${selector}<suffix>`, which is exactly the
 * composition the old per-class rule performed implicitly. Anything the script
 * cannot read confidently is reported and left alone.
 *
 *   node scripts/codemod-component-rules.mjs [--check]
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const CHECK = process.argv.includes('--check')
let why = ''
const COMPONENTS = 'src/components'

/** The component root a BEM class belongs to: `q-fab__label--external-left` -> `q-fab`. */
const rootOf = (exact) => {
  const cut = exact.search(/__|--/)
  return cut === -1 ? exact : exact.slice(0, cut)
}

/** Split `const x = [ … ]` into its elements; null when the shape deviates. */
function elements(body) {
  const parts = []
  let current = null
  for (const line of body.split('\n')) {
    if (current === null) {
      // Blanks and comments may sit between elements (the files explain each block).
      if (
        line.trim() === '' ||
        line.trim() === ',' ||
        /^\s*(\/\/|\/\*)/.test(line)
      )
        continue
      if (!/^ {2}\[/.test(line)) return null
      // A short element is collapsed onto one line: `[/^q-x$/, () => ({ … })],`
      if (/^ {2}\[.*\],?$/.test(line)) {
        parts.push(line)
        continue
      }
      current = [line]
      continue
    }
    if (/^ {2}\],?$/.test(line)) {
      parts.push([...current, line].join('\n'))
      current = null
      continue
    }
    current.push(line)
  }
  if (current !== null) return null
  return parts.length > 0 ? parts : null
}

/** An element written across lines, and the same collapsed onto one. */
const TUPLE =
  /^ {2}\[\n((?: {4}\/\/[^\n]*\n)*) {4}\/\^([-\w]+)\$\/,\n([\s\S]*)\n {2}\],?$/
const TUPLE_INLINE = /^ {2}\[\/\^([-\w]+)\$\/, ([\s\S]*?)\],?$/

/** Read the object literal starting at `text[start] === '{'`, honouring strings. */
function takeObject(text, start) {
  let depth = 0
  let quote = null
  let template = 0
  for (let i = start; i < text.length; i += 1) {
    const ch = text[i]
    if (quote !== null) {
      if (ch === '\\') i += 1
      else if (ch === quote) quote = null
      continue
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      quote = ch
      if (ch === '`') template += 1
      continue
    }
    if (quote === '`' && ch === '}') template -= 1
    if (ch === '/' && text[i + 1] === '/') {
      const end = text.indexOf('\n', i)
      i = end === -1 ? text.length : end
      continue
    }
    if (ch === '{') depth += 1
    else if (ch === '}') {
      depth -= 1
      if (depth === 0) return text.slice(start, i + 1)
    }
  }
  return null
}

/**
 * The object literals a body yields, in order — or null when the body does more
 * than yield plain objects (locals, branches, `match`), which is left alone.
 */
function yields(body) {
  // The tuple's second slot can open with a comment above `function*`; drop
  // leading comments/blank lines before testing the body shape.
  const clean = body.replace(/^(?:\s|\/\/[^\n]*\n|\/\*[\s\S]*?\*\/)+/, '')
  const arrow = clean.match(/^\(\)\s*=>\s*\(\{([\s\S]*)\}\)$/)
  if (arrow !== null) return [`{${arrow[1]}}`]

  const generator = clean.match(
    /^(?:async\s+)?function\*?\s*\([^)]*\)\s*\{([\s\S]*)\}$/
  )
  if (generator === null) {
    why = 'body not function*/arrow'
    return null
  }
  why = ''
  const flat = unrollLoops(generator[1])
  const loopWhy = why
  why = ''
  const res = objectsOf(flat)
  if (res === null && loopWhy !== '') why = `${loopWhy} | then ${why}`
  return res
}

/** The object literals a statement sequence yields, or null when it does more than that. */
function objectsOf(statements) {
  const found = []
  const spans = []
  // The word `yield` appears inside prose comments too ("…we yield above…"), so a
  // match whose position sits in a comment is not a statement.
  const comments = [...statements.matchAll(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g)].map(
    (m) => [m.index, m.index + m[0].length]
  )
  const inComment = (i) => comments.some(([a, b]) => i >= a && i < b)
  const yieldWord = /(^|[^\w.])\byield(\*?)\s*/g
  for (const match of statements.matchAll(yieldWord)) {
    if (inComment(match.index + match[1].length)) continue
    if (match[2] === '*') {
      why = 'yield* delegation'
      return null
    }
    const at = match.index + match[0].length
    // Only object yields; `yield someVar` cannot be composed.
    if (statements[at] !== '{') {
      why = `yield not object: ${JSON.stringify(statements.slice(at, at + 50))}`
      return null
    }
    const object = takeObject(statements, at)
    if (object === null) {
      why = 'unbalanced object literal'
      return null
    }
    found.push(object)
    spans.push([at, at + object.length])
  }
  if (found.length === 0) return []
  // Everything outside those objects must be whitespace, comments and `yield` —
  // a local or a branch hides declarations the rule would lose, so those bodies
  // are reported instead of flattened.
  let outside = ''
  let cursor = 0
  for (const [start, end] of spans) {
    outside += statements.slice(cursor, start)
    cursor = end
  }
  outside += statements.slice(cursor)
  outside = outside
    .replace(/\byield\b/g, '')
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .trim()
  if (outside !== '') {
    why = `non-yield: ${JSON.stringify(outside.slice(0, 70))}`
    return null
  }
  return found
}

/**
 * Replace `for (const x of ['a', 'b']) { … yields … }` with the yields it repeats,
 * once per value. The loop variable only ever appears as `${x}` inside a template
 * literal, so substitution is textual; anything else leaves the loop in place and
 * the gap check reports the body.
 */
function unrollLoops(statements) {
  const loop = /for\s*\(\s*const\s+(\w+)\s+of\s+(\[[^\]]*\])\s*\)\s*\{/
  for (;;) {
    const found = loop.exec(statements)
    if (found === null) return statements
    const [, variable, list] = found
    const body = takeObject(statements, found.index + found[0].length - 1)
    if (body === null) {
      why = 'loop body unbalanced'
      return statements
    }
    const values = [...list.matchAll(/'([^']*)'|"([^"]*)"/g)].map(
      (m) => m[1] ?? m[2]
    )
    const rest = list.replace(/'[^']*'|"[^"]*"|\[|\]|,|\s/g, '')
    if (values.length === 0 || rest !== '') {
      why = 'loop list not string literals'
      return statements
    }
    const inner = objectsOf(unrollLoops(body.slice(1, -1)))
    if (inner === null) {
      why = 'loop body: ' + why
      return statements
    }
    // `${var}` is always substituted here. A leftover bare-word test false-positives
    // on `first-child`, `edit-range`, `input[type=…]` — the var name inside a longer
    // word — so substitution is trusted and any real bare use fails tsc instead.
    const repeated = values.flatMap((value) =>
      inner.map((object) => object.replaceAll('${' + variable + '}', value))
    )
    statements =
      statements.slice(0, found.index) +
      repeated.map((object) => `yield ${object}`).join('\n') +
      statements.slice(found.index + found[0].length - 1 + body.length)
  }
}

/**
 * Rewrite a yielded object so it lands on `${selector}<suffix>`.
 *
 * A yield that rewrites the selector itself keeps its expression and has `${sel}`
 * widened to `${selector}<suffix>` — the same selector the old per-class rule
 * produced. A yield without one gets an explicit selector function, unless the
 * class *is* the root, where the matched selector is already correct.
 */
function place(object, suffix) {
  const selectorProp =
    /\[symbols\.selector\]:\s*\(\s*(\w+)\s*(?::[^)]*)?\)\s*=>\s*/
  const match = object.match(selectorProp)
  if (match !== null) {
    const [, param] = match
    const at = match.index + match[0].length
    const expression = object.slice(at, object.lastIndexOf('}'))
    // `${sel}` inside a template literal is the class's own selector.
    const widened = expression.replaceAll(
      `\${${param}}`,
      `\${selector}${suffix}`
    )
    // `${param}` is what gets widened; any other use of the param (`sel + 'x'`)
    // would silently change meaning, so that body is reported instead.
    const otherUses = expression
      .replaceAll('${' + param + '}', '')
      .replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, '')
    // The param must not survive as a whole token; a hyphenated word like
    // `file-selector-button` contains it but is a string, not a use.
    if (new RegExp(`(?<![-\\w])${param}(?![\\w-])`).test(otherUses)) {
      why =
        'place: ${' +
        param +
        '} outside template in ' +
        object.slice(0, 120).replace(/\n/g, ' ')
      return null
    }
    // The parameter is renamed to match, now that the body references it.
    const before = object.slice(0, match.index)
    const declaration = object
      .slice(match.index, at)
      .replace(new RegExp(`\\(\\s*${param}\\b`), '(selector')
    return (
      before + declaration + widened + object.slice(object.lastIndexOf('}'))
    )
  }
  if (suffix === '') return object
  const indent = (object.match(/\n(\s*)/) ?? [, '  '])[1]
  const inner = `[symbols.selector]: (selector) => \`\${selector}${suffix}\`,`
  return `{\n${indent}  ${inner}${object.slice(1)}`
}

function convert(file) {
  const text = readFileSync(file, 'utf8')
  const arrays = [
    ...text.matchAll(
      /(^export const \w+(?:\s*:\s*[\w<>[\]]+)?\s*=\s*)\[([\s\S]*?)\n\]([^\n]*)(?=\n|$)/gm
    )
  ]
  // A file may export a `*Css` array of text before its rules: pick the array
  // whose elements are actually rule tuples.
  let chosen = null
  let parts = null
  for (const candidate of arrays) {
    const parsed = elements(candidate[2])
    if (parsed === null) continue
    if (parsed.some((part) => TUPLE.test(part) || TUPLE_INLINE.test(part))) {
      chosen = candidate
      parts = parsed
      break
    }
  }
  if (chosen === null) {
    return {
      reason:
        arrays.length === 0
          ? 'no `export const x = [ … ]` array'
          : 'no array of rule tuples'
    }
  }
  const [whole, head, bodyText, suffixText] = chosen

  const groups = new Map()
  const extra = []
  const unreadable = []
  for (const part of parts) {
    const multi = TUPLE.exec(part)
    const inline = TUPLE_INLINE.exec(part)
    if (multi === null && inline === null) {
      extra.push(part)
      continue
    }
    // A comment above the matcher is documentation for that rule: carry it.
    const leading = multi ? multi[1].replace(/^ {4}/gm, '      ') : ''
    const exact = multi ? multi[2] : inline[1]
    const ruleBody = multi ? multi[3] : inline[2]
    const root = rootOf(exact)
    const suffix = exact.slice(root.length)
    why = ''
    const objects = yields(ruleBody.trim().replace(/,$/, ''))
    if (objects === null) {
      unreadable.push(`${exact} [${why}]`)
      continue
    }
    // An empty rule emits no CSS, so it contributes no regex of its own.
    if (objects.length === 0) continue
    why = ''
    const placed = objects.map((o) => place(o, suffix))
    if (placed.some((p) => p === null)) {
      unreadable.push(`${exact} [${why}]`)
      continue
    }
    if (!groups.has(root)) groups.set(root, [])
    groups.get(root).push([exact, placed, leading])
  }
  if (unreadable.length > 0) return { unreadable }
  if (groups.size === 0)
    return { reason: `no class tuples (extra: ${extra.length})` }

  const rules = []
  for (const [root, entries] of groups) {
    const blocks = entries.map(([cls, objects, leading]) => {
      const lines = objects.map((o) => `      yield ${o}`).join('\n')
      return `${leading ?? ''}      // .${cls}\n${lines}`
    })
    rules.push(
      `  [\n    /^${root}$/,\n    function* (_, { symbols }) {\n` +
        `${blocks.join('\n')}\n    }\n  ]`
    )
  }
  const emitted = `[\n${rules.join(',\n')}${extra.length > 0 ? `,\n  ${extra.join(',\n  ')}` : ''}\n]`

  const at = chosen.index + chosen[0].length
  let out =
    text.slice(0, chosen.index) +
    `${head}${emitted}${suffixText}` +
    text.slice(at)
  const IMPORT = "import { componentRules } from '../../rules/component.js'"
  out = out.replace(`${IMPORT}\n`, '')
  if (!CHECK) writeFileSync(file, out)
  return { converted: [...groups.values()].flat().length, extra: extra.length }
}

let files = 0
let converted = 0
let extra = 0
const skipped = []
const unreadable = []
for (const dir of readdirSync(COMPONENTS).sort()) {
  const file = join(COMPONENTS, dir, 'rules.ts')
  let report
  try {
    report = convert(file)
  } catch (error) {
    skipped.push(`${dir}: ${error.message}`)
    continue
  }
  if (report === null || report.reason !== undefined) {
    skipped.push(`${dir}: ${report?.reason ?? 'shape not recognised'}`)
    continue
  }
  if (report.unreadable !== undefined) {
    unreadable.push(
      `${dir} (${report.unreadable.length}): ${report.unreadable.join(' ')}`
    )
    continue
  }
  files += 1
  converted += report.converted
  extra += report.extra
  if (process.argv.includes('--per-file'))
    console.log(`  ${dir}: ${report.converted}`)
}
console.log(
  `[codemod] ${CHECK ? 'would rewrite' : 'rewrote'} ${files} files: ` +
    `${converted} class yields in ${files} rules, ${extra} kept verbatim`
)
if (skipped.length > 0)
  console.log(`[codemod] skipped ${skipped.length}: ${skipped.join(', ')}`)
if (unreadable.length > 0) {
  console.log(`[codemod] needs a hand ${unreadable.length}:`)
  for (const line of unreadable) console.log(`  ${line}`)
}
