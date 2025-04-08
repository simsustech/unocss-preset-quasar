import { defineConfig } from '#q-app/wrappers'
import { fileURLToPath } from 'node:url'

import mdPlugin from './build/md/index.js'
import examplesPlugin from './build/examples.js'
import manualChunks from './build/chunks.js'

import UnoCSS from 'unocss/vite'
import { QuasarPreset } from 'unocss-preset-quasar'
import { MaterialDesign3 } from 'unocss-preset-quasar/styles'

const plugins = [
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

export default defineConfig(async (ctx) => ({
  boot: [{ path: 'gdpr', server: false }],

  css: ['app.sass'],

  build: {
    vueRouterMode: 'history',
    distDir: 'dist/quasar.dev',
    useFilenameHashes: false,
    // analyze: true,
    // rebuildCache: true,

    env: {
      DOCS_BRANCH: 'dev',
      SEARCH_INDEX: 'quasar-v2',
      ...(ctx.dev
        ? {
            FS_QUASAR_FOLDER: fileURLToPath(
              new URL('../ui', import.meta.url)
            ).replace('\\', '/')
          }
        : {})
    },

    viteVuePluginOptions: {
      include: [/\.(vue|md)$/]
    },

    vitePlugins: [
      mdPlugin,
      examplesPlugin(ctx.prod),
      // [
      //   'vite-plugin-checker',
      //   {
      //     eslint: {
      //       lintCommand:
      //         'eslint --report-unused-disable-directives "./**/*.{js,mjs,cjs,vue}"'
      //     }
      //   },
      //   { server: false }
      // ],
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
    ],

    extendViteConf(viteConf, { isClient }) {
      if (ctx.prod && isClient) {
        viteConf.build.chunkSizeWarningLimit = 650
        viteConf.build.rollupOptions = {
          output: { manualChunks }
        }
      }

      viteConf.plugins.push(
        UnoCSS({
          enforce: 'pre',
          presets: [
            QuasarPreset({
              style: MaterialDesign3,
              plugins
            })
          ]
        })
      )
    }
  },

  devServer: {
    port: 9090,
    open: {
      app: { name: 'google chrome' }
    }
  },

  framework: {
    iconSet: 'svg-mdi-v6',

    devTreeshaking: true,
    autoImportVueExtensions: ['vue', 'md'],

    config: {
      loadingBar: {
        color: 'brand-primary',
        size: '4px'
      }
    },

    plugins
  },

  animations: ['fadeIn', 'fadeOut'],

  ssr: {
    pwa: ctx.prod,
    prodPort: 3111,
    middlewares: ['render']
  },

  pwa: {
    workboxMode: 'GenerateSW',
    injectPwaMetaTags: false,
    swFilename: 'service-worker.js',

    extendWorkboxGenerateSWOptions(cfg) {
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
