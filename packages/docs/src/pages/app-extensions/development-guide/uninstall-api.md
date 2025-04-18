---
title: App Extension Uninstall API
desc: The API for the uninstall script of a Quasar App Extension.
---

This page refers to `src/uninstall.js` file which is executed when the App Extension is uninstalled. Not all App Extensions will need an uninstall -- this is an optional step.

Example of basic structure of the file:

```js
// can be async
export default function (api) {
  // props and methods for "api" Object
  // are described below
}
```

### api.engine

Contains the Quasar CLI engine (as String) being used. Examples: `@quasar/app-vite` or `@quasar/app-webpack`.

### api.hasVite

Boolean - is running on `@quasar/app-vite` or not.

### api.hasWebpack

Boolean - is running on `@quasar/app-webpack` or not.

### api.extId

Contains the `ext-id` (String) of this App Extension.

### api.prompts

Is an Object which has the answers to the prompts when this App Extension gets installed. For more info on prompts, check out [Prompts API](/app-extensions/development-guide/prompts-api).

### api.resolve

Resolves paths within the app on which this App Extension is running. Eliminates the need to import `path` and resolve the paths yourself.

```js
// resolves to root of app
api.resolve.app('src/my-file.js')

// resolves to root/src of app
api.resolve.src('my-file.js')

// resolves to root/public of app
// (@quasar/app-webpack v3.4+ or @quasar/app-vite v1+)
api.resolve.public('my-image.png')

// resolves to root/src-pwa of app
api.resolve.pwa('some-file.js')

// resolves to root/src-ssr of app
api.resolve.ssr('some-file.js')

// resolves to root/src-cordova of app
api.resolve.cordova('config.xml')

// resolves to root/src-electron of app
api.resolve.electron('some-file.js')

// resolves to root/src-bex of app
api.resolve.bex('some-file.js')
```

### api.appDir

Contains the full path (String) to the root of the app on which this App Extension is running.

### api.hasTypescript <q-badge label="@quasar/app-vite 1.6+" /> <q-badge label="@quasar/app-webpack 3.11+" />

```js
/**
 * @return {Promise<boolean>} host project has Typescript active or not
 */
await api.hasTypescript()
```

### api.hasLint <q-badge label="@quasar/app-vite 1.6+" /> <q-badge label="@quasar/app-webpack 3.11+" />

```js
/**
 * @return {Promise<boolean>} host project has ESLint or not
 */
await api.hasLint()
```

### api.getStorePackageName <q-badge label="@quasar/app-vite 1.6+" /> <q-badge label="@quasar/app-webpack 3.11+" />

```js
/**
 * @return {Promise<string|undefined>} 'pinia' | 'vuex' | undefined
 */
await api.getStorePackageName()
```

### api.getNodePackagerName <q-badge label="@quasar/app-vite 1.6+" /> <q-badge label="@quasar/app-webpack 3.11+" />

```js
/**
 * @return {Promise<'npm' | 'yarn' | 'pnpm' | 'bun'>}
 */
await api.getNodePackagerName()
```

### api.hasPackage

Determine if some package is installed in the host app through a semver condition.

Example of semver condition: `'1.x || >=2.5.0 || 5.0.0 - 7.2.3'`.

```js
/**
 * @param {string} packageName
 * @param {string} (optional) semverCondition
 * @return {boolean} package is installed and meets optional semver condition
 */
if (api.hasPackage('vuelidate')) {
  // hey, this app has it (any version of it)
}
if (api.hasPackage('quasar', '^2.0.0')) {
  // hey, this app has Quasar UI v2 installed
}
```

### api.hasExtension

Check if another app extension is installed.

```js
/**
 * Check if another app extension is installed
 *
 * @param {string} extId
 * @return {boolean} has the extension installed.
 */
if (api.hasExtension(extId)) {
  // hey, we have it
}
```

### api.getPackageVersion

Get the version of a host app package.

```js
/**
 * @param {string} packageName
 * @return {string|undefined} version of app's package
 */
console.log(api.getPackageVersion(packageName))
// output examples:
//   1.1.3
//   undefined (when package not found)
```

### api.removePath

Removes a file or folder from the app project folder (which the App Extension has installed and is no longer needed).

Be mindful about it and do not delete the files that would break developer's app.

The path to file or folder needs to be relative to project's root folder.

```js
/**
 * @param {string} __path
 */
api.removePath('my-folder')
```

The above example deletes "my-folder" from the root of the app.

### api.getPersistentConf

Get the internal persistent config of this extension. Returns empty object if it has none.

```js
/**
 * @return {object} cfg
 */
api.getPersistentConf()
```

### api.onExitLog

Adds a message to be printed after App CLI finishes up uninstalling the App Extension and is about to exit. Can be called multiple times to register multiple exit logs.

```js
/**
 * @param {string} msg
 */
api.onExitLog('Thanks for having used my extension')
```
