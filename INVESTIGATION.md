# wind4 Compatibility Investigation

## Root Cause

**wind4's `base` layer is NOT actually layered.** UnoCSS outputs wind4 built-in layers
(base, shortcuts, default) as UNLAYERED CSS with `/* layer: name */` comments only.
Only CUSTOM layers (defined in preset `layers` config) get wrapped in `@layer name{}`.

This means:

- `button { background-color: transparent }` (wind4 base reset) — UNLAYERED
- `@layer components-base { .q-btn--standard { background: var(--primary) } }` — LAYERED

**Unlayered CSS always beats layered CSS**, regardless of specificity.
`.q-btn--standard` (specificity 0,1,0) loses to `button` (specificity 0,0,1)
because the former is in `@layer` and the latter isn't.

## Affected CSS (verified via Playwright diagnostics)

| Component                     | Depends on                                | Broken? | Computed                              |
| ----------------------------- | ----------------------------------------- | ------- | ------------------------------------- |
| QBtn standard (no color)      | `layer-components-base:bg-$light-primary` | ❌      | `rgba(0,0,0,0)`                       |
| QBtn standard (color=primary) | `.bg-primary` (Quasar JS, unlayered)      | ✓       | `oklab(0.496...)`                     |
| QBtn flat                     | `layer-components:bg-transparent`         | ✓       | `rgba(0,0,0,0)` (same value as reset) |
| QBtn outline                  | `layer-components:bg-transparent`         | ✓       | `rgba(0,0,0,0)` (same value as reset) |
| QCard                         | Direct theme vars, no layer prefix        | ✓       | Correct background                    |
| QDrawer                       | Direct theme vars, no layer prefix        | ✓       | Correct background                    |

## Other Issues

1. **Normalize CSS duplication**: `src/core/index.ts` contains the old beasties/normalize.css
   from wind3 era (282 lines). Redundant with wind4's built-in reset.

2. **translate → transform conflict** (already fixed): 21+ component files changed
   `translate-x/y-*` → `[transform:translateX/Y(...)]`.

## Findings

### Scoping Mechanism Broken for QBtn

The preset uses `scopeStyle` to prefix CSS selectors with `body.quasar-style-{name}`
for multi-style coexistence. This mechanism:

- ✅ Works for QDrawer (5 scoped rules found in browser)
- ❌ Fails for QBtn (0 scoped rules found in browser)
- QBtn shortcuts ARE well-formed (same pattern as QDrawer)
- Standalone generator produces correct CSS when unscoped
- Multiple scoped QuasarPreset instances crash `createGenerator` but not vitrify

The result: QBtn CSS rules (.q-btn with background-color, .q-btn--standard) are
NEVER injected into the browser stylesheet. The wind4 base reset `button { background: transparent }`
is the only rule that applies → transparent button.

### Confirmed: Code is Correct

The standalone UnoCSS generator (single preset, unscoped) produces:

```css
.q-btn {
  background-color: color-mix(
    in oklab,
    var(--light-primary) var(--un-bg-opacity),
    transparent
  );
  color: color-mix(
    in oklab,
    var(--light-on-primary) var(--un-text-opacity),
    transparent
  );
}
```

This is exactly what's needed per MD3 spec.

### What Doesn't Help

- `outputToCssLayers: true/false` — no effect on the missing scoped CSS
- `layer-` prefixes on shortcuts — already removed, no effect
- Removing normalize CSS — removed from core preflights (good cleanup but unrelated)
- Restarting vitrify with cleared caches — no effect

### Likely Root Cause

The `scopeStyle` postprocess pipeline is failing silently when processing QBtn
shortcuts. The postprocess uses `tagShortcutsWithLayer` to tag utilities with
a bodyClass layer, then wraps matching utilities. QBtn utilities may have a layer
that doesn't match `bodyClass` (e.g. `'default'` instead of `'quasar-style-md3'`)
because the `tagShortcutsWithLayer` meta is being dropped somewhere in UnoCSS's
shortcut resolution.

### Actions Taken

1. ✅ Removed beasties normalize CSS (282 lines) from `src/core/index.ts`
2. ✅ Kept layers config: `components-base: -3, components: -2, components-state: -1`
3. ✅ `outputToCssLayers: false` (layers cause issues with wind4's unlayered reset)
4. ✅ All `layer-` prefixes removed from shortcuts
5. ✅ QBtn shortcuts use vanilla UnoCSS utilities (bg-$light-primary, etc.)

### Remaining Issue

**Scoping mechanism does not produce QBtn CSS** — needs root-cause investigation.
Cannot fix without debug logging in the postprocess (nono sandbox blocks fs writes).
