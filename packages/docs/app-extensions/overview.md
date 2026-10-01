# App Extensions

Three third-party Quasar UI libraries ship their own stylesheets. Under this preset their classes would exist in your markup with no CSS behind them — so their sheets are ported into the preset and gated behind one option:

```ts
QuasarPreset({
  styles: QuasarStyleEntries,
  appExtensions: ['qcalendar', 'qmarkdown', 'qmediaplayer']
})
```

Declaring nothing produces byte-identical output to a preset without these libraries. The CSS is thousands of lines; an app using one component of one library should not carry the rest.

## What you get per library

| Library        | Package                          | Ported surface                                                      |
| -------------- | -------------------------------- | ------------------------------------------------------------------- |
| `qcalendar`    | `@quasar/quasar-ui-qcalendar`    | Month/week/day/scheduler views, range states, its scrollbar styling |
| `qmarkdown`    | `@quasar/quasar-ui-qmarkdown`    | Component layout plus Prism's syntax theme                          |
| `qmediaplayer` | `@quasar/quasar-ui-qmediaplayer` | Player chrome, controls, canvas styling                             |

See [Supported Libraries](/app-extensions/supported) for the per-library detail.

## How it works

- **Selectors stay upstream's.** `.q-calendar-month__day`, `.q-markdown`, `.q-media` are emitted exactly as the libraries spell them — their templates need no changes.
- **Tokens are re-namespaced** into this preset's own namespace (`--q-calendar-*`, `--q-mediaplayer-*`) and themed through the same style tokens and color roles as everything else.
- **Dark mode comes for free.** The libraries' own dark fast paths are not ported: their `-dark` restatements are the same declarations with dark values, and the tokens already flip on `body.body--dark`. Where a token flip genuinely cannot reproduce a declaration (the scheduler's range-edge resets), it is emitted under `body.body--dark` directly.
- **Markup mentions drive CSS.** The generated vocabulary includes these libraries, so mentioning `<q-calendar-month>` generates that view's classes the same way `<q-btn>` generates Quasar's.
- **Unstyled applies.** Anything the port states as a literal color or shadow gets a `body.quasar-style-unstyled` reset, exactly like the core component rules.

## Declaring without using

An unlisted library's classes still reach the extractor's vocabulary — they simply match no rule, so they cost nothing. Listing a library you do not use costs its CSS. The rule for both is the same: declare what you render.

## Adding a library

Port it as selector-keyed rules under `src/app-extensions/<name>/`, export them by suffix (`…Rules`, `…Preflights`, `…Shortcuts`), and add the folder to `appExtensionModules`. The barrel itself never changes — collections are read by export suffix, same as the core and component modules. The opt-in gate, the unstyled resets and the vocabulary check each have a test that fails if either direction breaks.
