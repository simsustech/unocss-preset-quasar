import { symbols } from '@unocss/core'
import type {
  CSSObject,
  CSSObjectInput,
  DynamicMatcher,
  Rule
} from '@unocss/core'

/**
 * A style's own rules: the declarations a style needs that tokens cannot express
 * (`Unstyled`'s literal resets are what ships today, one per ported rule that
 * states a colour or a shadow).
 *
 * The baseline entry's rules pass through untouched — its scope is `body`
 * already. Every other entry is scoped: each yield is forced onto
 * `body.quasar-style-{name}`, so a style that is not listed ships no rules, and
 * a listed one cannot leak its declarations into a style around it.
 */

/**
 * SAFETY: `symbols` members are typed as unique symbols but are assigned plain
 * `$$symbol-*` strings at runtime — the same reason `rules/merge.ts` looks its
 * control keys up as strings. Writing through `symbols.selector` and reading
 * through this string therefore address one and the same key.
 */
const SELECTOR_KEY = symbols.selector as unknown as string

/** `prefix + selector` → prefixed selector, so a hot matcher splits once. */
const prefixed = new Map<string, string>()

/**
 * Split a selector group on its TOP-LEVEL commas: a comma inside `:not(…)`,
 * `:is(…)` or an attribute selector belongs to one member, and splitting there
 * would produce selectors that match nothing.
 */
function splitMembers(selector: string): string[] {
  const members: string[] = []
  let current = ''
  let depth = 0
  let quote: string | null = null
  for (const char of selector) {
    if (quote !== null) {
      current += char
      if (char === quote) quote = null
      continue
    }
    if (char === '"' || char === "'") {
      quote = char
      current += char
      continue
    }
    if (char === '(' || char === '[') depth += 1
    else if (char === ')' || char === ']') depth -= 1
    if (char === ',' && depth === 0) {
      members.push(current)
      current = ''
      continue
    }
    current += char
  }
  members.push(current)
  return members
}

/**
 * Put `prefix` in front of every member of a selector group.
 *
 * UnoCSS hands the util's own selector (`.q-btn`) or a group a rule authored to
 * `symbols.selector`. Prefixing such a group as a whole scopes only its first
 * member and leaves the rest matching in every style — what the ported qmarkdown
 * resets did: a 47-member `color: inherit` group stayed half unscoped, was
 * emitted after the base palette, and won on equal specificity, so md3 markdown
 * lost its syntax colours to it.
 */
export function prefixMembers(selector: string, prefix: string): string {
  const key = `${prefix}${selector}`
  const cached = prefixed.get(key)
  if (cached !== undefined) return cached
  const scoped = splitMembers(selector)
    .map((member) => `${prefix}${member.trim()}`)
    .join(', ')
  prefixed.set(key, scoped)
  return scoped
}

const isIterator = (value: unknown): value is Iterable<unknown> =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as Iterable<unknown>)[Symbol.iterator] === 'function'

/** As in `rules/merge.ts`: an async matcher is named for it. */
const isAsyncMatcher = (matcher: unknown): boolean =>
  typeof matcher === 'function' &&
  (
    matcher as { constructor?: { name?: string } }
  ).constructor?.name?.startsWith('Async') === true

/**
 * One yield, forced onto the style's scope: a yield carrying its own selector fn
 * keeps that selector and gets the prefix on every member, while a plain
 * declaration object belongs to the util's selector and gains one.
 */
function scopedYield(item: unknown, prefix: string): CSSObjectInput {
  if (isIterator(item)) {
    // A nested array/generator yield has no selector of its own to scope.
    throw new Error(
      'QuasarPreset: a style rule must yield declaration objects, not arrays — wrap each declaration set in its own yield'
    )
  }
  if (typeof item === 'string') {
    throw new Error(
      'QuasarPreset: a style rule that yields raw CSS cannot be scoped to its body class — yield declarations (optionally with a selector fn), or make this style the baseline'
    )
  }
  if (item === null || typeof item !== 'object') {
    throw new Error('QuasarPreset: a style rule must yield declaration objects')
  }
  // SAFETY: the yield arrived as `unknown`, but a declaration object is a
  // `CSSObject` plus one optional control key, which is what the spread below
  // copies verbatim.
  const declarations = item as CSSObject
  // SAFETY: reading the control key as a string is deliberate — at runtime
  // `symbols.selector` *is* that string (see above), and `CSSObject`'s index
  // signature would otherwise report the selector fn as a plain CSS value,
  // hiding the check below.
  const own = (item as Record<string, unknown>)[SELECTOR_KEY]
  if (typeof own === 'function') {
    const ownSelector = own as (selector: string) => string
    return {
      ...declarations,
      [symbols.selector]: (selector: string) =>
        prefixMembers(ownSelector(selector), prefix)
    }
  }
  return {
    ...declarations,
    [symbols.selector]: (selector: string) => prefixMembers(selector, prefix)
  }
}

/**
 * Scope one style rule. `prefix === ''` (the baseline) returns the rule as
 * authored — its declarations already apply wherever the style does.
 */
export function scopeRule(rule: Rule, prefix: string): Rule {
  if (prefix === '') return rule
  if (!Array.isArray(rule) || !(rule[0] instanceof RegExp)) {
    throw new Error(
      'QuasarPreset: a non-baseline style rule must be a [RegExp, handler] tuple — a static rule states its selectors itself and cannot be scoped'
    )
  }
  const [matcher, handler, meta] = rule
  if (typeof handler !== 'function') {
    throw new Error(
      'QuasarPreset: a non-baseline style rule needs a handler function — an object handler carries no selector to scope'
    )
  }
  if (isAsyncMatcher(handler)) {
    throw new Error(
      'QuasarPreset: a non-baseline style rule cannot be an async matcher — its yields could not be scoped synchronously'
    )
  }
  const scoped: DynamicMatcher = function* (match, context) {
    const produced: unknown = handler(match, context)
    if (produced === undefined || produced === null) return
    if (isIterator(produced)) {
      for (const item of produced) yield scopedYield(item, prefix)
      return
    }
    yield scopedYield(produced, prefix)
  }
  return [matcher, scoped, meta]
}
