import type {
  CSSValueInput,
  DynamicMatcher,
  DynamicRule,
  Rule,
  RuleContext
} from '@unocss/core'

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
 * Selector-scoped objects (those carrying symbol keys, e.g. `symbols.selector`)
 * target different selectors, so they are passed through untouched, in order.
 */
function* delegateMatchers(
  matchers: DynamicMatcher[],
  match: RegExpMatchArray,
  context: Readonly<RuleContext>
): Generator<MatcherResult, void, unknown> {
  const declarations: Record<string, unknown> = {}
  const scoped: MatcherResult[] = []

  const collect = (item: unknown): void => {
    if (item == null) return
    const isPlainObject =
      typeof item === 'object' &&
      !Array.isArray(item) &&
      Object.getOwnPropertySymbols(item).length === 0
    if (isPlainObject) {
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
    const entry: DynamicRule = [
      group.regex,
      (match, context) => delegateMatchers(group.matchers, match, context)
    ]
    merged[index] = entry
  }

  return merged
}
