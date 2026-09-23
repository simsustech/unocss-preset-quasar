/**
 * Quasar's own `@keyframes`, verbatim from
 * `specs/reference/raw/reference-bundle.css.txt`.
 *
 * They are emitted as one CSS text block rather than from the rules that use
 * them: a UnoCSS rule body cannot carry an at-rule (a nested `'@keyframes …'`
 * key is stringified as `[object Object]`, exactly like `@media`), and the
 * declarations that consume them are spread across modules — `q-spin` and
 * `q-mat-dash` belong to the spinner, the `q-skeleton--*` family to the
 * skeleton, the indeterminate pair to the linear progress, and `q-autofill`
 * and `q-field-label` to the field.
 *
 * The `une*` keyframes that animated-unocss ships are *not* here: that preset
 * emits them alongside the `.animated-*` classes that name them.
 */
export const quasarKeyframesCss = [
  '@keyframes q-circular-progress-circle { 0% { stroke-dasharray: 1, 400; stroke-dashoffset: 0; } 50% { stroke-dasharray: 400, 400; stroke-dashoffset: -100; } 100% { stroke-dasharray: 400, 400; stroke-dashoffset: -300; } }',
  '@keyframes q-field-label { 40% { margin-left: 2px; } 60%, 80% { margin-left: -2px; } 70%, 90% { margin-left: 2px; } }',
  '@keyframes q-autofill { to { background: transparent; color: inherit; } }',
  '@keyframes q-linear-progress--indeterminate { 0% { transform: translate3d(-35%, 0, 0) scale3d(0.35, 1, 1); } 60% { transform: translate3d(100%, 0, 0) scale3d(0.9, 1, 1); } 100% { transform: translate3d(100%, 0, 0) scale3d(0.9, 1, 1); } }',
  '@keyframes q-linear-progress--indeterminate-short { 0% { transform: translate3d(-101%, 0, 0) scale3d(1, 1, 1); } 60% { transform: translate3d(107%, 0, 0) scale3d(0.01, 1, 1); } 100% { transform: translate3d(107%, 0, 0) scale3d(0.01, 1, 1); } }',
  // The `/* rtl:ignore */` comments are part of the reference's text: without
  // them Quasar's RTL transform rewrites the rotate3d arguments.
  '@keyframes q-spin { 0% { transform: rotate3d(0, 0, 1, 0deg) /* rtl:ignore */; } 25% { transform: rotate3d(0, 0, 1, 90deg) /* rtl:ignore */; } 50% { transform: rotate3d(0, 0, 1, 180deg) /* rtl:ignore */; } 75% { transform: rotate3d(0, 0, 1, 270deg) /* rtl:ignore */; } 100% { transform: rotate3d(0, 0, 1, 359deg) /* rtl:ignore */; } }',
  '@keyframes q-mat-dash { 0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; } 50% { stroke-dasharray: 89, 200; stroke-dashoffset: -35px; } 100% { stroke-dasharray: 89, 200; stroke-dashoffset: -124px; } }',
  '@keyframes q-skeleton--fade { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }',
  '@keyframes q-skeleton--pulse { 0% { transform: scale(1); } 50% { transform: scale(0.85); } 100% { transform: scale(1); } }',
  '@keyframes q-skeleton--pulse-x { 0% { transform: scaleX(1); } 50% { transform: scaleX(0.75); } 100% { transform: scaleX(1); } }',
  '@keyframes q-skeleton--pulse-y { 0% { transform: scaleY(1); } 50% { transform: scaleY(0.75); } 100% { transform: scaleY(1); } }',
  '@keyframes q-skeleton--wave { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }',
  // The spinner family (q-spinner-dots, -comment, -hearts, -infinity, -ios,
  // -puff, -radio, -rings), the notification entries and the two this preset's
  // own declarations name (`q-scale`, `q-expansion-done`). Verbatim from
  // quasar/dist/quasar.css, `/* rtl:ignore */` markers included.
  '@keyframes q-expansion-done { 0% { --q-exp-done: 1; }  }',
  '@keyframes q-comment-typing1 { 0% { opacity: 0; } 20%, 100% { opacity: 1; }  }',
  '@keyframes q-comment-typing2 { 0%, 20% { opacity: 0; } 40%, 100% { opacity: 1; }  }',
  '@keyframes q-comment-typing3 { 0%, 40% { opacity: 0; } 60%, 100% { opacity: 1; }  }',
  '@keyframes q-dots-pulse { 0%, 100% { r: 15px; fill-opacity: 1; } 50% { r: 9px; fill-opacity: 0.5; }  }',
  '@keyframes q-grid-fade { 0%, 100% { fill-opacity: 1; } 50% { fill-opacity: 0.2; }  }',
  '@keyframes q-hearts-pulse { 0%, 100% { fill-opacity: 0.5; } 50% { fill-opacity: 1; }  }',
  '@keyframes q-infinity-dash { 0% { stroke-dashoffset: 0 /* rtl:ignore */; } 100% { stroke-dashoffset: 21.3824106852 /* rtl:ignore */; }  }',
  '@keyframes q-ios-fade { 0% { stroke-opacity: 1; } 9.09% { stroke-opacity: 0.85; } 18.18% { stroke-opacity: 0.7; } 27.27% { stroke-opacity: 0.65; } 36.36% { stroke-opacity: 0.55; } 45.45% { stroke-opacity: 0.45; } 54.55% { stroke-opacity: 0.35; } 63.64% { stroke-opacity: 0.25; } 72.73% { stroke-opacity: 0.15; } 81.82% { stroke-opacity: 0.1; } 90.91% { stroke-opacity: 0; } 100% { stroke-opacity: 1; }  }',
  '@keyframes q-puff-expand { 0% { r: 1px; } 100% { r: 20px; }  }',
  '@keyframes q-puff-fade { 0% { stroke-opacity: 1; } 100% { stroke-opacity: 0; }  }',
  '@keyframes q-radio-fade { 0% { opacity: 0; } 50%, 100% { opacity: 1; }  }',
  '@keyframes q-rings-expand { 0% { r: 6px; stroke-opacity: 1; stroke-width: 2px; } 100% { r: 22px; stroke-opacity: 0; stroke-width: 0; }  }',
  '@keyframes q-rings-center { 0%, 100% { r: 6px; } 16.67% { r: 1px; } 33.33% { r: 2px; } 50% { r: 3px; } 66.67% { r: 4px; } 83.33% { r: 5px; }  }',
  '@keyframes q-notif-badge { 15% { transform: translateX(-25%) rotate(-5deg); } 30% { transform: translateX(20%) rotate(3deg); } 45% { transform: translateX(-15%) rotate(-3deg); } 60% { transform: translateX(10%) rotate(2deg); } 75% { transform: translateX(-5%) rotate(-1deg); }  }',
  '@keyframes q-notif-progress { 0% { transform: scaleX(1); } 100% { transform: scaleX(0); }  }',
  '@keyframes q-scale { 0% { transform: scale(1); } 50% { transform: scale(1.04); } 100% { transform: scale(1); }  }',
  '@keyframes q-fade { 0% { opacity: 0; } 100% { opacity: 1; }  }',
  '@keyframes q-field-message { from { opacity: 0; transform: translateY(-10px); }  }'
].join('\n')
