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
  '@keyframes q-skeleton--wave { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }'
].join('\n')
