import { defineConfig } from '#q-app'

// import shikiCssStashPlugin from './build/shiki-css-stash.js'
import { mdVitePlugin } from './build/md/md-vite-plugin.js'
import { quasarApiVitePlugin } from './build/quasar-api.js'
import { codeSplitting, examplesVitePlugin } from './build/prod-chunks.js'

import UnoCSS from 'unocss/vite'
import { QuasarPreset } from 'unocss-preset-quasar'
import { UnstyledStyleEntry } from 'unocss-preset-quasar/styles'

const quasarPlugins = [
  'AddressbarColor',
  'AppFullscreen',
  'AppVisibility',
  'BottomSheet',
  'Cookies',
  'Dark',
  'Dialog',
  'Loading',
  'LoadingBar',
  'LocalStorage',
  'Meta',
  'Notify',
  'Platform',
  'Screen',
  'SessionStorage'
]

export default defineConfig((ctx) => ({
  boot: [{ path: 'gdpr', server: false }],

  css: ['app.sass' /* '~virtual:shiki-tokens.css' */],

  build: {
    vueRouterMode: 'history',
    distDir: 'dist/quasar.dev',
    useFilenameHashes: false,

    defineEnv: {
      DOCS_BRANCH: 'dev',
      SEARCH_INDEX: 'quasar-v2'
    },

    viteVuePluginOptions: {
      include: [/\.(vue|md)$/]
    },

    vitePlugins: [
      quasarApiVitePlugin(),
      mdVitePlugin(ctx.prod),
      examplesVitePlugin(ctx.prod),
      {
        name: 'quasar-strip-sass',
        enforce: 'pre',
        transform(code, id) {
          if (code.includes`import 'quasar/dist/quasar.sass'`) {
            code = code.replaceAll(
              "import 'quasar/dist/quasar.sass'",
              "import 'virtual:uno.css'"
            )
          }
          return code
        }
      }
      // shikiCssStashPlugin()
    ],

    extendViteConf(_viteConf, { isClient }) {
      _viteConf.plugins.push(
        UnoCSS({
          enforce: 'pre',
          presets: [
            QuasarPreset({
              style: UnstyledStyleEntry,
              plugins: quasarPlugins
            })
          ]
        })
      )
      if (ctx.prod && isClient) {
        return {
          build: {
            assetsDir: 'a',
            chunkSizeWarningLimit: 600,
            rolldownOptions: {
              output: {
                codeSplitting
              }
            }
          }
        }
      }
    }
  },

  devServer: {
    port: 9090,
    open: {
      app: { name: 'google chrome' }
    }
  },

  framework: {
    iconSet: 'svg-mdi-v7',

    devTreeshaking: true,
    autoImportVueExtensions: ['vue', 'md'],

    config: {
      loadingBar: {
        color: 'brand-primary',
        size: '4px'
      }
    },

    plugins: [
      'AddressbarColor',
      'AppFullscreen',
      'AppVisibility',
      'BottomSheet',
      'Cookies',
      'Dark',
      'Dialog',
      'Loading',
      'LoadingBar',
      'LocalStorage',
      'Meta',
      'Notify',
      'Platform',
      'Screen',
      'SessionStorage'
    ]
  },

  animations: ['fadeIn', 'fadeOut'],

  ssr: {
    pwa: ctx.prod && !import.meta.env.DOCS_PREVIEW,
    middlewares: ['render'],
    prodScriptNamedExport: 'renderSsrContext'
  },

  pwa: {
    workboxMode: 'GenerateSW',
    injectPWAMetaTags: false,
    swFilename: 'service-worker.js',

    extendPWAGenerateSWOptions(cfg) {
      Object.assign(cfg, {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn/,
            handler: 'StaleWhileRevalidate'
          }
        ]
      })
    }
  }
}))
