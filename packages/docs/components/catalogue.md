# Component Catalogue

Every Quasar component the preset styles, grouped by family. The preset derives each component's full class vocabulary from your markup — mentioning `<q-btn>` (or `QBtn`) generates `q-btn`, `q-btn--flat`, `q-btn--dense`, and every other modifier Quasar can compose — so the root class below is the entry point, not the whole surface.

Two behaviors apply to every row:

- **Styling is token-driven.** Nothing here hard-codes a color or radius; the values come from the active style (see [Styles](/styles/overview)). Switching style restyles the whole catalogue.
- **Unlisted styles don't ship.** Only the entries in `styles` are emitted — see [Styles & Scoping](/architecture/style-configuration).

## Layout & pages

| Component       | Root class                                              | Notes                                      |
| --------------- | ------------------------------------------------------- | ------------------------------------------ |
| QLayout         | `q-layout` (+ `q-layout-container`, `q-page`, `q-body`) | Also states the layout's part selectors    |
| QPage           | `q-page`                                                | Page sizing within the layout              |
| QHeader         | `q-header`                                              | Marginal band, z-index 2000                |
| QFooter         | `q-footer`                                              | Marginal band, z-index 2000                |
| QDrawer         | `q-drawer` (+ `q-drawer-container`)                     | In-flow 1000 / overlay 1500, backdrop 1499 |
| QToolbar        | `q-toolbar`                                             | Min-height and font size from tokens       |
| QBar            | `q-bar`                                                 |                                            |
| QSplitter       | `q-splitter`                                            |                                            |
| QSpace          | `q-space`                                               | Flex spacer                                |
| QResizeObserver | —                                                       | No own CSS; behavior-only component        |

## Navigation

| Component               | Root class          | Notes                                    |
| ----------------------- | ------------------- | ---------------------------------------- |
| QTabs / QTab            | `q-tabs`            | Tab indicator color/size from tokens     |
| QTabPanels / QTabPanel  | `q-tab-panels`      |                                          |
| QBreadcrumbs            | `q-breadcrumbs`     |                                          |
| QPagination             | `q-pagination`      | Gutter from tokens                       |
| QMenu                   | `q-menu`            | Overlay band (6000)                      |
| QTree                   | `q-tree`            |                                          |
| QStepper / QStepperStep | `q-stepper`         | Step font size from tokens               |
| QExpansionItem          | `q-expansion-item`  |                                          |
| QPanelParent            | `q-panel-parent`    |                                          |
| QPopupProxy             | —                   | No own CSS; the popup it wraps is styled |
| QSlideItem              | `q-slide-item`      |                                          |
| QPullToRefresh          | `q-pull-to-refresh` |                                          |
| QScrollArea             | `q-scrollarea`      | Thumb/bar states                         |
| QScrollObserver         | —                   | No own CSS; behavior-only component      |

## Buttons & actions

| Component    | Root class       | Notes                                                                           |
| ------------ | ---------------- | ------------------------------------------------------------------------------- |
| QBtn         | `q-btn`          | Standard/flat/outline/push/round/rounded/square variants, pressed-state shadows |
| QBtnGroup    | `q-btn-group`    |                                                                                 |
| QBtnToggle   | `q-btn-toggle`   |                                                                                 |
| QBtnDropdown | `q-btn-dropdown` |                                                                                 |
| QFab         | `q-fab`          | Size, radius, color from tokens                                                 |

## Forms & inputs

| Component             | Root class                  | Notes                                                         |
| --------------------- | --------------------------- | ------------------------------------------------------------- |
| QField                | `q-field`                   | Label push-down and min-height are per-style tokens           |
| QInput                | `q-input`                   |                                                               |
| QTextarea             | `q-textarea`                |                                                               |
| QSelect               | `q-select`                  |                                                               |
| QOptionGroup          | `q-option-group`            | radio/checkbox/toggle group                                   |
| QCheckbox             | `q-checkbox`                | Shape and state-layer per style                               |
| QRadio                | `q-radio`                   |                                                               |
| QToggle               | `q-toggle`                  | Track/thumb geometry is per-style (md3 pill vs md2 rectangle) |
| QRange                | `q-range`                   |                                                               |
| QSlider               | `q-slider`                  |                                                               |
| QKnob                 | `q-knob`                    |                                                               |
| QRating               | `q-rating`                  |                                                               |
| QForm                 | `q-form`                    |                                                               |
| QDate                 | `q-date`                    | Day-cell layout, per-style date colors                        |
| QTime                 | `q-time`                    |                                                               |
| QColor / QColorPicker | `q-color`, `q-color-picker` |                                                               |
| QUploader             | `q-uploader`                |                                                               |
| QFile                 | `q-file`                    |                                                               |
| QEditor               | `q-editor`                  |                                                               |

## Data display

| Component                         | Root class          | Notes                                                 |
| --------------------------------- | ------------------- | ----------------------------------------------------- |
| QTable                            | `q-table`           | Head sits in the overlay band (6000)                  |
| QMarkupTable                      | `q-markup-table`    |                                                       |
| QList                             | `q-list`            |                                                       |
| QItem / QItemSection / QItemLabel | `q-item`            | Active-row colors from tokens                         |
| QAvatar                           | `q-avatar`          |                                                       |
| QBadge                            | `q-badge`           | Floating/outline variants                             |
| QChip                             | `q-chip`            | Min-height from tokens                                |
| QTimeline                         | `q-timeline`        |                                                       |
| QVirtualScroll                    | `q-virtual-scroll`  | Item size from tokens                                 |
| QInfiniteScroll                   | `q-infinite-scroll` |                                                       |
| QIntersection                     | `q-intersection`    |                                                       |
| QCarousel                         | `q-carousel`        | Overlay band (6000)                                   |
| QImg                              | `q-img`             |                                                       |
| QVideo                            | `q-video`           |                                                       |
| QResponsive                       | `q-responsive`      |                                                       |
| QParallax                         | `q-parallax`        |                                                       |
| QMessage                          | `q-message`         | Chat-style bubbles (`.q-message-text--sent/received`) |

## Overlays & feedback

| Component         | Root class                                         | Notes                                               |
| ----------------- | -------------------------------------------------- | --------------------------------------------------- |
| QDialog           | `q-dialog` (+ `q-dialog-plugin`, `q-bottom-sheet`) | Scrim and surface per scheme; overlay band (6000)   |
| QTooltip          | `q-tooltip`                                        | Own media-query family; band 9000                   |
| QNotification     | `q-notification`                                   | Plugin-driven; safelisted via `plugins: ['Notify']` |
| QInnerLoading     | `q-inner-loading`                                  |                                                     |
| QLoading          | `q-loading`                                        | Plugin-driven; band 9500                            |
| QAjaxBar          | `q-loading-bar`                                    | LoadingBar plugin; band 9998                        |
| QPopupEdit        | `q-popup-edit`                                     |                                                     |
| QBanner           | `q-banner`                                         | Min-height from tokens                              |
| QLinearProgress   | `q-linear-progress`                                | Speed token                                         |
| QCircularProgress | `q-circular-progress`                              |                                                     |
| QSkeleton         | `q-skeleton`                                       |                                                     |
| QSpinner          | `q-spinner`                                        | Sized by Quasar's spinner set                       |

## Behavioral & misc

| Component | Root class                                                         | Notes                                                      |
| --------- | ------------------------------------------------------------------ | ---------------------------------------------------------- |
| QRipple   | `q-ripple`                                                         | Directive-driven modifiers are allowlisted in the safelist |
| QNoSsr    | `q-no-ssr`                                                         |                                                            |
| QIcon     | `q-icon` (+ font families: `material-icons`, `material-symbols-*`) | Glyph classes come from `iconSet` / value extraction       |
| —         | `q-dark`                                                           | Element-scoped dark colors (see [Colors](/core/colors))    |

## What is _not_ here

- **Plugin-generated markup** (`$q.dialog()`, `$q.notify()`, …) has no template to scan; its classes are safelisted per declared plugin — see [Plugins](/plugins/overview).
- **Third-party library components** (QCalendar, QMarkdown, QMediaPlayer) are opt-in via `appExtensions` — see [App Extensions](/app-extensions/overview).
- **Engine utilities** (`flex`, `p-4`, palette `bg-*`/`text-*`) are not Quasar components; see the [Core Utilities](/core/theming) section.
