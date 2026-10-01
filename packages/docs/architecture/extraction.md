# Extraction & Safelisting

Quasar's scanner-visible template text is not where most Quasar classes come from. Dialogs, notifications and icon glyphs are composed at runtime from configuration and prop _values_, so a text scanner never sees their class names. The preset closes that gap with two extractors, a generated vocabulary, and a safelist — in that order of preference.

## The three channels

| Channel             | Solves                                                         | Example                                                   |
| ------------------- | -------------------------------------------------------------- | --------------------------------------------------------- |
| Component extractor | A class family that exists the moment a component is mentioned | `<q-btn>` → `q-btn--flat`, `q-btn--dense`, …              |
| Value extractor     | A class derived from an attribute _value_                      | `icon="chevron-down"` → `i-mdi-chevron-down`              |
| Safelist            | A class with no signal in source at all                        | `q-notification`, body platform classes, icon-set entries |

### Component extractor

`src/generated/quasar-classes.ts` maps every component root to the classes Quasar composes for it — scraped from Quasar's own source (84 components, ~5,300 classes) plus the three app-extension libraries. When the extracted text mentions `q-btn` or `QBtn`, the whole family enters the candidate set:

```html
<QBtn label="save" />
<!-- generates q-btn, q-btn--flat, q-btn--dense, … -->
```

The file header records the upstream versions it was scraped from; a dependency bump fails the generator's `--check` until the vocabulary is regenerated. This is why the safelist no longer enumerates component modifiers: Quasar adds them at runtime, Quasar's source lists them, and the extractor takes them from there.

### Value extractor

Some classes are _named by a value_ rather than by any token in the source:

```html
<i :name="currentIcon" />
<!-- bound expression: names nothing -->
<QSelect icon="arrow_drop_down" />
<!-- literal → i-mdi-arrow-drop-down -->
<QTabs :transition-show="'fade'" />
<!-- literal → q-transition--fade-* -->
```

Only unbound literals are used. Treating expressions as names would derive classes from variable names and fill the sheet with dead CSS. This family cannot be safelisted — icon sets are open-ended and transition names are app-authored — which is exactly why the extractor exists: a page that renders sixteen `i-mdi-chevron-down` icons from `icon=` props produced zero CSS for them while every coverage check stayed green.

### Safelist

What neither extractor can reach: classes Quasar applies with no signal in the consuming source.

- **Base list** (`quasarSafelist`) — the classes the preset's own base rules key on and Quasar's runtime-applied body/platform classes.
- **Plugin list** — added per declared plugin. `plugins: ['Notify']` joins `q-notification`; an app that never calls `$q.notify()` never carries it. See [Plugins](/plugins/overview).
- **Icon set** — `iconSet: mdiSet` walks the set and safelists every `i-*` class it contains, because Quasar's internal components (a table's expand chevron) ask for icons no markup mentions.

Entries are removed from the safelist only when _no_ arbiter knows them — not Quasar's source, not a rendered page, not `quasar/dist/quasar.css`. `scripts/compose-safelist.mjs` re-derives the list; the harness's class-coverage test verifies it end to end.

## Why not safelist everything

Safelisting a family is unconditional CSS — every entry ships whether or not the app uses it. The extractors keep output proportional to the markup: only the mentioned component's vocabulary, only the literal values actually written. The safelist holds the residue that has no signal at all.
