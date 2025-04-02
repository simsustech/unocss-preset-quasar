import { type VitrifyConfig, type VitrifyConfigAsync } from 'vitrify'
import { QuasarPreset } from 'unocss-preset-quasar'

import { certificateFor } from 'devcert'

const iconifyJsonIconSet = {
  name: 'iconify-json-mdi',
  type: {
    positive: 'i-mdi-check-circle',
    negative: 'i-mdi-alert',
    info: 'i-mdi-information',
    warning: 'i-mdi-exclamation'
  },
  arrow: {
    up: 'i-mdi-arrow-up',
    right: 'i-mdi-arrow-right',
    down: 'i-mdi-arrow-down',
    left: 'i-mdi-arrow-left',
    dropdown: 'i-mdi-menu-down'
  },
  chevron: {
    left: 'i-mdi-chevron-left',
    right: 'i-mdi-chevron-right'
  },
  colorPicker: {
    spectrum: 'i-mdi-gradient-vertical',
    tune: 'i-mdi-tune',
    palette: 'i-mdi-palette-swatch'
  },
  pullToRefresh: {
    icon: 'i-mdi-refresh'
  },
  carousel: {
    left: 'i-mdi-chevron-left',
    right: 'i-mdi-chevron-right',
    up: 'i-mdi-chevron-up',
    down: 'i-mdi-chevron-down',
    navigationIcon: 'i-mdi-circle'
  },
  chip: {
    remove: 'i-mdi-close-circle',
    selected: 'i-mdi-check'
  },
  datetime: {
    arrowLeft: 'i-mdi-chevron-left',
    arrowRight: 'i-mdi-chevron-right',
    now: 'i-mdi-clock-outline',
    today: 'i-mdi-calendar-today'
  },
  editor: {
    bold: 'i-mdi-format-bold',
    italic: 'i-mdi-format-italic',
    strikethrough: 'i-mdi-format-strikethrough-variant',
    underline: 'i-mdi-format-underline',
    unorderedList: 'i-mdi-format-list-bulleted',
    orderedList: 'i-mdi-format-list-numbered',
    subscript: 'i-mdi-format-subscript',
    superscript: 'i-mdi-format-superscript',
    hyperlink: 'i-mdi-link',
    toggleFullscreen: 'i-mdi-fullscreen',
    quote: 'i-mdi-format-quote-close',
    left: 'i-mdi-format-align-left',
    center: 'i-mdi-format-align-center',
    right: 'i-mdi-format-align-right',
    justify: 'i-mdi-format-align-justify',
    print: 'i-mdi-printer',
    outdent: 'i-mdi-format-indent-decrease',
    indent: 'i-mdi-format-indent-increase',
    removeFormat: 'i-mdi-format-clear',
    formatting: 'i-mdi-format-color-text',
    fontSize: 'i-mdi-format-size',
    align: 'i-mdi-format-align-left',
    hr: 'i-mdi-minus',
    undo: 'i-mdi-undo',
    redo: 'i-mdi-redo',
    heading: 'i-mdi-format-size',
    heading1: 'i-mdi-format-header-1',
    heading2: 'i-mdi-format-header-2',
    heading3: 'i-mdi-format-header-3',
    heading4: 'i-mdi-format-header-4',
    heading5: 'i-mdi-format-header-5',
    heading6: 'i-mdi-format-header-6',
    code: 'i-mdi-code-tags',
    size: 'i-mdi-format-size',
    size1: 'i-mdi-numeric-1-box',
    size2: 'i-mdi-numeric-2-box',
    size3: 'i-mdi-numeric-3-box',
    size4: 'i-mdi-numeric-4-box',
    size5: 'i-mdi-numeric-5-box',
    size6: 'i-mdi-numeric-6-box',
    size7: 'i-mdi-numeric-7-box',
    font: 'i-mdi-format-font',
    viewSource: 'i-mdi-code-tags'
  },
  expansionItem: {
    icon: 'i-mdi-chevron-down',
    denseIcon: 'i-mdi-menu-down'
  },
  fab: {
    icon: 'i-mdi-plus',
    activeIcon: 'i-mdi-close'
  },
  field: {
    clear: 'i-mdi-close-circle',
    error: 'i-mdi-alert-circle'
  },
  pagination: {
    first: 'i-mdi-chevron-double-left',
    prev: 'i-mdi-chevron-left',
    next: 'i-mdi-chevron-right',
    last: 'i-mdi-chevron-double-right'
  },
  rating: {
    icon: 'i-mdi-star'
  },
  stepper: {
    done: 'i-mdi-check',
    active: 'i-mdi-pencil',
    error: 'i-mdi-alert'
  },
  tabs: {
    left: 'i-mdi-chevron-left',
    right: 'i-mdi-chevron-right',
    up: 'i-mdi-chevron-up',
    down: 'i-mdi-chevron-down'
  },
  table: {
    arrowUp: 'i-mdi-arrow-up',
    warning: 'i-mdi-alert',
    firstPage: 'i-mdi-chevron-double-left',
    prevPage: 'i-mdi-chevron-left',
    nextPage: 'i-mdi-chevron-right',
    lastPage: 'i-mdi-chevron-double-right'
  },
  tree: {
    icon: 'i-mdi-play'
  },
  uploader: {
    done: 'i-mdi-check',
    clear: 'i-mdi-close',
    add: 'i-mdi-plus-box',
    upload: 'i-mdi-cloud-upload',
    removeQueue: 'i-mdi-notification-clear-all',
    removeUploaded: 'i-mdi-check-all'
  }
}

const quasarConf: NonNullable<VitrifyConfig['quasar']> = {
  // extras: ['material-icons'],
  framework: {
    components: [
      // Deprecated
    ],
    plugins: ['Dialog', 'Notify'],
    // iconSet: 'material-icons'
    iconSet: iconifyJsonIconSet
  },
  /*
   * Disable SASS if you use UnoCSS
   */
  disableSass: true
}

export default async function ({ mode, command }): VitrifyConfigAsync {
  const config: VitrifyConfig & SimpleSiteGenerator = {
    optimizeDeps: {
      exclude: ['@simple-site-generator/templates']
    },
    plugins: [],
    vitrify: {
      hooks: {
        onSetup: [new URL('src/setup.ts', import.meta.url)]
      },
      unocss: {
        presets: [
          await QuasarPreset({
            style: 'md3',
            // primaryColor: '#123456',
            plugins: quasarConf['framework']['plugins'],
            iconSet: quasarConf['framework']['iconSet']
          })
        ],
        theme: {
          quasar: {
            components: {
              //   'q-toggle': `align-middle [&.disabled]:(!opacity-75)
              // [&:not(.disabled)_.q-toggle\\_\\_thumb:before]:(absolute content-[''] top-0 left-0 right-0 bottom-0 bg-current border-rd-[50%] transform-scale-z-1 op-12)
              // [&:not(.disabled):focus_.q-toggle\\_\\_thumb:before]:(scale-300)
              // [&:not(.disabled):hover_.q-toggle\\_\\_thumb:before]:(scale-200)`
              // 'q-toggle--dense': `[&_.q-toggle\\_\\_inner]:(w-[0.8em] min-w-[0.8em] h-[0.5em] px-[0] py-[0.07625em]) [&_.q-toggle\\_\\_thumb]:(top-[0] left-[0]) [&_.q-toggle\\_\\_inner--indet_.q-toggle\\_\\_thumb]:(left-[0.15em]) [&_.q-toggle\\_\\_inner--truthy_.q-toggle\\_\\_thumb]:(left-[0.3em]) [&_.q-toggle\\_\\_label]:(pl-[0.5em]) [&.reverse_.q-toggle\\_\\_label]:(pl-0 pr-[0.5em])`
              // 'q-toggle__thumb': `top-[0.45em] left-[0.45em] w-[0.75em] h-[0.75em] [transition:left_0.22s_cubic-bezier(0.4,_0,_0.2,_1)] select-none z-0
              // [&:before]:()
              // [&:after]:(content-[''] bg-light-outline dark:bg-dark-outline absolute top-[0] right-[0] bottom-[0] left-[0] rounded-[50%] [box-shadow:0_3px_1px_-2px_rgba(0,_0,_0,_0.2),_0_2px_2px_0_rgba(0,_0,_0,_0.14),_0_1px_5px_0_rgba(0,_0,_0,_0.12)])
              // [&_.q-icon]:(layer-components:text-[0.3em] min-w-[1em] layer-components:text-[#000] opacity-[0.54])`
            }
          }
        }
      }
    },
    quasar: quasarConf
  }
  if (mode === 'development') {
    config.server = {
      https: await certificateFor('vitrify.test')
    }
  }
  return config
}
