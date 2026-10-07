import type { Extractor } from '@unocss/core'
import { componentClasses } from './generated/quasar-classes.js'

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

/** `star` / `mdi-star` / `i-mdi-star` → the class Quasar will render. */
const addIconClass = (classes: Set<string>, raw: string): void => {
  const value = raw.trim()
  if (value.startsWith('i-mdi-')) classes.add(value)
  else if (value.startsWith('mdi-')) classes.add(`i-mdi-${value.slice(4)}`)
  else if (/^[a-z0-9-]+$/.test(value)) classes.add(`i-mdi-${value}`)
}

/** `QBtn` -> `q-btn`: the markup may name a component either way. */
const pascalToKebab = (name: string) =>
  name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

/** The six phases Vue toggles on a transition's classes, in toggle order. */
const TRANSITION_PHASES = [
  'enter-from',
  'enter-active',
  'enter-to',
  'leave-from',
  'leave-active',
  'leave-to'
]

/** Directions Quasar concatenates onto a dangling family fragment. */
const TRANSITION_DIRECTIONS = ['left', 'right']

/** A class that already names a phase, e.g. `q-transition--fade-enter-from`. */
const PHASED = /-(?:enter|leave)-(?:from|active|to)$/

/**
 * Complete every transition family into its six phases.
 *
 * A transition is usually named by a prop (`transition-show="scale"`), which
 * `quasarValueExtractor` reads. Some components compose one internally instead
 * and have no such prop — QDate slides its calendar with `'q-transition--slide-'
 * + monthDirection` and its label with `'q-transition--jump-' + dir` — so all
 * the vocabulary can report is the base (`q-transition--fade`) or the dangling
 * fragment (`q-transition--slide-`). Those phases have to be derived here.
 *
 * Without them Vue toggles classes no rule matches: the leaving grid still took
 * `position: absolute` from `-leave-active`, but never got `-leave-to`, so its
 * `transform` stayed `none` and it painted on top of the entering grid — every
 * day number appeared twice for the length of the slide.
 */
const withTransitionPhases = (classes: Set<string>): void => {
  for (const name of [...classes]) {
    if (!name.startsWith('q-transition--')) continue
    const family = name.slice('q-transition--'.length)
    if (family === '' || PHASED.test(name)) continue
    // A trailing hyphen is Quasar's own concatenation point, so the direction
    // has to be added before the phase; both occur (`monthDirection.value`
    // and `dir` are exactly these two literals).
    const stems = family.endsWith('-')
      ? TRANSITION_DIRECTIONS.map((direction) => `${family}${direction}`)
      : [family]
    for (const stem of stems) {
      for (const phase of TRANSITION_PHASES) {
        classes.add(`q-transition--${stem}-${phase}`)
      }
    }
  }
}

/**
 * Every class a component can apply, once the markup mentions that component.
 *
 * This is what lets the safelist stop carrying them: Quasar composes these at
 * runtime (`q-btn` gains `q-btn--flat`, `q-btn--dense`, …), so a hand-written
 * list has to enumerate them and a human has to remember each new one. Quasar's
 * own source enumerates them (`scripts/generate-quasar-classes.mjs`), and the
 * markup says which component is in play.
 *
 * A vocabulary entry may also be a transition family rather than a whole class
 * (`q-transition--slide-`); those are completed into their phases here — see
 * `withTransitionPhases`.
 */
export const quasarComponentExtractor: Extractor = {
  name: 'quasar-component-extractor',
  order: 1,
  extract({ code }) {
    const classes = new Set<string>()
    for (const [root, vocabulary] of Object.entries(componentClasses)) {
      // `q-btn` catches `<q-btn>`, `q-btn-group` and `QBtn`; the PascalCase
      // form is derived from the root so a component used as `<QBtn>` counts.
      const pascal = root
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')
      if (code.includes(root) || code.includes(pascal)) {
        for (const name of vocabulary) classes.add(name)
      }
    }
    // Families and direction fragments arrive incomplete; complete them before
    // the kebab guard so the derived phases are checked like every other name.
    withTransitionPhases(classes)
    // Guard against the mapping drifting out of kebab form.
    for (const name of classes) {
      if (pascalToKebab(name) !== name.toLowerCase()) classes.delete(name)
    }
    return [...classes]
  }
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
      addIconClass(classes, value)
    }

    // Object literals whose key names an icon prop: `icon: 'star'`,
    // `'clear-icon': 'close'`, `iconRight: 'star'`. The representative
    // values a capture matrix pushes through URL query strings live in
    // exactly this shape (e.g. tests/audit-capture-helpers.ts) — markup
    // patterns never see them, and the names only exist at runtime.
    for (const match of code.matchAll(
      /['"]?[\w-]*icon[\w-]*['"]?\s*:\s*['"`]([^'"`\n]+)['"`]/gi
    )) {
      const value = match[1]
      if (value === undefined || EMPTY_VALUES.has(value.trim())) continue
      addIconClass(classes, value)
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
