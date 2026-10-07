/**
 * Icon libraries `@quasar/extras` ships, transcribed verbatim from its
 * `QuasarExtrasIcons` union (`@quasar/extras/index.d.ts`, v2.1.0).
 *
 * Type-only and local: the preset must not depend on `@quasar/extras` at
 * runtime (installing icon packs stays the consumer's job — see ADR-0017).
 * `test/icon-set-provider.test.ts` reads the union from the installed package
 * and fails when this transcription drifts.
 */
export type QuasarIconLibrary =
  | 'bootstrap-icons'
  | 'eva-icons'
  | 'fontawesome-v7'
  | 'fontawesome-v7-pro'
  | 'ionicons-v4'
  | 'line-awesome'
  | 'material-icons'
  | 'material-icons-outlined'
  | 'material-icons-round'
  | 'material-icons-sharp'
  | 'material-symbols-outlined'
  | 'material-symbols-rounded'
  | 'material-symbols-sharp'
  | 'mdi-v7'
  | 'themify'
  | 'svg-bootstrap-icons'
  | 'svg-eva-icons'
  | 'svg-fontawesome-v7'
  | 'svg-ionicons-v8'
  | 'svg-line-awesome'
  | 'svg-material-icons'
  | 'svg-material-icons-outlined'
  | 'svg-material-icons-round'
  | 'svg-material-icons-sharp'
  | 'svg-material-symbols-outlined'
  | 'svg-material-symbols-rounded'
  | 'svg-material-symbols-sharp'
  | 'svg-mdi-v7'
  | 'svg-themify'

/** How one Quasar icon library maps onto an iconify collection. */
export interface LibraryIconify {
  /**
   * The iconify collection (`i-<collection>-<name>`), e.g. `mdi`.
   * `null` = font-only library with no iconify collection (themify — iconify
   * ships no `ti` collection, so there is nothing to map onto).
   */
  collection: string | null
  /**
   * Rewrites a library-specific icon name to the iconify collection's naming
   * (e.g. Quasar's mdi set stores `mdi-check-circle`, iconify knows
   * `check-circle`). Must be a no-op for bare names, because `iconMapFn`
   * passes user-supplied names through it unchanged.
   */
  normalize?: (name: string) => string
}

/** Strip a fixed prefix when present; a bare name passes through. */
const strip =
  (...prefixes: string[]): ((name: string) => string) =>
  (name) => {
    for (const prefix of prefixes) {
      if (name.startsWith(prefix)) return name.slice(prefix.length)
    }
    return name
  }

/** `fas fa-check` / `far fa-clock` / `fal fa-x` → `check` / `clock` / `x`. */
const stripFa = (name: string): string =>
  /^fa[srlb]? fa-/.test(name) ? name.replace(/^fa[srlb]? fa-/, '') : name

/** `sym_r_check_circle` / `sym_o_…` / `sym_s_…` → `check_circle`. */
const stripSym = (name: string): string => name.replace(/^sym_[ors]_/, '')

/**
 * Library → iconify collection. `satisfies Record<QuasarIconLibrary, …>` makes
 * a missing library a build error, so the union and this table cannot drift.
 *
 * Lossy substitutions (stated in ADR-0017): every `material-icons*` variant
 * collapses onto `ic` and every `material-symbols*` variant onto
 * `material-symbols`; `fontawesome-*-pro` maps to the free `fa7-solid`
 * collection (pro-only icons simply have no CSS). A consumer who needs the
 * real font keeps passing a nested `iconSet` map — that path is unchanged.
 */
export const LIBRARY_ICONIFY = {
  'bootstrap-icons': { collection: 'bi', normalize: strip('bi-') },
  'eva-icons': { collection: 'eva', normalize: strip('eva-') },
  'fontawesome-v7': { collection: 'fa7-solid', normalize: stripFa },
  'fontawesome-v7-pro': { collection: 'fa7-solid', normalize: stripFa },
  'ionicons-v4': {
    collection: 'ion',
    normalize: strip('ion-md-', 'ion-ios-', 'ion-')
  },
  'line-awesome': {
    collection: 'la',
    normalize: strip('las la-', 'lar la-', 'lab la-')
  },
  // Ligature names are already the iconify `ic` naming — no rewrite.
  'material-icons': { collection: 'ic' },
  'material-icons-outlined': { collection: 'ic' },
  'material-icons-round': { collection: 'ic' },
  'material-icons-sharp': { collection: 'ic' },
  'material-symbols-outlined': {
    collection: 'material-symbols',
    normalize: stripSym
  },
  'material-symbols-rounded': {
    collection: 'material-symbols',
    normalize: stripSym
  },
  'material-symbols-sharp': {
    collection: 'material-symbols',
    normalize: stripSym
  },
  'mdi-v7': { collection: 'mdi', normalize: strip('mdi-') },
  // iconify ships no themify collection (`ti` / `@iconify-json/ti` do not
  // exist), so there is nothing to map: set values stay the font classes
  // Quasar resolves through `libPrefixes`, and bare names render empty.
  themify: { collection: null },
  // `svg-*` variants are the same icons inline; bare names map like the base.
  'svg-bootstrap-icons': { collection: 'bi', normalize: strip('bi-') },
  'svg-eva-icons': { collection: 'eva', normalize: strip('eva-') },
  'svg-fontawesome-v7': { collection: 'fa7-solid', normalize: stripFa },
  'svg-ionicons-v8': {
    collection: 'ion',
    normalize: strip('ion-md-', 'ion-ios-', 'ion-')
  },
  'svg-line-awesome': {
    collection: 'la',
    normalize: strip('las la-', 'lar la-', 'lab la-')
  },
  'svg-material-icons': { collection: 'ic' },
  'svg-material-icons-outlined': { collection: 'ic' },
  'svg-material-icons-round': { collection: 'ic' },
  'svg-material-icons-sharp': { collection: 'ic' },
  'svg-material-symbols-outlined': {
    collection: 'material-symbols',
    normalize: stripSym
  },
  'svg-material-symbols-rounded': {
    collection: 'material-symbols',
    normalize: stripSym
  },
  'svg-material-symbols-sharp': {
    collection: 'material-symbols',
    normalize: stripSym
  },
  'svg-mdi-v7': { collection: 'mdi', normalize: strip('mdi-') },
  'svg-themify': { collection: null }
} satisfies Record<QuasarIconLibrary, LibraryIconify>
