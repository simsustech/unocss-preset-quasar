import type { Preflight, Shortcut, UtilObject } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'
import type { QuasarStyle } from './index.js'

/**
 * Split a CSS selector list on top-level commas, respecting
 * parentheses so calls like `:is(.a, .b)` aren't split inside.
 */
function splitTopLevelCommas(input: string): string[] {
  const parts: string[] = []
  let depth = 0
  let buf = ''
  for (const ch of input) {
    if (ch === '(') depth++
    else if (ch === ')') depth--
    if (ch === ',' && depth === 0) {
      parts.push(buf.trim())
      buf = ''
    } else {
      buf += ch
    }
  }
  if (buf.trim()) parts.push(buf.trim())
  return parts
}

/**
 * At-rules whose bodies must NOT be body-class-scoped — they are
 * global by nature (keyframes, font-face, theme-token declarations).
 */
const SKIP_AT_RULES = new Set([
  '@keyframes',
  '-webkit-keyframes',
  '@font-face',
  '@property',
  '@charset',
  '@import',
  '@namespace',
  '@layer'
])

/**
 * Recursively wrap selectors inside a raw CSS string with a body-class
 * guard. Handles nested at-rules (`@media`, `@supports`, `@container`)
 * by recursing into their bodies. Skips `:root` declarations (theme
 * tokens stay global) and the at-rules listed in SKIP_AT_RULES.
 *
 * The strategy: tokenize the CSS into `(selector, body)` blocks by
 * matching `{` and `}` at brace depth 0, then for each block decide
 * how to handle its selector.
 */
export function wrapPreWithBodyClass(css: string, bodyClass: string): string {
  if (!bodyClass) return css
  const guard = `body.${bodyClass} `
  let out = ''
  let i = 0
  while (i < css.length) {
    let depth = 0
    let braceIdx = -1
    for (let j = i; j < css.length; j++) {
      const c = css[j]
      if (c === '{') {
        if (depth === 0) {
          braceIdx = j
          break
        }
        depth++
      } else if (c === '}') {
        depth--
      }
    }
    if (braceIdx === -1) {
      out += css.slice(i)
      break
    }
    const selectorRaw = css.slice(i, braceIdx).trim()
    let closeIdx = -1
    depth = 1
    for (let j = braceIdx + 1; j < css.length; j++) {
      const c = css[j]
      if (c === '{') depth++
      else if (c === '}') {
        depth--
        if (depth === 0) {
          closeIdx = j
          break
        }
      }
    }
    if (closeIdx === -1) {
      out += css.slice(i)
      break
    }
    const body = css.slice(braceIdx + 1, closeIdx)
    out += wrapBlock(selectorRaw, body, bodyClass)
    i = closeIdx + 1
  }
  return out
}

function wrapBlock(
  selectorRaw: string,
  body: string,
  bodyClass: string
): string {
  const guard = `body.${bodyClass} `
  const atRuleMatch = selectorRaw.match(/^(@[a-z-]+)/i)
  if (atRuleMatch) {
    const at = atRuleMatch[1].toLowerCase()
    if (SKIP_AT_RULES.has(at)) {
      return `${selectorRaw}{${body}}`
    }
    // @media / @supports / @container — recurse into the body so the
    // nested selectors get wrapped too.
    return `${selectorRaw}{${wrapPreWithBodyClass(body, bodyClass)}}`
  }
  // `:root` declarations hold theme tokens (--light-primary etc.); keep
  // them global so they're always available via var(...).
  if (/^:root\b/.test(selectorRaw)) {
    return `${selectorRaw}{${body}}`
  }
  // Class / id / element / attribute / combinator selectors get wrapped.
  if (/^[.#a-zA-Z[&:>+~*\s]/.test(selectorRaw)) {
    const wrapped = splitTopLevelCommas(selectorRaw)
      .map((s) => `${guard}${s}`)
      .join(', ')
    return `${wrapped}{${body}}`
  }
  return `${selectorRaw}{${body}}`
}

/**
 * Decide whether a util's selector should be wrapped with the body-class
 * guard. Returns the wrapped selector, or the original selector if
 * wrapping is unsafe / unnecessary.
 *
 * Skips:
 *  - empty selectors (e.g. `@keyframes` won't reach here, but be safe)
 *  - selectors that already start with the body-class guard (idempotent)
 *  - selectors in the `preflights` layer (handled separately by
 *    `wrapPreWithBodyClass`)
 *  - selectors that are just a pseudo-element/::marker with no class
 *    root — these are emitted by the shortcut expansion for things
 *    like `[&::before]:(content-empty)` and have no selector to scope
 *  - keyframe-related selectors (e.g. `%from`) — but those never
 *    appear as top-level shortcut selectors, so this is a defensive
 *    no-op
 *  - selectors containing `@layer` directives
 *  - selectors that are global rules like `*`, `html`, `:root`,
 *    `@media`, etc.
 */
function wrapShortcutSelector(
  selector: string | undefined,
  bodyClass: string
): string | undefined {
  if (!selector) return selector
  const guard = `body.${bodyClass} `
  if (selector.includes(guard)) return selector
  // Skip selectors that already carry ANY body-class guard from a
  // sibling style's postprocess. This prevents double-wrapping when
  // multiple QuasarPreset instances each contribute their own
  // postprocess and share the same shortcut output. We detect a
  // guard by looking for `body.quasar-style-` at any selector-group
  // boundary — that's the namespace the playground uses for all
  // three styles' body classes.
  if (/\bbody\.quasar-style-[a-z0-9-]+\s/.test(selector)) return selector
  // Pseudo-only selectors (e.g. a `[&::before]` expansion that lost
  // its parent, or a leading pseudo) cannot be scoped by themselves —
  // they need a real class. Skip them; the browser will treat them
  // as `:scope::before` (the root) which is rarely what's wanted, but
  // at minimum we don't make things worse by emitting invalid CSS.
  if (/^\s*(::?[a-z-]+|\*)\s*$/i.test(selector)) return selector
  // Preflight-like selectors (`:root`, `:where(...)`) are global and
  // should not be body-class-scoped — they hold theme tokens / global
  // resets. The MD2/MD3 shortcut files never emit these, but defend
  // anyway in case a future shortcut does.
  if (/^\s*:root\b/i.test(selector)) return selector
  // Reject obviously invalid selectors produced by shortcut expansion
  // edge cases — wrapping them just compounds the problem.
  if (selector.includes('@')) return selector
  return `${guard}${selector}`
}

/**
 * Tag every shortcut in the style with `meta.layer = bodyClass`. This
 * is the cornerstone of multi-style coexistence: when three
 * QuasarPresets are registered into the same UnoCSS generator, each
 * preset's shortcuts emit utilities with a distinct `layer` value.
 * The postprocess hook below can then identify which preset's
 * utility it's looking at and apply the correct body-class guard
 * without colliding with the other presets' wrappers.
 *
 * Why this matters: without per-style layer tagging, when both MD3
 * and MD2 register a `q-btn` shortcut, UnoCSS produces utilities
 * with `layer === 'components'` for both. The postprocess pipeline
 * runs sequentially — preset A's postprocess wraps the selector,
 * preset B's postprocess sees "already has body-class prefix" and
 * skips, leaving B's utilities with A's body class. The result is
 * that only the first-registered preset's CSS applies regardless of
 * the active body class.
 *
 * With per-style layer tagging, each util's `util.layer` matches
 * exactly one preset's bodyClass. The postprocess for that preset
 * applies its own prefix; the postprocess for sibling presets sees
 * `util.layer !== bodyClass` and passes through. Each preset's CSS
 * carries the correct body-class guard.
 */
function tagShortcutsWithLayer(
  shortcuts: Shortcut<QuasarTheme>[],
  layerName: string
): Shortcut<QuasarTheme>[] {
  return shortcuts.map((sc) => {
    // Static shortcut: [name, value, meta?]
    // Dynamic shortcut: [regex, fn, meta?]
    const [first, second, existingMeta] = sc as [
      string | RegExp,
      unknown,
      Record<string, unknown> | undefined
    ]
    const nextMeta = { ...existingMeta, layer: layerName }
    return [first, second, nextMeta] as unknown as Shortcut<QuasarTheme>
  })
}

/**
 * Scope a `QuasarStyle` so its preflights and emitted utilities only
 * apply when `body` has the given class.
 *
 * - Preflights: every selector inside the emitted CSS is wrapped with
 *   the body-class guard. `:root` declarations are left alone so theme
 *   tokens (`--light-primary`, etc.) stay globally available.
 * - Rules: passed through unchanged. The shipped MD2/MD3 styles have
 *   empty `rules` arrays, so wrapping rules is a no-op for them; if a
 *   future style needs rule wrapping, add it here.
 * - Shortcuts: each shortcut is tagged with a per-style UnoCSS layer
 *   name (the body class). The resulting utilities carry that layer.
 *   The postprocess hook then checks `util.layer === bodyClass` and
 *   wraps matching utilities with the body-class guard — and ONLY
 *   matching utilities, leaving sibling presets' utilities untouched.
 *
 * This makes the shortcut CSS per-style: MD3's `.q-btn` becomes
 * `body.quasar-style-md3 .q-btn`, MD2's `.q-btn` becomes
 * `body.quasar-style-md2 .q-btn`, and the browser applies only the
 * matching one at runtime.
 *
 * No-op when `bodyClass` is empty (backward compatible).
 */
export function scopeStyle(style: QuasarStyle, bodyClass: string): QuasarStyle {
  if (!bodyClass) return style
  const wrappedPreflights: Preflight<QuasarTheme>[] = style.preflights.map(
    (p) => ({
      ...p,
      getCSS: (ctx) => {
        const css = p.getCSS(ctx)
        // `getCSS` may be async (returns a Promise). Resolve and wrap.
        if (css && typeof (css as Promise<string>).then === 'function') {
          return (css as Promise<string | undefined>).then((c) =>
            c ? wrapPreWithBodyClass(c, bodyClass) : c
          )
        }
        return css ? wrapPreWithBodyClass(css as string, bodyClass) : css
      }
    })
  )
  const taggedShortcuts = tagShortcutsWithLayer(style.shortcuts, bodyClass)
  const postprocess = (util: UtilObject): UtilObject => {
    // Scope ALL utilities to this preset's body class.
    // util.layer doesn't reliably propagate from shortcuts to expanded utilities.
    // Skip preflights — they're handled by `wrapPreWithBodyClass`.
    if (util.layer === 'preflights') return util
    // Only wrap utilities that originated from THIS preset. With the
    // per-style layer tag applied above, `util.layer` is the body
    // class of the preset whose shortcut produced the util. Sibling
    // presets' utilities have a different layer and pass through
    // untouched, so each preset's CSS carries the correct prefix.
    if (util.layer !== bodyClass) return util
    const next = wrapShortcutSelector(util.selector, bodyClass)
    if (!next || next === util.selector) return util
    return { ...util, selector: next }
  }
  return {
    ...style,
    preflights: wrappedPreflights,
    shortcuts: taggedShortcuts,
    postprocess: [postprocess]
  }
}
