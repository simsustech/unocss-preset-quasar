---
title: Electron with TypeScript
desc: (@quasar/app-vite) How to use TypeScript with Electron in Quasar
---

In order to support Electron with TypeScript, you will need to rename the extension for your files in /src-electron from `.js` to `.ts` and make the necessary TS code changes.

::: tip
`@electron/packager` and `electron-builder` export their configuration types from their own packages.
Since autocomplete into the `quasar.config` file relies on those types, properties `electron.packager` and `electron.builder` will be fully typed only after the respective package is installed.
You can force the installation of the selected bundler (depending on your `electron.bundler` option) by running a build command in Electron mode: `quasar build -m electron`
:::

Example of files in your `/src-electron` folder:

```js /src-electron/electron-main.ts
import { BrowserWindow, app } from 'electron'
import path from 'node:path'
import os from 'node:os'
import {
  registerQuasarRuntime,
  resolveElectronAssetsPath
} from '#q-app/electron/main'

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

async function createWindow() {
  /**
   * Initial window options
   */
  const mainWindow = new BrowserWindow({
    icon: resolveElectronAssetsPath('icons/icon.png'), // linux
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.join(import.meta.dirname, 'electron-preload.cjs')
    }
  })

  if (import.meta.env.QUASAR_DEV) {
    await mainWindow.loadURL(import.meta.env.QUASAR_APP_URL)
  } else {
    await mainWindow.loadFile('index.html')
  }

  if (import.meta.env.QUASAR_DEBUG) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools()
    })
  }
}

void app.whenReady().then(async () => {
  await registerQuasarRuntime()

  void createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      void createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})
```

```js /src-electron/electron-preload.ts
/**
 * This file is used specifically for security reasons.
 * Here you can access Node.js stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in /src-electron/package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 *
 * WARNING!
 * If accessing Node functionality (like importing @electron/remote) then in your
 * electron-main.ts you will need to set the following when you instantiate BrowserWindow:
 *
 * mainWindow = new BrowserWindow({
 *   // ...
 *   webPreferences: {
 *     // ...
 *     sandbox: false // <-- to be able to import @electron/remote in preload script
 *   }
 * }
 */
import { contextBridge } from 'electron'
import { quasarRuntime } from '#q-app/electron/preload'

contextBridge.exposeInMainWorld('quasarRuntime', quasarRuntime)
```
