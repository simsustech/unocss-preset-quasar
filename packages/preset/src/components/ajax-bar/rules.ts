import type { Rule } from '@unocss/core'

/**
 * QAjaxBar (`q-ajax-bar`). The bar and its four position variants are rendered
 * and toggled by the plugin's own JavaScript, so their classes reach the sheet
 * through `pluginSafelistMap.LoadingBar` — no consuming source names them.
 *
 * Declarations mirror quasar/dist/quasar.css verbatim, including Quasar's own
 * `rtl:ignore` markers.
 */
export const ajaxBarRules = [
  [
    /^q-loading-bar$/,
    function* () {
      // .q-loading-bar
      yield {
        position: 'fixed',
        'z-index': '9998',
        transition: 'transform 0.5s cubic-bezier(0, 0, 0.2, 1), opacity 0.5s',
        // Quasar's own indicator colour, not a forked role value (background is
        // outside the watched properties in test/no-role-literals.test.ts).
        background: '#f44336'
      }
    }
  ],
  [
    /^q-loading-bar--top$/,
    function* () {
      yield {
        left: '0 /* rtl:ignore */',
        right: '0 /* rtl:ignore */',
        top: '0',
        width: '100%'
      }
    }
  ],
  [
    /^q-loading-bar--bottom$/,
    function* () {
      yield {
        left: '0 /* rtl:ignore */',
        right: '0 /* rtl:ignore */',
        bottom: '0',
        width: '100%'
      }
    }
  ],
  [
    /^q-loading-bar--right$/,
    function* () {
      yield {
        top: '0',
        bottom: '0',
        right: '0',
        height: '100%'
      }
    }
  ],
  [
    /^q-loading-bar--left$/,
    function* () {
      yield {
        top: '0',
        bottom: '0',
        left: '0',
        height: '100%'
      }
    }
  ]
] as Rule[]
