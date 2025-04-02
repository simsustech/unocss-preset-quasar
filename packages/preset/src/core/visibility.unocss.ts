import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
[disabled] * {
  outline: 0 !important;
  cursor: not-allowed !important;
}
  

body:not(.desktop) .desktop-only,
body.desktop .desktop-hide {
  display: none !important;
}

body:not(.mobile) .mobile-only,
body.mobile .mobile-hide {
  display: none !important;
}

body:not(.native-mobile) .native-mobile-only,
body.native-mobile .native-mobile-hide {
  display: none !important;
}

body:not(.cordova) .cordova-only,
body.cordova .cordova-hide {
  display: none !important;
}

body:not(.capacitor) .capacitor-only,
body.capacitor .capacitor-hide {
  display: none !important;
}

body:not(.electron) .electron-only,
body.electron .electron-hide {
  display: none !important;
}

body:not(.touch) .touch-only,
body.touch .touch-hide {
  display: none !important;
}

body:not(.within-iframe) .within-iframe-only,
body.within-iframe .within-iframe-hide {
  display: none !important;
}

body:not(.platform-ios) .platform-ios-only,
body.platform-ios .platform-ios-hide {
  display: none !important;
}

body:not(.platform-android) .platform-android-only,
body.platform-android .platform-android-hide {
  display: none !important;
}

@media all and (orientation: portrait) {
  .orientation-landscape {
    display: none !important;
  }
}
@media all and (orientation: landscape) {
  .orientation-portrait {
    display: none !important;
  }
}
@media screen {
  .print-only {
    display: none !important;
  }
}
@media print {
  .print-hide {
    display: none !important;
  }
}
@media (max-width: 599.98px) {
  .xs-hide, .gt-xs, .sm, .gt-sm, .md, .gt-md, .lg, .gt-lg, .xl {
    display: none !important;
  }
}
@media (min-width: 600px) and (max-width: 1023.98px) {
  .sm-hide, .xs, .lt-sm, .gt-sm, .md, .gt-md, .lg, .gt-lg, .xl {
    display: none !important;
  }
}
@media (min-width: 1024px) and (max-width: 1439.98px) {
  .md-hide, .xs, .lt-sm, .sm, .lt-md, .gt-md, .lg, .gt-lg, .xl {
    display: none !important;
  }
}
@media (min-width: 1440px) and (max-width: 1919.98px) {
  .lg-hide, .xs, .lt-sm, .sm, .lt-md, .md, .lt-lg, .gt-lg, .xl {
    display: none !important;
  }
}
@media (min-width: 1920px) {
  .xl-hide, .xs, .lt-sm, .sm, .lt-md, .md, .lt-lg, .lg, .lt-xl {
    display: none !important;
  }
}

body.desktop .q-focus-helper {
  position: absolute;
  top: 0;
  left: 0 /* rtl:ignore */;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-radius: inherit;
  opacity: 0;
  transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), opacity 0.4s cubic-bezier(0.25, 0.8, 0.5, 1);
}
body.desktop .q-focus-helper:before, body.desktop .q-focus-helper:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0 /* rtl:ignore */;
  width: 100%;
  height: 100%;
  opacity: 0;
  border-radius: inherit;
  transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), opacity 0.6s cubic-bezier(0.25, 0.8, 0.5, 1);
}
body.desktop .q-focus-helper:before {
  background: #000;
}
body.desktop .q-focus-helper:after {
  background: #fff;
}
body.desktop .q-focus-helper--rounded {
  border-radius: 4px;
}
body.desktop .q-focus-helper--round {
  border-radius: 50%;
}
body.desktop .q-focusable:focus > .q-focus-helper, body.desktop .q-manual-focusable--focused > .q-focus-helper, body.desktop .q-hoverable:hover > .q-focus-helper {
  background: currentColor;
  opacity: 0.15;
}
body.desktop .q-focusable:focus > .q-focus-helper:before, body.desktop .q-manual-focusable--focused > .q-focus-helper:before, body.desktop .q-hoverable:hover > .q-focus-helper:before {
  opacity: 0.1;
}
body.desktop .q-focusable:focus > .q-focus-helper:after, body.desktop .q-manual-focusable--focused > .q-focus-helper:after, body.desktop .q-hoverable:hover > .q-focus-helper:after {
  opacity: 0.4;
}
body.desktop .q-focusable:focus > .q-focus-helper, body.desktop .q-manual-focusable--focused > .q-focus-helper {
  opacity: 0.22;
}
`
  }
]

const rules: Rule<QuasarTheme>[] = [
  [
    /^invisible$/,
    function* ([, c], { symbols }) {
      yield {
        visibility: 'hidden !important',
        transition: 'none !important',
        animation: 'none !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} > *`,
        visibility: 'hidden !important',
        transition: 'none !important',
        animation: 'none !important'
      }
    }
  ]
]
const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^no-margin$/, ([, c], { theme }) => `!m-0`],

  [/^no-padding$/, ([, c], { theme }) => `!p-0`],

  [/^no-border$/, ([, c], { theme }) => `!border-0`],

  [/^no-border-radius$/, ([, c], { theme }) => `!rounded-none`],

  [/^no-box-shadow$/, ([, c], { theme }) => `[box-shadow:none!important]`],

  [/^no-outline$/, ([, c], { theme }) => `outline-0`],

  [
    /^ellipsis$/,
    ([, c], { theme }) => `text-ellipsis whitespace-nowrap overflow-hidden`
  ],

  [/^ellipsis-2-lines$/, ([, c], { theme }) => `overflow-hidden `],

  [/^ellipsis-3-lines$/, ([, c], { theme }) => `overflow-hidden `],

  [/^readonly$/, ([, c], { theme }) => `!cursor-default`],

  [
    /^disabled$/,
    ([, c], { theme }) =>
      `!outline-0 !cursor-not-allowed [&_*]:(!outline-0 !cursor-not-allowed) !opacity-60`
  ],

  // [
  //   /^invisible$/,
  //   ([, c], { theme }) =>
  //     `invisible !transition-none !animate-none [&_*]:(invisible !transition-none !animate-none)`
  // ],

  [/^transparent$/, ([, c], { theme }) => `!bg-transparent`],

  [/^overflow-hidden-y$/, ([, c], { theme }) => `!overflow-y-hidden`],

  [/^hide-scrollbar$/, ([, c], { theme }) => `[scrollbar-width:none]`],

  [
    /^hide-scrollbar::-webkit-scrollbar$/,
    ([, c], { theme }) => `w-[0] h-[0] hidden`
  ],

  [
    /^dimmed:after$/,
    ([, c], { theme }) =>
      `content-empty absolute top-0 right-0 bottom-0 left-0 !bg-[rgba(0,_0,_0,_0.4)]`
  ],

  [
    /^light-dimmed:after$/,
    ([, c], { theme }) =>
      `content-empty absolute top-0 right-0 bottom-0 left-0 !bg-[rgba(255,_255,_255,_0.6)]`
  ],

  [/^z-top$/, ([, c], { theme }) => `z-7000`],

  [/^z-max$/, ([, c], { theme }) => `z-9998`],

  [/^q-focus-helper$/, ([, c], { theme }) => `outline-0`],

  [/^q-focusable$/, ([, c], { theme }) => `outline-0`],

  [/^q-manual-focusable$/, ([, c], { theme }) => `outline-0`],

  [/^q-hoverable$/, ([, c], { theme }) => `outline-0`]
]

export { rules, preflights, shortcuts }
