# `quasarPresetAliases()`

Returns Vite resolve alias records that map the package's published entry points back to TypeScript sources. Enables instant HMR when editing preset source files.

## Import

```ts
import { quasarPresetAliases } from 'unocss-preset-quasar/vite-aliases'
```

## Signature

```ts
function quasarPresetAliases(): Alias[]
```

## Returns

An array of Vite `Alias` objects:

```ts
;[
  { find: /^unocss-preset-quasar$/, replacement: '.../src/index.ts' },
  {
    find: /^unocss-preset-quasar\/styles$/,
    replacement: '.../src/styles/index.ts'
  },
  { find: /^unocss-preset-quasar\/theme$/, replacement: '.../src/theme.ts' },
  {
    find: /^unocss-preset-quasar\/vite-aliases$/,
    replacement: '.../src/vite-aliases.ts'
  }
]
```

## Usage

```ts
// vitrify.config.ts or vite.config.ts
import { defineConfig } from 'vitrify/config'
import { quasarPresetAliases } from 'unocss-preset-quasar/vite-aliases'

export default defineConfig({
  vitrify: {
    dev: {
      alias: quasarPresetAliases()
    }
  }
})
```

::: warning Dev Only
Only use in dev mode. Production consumers should use the compiled `dist/` output. The function auto-detects the package source directory by walking up from the module file to find `unocss-preset-quasar/package.json`.
:::

## Environment Variable

Set `UNOCSS_PRESET_QUASAR_SRC` to an absolute path to override the auto-detected source directory:

```bash
UNOCSS_PRESET_QUASAR_SRC=/path/to/packages/preset/src quasar dev
```
