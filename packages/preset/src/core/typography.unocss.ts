import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
body {
  min-width: 100px;
  min-height: 100%;
  font-family: ${theme.typography.fontFamily};
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: antialiased;
  line-height: 1.5;
  font-size: 14px;
  margin: 0;
  box-sizing: border-box
}

h1 {
  font-size: 6rem;
  font-weight: 300;
  line-height: 6rem;
  letter-spacing: -0.01562em;
}

h2 {
  font-size: 3.75rem;
  font-weight: 300;
  line-height: 3.75rem;
  letter-spacing: -0.00833em;
}

h3 {
  font-size: 3rem;
  font-weight: 400;
  line-height: 3.125rem;
  letter-spacing: normal;
}

h4 {
  font-size: 2.125rem;
  font-weight: 400;
  line-height: 2.5rem;
  letter-spacing: 0.00735em;
}

h5 {
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 2rem;
  letter-spacing: normal;
}

h6 {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 0.0125em;
}

p {
  margin: 0 0 16px;
}
  
small {
  font-size: 80%;
}

big {
  font-size: 170%;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}`
  }
]

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^text-h1$/,
    ([, c], { theme }) =>
      `text-[6rem] font-light leading-[6rem] tracking-[-0.01562em]`
  ],

  [
    /^text-h2$/,
    ([, c], { theme }) =>
      `text-[3.75rem] font-light leading-[3.75rem] tracking-[-0.00833em]`
  ],

  [
    /^text-h3$/,
    ([, c], { theme }) =>
      `text-[3rem] font-normal leading-[3.125rem] tracking-[normal]`
  ],

  [
    /^text-h4$/,
    ([, c], { theme }) =>
      `text-[2.125rem] font-normal leading-10 tracking-[0.00735em]`
  ],

  [
    /^text-h5$/,
    ([, c], { theme }) =>
      `text-[1.5rem] font-normal leading-8 tracking-[normal]`
  ],

  [
    /^text-h6$/,
    ([, c], { theme }) =>
      `text-[1.25rem] font-medium leading-8 tracking-[0.0125em]`
  ],

  [
    /^text-subtitle1$/,
    ([, c], { theme }) =>
      `text-[1rem] font-normal leading-7 tracking-[0.00937em]`
  ],

  [
    /^text-subtitle2$/,
    ([, c], { theme }) =>
      `text-[0.875rem] font-medium leading-[1.375rem] tracking-[0.00714em]`
  ],

  [
    /^text-body1$/,
    ([, c], { theme }) =>
      `text-[1rem] font-normal leading-6 tracking-[0.03125em]`
  ],

  [
    /^text-body2$/,
    ([, c], { theme }) =>
      `text-[0.875rem] font-normal leading-5 tracking-[0.01786em]`
  ],

  [
    /^text-overline$/,
    ([, c], { theme }) =>
      `text-[0.75rem] font-medium leading-8 tracking-[0.16667em]`
  ],

  [
    /^text-caption$/,
    ([, c], { theme }) =>
      `text-[0.75rem] font-normal leading-5 tracking-[0.03333em]`
  ],

  [/^text-uppercase$/, ([, c], { theme }) => `uppercase`],

  [/^text-lowercase$/, ([, c], { theme }) => `lowercase`],

  [/^text-capitalize$/, ([, c], { theme }) => `capitalize`],

  [/^text-center$/, ([, c], { theme }) => `text-center`],

  [/^text-left$/, ([, c], { theme }) => `text-left`],

  [/^text-right$/, ([, c], { theme }) => `text-right`],

  [/^text-justify$/, ([, c], { theme }) => `text-justify`],

  [/^text-italic$/, ([, c], { theme }) => `italic`],

  [/^text-bold$/, ([, c], { theme }) => `font-bold`],

  [/^text-no-wrap$/, ([, c], { theme }) => `whitespace-nowrap`],

  [/^text-strike$/, ([, c], { theme }) => `line-through`],

  [/^text-weight-thin$/, ([, c], { theme }) => `font-thin`],

  [/^text-weight-light$/, ([, c], { theme }) => `font-light`],

  [/^text-weight-regular$/, ([, c], { theme }) => `font-normal`],

  [/^text-weight-medium$/, ([, c], { theme }) => `font-medium`],

  [/^text-weight-bold$/, ([, c], { theme }) => `font-bold`],

  [/^text-weight-bolder$/, ([, c], { theme }) => `font-black`]
]

export { preflights, shortcuts }
