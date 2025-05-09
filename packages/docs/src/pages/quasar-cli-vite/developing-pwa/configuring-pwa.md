---
title: Configuring PWA
desc: (@quasar/app-vite) How to manage your Progressive Web Apps with Quasar CLI.
related:
  - /quasar-cli-vite/quasar-config-file
scope:
  tree:
    l: src-pwa
    c:
      - l: register-service-worker.js
        e: '(or .ts) UI code *managing* service worker'
      - l: manifest.json
        e: Your PWA manifest file
      - l: custom-service-worker.js
        e: '(or .ts) Optional custom service worker file (injectManifest mode ONLY)'
---

## Service Worker

Adding PWA mode to a Quasar project means a new folder will be created: `/src-pwa`, which contains PWA specific files:

<DocTree :def="scope.tree" />

You can freely edit these files. Notice a few things:

1. `register-service-worker.js` is automatically imported into your app (like any other /src file). It registers the service worker (created by Workbox or your custom one, depending on workbox plugin mode -- quasar.config file > pwa > workboxPluginMode) and you can listen for Service Worker's events. You can use ES6 code.
2. `custom-service-worker.js` will be your service worker file ONLY if workbox plugin mode is set to "injectManifest" (quasar.config file > pwa > workboxMode: 'injectManifest'). Otherwise, Quasar and Workbox will create a service-worker file for you.
3. It makes sense to run [Lighthouse](https://developers.google.com/web/tools/lighthouse/) tests on production builds only.

::: tip
Read more on `register-service-worker.js` and how to interact with the Service Worker on [Handling Service Worker](/quasar-cli-vite/developing-pwa/handling-service-worker) documentation page.
:::

## quasar.config file

This is the place where you can configure Workbox behavior and also tweak your manifest.json.

```js
pwa: {
  workboxMode?: "GenerateSW" | "InjectManifest";

  /**
   * Generated service worker filename to use (needs to end with .js)
   * @default sw.js
   */
  swFilename?: string;

  /**
   * PWA manifest filename to use on your browser
   * @default manifest.json
   */
  manifestFilename?: string;

  /**
   * Should you need some dynamic changes to the /src-pwa/manifest.json,
   * use this method to do it.
   */
  extendManifestJson?: (json: PwaManifestOptions) => void;

  /**
   * Does the PWA manifest tag requires crossorigin auth?
   * @default false
   */
  useCredentialsForManifestTag?: boolean;

  /**
   * Auto inject the PWA meta tags?
   * If using the function form, return HTML tags as one single string.
   * @default true
   */
  injectPwaMetaTags?: boolean | ((injectParam: InjectPwaMetaTagsParams) => string);

  /**
   * Extend the Esbuild config that is used for the custom service worker
   * (if using it through workboxMode: 'InjectManifest')
   */
  extendPWACustomSWConf?: (config: EsbuildConfiguration) => void;

  /**
   * Extend/configure the Workbox GenerateSW options
   */
  extendGenerateSWOptions?: (config: GenerateSWOptions) => void;

  /**
   * Extend/configure the Workbox InjectManifest options
   */
  extendInjectManifestOptions?: (config: InjectManifestOptions) => void;
}

sourceFiles: {
  pwaRegisterServiceWorker: 'src-pwa/register-service-worker',
  pwaServiceWorker: 'src-pwa/custom-service-worker',
  pwaManifestFile: 'src-pwa/manifest.json',
}
```

Should you want to tamper with the Vite config for UI in /src:

```js /quasar.config file
export default defineConfig((ctx) => {
  return {
    build: {
      extendViteConf(viteConf) {
        if (ctx.mode.pwa) {
          // do something with viteConf
          // or return an object to deeply merge with current viteConf
        }
      }
    }
  }
})
```

More information: [Workbox](https://developers.google.com/web/tools/workbox).

## Adding your own meta tags in index.html

Quasar CLI adds (dynamically) some PWA oriented meta tags into your index.html. Should you wish to customize the tags, first disable this behavior in the `/quasar.config` file:

```js /quasar.config file
pwa: {
  injectPwaMetaTags: false
}
```

Then, edit your `/index.html` file. The following are the actual meta tags that Quasar CLI injects dynamically:

```html
<head>
  <% if (ctx.mode.pwa) { %>
  <meta name="theme-color" content="<%= pwaManifest.theme_color %>" />
  <link
    rel="mask-icon"
    href="icons/safari-pinned-tab.svg"
    color="<%= pwaManifest.theme_color %>"
  />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <meta name="msapplication-TileImage" content="icons/ms-icon-144x144.png" />
  <meta name="msapplication-TileColor" content="#000000" />
  <meta name="apple-mobile-web-app-title" content="<%= pwaManifest.name %>" />
  <link rel="apple-touch-icon" href="icons/apple-icon-120x120.png" />
  <link
    rel="apple-touch-icon"
    sizes="152x152"
    href="icons/apple-icon-152x152.png"
  />
  <link
    rel="apple-touch-icon"
    sizes="167x167"
    href="icons/apple-icon-167x167.png"
  />
  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href="icons/apple-icon-180x180.png"
  />
  <% } %>
</head>
```

Notice that you have access to your PWA manifest through `pwaManifest` above.

Alternatively, you can assign a function to injectPwaMetaTags like below:

```js /quasar.config file
pwa: {
  injectPwaMetaTags ({ pwaManifest, publicPath }) {
    return `<meta name="mobile-web-app-capable" content="yes">`
      + `<meta name="apple-mobile-web-app-status-bar-style" content="default">`
  }
}
```

## Picking Workbox mode

There are two Workbox operating modes: **generateSW** (default) and **injectManifest**.

Setting the mode that you want to use is done through the `/quasar.config` file:

```js /quasar.config file
pwa: {
  workboxMode: 'generateSW',
  extendGenerateSWOptions (cfg) {
    // configure workbox on generateSW
  }
}

pwa: {
  workboxMode: 'injectManifest',
  extendInjectManifestOptions (cfg) {
    // configure workbox on injectManifest
  }
}
```

### generateSW

When to use generateSW:

- You want to precache files.
- You have simple runtime configuration needs (e.g. the configuration allows you to define routes and strategies).

When NOT to use generateSW:

- You want to use other Service Worker features (i.e. Web Push).
- You want to import additional scripts or add additional logic.

::: tip
Please check the available workboxOptions for this mode on [Workbox website](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW).
:::

### InjectManifest

When to use InjectManifest:

- You want more control over your service worker.
- You want to precache files.
- You have more complex needs in terms of routing.
- You would like to use your service worker with other APIs (e.g. Web Push).

When NOT to use InjectManifest:

- You want the easiest path to adding a service worker to your site.

::: tip TIPS

- If you want to use this mode, you will have to write the service worker (`/src-pwa/custom-service-worker.js`) file by yourself.
- Please check the available workboxOptions for this mode on [Workbox website](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.injectManifest).
  :::

The following snippet is the default code for a custom service worker (`/src-pwa/custom-service-worker.js`) which mimics the behavior of `generateSW` mode:

```js
/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config file > pwa > workboxMode is set to "injectManifest"
 */

import { clientsClaim } from 'workbox-core'
import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL
} from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'

self.skipWaiting()
clientsClaim()

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST)

cleanupOutdatedCaches()

// Non-SSR fallbacks to index.html
// Production SSR fallbacks to offline.html (except for dev)
if (process.env.MODE !== 'ssr' || process.env.PROD) {
  registerRoute(
    new NavigationRoute(
      createHandlerBoundToURL(process.env.PWA_FALLBACK_HTML),
      {
        denylist: [
          new RegExp(process.env.PWA_SERVICE_WORKER_REGEX),
          /workbox-(.)*\.js$/
        ]
      }
    )
  )
}
```

## Configuring Manifest File

The Manifest file is located at `/src-pwa/manifest.json`. You can freely edit it.

Should you need to change it dynamically at build time, you can do so by editing the `/quasar.config` file:

```js /quasar.config file
pwa: {
  extendManifestJson (json) {
    // tamper with the json inline
  }
}
```

Please read about the [manifest config](https://developer.mozilla.org/en-US/docs/Web/Manifest) before diving in.

::: warning
Note that you don't need to edit your index.html file (generated from `/index.html`) to link to the manifest file. Quasar CLI takes care of embedding the right things for you.
::::

::: tip
If your PWA is behind basic auth or requires an Authorization header, set quasar.config file > pwa > useCredentialsForManifestTag to `true` to include `crossorigin="use-credentials"` on the manifest.json meta tag.
::::

## PWA Checklist

More info: [PWA Checklist](https://web.dev/pwa-checklist/)

::: danger
Do not run [Lighthouse](https://developers.google.com/web/tools/lighthouse/) on your development build because at this stage the code is intentionally not optimized and contains embedded source maps (among many other things). See the [Testing and Auditing](/quasar-cli-vite/testing-and-auditing) section of these docs for more information.
:::

## Reload & Update Automatically

For those who don't want to manually reload the page when the service worker is updated **and are using the default generateSW workbox mode**, Quasar CLI has configured Workbox to activate it at once. Should you need to disable this behavior:

```js /quasar.config file
pwa: {
  extendGenerateSWOptions (cfg) {
    cfg.skipWaiting = false
    cfg.clientsClaim = false
  }
}
```

## Filename hashes quirk

Due to how Rollup builds the assets (through Vite), when you change any of your script source files (.js) this will also change the hash part of (almost) ALL .js files (ex: `454d87bd` in `assets/index.454d87bd.js`). The revision number of all assets will get changed in your service worker file and this means that when PWA updates it will re-download ALL your assets again. What a waste of bandwidth and such a longer time to get the PWA updated!

By default, Vite builds all filenames **with the hash part**. However, should you want your filenames to NOT contain the hash part, you need to edit the `/quasar.config` file:

```js /quasar.config file
build: {
  useFilenameHashes: false // true by default
}
```

When filename hashes are disabled it would be wise to also make sure that your webserver has cache set accordingly (as low as possible) to ensure consistent resource delivery to your clients that can't use the PWA functionality.
