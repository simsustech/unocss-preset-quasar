import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-editor$/,
    (
      [, c],
      { theme }
    ) => `border-solid border border-1px border-op-12 border-color-black border-rd-4px bg-white
    [&>div:first-child]:(rounded-tl-[inherit] rounded-tr-[inherit])
    [&_.q_btn]:(m-4px)
    `
  ],
  [/^q-editor.disabled$/, ([, c], { theme }) => `border-dashed`],
  [
    /^q-editor__toolbars-container$/,
    componentClass(
      'q-editor__toolbars-container',
      `rounded-tl-[inherit] rounded-tr-[inherit]
    [&>div:first-child]:(rounded-tl-[inherit] rounded-tr-[inherit])`
    )
  ],
  [
    /^q-editor__content$/,
    (
      [, c],
      { theme }
    ) => `outline-0 p-10px min-h-10em border-b-inherit border-b-inherit overflow-auto max-w-full
      [&_pre]:(whitespace-pre-wrap)
      [&_hr]:(border-none outline-0 m-1px h-1px bg-black bg-op-12)
      [&:empty:not(:focus):before]:(content-[attr(placeholder)] op-70)
    `
  ],
  [
    /^q-editor__toolbar$/,
    (
      [, c],
      { theme }
    ) => `border-b-solid border-b-color-black border-b-op-12 border-b-1px
    min-h-32px
    `
  ],
  [
    /^q-editor__toolbars-container$/,
    componentClass(
      'q-editor__toolbars-container',
      `max-w-full
    `
    )
  ],
  [
    /^q-editor__toolbar-group$/,
    componentClass(
      'q-editor__toolbar-group',
      qe`relative mx-4px my-0
    [&+.q-editor__toolbar-group:before]:( absolute left--4px top-4px bottom-4px w-1px bg-black bg-op-12)
    `
    )
  ],
  [
    /^q-editor__link-input$/,
    (
      [, c],
      { theme }
    ) => `text-inherit decoration-none normal-case border-none border-rd-0 bg-none outline-0
    `
  ],
  [
    /^q-editor--flat$/,
    componentClass(
      'q-editor--flat',
      qe`border-0
      [&_.q-editor__toolbar]:(border-0)
    `
    )
  ],
  [
    /^q-editor--dense$/,
    (
      [, c],
      { theme }
    ) => qe`[&_.q-editor__toolbar-group]:(flex items-center flex-nowrap)
    `
  ],
  [
    /^q-editor--dark$/,
    componentClass(
      'q-editor--dark',
      qe`border-color-white border-op-28
      [&_.q-editor__content_hr]:(border-color-white border-op-28)
      [&_.q-editor__toolbar]:(border-color-white border-op-28)
      [&_.q-editor__toolbar-group+.q-editor__toolbar-group:before]:(border-color-white border-op-28)

    `
    )
  ]
]

export { shortcuts }
