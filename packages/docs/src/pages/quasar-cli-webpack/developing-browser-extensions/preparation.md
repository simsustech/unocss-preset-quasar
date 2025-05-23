---
title: Preparation for BEX
desc: (@quasar/app-webpack) How to add the Browser Extension (BEX) mode into a Quasar app.
scope:
  tree:
    l: src-bex
    c:
      - l: assets
        c:
          - l: content.css
            e: CSS file which is auto injected into the consuming webpage via the manifest.json
      - l: icons
        e: Icons of your app for all platforms
        c:
          - l: 'icon-128x128.png '
            e: Icon file at 128px x 128px
          - l: icon-16x16.png
            e: Icon file at 16px x 16px
          - l: icon-48x48.png
            e: Icon file at 48px x 48px
      - l: _locales/
        e: Optional BEX locales files that you might define in manifest
      - l: manifest.json
        e: The browser extension manifest file
      - l: background.js
        e: (or .ts) Standard background script BEX file (auto injected via manifest.json)
      - l: my-content-script.js
        e:
          (or .ts) Standard content script BEX file - auto injected via manifest.json (you can
          have multiple content scripts)
---

The difference between building a SPA, Mobile App, Electron App, BEX or SSR is simply determined by the "mode" parameter in "quasar dev" and "quasar build" commands.

## Add Quasar BEX Mode

In order to build a BEX, we first need to add the BEX mode to our Quasar project:

```bash
$ quasar mode add bex
```

If you want to jump right in and start developing, you can skip the "quasar mode" command and issue:

```bash
$ quasar dev -m bex -T [chrome|firefox]
```

This will add BEX mode automatically, if it is missing, by creating the `/src-bex` folder into your project.

::: tip
The `src-bex` folder is just a standard browser extension folder so you are free to use it as you would any other browser extension project folder. Please refer to supported Browser Extension documentation to learn more.

- [Firefox Browser Extension Documentation](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Google Chrome Browser Extension Documentation](https://developer.chrome.com/extensions)
- **Other Chromium Based Browsers** - Refer to their specific documentation.
  :::

## The Anatomy of "/src-bex"

The new folder has the following structure:

<DocTree :def="scope.tree" />

The next section will discuss these in more detail.
