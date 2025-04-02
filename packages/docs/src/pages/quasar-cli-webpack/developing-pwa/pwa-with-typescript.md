---
title: PWA with Typescript
desc: (@quasar/app-webpack) How to use Typescript with Quasar PWA
---

In order to support PWA with Typescript, you will need to rename the extension for your files in /src-pwa from `.js` to `.ts` and make the necessary TS code changes.

Also create these files:

```js /src-pwa/pwa-env.d.ts
/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    SERVICE_WORKER_FILE: string;
    PWA_FALLBACK_HTML: string;
    PWA_SERVICE_WORKER_REGEX: string;
    // ...and your own
  }
}
```

```js /src-pwa/tsconfig.json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "lib": ["WebWorker", "ESNext"]
  },
  "include": ["*.ts", "*.d.ts"]
}
```
