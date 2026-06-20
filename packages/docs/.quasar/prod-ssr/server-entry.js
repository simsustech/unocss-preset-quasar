/* eslint-disable */
/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.config file > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/
import { createApp } from 'vue'

import '@quasar/extras/animate/fadeIn.css'

import '@quasar/extras/animate/fadeOut.css'

// We load Quasar stylesheet file
import 'quasar/dist/quasar.sass'

import 'src/css/app.sass'

import createQuasarApp from './app.js'
import quasarUserOptions from './quasar-user-options.js'

const publicPath = `/`

const httpRE = /^https?:\/\//

function getRedirectUrl(url, router) {
  if (typeof url === 'string' && httpRE.test(url) === true) {
    return url
  }

  try {
    return router.resolve(url).href
  } catch (err) {}

  return url
}

const { components, directives, ...qUserOptions } = quasarUserOptions

// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default (ssrContext) => {
  return new Promise(async (resolve, reject) => {
    const { app, router } = await createQuasarApp(
      createApp,
      qUserOptions,
      ssrContext
    )

    app.use(router)

    const url = ssrContext.req.url
    const { fullPath } = router.resolve(url)

    if (fullPath !== url) {
      return reject({ url: fullPath })
    }

    // set router's location
    router.push(url).catch(() => {})

    // wait until router has resolved possible async hooks
    router
      .isReady()
      .then(() => {
        let matchedComponents = router.currentRoute.value.matched
          .filter((record) => record.components !== void 0)
          .flatMap((record) => Object.values(record.components))

        // no matched routes
        if (matchedComponents.length === 0) {
          return reject({ code: 404 })
        }

        resolve(app)
      })
      .catch(reject)
  })
}
