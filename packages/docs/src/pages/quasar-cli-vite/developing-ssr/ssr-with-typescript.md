---
title: SSR with TypeScript
desc: (@quasar/app-vite) How to use TypeScript with SSR in Quasar
---

In order to support SSR with TypeScript, you will need to rename all your files in /src-ssr from `.js` to `.ts` and make the necessary TS code changes.

Check the [SSR Webserver](/quasar-cli-vite/developing-ssr/ssr-webserver) and [SSR Middleware](/quasar-cli-vite/developing-ssr/ssr-middleware) pages for examples with TypeScript.

Depending on the webserver of your choice, you may also need to additionally [install @types/\* packages](/quasar-cli-vite/developing-ssr/installing-ssr-dependencies) into your /src-ssr folder.
