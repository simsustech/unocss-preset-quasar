import { type Preflight, type Rule, type Shortcut, type Variant } from 'unocss'
import { type QuasarTheme } from '../../theme.js'
import type { QuasarStyle } from '../index.js'

import {
  shortcuts as QLayoutShortcuts,
  preflights as QLayoutPreflights
} from './components/QLayout.unocss.js'
import { shortcuts as QPageShortcuts } from './components/QPage.unocss.js'
import { shortcuts as QHeaderShortcuts } from './components/QHeader.unocss.js'
import { shortcuts as QFooterShortcuts } from './components/QFooter.unocss.js'
import { shortcuts as QDrawerShortcuts } from './components/QDrawer.unocss.js'
import { shortcuts as QPageStickyShortcuts } from './components/QPageSticky.unocss.js'
import { shortcuts as QToolbarShortcuts } from './components/QToolbar.unocss.js'
import { shortcuts as QBtnShortcuts } from './components/QBtn.unocss.js'
import { shortcuts as QCardShortcuts } from './components/QCard.unocss.js'
import { shortcuts as QIconShortcuts } from './components/QIcon.unocss.js'
import { shortcuts as QItemShortcuts } from './components/QItem.unocss.js'
import { shortcuts as QChipShortcuts } from './components/QChip.unocss.js'
import { preflights as QChipPreflights } from './components/QChip.unocss.js'
import {
  shortcuts as QFieldShortcuts,
  preflights as QFieldPreflights
} from './components/QField.unocss.js'
import { shortcuts as QMenuShortcuts } from './components/QMenu.unocss.js'
import {
  shortcuts as QSpinnerShortcuts,
  preflights as QSpinnerPreflights
} from './components/QSpinner.unocss.js'
import { shortcuts as QImgShortcuts } from './components/QImg.unocss.js'
import { shortcuts as QSeparatorShortcuts } from './components/QSeparator.unocss.js'
import { shortcuts as QAvatarShortcuts } from './components/QAvatar.unocss.js'
import { shortcuts as QBadgeShortcuts } from './components/QBadge.unocss.js'
import {
  shortcuts as QDialogShortcuts,
  preflights as QDialogPreflights
} from './components/QDialog.unocss.js'
import { shortcuts as QTooltipShortcuts } from './components/QTooltip.unocss.js'
import { shortcuts as QInputShortcuts } from './components/QInput.unocss.js'
import {
  shortcuts as QSelectShortcuts,
  preflights as QSelectPreflights
} from './components/QSelect.unocss.js'
import { shortcuts as QBtnDropdownShortcuts } from './components/QBtnDropdown.unocss.js'
import { shortcuts as QBtnToggleShortcuts } from './components/QBtnToggle.unocss.js'
import { shortcuts as QTabsShortcuts } from './components/QTabs.unocss.js'
import { shortcuts as QDateShortcuts } from './components/QDate.unocss.js'
import { preflights as UnstyledResetPreflights } from './components/_reset.unocss.js'

/**
 * Minimal structural styles for Quasar components. Provides just
 * enough CSS so that Quasar components render with correct positioning,
 * z-index layering, dimensions, transforms, and transitions — but
 * without any visual styling (no colors, no shadows, no rounded corners,
 * no borders, no typography choices).
 *
 * Pair this with the `Unstyled` style when you want Quasar components to
 * work out of the box but you intend to style everything yourself with
 * utility classes at the app level.
 *
 * Theme tokens (CSS variables) are still emitted by the preset, so you can
 * reference them in your own styles via `var(--light-primary)` etc.
 *
 * Example:
 *
 *   import { QuasarPreset } from 'unocss-preset-quasar'
 *   import { Unstyled } from 'unocss-preset-quasar/styles'
 *
 *   QuasarPreset({ style: Unstyled })
 */
const style: QuasarStyle = {
  rules: [] as Rule<QuasarTheme>[],
  variants: [] as Variant<QuasarTheme>[],
  preflights: ([] as Preflight<QuasarTheme>[]).concat(
    QLayoutPreflights,
    QChipPreflights,
    QFieldPreflights,
    QSpinnerPreflights,
    QDialogPreflights,
    QSelectPreflights,
    UnstyledResetPreflights
  ),
  shortcuts: ([] as Shortcut<QuasarTheme>[]).concat(
    QLayoutShortcuts,
    QPageShortcuts,
    QHeaderShortcuts,
    QFooterShortcuts,
    QDrawerShortcuts,
    QPageStickyShortcuts,
    QToolbarShortcuts,
    QBtnShortcuts,
    QCardShortcuts,
    QIconShortcuts,
    QItemShortcuts,
    QChipShortcuts,
    QFieldShortcuts,
    QMenuShortcuts,
    QSpinnerShortcuts,
    QImgShortcuts,
    QSeparatorShortcuts,
    QAvatarShortcuts,
    QBadgeShortcuts,
    QDialogShortcuts,
    QTooltipShortcuts,
    QInputShortcuts,
    QSelectShortcuts,
    QBtnDropdownShortcuts,
    QBtnToggleShortcuts,
    QTabsShortcuts,
    QDateShortcuts
  ),
  bodyClass: 'quasar-style-unstyled'
}

export default style
