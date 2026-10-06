---
'unocss-preset-quasar': patch
---

Pair a dark `bg-primary`/`bg-secondary`/`bg-accent` with its on-colour when the
label asks for white.

Quasar's `color="primary"` prop paints `bg-primary text-white` in one go. The
brand tokens flip to light tints in dark mode, so that white label measured
**1.71:1** on the fill (`#ffffff` on `#4cd9df`) — the 404 CTA and the pagination
buttons in the 2026-10-06 layout audit. The preset now emits

```css
.body--dark .bg-primary.text-white {
  color: var(--q-on-primary);
}
```

and the same for `secondary` (`--q-on-secondary`) and `accent`
(`--q-on-tertiary`) — the pairing `.q-badge`, `.q-btn-toggle > .q-btn-item` and
`.q-btn` (through `--q-btn-color`) already state, measured at 7.66:1. Light mode
is untouched: white on `#00696d` is 6.48:1.

Guarded by `packages/preset/test/colors.test.ts`.
