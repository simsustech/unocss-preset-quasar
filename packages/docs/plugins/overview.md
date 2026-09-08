# Plugins Overview

Quasar plugins generate UI programmatically at runtime — dialogs, notifications, loading bars, bottom sheets. Since these elements don't appear in Vue templates, UnoCSS's scanner can't detect their classes. The preset solves this with a **safelist**.

## How Plugin Safelisting Works

When you pass a `plugins` array to `QuasarPreset()`, the preset generates a safelist of all CSS classes those plugins might use at runtime:

```ts
QuasarPreset({
  styles: QuasarStyleEntries,
  plugins: ['Dialog', 'Notify', 'Loading', 'LoadingBar', 'BottomSheet']
})
```

Each plugin has a predefined map of component classes that must always be included in the CSS output. For example, `Dialog` safelists `q-dialog__*`, `q-card__*`, `q-btn__*`, `q-field__*`, `q-radio__*` — everything a dialog plugin might render.

## Important: Match Both Arrays

The plugins array must match in **two places**:

```ts
// 1. In the preset (for CSS safelisting)
QuasarPreset({
  plugins: ['Dark', 'Dialog', 'Notify', 'LoadingBar'],
})

// 2. In the Quasar framework config (for JS functionality)
framework: {
  plugins: ['Dark', 'Dialog', 'Notify', 'LoadingBar'],
}
```

If a plugin is in `framework.plugins` but NOT in `QuasarPreset({ plugins })`, the plugin will work but its UI will have missing styles.
