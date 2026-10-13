/**
 * The preset-provided Quasar icon set (BUG-003).
 *
 * Seam S1: a consumer's config talks to `quasarIconSet(library)` — never to
 * the generated table or the library map directly. Quasar renders an icon
 * name its `parseIcon` cannot resolve as a **Material Icons ligature**, which
 * renders the literal name as text when no font ships (69 vision units, one
 * path). Everything here exists so that path is never reachable: set values
 * become iconify classes, and `iconMapFn` maps any bare name to one too —
 * an unknown name resolves to a class with no CSS (empty), not to a ligature.
 */
import {
  LIBRARY_ICONIFY,
  type LibraryIconify,
  type QuasarIconLibrary
} from './libraries.js'
import {
  QUASAR_ICON_SETS,
  type QuasarIconSetShape
} from './quasar-icon-sets.generated.js'

/** Every `i-*` class value in the icon set, at any depth. */
export function iconSetClasses(iconSet: unknown): string[] {
  const found = new Set<string>()
  const walk = (value: unknown): void => {
    if (typeof value === 'string') {
      if (/^i-[a-z0-9-]+$/.test(value)) found.add(value)
      return
    }
    if (Array.isArray(value)) {
      for (const entry of value) walk(entry)
      return
    }
    if (value !== null && typeof value === 'object') {
      for (const entry of Object.values(value)) walk(entry)
    }
  }
  walk(iconSet)
  return [...found]
}

/**
 * The resolved icon set one library (or one app-supplied option) yields:
 * the nested map Quasar's `framework.iconSet` takes, the classes the safelist
 * needs, and — for a library — the `iconMapFn` for bare names.
 */
export interface QuasarIconSetResolution {
  iconSet: unknown
  classes: string[]
  /**
   * Present for library resolutions; see `quasarIconSet`.
   *
   * The return shape is Quasar's, not ours: `QIcon` reads `res.icon` (or
   * `res.cls`) off the result, and a plain string leaves both undefined — the
   * icon then renders as a bare `<i class="q-icon">` with no class at all. Every
   * icon drawn through this function disappeared until it returned `{ icon }`.
   */
  iconMapFn?: (name: string) => { icon: string } | undefined
}

const providers = new Map<string, QuasarIconSetResolution>()

/** A missing-pack message is noise only once per collection. */
const missingPackWarned = new Set<string>()

/**
 * Is `id` installed? Best-effort, config-time only: no `node:` imports at
 * module level (a browser bundle must be able to *load* this file), so the
 * require API arrives through `process.getBuiltinModule`. Probes the consumer
 * project first (`process.cwd()` — where `pnpm install` runs), then this
 * package's own location. Outside Node, or on a Node without
 * `getBuiltinModule`, the check is skipped rather than guessed at.
 */
const packResolvable = (id: string): boolean => {
  const proc = globalThis.process as
    | {
        versions?: { node?: string }
        cwd?: () => string
        getBuiltinModule?: (name: string) => unknown
      }
    | undefined
  if (proc?.versions?.node === undefined || proc.cwd === undefined) return true
  if (typeof proc.getBuiltinModule !== 'function') return true
  type NodeModuleApi = {
    createRequire: (
      path: string
    ) => ((id: string) => string) & { resolve: (id: string) => string }
  }
  const nodeModule = proc.getBuiltinModule('node:module') as
    | NodeModuleApi
    | undefined
  if (nodeModule === undefined) return true
  const probes = [
    nodeModule.createRequire(`${proc.cwd()}/_pack-probe.js`),
    nodeModule.createRequire(import.meta.url)
  ]
  for (const require of probes) {
    try {
      require.resolve(id)
      return true
    } catch {
      // try the next probe
    }
  }
  return false
}

const warnMissingPack = (library: string, collection: string): void => {
  const pkg = `@iconify-json/${collection}`
  if (missingPackWarned.has(pkg) || packResolvable(pkg)) return
  missingPackWarned.add(pkg)
  console.warn(
    `unocss-preset-quasar: "${library}" resolves to the "${collection}" iconify ` +
      `collection — install ${pkg} to emit its CSS; without the pack the ` +
      `classes render empty.`
  )
}

/**
 * The icon set for one `@quasar/extras` library, derived from Quasar's own
 * `quasar/dist/icon-set` data:
 *
 * - `iconSet` — the nested set with every value rewritten to its iconify
 *   class (`mdi-arrow-up` → `i-mdi-arrow-up`), ready for
 *   `QuasarPlugin({ framework: { iconSet } })`. `svg-*` sets and libraries
 *   without an iconify collection (themify) pass through: their leaves are
 *   SVG path data / font classes, not icon names — and neither is the
 *   ligature path this fix exists to close.
 * - `iconMapFn` — maps *any* bare name (`icon="star"`) to its iconify class.
 *   Pure; memoized per library at module level.
 * - `classes` — every `i-*` value, for the safelist.
 */
export function quasarIconSet(
  library: QuasarIconLibrary
): QuasarIconSetResolution {
  const cached = providers.get(library)
  if (cached !== undefined) return cached

  // Widened: `satisfies` on the table infers per-entry literal shapes, and
  // entries without a `normalize` would then not expose the property.
  const mapping: LibraryIconify = LIBRARY_ICONIFY[library]
  const raw = QUASAR_ICON_SETS[library]
  if (mapping === undefined || raw === undefined) {
    throw new Error(
      `unocss-preset-quasar: unknown icon library "${String(library)}" — ` +
        `expected one of the @quasar/extras icon libraries`
    )
  }

  const { collection } = mapping
  if (collection === null) {
    // No iconify collection exists (themify): keep Quasar's font classes as
    // they are; bare names render empty instead of as ligature text.
    const resolution: QuasarIconSetResolution = {
      iconSet: raw,
      classes: [],
      iconMapFn: () => ({ icon: 'none' })
    }
    providers.set(library, resolution)
    return resolution
  }

  const normalize = mapping.normalize ?? ((name: string) => name)
  // Idempotent: Quasar calls the mapped function on the value it renders, and
  // that value may already be an iconify class — a bare name maps to one, and
  // the rewritten set values are ones. Re-prefixing an `i-…` value produced
  // `i-mdi-i-mdi-*` classes with no CSS (BUG-A), so an already-iconify name
  // passes through.
  const toClass = (name: string): string =>
    name.startsWith('i-') ? name : `i-${collection}-${normalize(name)}`

  /**
   * Quasar's `framework.iconMapFn`, in the shape it reads.
   *
   * `getMappedType` in `QIcon` resolves the function's result as
   * `undefined` (parse the name), `{ icon }` (use that icon) or
   * `{ cls, content }` (use those verbatim). It does not accept a bare string:
   * `cls` and `content` both come out undefined and the icon renders as an empty
   * `<i class="q-icon">`. Returning the string here — which this did — silently
   * deleted every icon Quasar draws itself, the dropdown arrow first among them.
   */
  const iconMapFn = (name: string): { icon: string } => ({
    icon: toClass(name)
  })

  warnMissingPack(library, collection)

  // svg-* leaves are SVG path data, not icon names — Quasar renders them as
  // inline SVG (its `isSvgPath` path), so rewriting them would destroy them.
  const iconSet = library.startsWith('svg-')
    ? raw
    : (function rewrite(value: QuasarIconSetShape): QuasarIconSetShape {
        if (typeof value === 'string') return toClass(value)
        return Object.fromEntries(
          Object.entries(value).map(([key, child]) => [
            key,
            // `name` is the set's identifier (`mdi-v7`), the value consumers
            // like QMediaPlayer resolve against `iconSetLoaders` — it is not an
            // icon, so it passes through unprefixed (BUG-D).
            key === 'name' && typeof child === 'string' ? child : rewrite(child)
          ])
        )
      })(raw)

  const resolution: QuasarIconSetResolution = {
    iconSet,
    classes: iconSetClasses(iconSet),
    iconMapFn
  }
  providers.set(library, resolution)
  return resolution
}

/**
 * The `iconSet` option, resolved once per preset instantiation: a library
 * string goes through `quasarIconSet`; anything else (a nested map, a
 * function) is the app's own set and passes through exactly as before.
 */
export function resolveIconSet(option: unknown): QuasarIconSetResolution {
  if (typeof option === 'string') {
    // A string option is a library name; anything not in the union throws a
    // diagnosable error inside `quasarIconSet` rather than rendering nothing.
    return quasarIconSet(option as QuasarIconLibrary)
  }
  return { iconSet: option, classes: iconSetClasses(option) }
}
