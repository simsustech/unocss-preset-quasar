# Development

This guide covers the development workflow for the preset itself, and HMR setup for consumers.

## Project Structure

```
packages/preset/
├── src/
│   ├── index.ts              # QuasarPreset factory + extractor
│   ├── theme.ts              # QuasarTheme interface + color generation
│   ├── safelist.ts           # Component & plugin safelist maps
│   ├── vite-aliases.ts       # quasarPresetAliases() helper
│   ├── core/                 # Core utilities (colors, elevation, typography...)
│   │   ├── colors.unocss.ts
│   │   ├── elevation.unocss.ts
│   │   ├── typography.unocss.ts
│   │   ├── transitions.unocss.ts
│   │   ├── flex.unocss.ts
│   │   ├── position.unocss.ts
│   │   ├── size.unocss.ts
│   │   └── ...
│   └── styles/               # Design system styles
│       ├── index.ts          # QuasarStyle interface + exports
│       ├── _helpers.ts       # qe(), componentClass(), staticClass()
│       ├── _scope.ts         # wrapPreWithBodyClass(), scopeStyle()
│       ├── md3/              # Material Design 3 shortcuts
│       │   ├── index.ts
│       │   ├── components/   # ~70 component files
│       │   └── plugins/      # Plugin-specific styles
│       ├── md2/              # Material Design 2 shortcuts
│       └── unstyled/         # Unstyled (structural only)
└── dist/                     # Compiled output (tsc)
```

## Vite Aliases for HMR

When developing the preset alongside a Quasar app (e.g., in the `quasar-dev` playground), you can map imports to the TypeScript source files so changes are picked up without rebuilding:

```ts
// vitrify.config.ts (or vite.config.ts)
import { quasarPresetAliases } from 'unocss-preset-quasar/vite-aliases'

export default defineConfig({
  vitrify: {
    dev: {
      alias: quasarPresetAliases()
    }
  }
})
```

`quasarPresetAliases()` returns alias records that map:

- `unocss-preset-quasar` → `src/index.ts`
- `unocss-preset-quasar/styles` → `src/styles/index.ts`
- `unocss-preset-quasar/theme` → `src/theme.ts`
- `unocss-preset-quasar/vite-aliases` → `src/vite-aliases.ts`

The package source directory is auto-detected by walking up from this module to find `unocss-preset-quasar/package.json`. Set `UNOCSS_PRESET_QUASAR_SRC` to override.

::: warning
Only use these aliases in **dev mode**. In production, consumers should use the compiled `dist/` output.
:::

## Adding a New Component

To add style shortcuts for a new Quasar component:

1. **Create the shortcut file**: `packages/preset/src/styles/<style>/components/QComponentName.unocss.ts`

2. **Define shortcuts** using the helper utilities:

```ts
import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

export const shortcuts: Shortcut<QuasarTheme>[] = [
  // Static class: always emit this class list
  [/^q-component$/, 'relative flex items-center'],

  // Theme override support: consumers can override via theme.quasar.components
  [
    /^q-component__child$/,
    componentClass('q-component__child', 'text-sm px-2')
  ],

  // Context-dependent: fallback needs theme access
  [
    /^q-component--dark$/,
    componentCtxClass(
      'q-component--dark',
      ({ theme }) => `bg-${theme.colors.dark.surface}`
    )
  ]
]
```

3. **Register the shortcuts** in the style's index.ts:

```ts
// packages/preset/src/styles/md3/index.ts
import { shortcuts as QComponentNameShortcuts } from './components/QComponentName.unocss.js'

export default {
  shortcuts: [
    ...QComponentNameShortcuts
    // ... other components
  ]
} satisfies QuasarStyle
```

4. **Add the safelist** in `packages/preset/src/safelist.ts`:

```ts
export const componentsSafelistMap = {
  QComponentName: ['q-component', 'q-component__child', 'q-component--dark']
  // ...
}
```

## Helpers Reference

### `qe()` — Escape BEM Underscores

UnoCSS treats `_` as a space separator and `__` as a literal underscore. Quasar uses BEM double-underscores in class names like `q-btn__content`. Use `qe()` to escape them:

```ts
// Without qe:
;`[&.q-btn\\_\\_content]:(flex items-center)`

// With qe:
qe`[&.${'q-btn__content'}]:(flex items-center)`
```

### `componentClass(name, fallback)`

Shortcut handler that returns a theme override if configured, otherwise the fallback string:

```ts
;[
  /^q-avatar$/,
  componentClass('q-avatar', 'relative inline-block rounded-full')
]
```

### `staticClass(classes)`

Shortcut handler that always returns the same classes (no theme override):

```ts
;[/^q-card__section$/, staticClass('relative')]
```

### `componentCtxClass(name, fallbackFn)`

Like `componentClass` but the fallback is a function that receives the theme context:

```ts
;[
  /^q-fab$/,
  componentCtxClass('q-fab', ({ theme }) => `z-${theme.quasar.z.fab}`)
]
```

## Building

```bash
# From monorepo root
pnpm run build

# Or directly
cd packages/preset
pnpm run build
```

The build runs `tsc` to compile TypeScript from `src/` to `dist/`. The package's `exports` map in `package.json` points to the compiled output for consumers.

## Linting

```bash
# Lint the preset
pnpm run lint:preset

# Fix auto-fixable issues
pnpm run lint:preset:fix
```

Uses [oxlint](https://oxc.rs) for fast TypeScript linting.

## Testing

```bash
# Run tests
pnpm run test:preset
```

Tests use [Vitest](https://vitest.dev).

## Release Process

The project uses [Changesets](https://github.com/changesets/changesets) for versioning:

```bash
# Create a changeset
pnpm run changeset

# Version packages
pnpm run version

# Publish
pnpm run publish
```
