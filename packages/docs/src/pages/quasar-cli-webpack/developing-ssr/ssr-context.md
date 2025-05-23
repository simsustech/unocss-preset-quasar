---
title: The ssrContext Object
desc: (@quasar/app-webpack) The ssrContext Object in Quasar SSR
---

The `ssrContext` Object is the SSR context with which all the app's Vue components are rendered with.

## Usage

::: warning
The `ssrContext` Object is available only on SSR builds, on the server-side compilation (when `process∙env∙SERVER === true`).
:::

Among other places, it is supplied as parameter to [boot files](/quasar-cli-webpack/boot-files), to the [Pinia instance](/quasar-cli-webpack/state-management-with-pinia) and [Vue Router](/quasar-cli-webpack/routing) initialization functions, and to the [preFetch](/quasar-cli-webpack/prefetch-feature) method:

```js
// a boot file
export default defineBoot(({ ..., ssrContext }) => { /* ... */ })

// src/router/index.js
export default defineRouter(({ ..., ssrContext }) { /* ... */ })

// src/store/index.js
export default defineStore(({ ..., ssrContext }) { /* ... */ })

// with preFetch:
preFetch: definePreFetch(({ ..., ssrContext }) { /* ... */ })
```

You can also access the ssrContext in your Vue components. Below are two examples, one with Composition API and one with Options API:

```tabs
<<| js Composition API |>>
import { useSSRContext } from 'vue'

export default {
  // ...
  setup () {
    // we need to guard it and call it only on SSR server-side:
    const ssrContext = process.env.SERVER ? useSSRContext() : null
    // ...do something with it
  }
}
<<| js Options API |>>
export default {
  // ...
  created () { // can be any other Vue component lifecycle hook
    this.ssrContext
  }
}
```

## Anatomy of ssrContext

```js
ssrContext: {
  req, // Express.js object
    res, // Express.js object
    $q, // The Quasar's $q Object
    nonce, // (optional to set it yourself)
    // The global "nonce" attribute to use

    onRendered, // Registers a function to be executed server-side after
    // app has been rendered with Vue. You might need this
    // to access ssrContext again after it has been fully processed.
    // Example: ssrContext.onRendered(() => { /* ... */ })

    rendered // (optional to set it yourself)
  // Set this to a function which will be executed server-side
  // after the app has been rendered with Vue.
  // We recommend using the "onRendered" instead.
  //
  // Purpose: backward compatibility with Vue ecosystem packages
  // (like @vue/apollo-ssr)
  // Example: ssrContext.rendered = () => { /* ... */ }
}
```

More information on the purpose of the "nonce" property is available on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce).

The `req` and `res` are Express.js's objects for the current server client. One use-case for `req` is accessing `req.url` to get the URL that the client is requesting.

::: tip
Feel free to inject your own stuff into ssrContext too, but do NOT tamper with any of the private props (props that start with an underscore, eg. `_someProp`).
:::
