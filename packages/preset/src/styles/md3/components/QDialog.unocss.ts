import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
body.platform-ios .q-dialog__inner--minimized > div, body.platform-android:not(.native-mobile) .q-dialog__inner--minimized > div {
  max-height: calc(100vh - 108px);
}

body.q-ios-padding .q-dialog__inner {
  padding-top: 20px !important;
  padding-top: env(safe-area-inset-top) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;
}
body.q-ios-padding .q-dialog__inner > div {
  max-height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom)) !important;
}

@media (max-width: 599.98px) {
  .q-dialog__inner--top, .q-dialog__inner--bottom {
    padding-left: 0;
    padding-right: 0;
  }
  .q-dialog__inner--top > div, .q-dialog__inner--bottom > div {
    width: 100% !important;
  }
}
@media (min-width: 600px) {
  .q-dialog__inner--minimized > div {
    max-width: 560px;
  }
}
`
  }
]

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-dialog$/, mdStatic(``)],
  [
    /^q-dialog__title$/,
    mdComponent(
      'q-dialog__title',
      `text-1.25rem font-500 lh-1.75rem tracking-0.0125em`
    )
  ],
  [/^q-dialog__progress$/, mdStatic(`text-4rem`)],
  [
    /^q-dialog__inner$/,
    mdComponent(
      'q-dialog__inner',
      `outline-0
      [&>div]:(pointer-events-all overflow-auto rounded-$shape-corner-large)
      [&>.q-card]:(bg-$light-surface-container-high dark:bg-$dark-surface-container-high shadow-md)
      [&>.q-card>.q-card\\_\\_actions_.q-btn--rectangle]:(min-w-64px)
    `
    )
  ],
  [
    /^q-dialog__inner--square$/,
    mdComponent(
      'q-dialog__inner--square',
      `[&>div]:(border-rd-0!)
    `
    )
  ],
  [
    /^q-dialog__inner--minimized$/,
    mdComponent(
      'q-dialog__inner--minimized',
      `p-24px
    [&>div]:(max-h-[calc(100vh-48px)])
    `
    )
  ],
  [
    /^q-dialog__inner--maximized$/,
    mdStatic(
      `[&>div]:(h-full w-full max-h-100vh max-w-100vw border-rd-0! top-0! left-0!)
    `
    )
  ],
  [
    /^q-dialog__inner--top$/,
    mdComponent(
      'q-dialog__inner--top',
      `pt-0! pb-0!    
`
    )
  ],
  [
    /^q-dialog__inner--bottom$/,
    mdComponent(
      'q-dialog__inner--bottom',
      `pt-0! pb-0!
    [&:not(.q-dialog\\_\\_inner--animating)>div]:(rounded-bl-none rounded-br-none)
    `
    )
  ],
  [
    /^q-dialog__inner--left$/,
    mdComponent(
      'q-dialog__inner--left',
      `pt-0! pb-0!
    [&:not(.q-dialog\\_\\_inner--animating)>div]:(rounded-tl-none rounded-bl-none)
    `
    )
  ],
  [
    /^q-dialog__inner--right$/,
    mdComponent(
      'q-dialog__inner--right',
      `pt-0! pb-0!
    [&:not(.q-dialog\\_\\_inner--animating)>div]:(rounded-tr-none rounded-br-none)
    `
    )
  ],
  [
    /^q-dialog__inner--fullwidth$/,
    mdComponent(
      'q-dialog__inner--fullwidth',
      `[&>div]:(w-full! max-w-full!)
    `
    )
  ],
  [
    /^q-dialog__inner--fullheight$/,
    mdComponent(
      'q-dialog__inner--fullheight',
      `[&>div]:(h-full! max-h-full!)
    `
    )
  ],
  [
    /^q-dialog__backdrop$/,
    mdComponent(
      'q-dialog__backdrop',
      `-z-1 pointer-events-all outline-0 bg-black bg-op-32
    `
    )
  ],
  [
    /^q-body--dialog$/,
    mdComponent(
      'q-body--dialog',
      `overflow-hidden
    `
    )
  ]
]

export { preflights, shortcuts }
