import type { Preflight, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const preflighs: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
body.q-ios-padding .q-notifications__list--center, body.q-ios-padding .q-notifications__list--top {
  top: 20px;
  top: env(safe-area-inset-top);
}
body.q-ios-padding .q-notifications__list--center, body.q-ios-padding .q-notifications__list--bottom {
  bottom: env(safe-area-inset-bottom);
}
@keyframes q-notif-badge {
  15% {
    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
  }
  30% {
    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
  }
  45% {
    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
  }
  60% {
    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
  }
  75% {
    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
  }
}
@keyframes q-notif-progress {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}`
  }
]

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-notifications__list$/,
    ([, c], { theme }) =>
      `pointer-events-none left-0 right-0 mb-[10px] relative z-${theme.quasar.z['notify']}`
  ],

  [/^q-notifications__list--center$/, ([, c], { theme }) => `top-0 bottom-0`],

  [/^q-notifications__list--top$/, ([, c], { theme }) => `top-0`],

  [/^q-notifications__list--bottom$/, ([, c], { theme }) => `bottom-0`],

  [
    /^q-notification$/,
    ([, c], { theme }) =>
      `[box-shadow:0_1px_5px_rgba(0,_0,_0,_0.2),_0_2px_2px_rgba(0,_0,_0,_0.14),_0_3px_1px_-2px_rgba(0,_0,_0,_0.12)] rounded-[4px] inline-flex mt-[10px] mx-[10px] mb-[0] [transition:transform_1s,_opacity_1s] flex-shrink-0 max-w-[95vw] bg-[#323232] text-[#fff] text-[14px]
      sm:max-w-65vw z-${theme.quasar.z['notify']} pointer-events-all`
  ],

  [
    /^q-notification__icon$/,
    ([, c], { theme }) => `text-[24px] flex-[0_0_1em]`
  ],

  [/^q-notification__icon--additional$/, ([, c], { theme }) => `mr-[16px]`],

  [/^q-notification__avatar$/, ([, c], { theme }) => `text-[32px]`],

  [/^q-notification__avatar--additional$/, ([, c], { theme }) => `mr-[8px]`],

  [/^q-notification__spinner$/, ([, c], { theme }) => `text-[32px]`],

  [/^q-notification__spinner--additional$/, ([, c], { theme }) => `mr-[8px]`],

  [/^q-notification__message$/, ([, c], { theme }) => `px-[0] py-[8px]`],

  [
    /^q-notification__caption$/,
    ([, c], { theme }) => `text-[0.9em] opacity-70`
  ],

  [/^q-notification__actions$/, ([, c], { theme }) => `text-primary`],

  [
    /^q-notification__badge$/,
    ([, c], { theme }) =>
      `animate-[q-notif-badge_0.42s] px-[8px] py-[4px] absolute [box-shadow:0_1px_3px_rgba(0,_0,_0,_0.2),_0_1px_1px_rgba(0,_0,_0,_0.14),_0_2px_1px_-1px_rgba(0,_0,_0,_0.12)] text-[#fff] rounded-[4px] text-[12px] leading-[12px] bg-negative`
  ],

  [
    /^q-notification__badge--top-left$/,
    ([, c], { theme }) => `-top-[6px] -left-[22px]`
  ],

  [
    /^q-notification__badge--top-right$/,
    ([, c], { theme }) => `-top-[6px] -right-[22px]`
  ],

  [
    /^q-notification__badge--bottom-left$/,
    ([, c], { theme }) => `-bottom-[6px] -left-[22px]`
  ],

  [
    /^q-notification__badge--bottom-right$/,
    ([, c], { theme }) => `-bottom-[6px] -right-[22px]`
  ],

  [
    /^q-notification__progress$/,
    ([, c], { theme }) =>
      `absolute h-[3px] bottom-0 -left-[10px] -right-[10px] animate-[q-notif-progress_linear] bg-current opacity-30 rounded-tl-[4px] rounded-br-[0] rounded-tr-[4px] rounded-bl-[0] origin-[0_50%] scale-x-0 -z-1`
  ],

  [
    /^q-notification--standard$/,
    ([, c], { theme }) =>
      `px-[16px] py-[0] min-h-[48px] [&_.q-notification\\_\\_actions]:(pl-[8px] pr-[0] py-[6px] -mr-[8px])`
  ],

  [
    /^q-notification--multi-line$/,
    ([, c], { theme }) =>
      `min-h-[68px] px-[16px] py-[8px] [&_.q-notification\\_\\_badge--top-left]:(-top-[15px]) [&_.q-notification\\_\\_badge--top-right]:(-top-[15px]) [&_.q-notification\\_\\_badge--bottom-left]:(-bottom-[15px]) [&_.q-notification\\_\\_badge--bottom-right]:(-bottom-[15px]) [&_.q-notification\\_\\_progress]:(-bottom-[8px]) [&_.q-notification\\_\\_actions]:(p-0) [&_.q-notification\\_\\_actions--with-media]:(pl-[25px])`
  ],

  [
    /^q-notification--top-left-enter-from$/,
    ([, c], { theme }) =>
      `opacity-0 -translate-y-[50px] z-${theme.quasar.z['notify'] - 1}`
  ],

  [
    /^q-notification--top-left-leave-to$/,
    ([, c], { theme }) =>
      `opacity-0 -translate-y-[50px] z-${theme.quasar.z['notify'] - 1}`
  ],

  [
    /^q-notification--top-enter-from$/,
    ([, c], { theme }) =>
      `opacity-0 -translate-y-[50px] z-${theme.quasar.z['notify'] - 1}`
  ],

  [
    /^q-notification--top-leave-to$/,
    ([, c], { theme }) =>
      `opacity-0 -translate-y-[50px] z-${theme.quasar.z['notify'] - 1}`
  ],

  [
    /^q-notification--top-right-enter-from$/,
    ([, c], { theme }) =>
      `opacity-0 -translate-y-[50px] z-${theme.quasar.z['notify'] - 1}`
  ],

  [
    /^q-notification--top-right-leave-to$/,
    ([, c], { theme }) =>
      `opacity-0 -translate-y-[50px] z-${theme.quasar.z['notify'] - 1}`
  ],

  [
    /^q-notification--left-enter-from$/,
    ([, c], { theme }) =>
      `opacity-0 [transform:rotateX(90deg)] z-${theme.quasar.z['notify'] - 1}`
  ],

  [
    /^q-notification--left-leave-to$/,
    ([, c], { theme }) =>
      `opacity-0 [transform:rotateX(90deg)] z-${theme.quasar.z['notify'] - 1}`
  ],

  [
    /^q-notification--center-enter-from$/,
    ([, c], { theme }) =>
      `opacity-0 [transform:rotateX(90deg)] z-${theme.quasar.z['notify'] - 1}`
  ],

  [
    /^q-notification--center-leave-to$/,
    ([, c], { theme }) =>
      `opacity-0 [transform:rotateX(90deg)] z-${theme.quasar.z['notify'] - 1}`
  ],

  [
    /^q-notification--right-enter-from$/,
    ([, c], { theme }) =>
      `opacity-0 [transform:rotateX(90deg)] z-${theme.quasar.z['notify'] - 1}`
  ],

  [
    /^q-notification--right-leave-to$/,
    ([, c], { theme }) =>
      `opacity-0 [transform:rotateX(90deg)] z-${theme.quasar.z['notify'] - 1}`
  ],

  [
    /^q-notification--bottom-left-enter-from$/,
    ([, c], { theme }) =>
      `opacity-0 translate-y-[50px] z-${theme.quasar.z['notify'] - 1}`
  ],

  [
    /^q-notification--bottom-left-leave-to$/,
    ([, c], { theme }) =>
      `opacity-0 translate-y-[50px] z-${theme.quasar.z['notify'] - 1}`
  ],

  [
    /^q-notification--bottom-enter-from$/,
    ([, c], { theme }) =>
      `opacity-0 translate-y-[50px] z-${theme.quasar.z['notify'] - 1}`
  ],

  [
    /^q-notification--bottom-leave-to$/,
    ([, c], { theme }) =>
      `opacity-0 translate-y-[50px] z-${theme.quasar.z['notify'] - 1}`
  ],

  [
    /^q-notification--bottom-right-enter-from$/,
    ([, c], { theme }) =>
      `opacity-0 translate-y-[50px] z-${theme.quasar.z['notify'] - 1}`
  ],

  [
    /^q-notification--bottom-right-leave-to$/,
    ([, c], { theme }) =>
      `opacity-0 translate-y-[50px] z-${theme.quasar.z['notify'] - 1}`
  ],

  [
    /^q-notification--top-left-leave-active$/,
    ([, c], { theme }) => `absolute ml-0 mr-0`
  ],

  [
    /^q-notification--top-leave-active$/,
    ([, c], { theme }) => `absolute ml-0 mr-0 top-0`
  ],

  [
    /^q-notification--top-right-leave-active$/,
    ([, c], { theme }) => `absolute ml-0 mr-0`
  ],

  [
    /^q-notification--left-leave-active$/,
    ([, c], { theme }) => `absolute ml-0 mr-0`
  ],

  [
    /^q-notification--center-leave-active$/,
    ([, c], { theme }) => `absolute ml-0 mr-0 top-0`
  ],

  [
    /^q-notification--right-leave-active$/,
    ([, c], { theme }) => `absolute ml-0 mr-0`
  ],

  [
    /^q-notification--bottom-left-leave-active$/,
    ([, c], { theme }) => `absolute ml-0 mr-0 bottom-0`
  ],

  [
    /^q-notification--bottom-leave-active$/,
    ([, c], { theme }) => `absolute ml-0 mr-0 bottom-0`
  ],

  [
    /^q-notification--bottom-right-leave-active$/,
    ([, c], { theme }) => `absolute ml-0 mr-0 bottom-0`
  ]
]

export { shortcuts }
