import type { Preflight } from '@unocss/core'

/**
 * Visibility preflight — responsive breakpoint hides and q-focus-helper styles.
 *
 * These need @media queries and pseudo-elements (::before, ::after) which
 * UnoCSS rules can't produce, so they live in a preflight.
 *
 * Ported from core/visibility.unocss.ts preflights.
 */
export const visibilityPreflight: Preflight = {
  getCSS: () => `@media (max-width: 599.98px) {
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

@media all and (orientation: portrait) {
  .orientation-landscape { display: none !important; }
}
@media all and (orientation: landscape) {
  .orientation-portrait { display: none !important; }
}
@media screen {
  .print-only { display: none !important; }
}
@media print {
  .print-hide { display: none !important; }
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
body.desktop .q-focus-helper:before { background: #000; }
body.desktop .q-focus-helper:after { background: #fff; }
body.desktop .q-focus-helper--rounded { border-radius: 4px; }
body.desktop .q-focus-helper--round { border-radius: 50%; }
body.desktop .q-focusable:focus > .q-focus-helper,
body.desktop .q-manual-focusable--focused > .q-focus-helper,
body.desktop .q-hoverable:hover > .q-focus-helper {
  background: currentColor;
  opacity: 0.15;
}
body.desktop .q-focusable:focus > .q-focus-helper:before,
body.desktop .q-manual-focusable--focused > .q-focus-helper:before,
body.desktop .q-hoverable:hover > .q-focus-helper:before {
  opacity: 0.1;
}
body.desktop .q-focusable:focus > .q-focus-helper:after,
body.desktop .q-manual-focusable--focused > .q-focus-helper:after,
body.desktop .q-hoverable:hover > .q-focus-helper:after {
  opacity: 0.4;
}
body.desktop .q-focusable:focus > .q-focus-helper,
body.desktop .q-manual-focusable--focused > .q-focus-helper {
  opacity: 0.22;
}`
}
