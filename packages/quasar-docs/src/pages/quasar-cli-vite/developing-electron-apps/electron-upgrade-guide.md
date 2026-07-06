---
title: Upgrade guide on Electron
desc: (@quasar/app-vite) Upgrading instructions when dealing with Electron in Quasar.
---

## Upgrading Electron

When you add the Electron mode in a Quasar project for the first time you will get the latest version of the Electron package. At some point in time, you will want to upgrade the Electron version.

Before upgrading Electron, please consult its release notes. Are there breaking changes?

```tabs
<<| bash PNPM |>>
# from /src-electron:
pnpm add electron@latest
<<| bash Yarn |>>
# from /src-electron:
yarn upgrade electron@latest
<<| bash NPM |>>
# from /src-electron:
npm install electron@latest
<<| bash Bun |>>
# from /src-electron:
bun add electron@latest
```
