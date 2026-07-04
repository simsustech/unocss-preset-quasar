import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const stepperStandard = `[box-shadow:0_1px_5px_rgba(0,_0,_0,_0.2),_0_2px_2px_rgba(0,_0,_0,_0.14),_0_3px_1px_-2px_rgba(0,_0,_0,_0.12)] [border-radius:var(--q-radius-sm)]`

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-stepper$/, componentClass('q-stepper', `${stepperStandard} bg-[#fff]`)],

  [/^q-stepper--standard$/, staticClass(stepperStandard)],

  [
    /^q-stepper__title$/,
    componentClass(
      'q-stepper__title',
      `[font-size:var(--q-font-md)] leading-[1.285714] tracking-[0.1px]`
    )
  ],

  [
    /^q-stepper__caption$/,
    componentClass('q-stepper__caption', `[font-size:var(--q-font-sm)] leading-[1.16667]`)
  ],

  [
    /^q-stepper__dot$/,
    componentClass(
      'q-stepper__dot',
      `!flex-initial mr-[8px] [font-size:var(--q-font-md)] w-[24px] min-w-[24px] h-[24px] [border-radius:var(--q-radius-circle)] bg-current [&_span]:(text-[#fff])`
    )
  ],

  [
    /^q-stepper__tab$/,
    componentClass(
      'q-stepper__tab',
      `[padding-inline:var(--q-space-xl)] py-[8px] [font-size:var(--q-font-md)] text-[#9e9e9e] flex-row`
    )
  ],

  [
    /^q-stepper--dark$/,
    componentClass(
      'q-stepper--dark',
      qe`[box-shadow:0_1px_5px_rgba(255,_255,_255,_0.2),_0_2px_2px_rgba(255,_255,_255,_0.14),_0_3px_1px_-2px_rgba(255,_255,_255,_0.12)] [&_.q-stepper__dot_span]:(text-[#000]) [&.q-stepper--bordered]:(border-[rgba(255,_255,_255,_0.28)]) [&_.q-stepper__header--border]:(border-[rgba(255,_255,_255,_0.28)]) [&.q-stepper--horizontal_.q-stepper__line:before]:(bg-[rgba(255,_255,_255,_0.28)]) [&.q-stepper--horizontal_.q-stepper__line:after]:(bg-[rgba(255,_255,_255,_0.28)]) [&.q-stepper--vertical_.q-stepper__dot:before]:(bg-[rgba(255,_255,_255,_0.28)]) [&.q-stepper--vertical_.q-stepper__dot:after]:(bg-[rgba(255,_255,_255,_0.28)]) [&_.q-stepper__tab--disabled]:(text-[rgba(255,_255,_255,_0.28)]) [&_.q-stepper__tab--disabled_.q-stepper__dot]:(bg-[rgba(255,_255,_255,_0.28)]) [&_.q-stepper__tab--disabled_.q-stepper__label]:(text-[rgba(255,_255,_255,_0.54)])`
    )
  ],

  [
    /^q-stepper__tab--navigation$/,
    componentClass('q-stepper__tab--navigation', `select-none cursor-pointer`)
  ],

  [
    /^q-stepper__tab--active$/,
    componentClass(
      'q-stepper__tab--active',
      qe` [&_.q-stepper__dot]:([text-shadow:0_0_0_currentColor]) [&_.q-stepper__label]:([text-shadow:0_0_0_currentColor])`
    )
  ],

  [
    /^q-stepper__tab--done$/,
    componentClass(
      'q-stepper__tab--done',
      qe` [&_.q-stepper__dot]:([text-shadow:0_0_0_currentColor]) [&_.q-stepper__label]:([text-shadow:0_0_0_currentColor])`
    )
  ],

  [
    /^q-stepper__tab--disabled$/,
    componentClass(
      'q-stepper__tab--disabled',
      qe`[&_.q-stepper__dot]:(bg-[rgba(0,_0,_0,_0.22)]) [&_.q-stepper__label]:(text-[rgba(0,_0,_0,_0.32)])`
    )
  ],

  [/^q-stepper__tab--error$/, componentClass('q-stepper__tab--error', ``)],

  [
    /^q-stepper__tab--error-with-icon$/,
    componentClass(
      'q-stepper__tab--error-with-icon',
      qe`[&_.q-stepper__dot]:(!bg-transparent) [&_.q-stepper__dot_span]:(text-current text-[24px])`
    )
  ],

  [
    /^q-stepper__header$/,
    componentClass(
      'q-stepper__header',
      `[border-top-left-radius:inherit] [border-top-right-radius:inherit]`
    )
  ],

  [
    /^q-stepper__header--border$/,
    componentClass(
      'q-stepper__header--border',
      `[border-bottom:1px_solid_rgba(0,_0,_0,_0.12)]`
    )
  ],

  [
    /^q-stepper__header--standard-labels$/,
    componentClass(
      'q-stepper__header--standard-labels',
      qe`[&_.q-stepper__tab]:(min-h-[72px] justify-center) [&_.q-stepper__tab:first-child]:(justify-start) [&_.q-stepper__tab:last-child]:(justify-end) [&_.q-stepper__tab:only-child]:(justify-center) [&_.q-stepper__dot:after]:(hidden)`
    )
  ],

  [
    /^q-stepper__header--alternative-labels$/,
    componentClass(
      'q-stepper__header--alternative-labels',
      qe`[&_.q-stepper__tab]:(min-h-[104px] px-[32px] py-[24px] flex-col justify-start) [&_.q-stepper__dot]:(mr-0) [&_.q-stepper__label]:(mt-[8px] text-center) [&_.q-stepper__label:before]:(hidden) [&_.q-stepper__label:after]:(hidden)`
    )
  ],

  [
    /^q-stepper__header--contracted$/,
    componentClass(
      'q-stepper__header--contracted',
      qe`min-h-[72px] [&.q-stepper__header--alternative-labels
_.q-stepper__tab]:(min-h-[72px]) [&.q-stepper__header--alternative-labels
_.q-stepper__tab:first-child]:(items-start) [&.q-stepper__header--alternative-labels
_.q-stepper__tab:last-child]:(items-end) [&_.q-stepper__tab]:(px-[0] py-[24px]) [&_.q-stepper__tab:first-child_.q-stepper__dot]:(translate-x-[24px]) [&_.q-stepper__tab:last-child_.q-stepper__dot]:(-translate-x-[24px]) [&_.q-stepper__dot]:(m-0) [&_.q-stepper__label]:(hidden)`
    )
  ],

  [
    /^q-stepper__header--contracted$/,
    componentClass(
      'q-stepper__header--contracted',
      qe`[&_.q-stepper__tab:not(:last-child)_.q-stepper__dot:after]:(!block)`
    )
  ],

  [/^q-stepper__nav$/, componentClass('q-stepper__nav', `pt-[24px]`)],

  [
    /^q-stepper--flat$/,
    componentClass('q-stepper--flat', `![box-shadow:none]`)
  ],

  [
    /^q-stepper--bordered$/,
    componentClass(
      'q-stepper--bordered',
      `[border-width:1px] border-solid border-[rgba(0,0,0,0.12)]`
    )
  ],

  [
    /^q-stepper--horizontal$/,
    componentClass(
      'q-stepper--horizontal',
      qe`[&_.q-stepper__step-inner]:(p-[24px]) [&_.q-stepper__tab:first-child]:([border-top-left-radius:inherit]) [&_.q-stepper__tab:last-child]:([border-top-right-radius:inherit]) [&_.q-stepper__tab:first-child_.q-stepper__dot:before]:(hidden) [&_.q-stepper__tab:last-child_.q-stepper__label:after]:(hidden) [&_.q-stepper__tab:last-child_.q-stepper__dot:after]:(hidden) [&_.q-stepper__tab]:(overflow-hidden) [&_.q-stepper__line]:(contain-layout) [&_.q-stepper__line:before]:(absolute top-2/4 h-px w-screen bg-[rgba(0,_0,_0,_0.12)]) [&_.q-stepper__line:after]:(absolute top-2/4 h-px w-screen bg-[rgba(0,_0,_0,_0.12)]) [&_.q-stepper__label:after]:(content-[''] left-full ml-[8px]) [&_.q-stepper__dot:after]:(content-[''] left-full ml-[8px]) [&_.q-stepper__dot:before]:(content-[''] right-full mr-[8px]) [&_>_.q-stepper__nav]:(pt-[0] [padding-inline:var(--q-space-xl)] pb-[24px])`
    )
  ],

  [
    /^q-stepper--vertical$/,
    componentClass(
      'q-stepper--vertical',
      qe`px-[0] py-[16px] [&_.q-stepper__tab]:([padding-inline:var(--q-space-xl)] py-[12px]) [&_.q-stepper__title]:(leading-[18px]) [&_.q-stepper__step-inner]:(pt-[0] pr-[24px] pb-[32px] pl-[60px]) [&_>_.q-stepper__nav]:(pt-[24px] [padding-inline:var(--q-space-xl)] pb-[0]) [&_.q-stepper__step]:(overflow-hidden) [&_.q-stepper__dot]:(mr-[12px]) [&_.q-stepper__dot:before]:(content-[''] absolute left-2/4 w-px h-[99999px] bg-[rgba(0,_0,_0,_0.12)]) [&_.q-stepper__dot:after]:(content-[''] absolute left-2/4 w-px h-[99999px] bg-[rgba(0,_0,_0,_0.12)]) [&_.q-stepper__dot:before]:(bottom-full mb-[8px]) [&_.q-stepper__dot:after]:(top-full mt-[8px]) [&_.q-stepper__step:first-child_.q-stepper__dot:before]:(hidden) [&_.q-stepper__step:last-child_.q-stepper__dot:after]:(hidden) [&_.q-stepper__step:last-child_.q-stepper__step-inner]:(pb-[8px])`
    )
  ]
]

export { shortcuts }
