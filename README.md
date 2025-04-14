# unocss-preset-quasar

## Playground

https://stackblitz.com/edit/unocss-preset-quasar

## Installation

In your Quasar project:

```sh
pnpm add unocss unocss-preset-quasar @iconify-json/mdi
```

Modify `quasar.config.js` to include the following (check ./packages/docs/quasar.config.js) for an example:

```js
...
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
    ...

    vitePlugins: [
      ...
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
      ...
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


  framework: {
    ...
    plugins
  },

}))
```

## Development

```sh
git clone https://github.com/simsustech/unocss-preset-quasar.git
cd unocss-preset-quasar
pnpm i
pnpm run build
cd packages/dev # or cd packages/docs
pnpm run dev
```
