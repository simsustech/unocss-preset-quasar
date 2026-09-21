import type { Extractor } from '@unocss/core'

/**
 * Classes that exist only because a *value* names them.
 *
 * UnoCSS scans source text, so in `icon="chevron-down"` it sees the value and
 * not the class Quasar builds from it (`i-mdi-chevron-down`); likewise
 * `transition-show="scale"` versus the six `q-transition--scale-*` classes. The
 * gate cannot see this either — it compares the preset's sheet against the
 * reference's, and content-scanned classes are not in the safelist — so a page
 * can render icons with no CSS at all while every check stays green. That is
 * exactly what `PLAYWRIGHT_CLASS_COVERAGE=1 … playwright test class-coverage`
 * reported: sixteen `i-mdi-chevron-down` on one page, unstyled.
 *
 * Neither name space can be safelisted: icon sets are open-ended and transition
 * names are app-authored. They have to be derived from the values.
 */
/** Keywords that look like a value but name nothing. */
const EMPTY_VALUES = new Set(['', 'null', 'undefined', 'true', 'false', '0'])

/**
 * The value a class can be derived from, or `null`.
 *
 * A bound attribute carries an *expression* — `:icon="currentIcon"` is not a
 * name, and neither is `:transition-show="null"` — so only an unbound attribute
 * or a quoted string literal is used. Treating expressions as names would fill
 * the sheet with classes derived from variable names.
 */
function literal(attribute: string, value: string): string | null {
  const bound = /^\s*(?::|v-bind:)/.test(attribute)
  let text = value.trim()
  if (bound) {
    const quoted = /^(['"`])(.*)\1$/.exec(text)
    if (quoted === null) return null
    text = quoted[2]
  }
  text = text.trim()
  return EMPTY_VALUES.has(text) ? null : text
}

export const quasarValueExtractor: Extractor = {
  name: 'quasar-value-extractor',
  order: 0,
  extract({ code }) {
    const classes = new Set<string>()

    // icon="chevron-down" (and name="…", which Quasar also treats as an icon in
    // several components) -> i-mdi-chevron-down. `mdi-` and `i-mdi-` prefixes
    // are tolerated so an app can spell the value either way.
    for (const match of code.matchAll(
      /(?<![\w-])(?::|v-bind:)?(?:icon|name)\s*=\s*["'`]([^"'`]+)["'`]/g
    )) {
      const value = literal(match[0] ?? '', match[1])
      if (value === null) continue
      if (value.startsWith('i-mdi-')) {
        classes.add(value)
      } else if (value.startsWith('mdi-')) {
        classes.add(`i-mdi-${value.slice(4)}`)
      } else if (/^[a-z0-9-]+$/.test(value)) {
        classes.add(`i-mdi-${value}`)
      }
    }

    // Icons written as a literal class in markup.
    for (const match of code.matchAll(/["'`](i-mdi-[a-z0-9-]+)["'`]/g)) {
      classes.add(match[1])
    }

    // transition-show="scale" -> the six classes Quasar's transition adds.
    for (const match of code.matchAll(
      /(?<![\w-])(?::|v-bind:)?transition(?:-(?:show|hide|prev|next))?\s*=\s*["'`]([^"'`]+)["'`]/g
    )) {
      const name = literal(match[0] ?? '', match[1])
      if (name === null) continue
      for (const phase of [
        'enter-from',
        'enter-active',
        'enter-to',
        'leave-from',
        'leave-active',
        'leave-to'
      ]) {
        classes.add(`q-transition--${name}-${phase}`)
      }
    }

    return [...classes]
  }
}
