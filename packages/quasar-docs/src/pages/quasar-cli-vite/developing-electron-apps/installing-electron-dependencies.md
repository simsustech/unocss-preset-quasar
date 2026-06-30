---
title: Installing Electron-specific dependencies
desc: (@quasar/app-vite) How to handle Electron-specific dependencies.
---

Notice the `/src-electron/package.json` file in your generated `/src-electron` folder. The purpose of it is for you to be able to install packages used by the Electron mode directly under this folder (and not pollute the common `/src`).

```json /src-electron/package.json
{
  "name": "quasar-electron-app",
  "version": "1.0.0",
  "description": "Quasar Electron Folder",
  "private": true,
  "type": "module",
  "devDependencies": {
    "@electron/packager": "^20.0.0",
    "electron": "^41.3.0"
  }
}
```

Installing [Electron specific packages](https://zeke.github.io/electron.atom.io/userland/most_downloaded_packages):

```tabs
<<| bash PNPM |>>
# run in /src-electron for runtime deps (will be embedded to /dist):
pnpm add <deps>

# run in /src-electron for deps used by the build system (eg. "electron")
pnpm add -D <dev-deps>
<<| bash Yarn |>>
# run in /src-electron for runtime deps (will be embedded to /dist):
yarn add <deps>

# run in /src-electron for deps used by the build system (eg. "electron")
yarn add -D <dev-deps>
<<| bash NPM |>>
# run in /src-electron for runtime deps (will be embedded to /dist):
npm install <deps>

# run in /src-electron for deps used by the build system (eg. "electron")
npm install -D <dev-deps>
<<| bash Bun |>>
# run in /src-electron for runtime deps (will be embedded to /dist):
bun add <deps>

# run in /src-electron for deps used by the build system (eg. "electron")
bun add -D <dev-deps>
```
