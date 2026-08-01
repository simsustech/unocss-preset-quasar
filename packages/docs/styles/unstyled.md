# Unstyled

The Unstyled style provides **structural-only** component styles. No colors, no typography, no borders — just the positioning, flex, and box-model properties needed for components to render correctly.

## How It Works

When the `quasar-style-unstyled` body class is active, all design tokens resolve to neutral values:

```css
body.quasar-style-unstyled {
  --q-primary: transparent;
  --q-on-primary: inherit;
  --q-radius-xl: 0;
  --q-font-md: inherit;
  --q-surface: transparent;
  /* ...all tokens set to transparent/0/inherit/none */
}
```

Component shortcuts reference these tokens (`var(--q-primary)`, `var(--q-radius-xl)`, etc.), so when the unstyled body class is active, every color becomes transparent, every radius becomes zero, and every font size inherits from the parent. No theme values leak through — components render with their structural CSS only.

## What's Included

Unstyled provides the **minimum CSS** for Quasar components to function:

- `position: relative/absolute/fixed` where needed
- `display: flex/inline-flex/block` for layout
- `overflow: hidden` for scroll containers
- `width: 100%` for full-width components
- `z-index` for overlay components (dialog, menu, tooltip)
- `cursor: pointer` for interactive elements

## What's NOT Included

- No colors (backgrounds, text colors, borders)
- No typography (font-size, font-weight, line-height)
- No spacing (padding, margin)
- No elevation (box-shadow)
- No shape (border-radius)
- No state layers (hover, focus, press)

## Usage

```ts
import { UnstyledStyleEntry } from 'unocss-preset-quasar/styles'

QuasarPreset({
  styles: [UnstyledStyleEntry]
})
```

## When to Use Unstyled

- **Building a custom design system**: Use Unstyled as a clean foundation and layer your own styles on top
- **CSS-in-JS or Tailwind**: You style everything yourself and only need the structural CSS
- **Design system prototyping**: Get components rendering quickly, then apply styling iteratively
- **Multiple themes**: Combine Unstyled with runtime theme application via `setThemeColors()`

## Example: Custom Styling on Unstyled

```ts
// uno.config.ts
export default defineConfig({
  shortcuts: {
    // Override QBtn with your own style
    'q-btn': 'px-6 py-2 bg-blue-500 text-white rounded-lg font-medium',
    'q-card': 'bg-white rounded-xl shadow-lg p-6',
    'q-dialog__inner': 'bg-white rounded-2xl shadow-2xl max-w-md w-full'
  }
})
```

## Covered Components

Unstyled covers fewer components than MD2/MD3 — it focuses on the most commonly used ones:

QAvatar, QBadge, QBtn, QBtnDropdown, QBtnToggle, QCard, QChip, QDate, QDrawer, QFooter, QHeader, QIcon, QImg, QInput, QItem, QMenu, QPage, QPageSticky, QSeparator, QTabs, QToolbar, QTooltip

## Files

Unstyled component tokens are in `packages/preset/src/core/_tokens.ts` — the `unstyled` block.
