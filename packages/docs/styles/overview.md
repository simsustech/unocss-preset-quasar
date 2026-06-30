# Style System Overview

The preset supports three design systems, each implemented as a `QuasarStyle` object. Choose one or combine them with scoped mode.

## Architecture

```
QuasarStyle
├── rules: Rule[]           — UnoCSS rules (generated CSS properties)
├── variants: Variant[]     — UnoCSS variants (dark mode, breakpoints)
├── preflights: Preflight[] — Global CSS (CSS reset, CSS variables)
├── shortcuts: Shortcut[]   — Component class mappings
└── postprocess?: Postprocessor[] — Optional post-processing hooks
```

Each style is a complete set of component styles. MD3 and MD2 share common helpers (`_helpers.ts`) and some shared plugin/directive/composable styles.

## Available Styles

### `MaterialDesign3` (MD3 / Material You)

The default and recommended style. Implements Google's Material Design 3 specification with:

- Dynamic color system (tonal palettes from a single source color)
- 24-level elevation system
- State layers (hover, focus, pressed)
- Container-based surface hierarchy
- Rounded corners with pill-shaped elements

```ts
import { MaterialDesign3 } from 'unocss-preset-quasar/styles'
```

**Body class:** `quasar-style-md3`

### `MaterialDesign2` (MD2 / Classic Material)

The classic Material Design aesthetic. Features:

- Flat, square-cornered components
- Shadow-based elevation (no surface containers)
- Uppercase button text
- Higher contrast surfaces

```ts
import { MaterialDesign2 } from 'unocss-preset-quasar/styles'
```

**Body class:** `quasar-style-md2`

### `Unstyled`

Structural-only styles. Components have positioning, flex, and box-model properties but **no colors, typography, borders, or visual styling**. Use this as a clean foundation for custom design systems.

```ts
import { Unstyled } from 'unocss-preset-quasar/styles'
```

**Body class:** `quasar-style-unstyled`

## Covered Components

All three styles provide shortcuts for 70+ Quasar components:

| Category       | Components                                                                                                        |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Layout**     | QLayout, QHeader, QFooter, QDrawer, QPage, QPageContainer, QPageSticky, QPageScroller                             |
| **Buttons**    | QBtn, QBtnDropdown, QBtnGroup, QBtnToggle, QFab                                                                   |
| **Forms**      | QField, QInput, QSelect, QCheckbox, QRadio, QToggle, QSlider, QRange, QFile, QForm, QEditor, QColor, QDate, QTime |
| **Data**       | QTable, QMarkupTable, QTree, QPagination                                                                          |
| **Navigation** | QTabs, QTab, QRouteTab, QTabPanels, QTabPanel, QStepper, QBreadcrumbs                                             |
| **Overlays**   | QDialog, QMenu, QTooltip, QPopupEdit, QBottomSheet                                                                |
| **Content**    | QCard, QList, QItem, QSeparator, QAvatar, QBadge, QChip, QBanner, QBar, QToolbar                                  |
| **Media**      | QImg, QVideo, QCarousel, QParallax, QResponsive, QIntersection                                                    |
| **Feedback**   | QAjaxBar, QLinearProgress, QCircularProgress, QKnob, QRating, QSpinner, QSkeleton, QInnerLoading, QLoading        |
| **Scroll**     | QScrollArea, QVirtualScroll, QPullToRefresh, QInfiniteScroll                                                      |
| **Misc**       | QIcon, QSpace, QSlideItem, QTimeline, QSplitter, QUploader, QChatMessage, QExpansionItem                          |

## Style Comparison

| Feature            | MD3                | MD2              | Unstyled |
| ------------------ | ------------------ | ---------------- | -------- |
| Colors             | Full MD3 palette   | Full MD2 palette | None     |
| Elevation          | Tonal surfaces     | Box shadows      | None     |
| Shape              | Rounded (28px FAB) | Square           | None     |
| Typography         | MD3 type scale     | MD2 type scale   | None     |
| Button text        | Normal case        | Uppercase        | None     |
| Surface containers | 5 levels           | Flat             | None     |
| State layers       | Hover/focus/press  | None             | None     |
