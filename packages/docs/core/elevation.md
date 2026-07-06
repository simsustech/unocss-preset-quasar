# Elevation & Shadows

The preset provides Material Design elevation shortcuts (levels 1–24) and standard shadow utilities.

## Elevation Levels

```html
<div class="elevation-1">Level 1 — subtle</div>
<div class="elevation-4">Level 4 — card</div>
<div class="elevation-8">Level 8 — dialog</div>
<div class="elevation-12">Level 12 — menu</div>
<div class="elevation-16">Level 16 — nav drawer</div>
<div class="elevation-24">Level 24 — maximum</div>
```

Each elevation level combines three `box-shadow` layers (ambient, penumbra, umbra) with Material Design's exact specifications:

```
elevation-1 →
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2),
              0px 1px 1px 0px rgba(0,0,0,0.14),
              0px 2px 1px -1px rgba(0,0,0,0.12)
```

Levels 1–24 are available. Higher levels indicate higher z-axis position relative to the surface.

## Shadow Utilities

```html
<div class="shadow-none">No shadow</div>
<div class="no-shadow">Also no shadow</div>
<div class="shadow-sm">Small shadow (~elevation 1–3)</div>
<div class="shadow">Default shadow (~elevation 4–8)</div>
<div class="shadow-md">Medium shadow (~elevation 9–12)</div>
<div class="shadow-lg">Large shadow (~elevation 13–18)</div>
<div class="shadow-xl">Extra large shadow (~elevation 19–24)</div>
```

The `shadow-{N}` shortcut maps to approximate Tailwind/Wind shadow sizes:

| Shortcut                   | Elevation range | Maps to     |
| -------------------------- | --------------- | ----------- |
| `shadow-1` to `shadow-3`   | 1–3             | `shadow-sm` |
| `shadow-4` to `shadow-8`   | 4–8             | `shadow`    |
| `shadow-9` to `shadow-12`  | 9–12            | `shadow-md` |
| `shadow-13` to `shadow-18` | 13–18           | `shadow-lg` |
| `shadow-19` to `shadow-24` | 19–24           | `shadow-xl` |

## Z-Index Layers

The preset includes z-index shortcuts for Quasar's layer system:

```html
<div class="z-fab">FAB — 990</div>
<div class="z-side">Side panel — 1000</div>
<div class="z-marginals">Header/Footer — 2000</div>
<div class="z-fullscreen">Fullscreen — 6000</div>
<div class="z-notify">Notifications — 9500</div>
<div class="z-top">Top — 7000</div>
<div class="z-max">Maximum — 9998</div>
<div class="z-inherit">Inherit</div>
```

Layer values (from Quasar's z-index system):

| Class          | Value | Usage                  |
| -------------- | ----- | ---------------------- |
| `z-fab`        | 990   | Floating action button |
| `z-side`       | 1000  | Side panels            |
| `z-marginals`  | 2000  | Header, footer         |
| `z-fullscreen` | 6000  | Fullscreen overlay     |
| `z-top`        | 7000  | Top-level overlays     |
| `z-notify`     | 9500  | Notification system    |
| `z-max`        | 9998  | Maximum stacking       |

## UnoCSS Fallback

All standard UnoCSS shadow utilities work:

```html
<div class="shadow shadow-gray-500/50">Tinted shadow</div>
<div class="shadow-[0_4px_20px_rgba(0,0,0,0.3)]">Arbitrary shadow</div>
```
