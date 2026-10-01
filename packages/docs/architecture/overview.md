# How It Works

A Quasar app using this preset renders through four stages: a source color becomes tokens, tokens become CSS custom properties, component rules read those properties, and a body class decides which set of values is live. Nothing rebuilds at runtime — a style switch is one class swap.

## The pipeline

```
sourceColor ──▶ generateColorTokens() ──▶ token preflight ──▶ --q-* / --light-* / --dark-*
                                                          │
Quasar markup ──▶ extractors ──▶ rules (read var(--q-*)) ─┴──▶ final CSS
                                                          │
                                     setStyle('md2') ─────┘   body.quasar-style-md2
```

1. **Color generation.** `sourceColor` (default `#1976d2`) expands into a full Material tonal palette — light scheme, dark scheme, and Quasar's alias set (`primary`, `positive`, `dark-page`, …). The engine is Google's Material Color Utilities, wrapped by `generateColorTokens()`.
2. **Token preflight.** One preflight emits every custom property: scheme roles on `:root`, the active style's tokens on `body`, each additional style as a `body.quasar-style-{name}` block, and dark values under `body.body--dark`. Missing tokens fall back to safe values (`transparent` / `none` / `0` / `inherit`) so a hand-written entry cannot produce an invalid declaration.
3. **Rules read tokens.** Component and utility rules state structure and reference values — `border-radius: var(--q-btn-radius)`, `box-shadow: var(--q-elevation-level1)`. A rule never hard-codes a color or radius a token can express; declarations a token _cannot_ express (a literal reset, a literal shadow) belong to the style that needs them and ship as that entry's `rules`.
4. **Switching.** Because every difference lives in custom properties, changing style, palette, or dark mode is a class or variable write on one element — no module reload, no rebuild.

## Where the code lives

| Path                             | Owns                                                                      |
| -------------------------------- | ------------------------------------------------------------------------- |
| `src/theme/`                     | Token types, color generation, the token preflight, the public theme      |
| `src/components/`                | One folder per Quasar component: `rules.ts` (+ `shortcuts.ts`)            |
| `src/core/`                      | Utility modules: spacing, typography, grid, visibility, motion, …         |
| `src/styles/{md3,md2,unstyled}/` | Each style's entry and its own rules (declarations tokens cannot express) |
| `src/rules/`                     | Assembly-time machinery: duplicate-rule merge, per-style scoping          |
| `src/app-extensions/`            | Opt-in CSS for qcalendar, qmarkdown, qmediaplayer                         |
| `src/generated/`                 | Quasar's class vocabulary, scraped from its source                        |
| `src/index.ts`                   | The factory: layers, safelist, extractors, preflights                     |

## Constraints that shaped it

Three facts about UnoCSS and Quasar drive most of the design:

- **First match wins, last registered.** UnoCSS keeps only the _last_ rule per regex, and resolves matchers in reverse preset order. Both directions are handled explicitly: [duplicate regexes are merged at assembly](/architecture/rule-assembly), and the preset carries `enforce: 'post'` so Quasar's class names stay its own even when a consumer adds a second engine.
- **A rule body cannot carry an `@media` at-rule** (a nested key stringifies as `[object Object]`). Everything that needs a media query — responsive visibility, platform scoping, transition helpers — is emitted as CSS text from one preflight.
- **Quasar applies classes at runtime** that no template mentions (a dialog's internal markup, an icon name turned into `i-mdi-*`). Classes like these must be derived or safelisted, never scanned — see [Extraction & Safelisting](/architecture/extraction).

## Where to go next

- [Styles & Scoping](/architecture/style-configuration) — the baseline entry, tree-shaking, and what an unlisted style does
- [Rule Assembly](/architecture/rule-assembly) — cascade bands, the duplicate-rule merge, the engine
- [Decisions](/architecture/decisions) — one-line rationale for every recorded design decision
