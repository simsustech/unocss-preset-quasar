---
title: Writing Universal Code
desc: (@quasar/app-webpack) Guide on how to write code for a Quasar server-side rendered app.
---

Writing `universal` code (also called `isomorphic`) means writing code that runs on both the server and the client. Due to use-case and platform API differences, the behavior of our code will not be exactly the same when running in different environments. Here we will go over the key things you need to be aware of.

![Quasar SSR Build System](https://cdn.quasar.dev/img/ssr-build.png 'Quasar SSR Build System')

## Data Reactivity on the Server

In a client-only app, every user will be using a fresh instance of the app in their browser. For server-side rendering we want the same: each request should have a fresh, isolated app instance so that there is no cross-request state pollution.

Because the actual rendering process needs to be deterministic, we will also be "pre-fetching" data on the server - this means our application state will be already resolved when we start rendering. This means data reactivity is unnecessary on the server, so it is disabled by default. Disabling data reactivity also avoids the performance cost of converting data into reactive objects.

## Component Lifecycle Hooks

Since there are no dynamic updates, of all the Vue lifecycle hooks, only `beforeCreate` and `created` will be called during SSR. This means any code inside other lifecycle hooks such as `beforeMount` or `mounted` will only be executed on the client.

Another thing to note is that you should avoid code that produces global side effects in `beforeCreate` and `created`, for example setting up timers with `setInterval`. In client-side only code we may setup a timer and then tear it down in `beforeUnmount` or `destroyed`. However, because the destroy hooks will not be called during SSR, the timers will stay around forever. To avoid this, move your side-effect code into `beforeMount` or `mounted` instead.

## Avoid Stateful Singletons

When writing client-only code, we are used to the fact that our code will be evaluated in a fresh context every time. However, a Node.js server is a long-running process. When our code is required into the process, it will be evaluated once and then it stays in memory. This means if you create a singleton object, it will be shared between every incoming request.

So, Quasar CLI creates a new root Vue instance with a new Router and Pinia instance for each request. This is similar to how each user will be using a fresh instance of the app in their own browser. If we would have used a shared instance across multiple requests, it will easily lead to cross-request state pollution.

Instead of directly creating a Router and Pinia instance, you'll be exposing a factory function that can be repeatedly executed to create fresh app instances for each request:

```js /src/router/index.js
import { defineRouter } from '#q-app/wrappers'

export default defineRouter((/* { store, ssrContext } */) {
  const Router = new VueRouter({...})
  return Router
})
```

```js /src/store/index.js
import { defineStore } from '#q-app/wrappers'
import { createPinia } from 'pinia'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default defineStore((/* { ssrContext } */) => {
  const pinia = createPinia()

  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)

  return pinia
})
```

## Access to Platform-Specific APIs

Universal code cannot assume access to platform-specific APIs, so if your code directly uses browser-only globals like `window` or `document`, they will throw errors when executed in Node.js, and vice-versa.

For tasks shared between server and client but use different platform APIs, it's recommended to wrap the platform-specific implementations inside a universal API, or use libraries that do this for you. For example, [Axios](https://github.com/axios/axios) is an HTTP client that exposes the same API for both server and client.

For browser-only APIs, the common approach is to lazily access them inside client-only lifecycle hooks.

## Boot Files

Note that if a 3rd party library is not written with universal usage in mind, it could be tricky to integrate it into a server-rendered app. You _might_ be able to get it working by mocking some of the globals, but it would be hacky and may interfere with the environment detection code of other libraries.

When you add a 3rd party library to your project (through a [Boot File](/quasar-cli-webpack/boot-files)), take into consideration whether it can run on server and on client. If it needs to run only on server or only on client, then specify this in the `/quasar.config` file:

```js /quasar.config file
return {
  // ...
  boot: [
    'some-boot-file', // runs on both server & client
    { path: 'some-other', server: false } // this boot file gets embedded only on client-side
    { path: 'third', client: false } // this boot file gets embedded only on server-side
  ]
}
```

## Data Pre-Fetching and State

During SSR, we are essentially rendering a "snapshot" of our app, so if the app relies on some asynchronous data, this data need to be pre-fetched and resolved before we start the rendering process.

The Quasar CLI [PreFetch Feature](/quasar-cli-webpack/prefetch-feature) has been created to solve this problem. Take a few moments to read about it.

<q-separator class="q-mt-xl" />

> Parts of this page are taken from the official [Vue.js SSR guide](https://vuejs.org/guide/scaling-up/ssr.html#component-lifecycle-hooks).
