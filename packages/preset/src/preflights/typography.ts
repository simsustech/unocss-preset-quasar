import type { Preflight } from '@unocss/core'

/**
 * Typography preflight — ported from core/typography.unocss.ts.
 *
 * Global body font styles and heading typography scale.
 */
export const typographyPreflight: Preflight = {
  getCSS: () => `body {
  font-family: var(--q-font-family, 'Roboto', sans-serif);
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: antialiased;
  line-height: 1.5;
  font-size: 14px;
  margin: 0;
  box-sizing: border-box;
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
