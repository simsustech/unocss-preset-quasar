# Input & Platform

Input-mode helpers (pointer, touch, scroll, cursor) and the platform/orientation classes Quasar sets on `<body>` at runtime. The platform families are prefixed into the emitted selector — the browser evaluating the body class _is_ the mechanism, no runtime JS from the preset.

## Pointer & selection

| Class                                      | Effect                                                                                |
| ------------------------------------------ | ------------------------------------------------------------------------------------- |
| `pointer-events-all` / `no-pointer-events` | `pointer-events` on/off (`no-pointer-events--children` keeps descendants interactive) |
| `non-selectable`                           | `user-select: none`                                                                   |
| `cursor-pointer` / `cursor-inherit`        | cursor overrides                                                                      |

## Scroll and cursor

| Class                   | Effect                          |
| ----------------------- | ------------------------------- |
| `scroll`                | `overflow: auto`                |
| `scroll-x` / `scroll-y` | one axis                        |
| `no-scroll`             | `overflow: hidden`              |
| `hide-scrollbar`        | scrollable without visible bars |

Quasar's own scroll-management classes — `q-body--prevent-scroll`, `q-document--clip-scroll`, `q-body--force-scrollbar-x`, `q-document--pin-body`, … — are styled too, so dialogs, full-screen modes and the layout's reserved-scrollbar behavior work without the Sass sheet.

## Touch

| Class                     | Effect                          |
| ------------------------- | ------------------------------- |
| `q-touch`                 | `user-select: none`             |
| `q-touch-x` / `q-touch-y` | `touch-action: pan-x` / `pan-y` |

## Focus helpers

`q-focus-helper`, `q-focusable`, `q-hoverable`, `q-manual-focusable(--focused)`, `q-link--focusable` — the indirection classes Quasar's keyboard-focus system applies. Styling them is what makes visible focus rings work on components that never receive a native `:focus`.

## Platform visibility

Quasar's Platform plugin sets a body class per environment; the preset ships a `-hide` / `-only` pair for each:

| Body classes present                                                                               | Utilities                                                                           |
| -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `desktop`, `mobile`, `touch`, `electron`, `native-mobile`, `capacitor`, `cordova`, `within-iframe` | `desktop-hide` (hidden while on desktop), `desktop-only` (hidden unless desktop), … |
| `platform-ios`, `platform-android`                                                                 | `platform-ios-hide`, `platform-ios-only`, …                                         |

```html
<div class="desktop-only">keyboard/mouse hints</div>
<div class="mobile-hide">no value on small touch devices</div>
```

Both forms emit `display: none !important` — the `-hide` under `body.<platform>`, the `-only` under `body:not(.<platform>)`.

## Orientation & print

| Class                   | Hidden when |
| ----------------------- | ----------- |
| `orientation-landscape` | portrait    |
| `orientation-portrait`  | landscape   |
| `print-only`            | on screen   |
| `print-hide`            | printing    |

Media-query families, emitted as CSS text from the preflight — same channel as [responsive visibility](/core/visibility).

## Dark-mode body classes

The scheme classes this preset reacts to, for completeness:

| Class                        | Set by               | Effect                                    |
| ---------------------------- | -------------------- | ----------------------------------------- |
| `body--dark` / `body--light` | Quasar's Dark plugin | token block flip + engine `dark:` variant |
| `q-dark` (element class)     | markup               | dark foreground/background on one subtree |

Related: [Visibility & Responsiveness](/core/visibility) · [Theming & Tokens](/core/theming)
