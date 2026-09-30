import { symbols as controlKeys } from '@unocss/core'
import type {
  CSSValueInput,
  DynamicMatcher,
  DynamicRule,
  Rule,
  RuleContext,
  RuleMeta
} from '@unocss/core'

/**
 * The control keys UnoCSS reads off a yielded object (`$$symbol-selector`,
 * `$$symbol-parent`, …). Despite the name, `symbols` holds plain string keys,
 * not JS symbols — so scoped yields must be detected by key lookup, never with
 * `Object.getOwnPropertySymbols`, which always reports zero for them.
 */
const CONTROL_KEYS = new Set<string>(
  // SAFETY: `ControlSymbols` is typed with `unique symbol` brand types, but
  // every member is assigned a plain `$$symbol-*` string at runtime.
  Object.values(controlKeys) as unknown as string[]
)

/** A yield carrying a control key targets its own selector/parent, not the util. */
const isScopedYield = (item: unknown): boolean =>
  typeof item === 'object' &&
  item !== null &&
  Object.keys(item).some((key) => CONTROL_KEYS.has(key))

/**
 * Collapse duplicate rule matchers into single entries.
 *
 * UnoCSS keeps only the LAST rule registered for a given regex and silently
 * discards the earlier ones. The preset declared 42 regexes more than once
 * (71 lost entries), so components quietly lost declarations — most visibly
 * `.q-header`, whose base rule was dropped by a second `/^q-header$/` entry,
 * leaving the header transparent.
 *
 * Merging at assembly keeps every declaration while preserving the previous
 * cascade result: declarations are yielded in source order, so a later entry
 * still overrides an earlier one for the same property.
 *
 * Non-array rules and rules whose first element is not a RegExp pass through
 * untouched. Async matchers are left unmerged (a sync generator cannot await
 * them); `test/no-duplicate-rules.test.ts` asserts the preset contains none.
 */

/** A yielded matcher result: declaration object, entry list, or raw value. */
type MatcherResult = CSSValueInput | string | undefined

const isIterator = (value: unknown): value is Iterable<MatcherResult> =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as Iterable<MatcherResult>)[Symbol.iterator] === 'function'

const isAsyncMatcher = (matcher: unknown): boolean =>
  typeof matcher === 'function' &&
  (
    matcher as { constructor?: { name?: string } }
  ).constructor?.name?.startsWith('Async') === true

/**
 * Merge every declaration the original matchers produced.
 *
 * Plain declaration objects are folded into ONE object with later entries
 * winning per property — exactly the cascade the last-wins behavior produced,
 * but without losing the properties the earlier entries contributed. Emitting
 * the objects as separate yields is not equivalent: UnoCSS re-orders the
 * resulting blocks, which would silently flip which value wins.
 *
 * Scoped objects (those carrying a control key, e.g. `$$symbol-selector`) target
 * different selectors, so they are passed through untouched, in order.
 */

/**
 * Tag a rule list with a UnoCSS layer (the 3rd tuple element UnoCSS reads
 * for `layer`).
 *
 * Non-mutating on purpose: the lists come from module-level constants shared
 * across the preset's own tests, and a bare-string rule entry (which `Rule`
 * permits) would throw on property assignment in strict mode.
 */
export function rulesInLayer(layer: string, rules: Rule[]): Rule[] {
  return rules.map((rule) => {
    if (!Array.isArray(rule)) return rule
    const [matcher, body, meta] = rule as [Rule[0], Rule[1], RuleMeta?]
    return [matcher, body, { ...meta, layer }] as unknown as Rule
  })
}
function* delegateMatchers(
  matchers: DynamicMatcher[],
  match: RegExpMatchArray,
  context: Readonly<RuleContext>
): Generator<MatcherResult, void, unknown> {
  const declarations: Record<string, unknown> = {}
  const scoped: MatcherResult[] = []

  const collect = (item: unknown): void => {
    if (item == null) return
    if (isScopedYield(item)) {
      scoped.push(item as MatcherResult)
    } else if (typeof item === 'object' && !Array.isArray(item)) {
      Object.assign(declarations, item)
    } else {
      scoped.push(item as MatcherResult)
    }
  }

  for (const matcher of matchers) {
    const produced = matcher(match, context)
    if (produced == null) continue
    if (isIterator(produced)) {
      for (const item of produced) collect(item)
    } else {
      collect(produced)
    }
  }

  if (Object.keys(declarations).length > 0) {
    yield declarations as CSSValueInput
  }
  yield* scoped
}

interface RuleGroup {
  entry: DynamicRule
  regex: RegExp
  matchers: DynamicMatcher[]
}

const asDynamicRule = (rule: Rule): DynamicRule | undefined => {
  if (!Array.isArray(rule)) return undefined
  const [regex] = rule
  return regex instanceof RegExp ? (rule as DynamicRule) : undefined
}

export function mergeDuplicateRules(rules: Rule[]): Rule[] {
  const groups = new Map<string, RuleGroup>()
  const merged: Rule[] = []

  for (const rule of rules) {
    const dynamic = asDynamicRule(rule)
    if (!dynamic) {
      merged.push(rule)
      continue
    }
    const [regex, matcher] = dynamic
    const key = `${regex.source}|${regex.flags}`
    const existing = groups.get(key)
    if (existing) {
      existing.matchers.push(matcher)
      continue
    }
    const group: RuleGroup = { entry: dynamic, regex, matchers: [matcher] }
    groups.set(key, group)
    merged.push(dynamic)
  }

  // Replace each multi-matcher group in place with a delegating generator.
  for (const group of groups.values()) {
    if (group.matchers.length < 2) continue
    if (group.matchers.some(isAsyncMatcher)) continue // asserted absent by tests
    const index = merged.indexOf(group.entry)
    // Carry the entry's meta through: `layer` lives there, and a group whose
    // layer was dropped silently falls back to `default`, which puts a rule in
    // the wrong band of the sheet.
    const meta = group.entry[2]
    const delegate = (
      match: RegExpMatchArray,
      context: Readonly<RuleContext>
    ) => delegateMatchers(group.matchers, match, context)
    const entry: DynamicRule = meta
      ? [group.regex, delegate, meta]
      : [group.regex, delegate]
    merged[index] = entry
  }

  return merged
}
