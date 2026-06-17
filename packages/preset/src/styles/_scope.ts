import type { Preflight } from '@unocss/core'
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
  if (/^[.#a-zA-Z\[&:>+~*\s]/.test(selectorRaw)) {
    const wrapped = splitTopLevelCommas(selectorRaw)
      .map((s) => `${guard}${s}`)
      .join(', ')
    return `${wrapped}{${body}}`
  }
  return `${selectorRaw}{${body}}`
}

/**
 * Scope a `QuasarStyle` so its preflights only apply when `body` has
 * the given class.
 *
 * - Preflights: every selector inside the emitted CSS is wrapped with
 *   the body-class guard. `:root` declarations are left alone so theme
 *   tokens (`--light-primary`, etc.) stay globally available.
 * - Rules: passed through unchanged. The shipped MD2/MD3 styles have
 *   empty `rules` arrays, so wrapping rules is a no-op for them; if a
 *   future style needs rule wrapping, add it here.
 * - Shortcuts: NOT touched. They emit class names whose CSS is resolved
 *   via the scoped rules / preflights, so the scoping propagates.
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
  return {
    ...style,
    preflights: wrappedPreflights
  }
}
