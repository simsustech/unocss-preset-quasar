# Available Plugins

All Quasar plugins that generate UI are supported. Here's the full list with safelist details.

## UI-Generating Plugins

These plugins create DOM elements and need CSS safelisting:

### Dialog

```ts
plugins: ['Dialog']
```

Safelist includes: `q-dialog`, `q-dialog__title`, `q-dialog__progress`, `q-dialog__inner`, `q-dialog__inner--square`, `q-dialog__inner--minimized`, `q-dialog__inner--maximized`, `q-dialog__backdrop`, `q-card`, `q-card--bordered`, `q-card__section`, `q-card__actions`, `q-btn`, `q-btn--flat`, `q-btn--unelevated`, `q-separator`, `q-field`, `q-field__*`, `q-option-group`, `q-radio__*`, `q-spinner`, and more.

### Notify

```ts
plugins: ['Notify']
```

Safelist includes: `q-notifications__list`, `q-notification`, `q-notification__icon`, `q-notification__avatar`, `q-notification__spinner`, `q-notification__message`, `q-notification__caption`, `q-notification__actions`, `q-notification__badge`, `q-notification__progress`, all position variants (`--top`, `--bottom`, `--left`, `--right`, `--center`), enter/leave animation classes, `q-avatar`, `q-btn__*`, `q-icon`, `q-spinner`.

### LoadingBar

```ts
plugins: ['LoadingBar']
```

Safelist includes: `q-loading-bar`, `q-loading-bar--top`, `q-loading-bar--bottom`, `q-loading-bar--right`, `q-loading-bar--left`.

### Loading

```ts
plugins: ['Loading']
```

Safelist includes: `q-loading`, `q-loading__backdrop`, `q-loading__box`, `q-loading__message`.

### BottomSheet

```ts
plugins: ['BottomSheet']
```

Safelist includes: `q-bottom-sheet`, `q-bottom-sheet__avatar`, `q-bottom-sheet--list`, `q-bottom-sheet--grid`, `q-bottom-sheet__item`.

## Non-UI Plugins

These plugins don't generate DOM elements, so they don't need safelisting. They can be listed or omitted — it doesn't affect CSS output:

- `AddressbarColor` — manipulates the address bar color
- `AppFullscreen` — fullscreen API wrapper
- `AppVisibility` — document visibility API
- `Cookies` — cookie management
- `Dark` — dark mode toggle (handled via CSS variables)
- `LocalStorage` — localStorage wrapper
- `Meta` — meta tag management
- `Platform` — platform detection
- `Screen` — screen size detection
- `SessionStorage` — sessionStorage wrapper

## Full Plugin List Example

```ts
const plugins = [
  // UI-generating (CSS safelisted)
  'BottomSheet',
  'Dialog',
  'Loading',
  'LoadingBar',
  'Notify',

  // Non-UI (no CSS needed, but list for completeness)
  'AddressbarColor',
  'AppFullscreen',
  'AppVisibility',
  'Cookies',
  'Dark',
  'LocalStorage',
  'Meta',
  'Platform',
  'Screen',
  'SessionStorage'
]
```
