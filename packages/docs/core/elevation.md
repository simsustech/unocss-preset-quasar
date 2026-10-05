# Elevation & Z-index

Elevation has two expressions — box shadows for MD2-era depth, tonal surfaces for MD3 — plus one z-index scale that every overlay in the preset obeys.

## Shadow levels

```html
<div class="elevation-2">raised</div>
<!-- also: q-elevation-2 -->
<div class="shadow-none">flat</div>
<!-- alias: no-shadow -->
```

| Utility                       | Token                    | MD3 value                                        | MD2 value                                 |
| ----------------------------- | ------------------------ | ------------------------------------------------ | ----------------------------------------- |
| `elevation-0`                 | `--q-elevation-level0`   | `none`                                           | `none`                                    |
| `elevation-1` … `elevation-5` | `--q-elevation-level1…5` | spec vectors: blur 3/6/10/14/20, ambient 20–30 % | Quasar's `$shadow-1…5` three-layer tables |

Five levels, not twenty-four: the preset's scale is Quasar's `$shadow-N` and the MD3 spec's five rungs. Component rules reference the same tokens under the `--q-elevation-<n>` alias, so components and utilities always agree.

The shadow **color** is a token too (`--q-shadow-color` light, `--q-dark-shadow-color` dark) — dark mode shadows stay light-tinted instead of shadowing black on black.

## The z-index scale

One scale, stated once ([Decisions](/architecture/decisions) ADR-0007), from lowest to highest:

| Tier                | z                    | Members / utility                                     |
| ------------------- | -------------------- | ----------------------------------------------------- |
| Side panel, in flow | 1000                 | `.q-drawer`                                           |
| Floating content    | 1400                 | `.q-page-sticky`                                      |
| Marginals           | 2000 / opener 2001   | `z-marginals` — header, footer, bar, drawer opener    |
| Side panel, overlay | 3000 (backdrop 2999) | `.q-drawer--on-top`, `.q-drawer__backdrop`            |
| Menus & dialogs     | 6000                 | `z-fullscreen` — menu, dialog, table head, carousel   |
| Top utility         | 7000                 | `z-top`                                               |
| Tooltip             | 9000                 | `.q-tooltip`                                          |
| Notify / loading    | 9499 / 9500          | `z-notify` (9500)                                     |
| Maximum             | 9998                 | `z-max` — ajax bar                                    |
| Inherit / fab       | —                    | `z-inherit` (`z-index: inherit`), `z-fab` (FAB layer) |

```html
<div class="z-top">above dialogs</div>
<div class="z-max">almost nothing beats this</div>
```

The contract in edges: **overlay drawer > the app bar and the bottom nav** (the drawer spans the full viewport, so at 1500 the marginals covered its own close button and last nav item), **overlay drawer < menus/dialogs** (an open drawer never covers a modal — the reference's 7000 did), and **menus/dialogs < tooltip < notify < loading**. If you override z-index in app CSS, override against the tier, not a raw number.

## Tonal elevation (MD3)

MD3 expresses most elevation through the surface container scale instead of shadows — see [MD3 surfaces](/styles/material-design-3#surfaces-instead-of-shadows). The shadow levels remain available and are what MD2 components use.

Related: [Positioning](/core/positioning) · [Theming & Tokens](/core/theming)
