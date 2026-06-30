---
title: Electron Accessing Files
desc: (@quasar/app-vite) How to access files in a Quasar desktop app.
scope:
  distTree:
    l: dist-electron/UnPackaged
    c:
      - l: electron-assets
        e: '/src-electron/electron-assets copied as-is'
        c:
          - l: icons/
            e: 'Electron app icons'
      - l: electron-main.js
      - l: electron-preload.cjs
      - l: '...contents of /public copied as-is'
---

## The problem

Since the main thread (with preload scripts) is bundled using Rolldown, the use of `import.meta.env.dirname` and `import.meta.env.filename` (...and so on) will not provide an expected value in dev and in production, especially in regards to the absolute paths.

<DocTree :def="scope.distTree" />

## The solution

Quasar CLI provides an out of the box solution for referencing files, regardless of the dev or production environment, by leveraging the IPC communication.

Notice the following sections:

```js /src-electron/electron-main file
import {
  registerQuasarRuntime,
  resolveElectronAssetsPath
} from '#q-app/electron/main'

async function createWindow() {
  const mainWindow = new BrowserWindow({
    icon: resolveElectronAssetsPath('icons/icon.png') // linux
    // ...
  })
  // ...
}

app.whenReady().then(async () => {
  await registerQuasarRuntime()
  // ...
})
```

```js /src-electron/electron-preload file
import { contextBridge } from 'electron'
import { quasarRuntime } from '#q-app/electron/preload'

// you can rename the exposed prop name 'quasarRuntime' to anything
contextBridge.exposeInMainWorld('quasarRuntime', quasarRuntime)
```

Notice that we are exposing a `quasarRuntime` variable to the redenderer thread, so we can reference `window.quasarRuntime` from there.

Should you wish, you can expose whatever variable name you want. And also, whatever subset of this runtime you desire. Just import from `#q-app/electron/preload` and call contextBridge.exposeInMainWorld().

### API for electron-main

Usage:

```js
import {
  registerQuasarRuntime,
  resolveElectronAssetsPath
  // ...
} from '#q-app/electron/main'
```

What you can import:

```js
/**
 * Resolves the path to the electron-assets directory, adapting to
 * development or production environments.
 * @param args Path segments to join to the base electron-assets path
 * @returns The fully resolved path
 */
export declare function resolveElectronAssetsPath(...args: string[]): string;

/**
 * The resolved path to the electron-assets directory, determined at runtime
 */
export declare const electronAssetsDir: string;

/**
 * Resolves the path to the public directory, adapting to
 * development or production environments.
 * @param args Path segments to join to the base public path
 * @returns The fully resolved path
 */
export declare function resolvePublicPath(...args: string[]): string;

/**
 * The resolved path to the public directory, determined at runtime
 */
export declare const publicDir: string;

/**
 * Registers IPC handlers for the Quasar Electron runtime.
 * This allows the preload script and renderer process to request
 * resolved asset and public paths synchronously via `ipcRenderer.sendSync`.
 */
export declare function registerQuasarRuntime(): Promise<void>;
```

### API for electron-preload

Usage:

```js
import {
  quasarRuntime
  // ...
} from '#q-app/electron/preload'
```

What you can import:

```js
/**
 * Synchronously requests the main process to resolve the path to the
 * electron-assets directory.
 * @param args Path segments to join to the base electron-assets path
 * @returns The fully resolved path
 */
export declare function resolveElectronAssetsPath(...args: string[]): string;

/**
 * The resolved path to the electron-assets directory, determined at runtime
 */
export declare const electronAssetsDir: string;

/**
 * Synchronously requests the main process to resolve the path to the
 * public directory.
 * @param args Path segments to join to the base public path
 * @returns The fully resolved path
 */
export declare function resolvePublicPath(...args: string[]): string;

/**
 * The resolved path to the public directory, determined at runtime
 */
export declare const publicDir: string;

/**
 * An object grouping the synchronous path resolution utilities.
 */
export declare const quasarRuntime: {
  electronAssetsDir: string;
  resolveElectronAssetsPath: typeof resolveElectronAssetsPath;

  publicDir: string;
  resolvePublicPath: typeof resolvePublicPath;
};
```

### Usage in renderer thread (/src)

```js
window.quasarRuntime.resolvePublicPath('my-file')
```

## Read & Write Local Files

One great benefit of using Electron is the ability to access the user's file system. This enables you to read and write files on the local system. To help avoid Chromium restrictions and writing to your application's internal files, make sure to make use of electron's APIs, specifically the `app.getPath(name)` function. This helper method can get you file paths to system directories such as the user's desktop, system temporary files, etc.

We can use the userData directory, which is reserved specifically for our application, so we can have confidence other programs or other user interactions should not tamper with this file space.

Note that if you care about security, you will need to use the IPC communication to handle this in your preload or renderer thread, just as the Quasar CLI does with its `quasarRuntime`.
