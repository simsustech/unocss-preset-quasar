---
"unocss-preset-quasar": patch
---

fix(preset): restore the public `unocss-preset-quasar/theme` entry point

The rewrite dropped the `./theme` export, but `QuasarTheme`, `defaultTheme`,
`generateTheme` and `setThemeColors` are published API: `@modular-api/fastify-oidc`
types its `themeColors` option as `QuasarTheme['colors']`,
`@modular-api/oidc-interactions` calls `setThemeColors()`, and the `--light-*` /
`--dark-*` / `--*` custom properties it writes are read by consumer CSS. Apps
importing the subpath failed at start with `ERR_PACKAGE_PATH_NOT_EXPORTED`.

The subpath is exported again (`src/theme/quasar-theme.ts`), and `generateTheme`
derives its Material values from `generateColorTokens` — the same generator behind
the preset's `--q-*` preflight — so an injected theme matches the emitted CSS.
