import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
@keyframes q-skeleton--fade {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
@keyframes q-skeleton--pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.85);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes q-skeleton--pulse-x {
  0% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(0.75);
  }
  100% {
    transform: scaleX(1);
  }
}
@keyframes q-skeleton--pulse-y {
  0% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.75);
  }
  100% {
    transform: scaleY(1);
  }
}
@keyframes q-skeleton--wave {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}`
  }
]

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-skeleton\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton'] ??
      `bg-gray-200 rounded box-border`
  ],
  [
    /^q-skeleton--anim\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--anim'] ?? `cursor-wait`
  ],
  [
    /^q-skeleton--type-text\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-text'] ??
      `transform scale-y-50`
  ],
  [
    /^q-skeleton--type-circle\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-circle'] ??
      `h-12 w-12 rounded-full`
  ],
  [
    /^q-skeleton--type-QAvatar\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QAvatar'] ??
      `h-12 w-12 rounded-full`
  ],
  [
    /^q-skeleton--type-QBtn\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QBtn'] ?? `w-24 h-9`
  ],
  [
    /^q-skeleton--type-QBadge\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QBadge'] ?? `w-18 h-4`
  ],
  [
    /^q-skeleton--type-QChip\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QChip'] ??
      `w-24 h-7 rounded-full`
  ],
  [
    /^q-skeleton--type-QToolbar\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QToolbar'] ?? `h-12`
  ],
  [
    /^q-skeleton--type-QCheckbox\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QCheckbox'] ??
      `h-10 w-10 rounded-full`
  ],
  [
    /^q-skeleton--type-QRadio\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QRadio'] ??
      `h-10 w-10 rounded-full`
  ],
  [
    /^q-skeleton--type-QToggle\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QToggle'] ??
      `w-14 h-10 rounded-md`
  ],
  [
    /^q-skeleton--type-QSlider\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QSlider'] ?? `h-10`
  ],
  [
    /^q-skeleton--type-QRange\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QRange'] ?? `h-10`
  ],
  [
    /^q-skeleton--type-QInput\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QInput'] ?? `h-14`
  ],
  [
    /^q-skeleton--bordered\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--bordered'] ??
      `border border-gray-200`
  ],
  [
    /^q-skeleton--square\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--square'] ?? `rounded-none`
  ],
  [
    /^q-skeleton--anim-fade\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--anim-fade'] ?? `animate-fade`
  ],
  [
    /^q-skeleton--anim-pulse\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--anim-pulse'] ?? `animate-pulse`
  ],
  [
    /^q-skeleton--anim-pulse-x\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--anim-pulse-x'] ??
      `animate-pulse-x`
  ],
  [
    /^q-skeleton--anim-pulse-y\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--anim-pulse-y'] ??
      `animate-pulse-y`
  ],
  [
    /^q-skeleton--anim-wave\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--anim-wave'] ??
      `relative overflow-hidden z-10 before:content-['\\00a0'] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:z-0 after:content-[''] after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:z-0 after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent after:animate-wave`
  ],
  [
    /^q-skeleton--anim-blink\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--anim-blink'] ??
      `relative overflow-hidden z-10 before:content-['\\00a0'] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:z-0 after:content-[''] after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:z-0 after:bg-white/70 after:animate-fade`
  ],
  [
    /^q-skeleton--anim-pop\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--anim-pop'] ??
      `relative overflow-hidden z-10 before:content-['\\00a0'] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:z-0 after:content-[''] after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:z-0`
  ],
  [
    /^q-skeleton--dark\$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--dark'] ??
      `bg-white/5
[&.q-skeleton--bordered]:(border border-white/25)
[&.q-skeleton--anim-wave]:(after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent)
[&.q-skeleton--anim-blink]:(after:bg-white/20)`
  ]
]

export { preflights, shortcuts }
