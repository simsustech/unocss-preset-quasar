import type { Rule } from '@unocss/core'
import type { ComponentRule } from './types.js'
import { gridRules } from './grid.js'
import { spacingRules } from './spacing.js'
import { positionRules } from './position.js'
import { qBadgeRules } from './q-badge.js'
import { qAvatarRules } from './q-avatar.js'
import { qChipRules } from './q-chip.js'
import { qIconRules } from './q-icon.js'
import { qImgRules } from './q-img.js'
import { qBtnRules } from './q-btn.js'
import { qBannerRules } from './q-banner.js'
import { qBarRules } from './q-bar.js'
import { qBreadcrumbsRules } from './q-breadcrumbs.js'
import { qCardRules } from './q-card.js'
import { qCheckboxRules } from './q-checkbox.js'
import { qCircularProgressRules } from './q-circular-progress.js'
import { qDialogRules } from './q-dialog.js'
import { qFieldRules } from './q-field.js'
import { qInfiniteScrollRules } from './q-infinite-scroll.js'
import { qInnerLoadingRules } from './q-inner-loading.js'
import { qInputRules } from './q-input.js'
import { qItemRules } from './q-item.js'
import { qLinearProgressRules } from './q-linear-progress.js'
import { qRadioRules } from './q-radio.js'
import { qRatingRules } from './q-rating.js'
import { qSelectRules } from './q-select.js'
import { qSeparatorRules } from './q-separator.js'
import { qSkeletonRules } from './q-skeleton.js'
import { qSpinnerRules } from './q-spinner.js'
import { qToggleRules } from './q-toggle.js'
import { qTooltipRules } from './q-tooltip.js'
import { qCarouselRules } from './q-carousel.js'
import { qChatRules } from './q-chat.js'
import { qColorRules } from './q-color.js'
import { qDateRules } from './q-date.js'
import { qDrawerRules } from './q-drawer.js'
import { qExpansionItemRules } from './q-expansion-item.js'
import { qFileRules } from './q-file.js'
import { qFormRules } from './q-form.js'
import { qKnobRules } from './q-knob.js'
import { qMarkupTableRules } from './q-markup-table.js'
import { qMenuRules } from './q-menu.js'
import { qOptionGroupRules } from './q-option-group.js'
import { qPaginationRules } from './q-pagination.js'
import { qRangeRules } from './q-range.js'
import { qScrollAreaRules } from './q-scroll-area.js'
import { qSliderRules } from './q-slider.js'
import { qStepperRules } from './q-stepper.js'
import { qTabPanelsRules } from './q-tab-panels.js'
import { qTabsRules } from './q-tabs.js'
import { qTimeRules } from './q-time.js'
import { qTimelineRules } from './q-timeline.js'
import { qToolbarRules } from './q-toolbar.js'
import { qEditorRules } from './q-editor.js'
import { qFooterRules } from './q-footer.js'
import { qHeaderRules } from './q-header.js'
import { qIntersectionRules } from './q-intersection.js'
import { qLayoutRules } from './q-layout.js'
import { qNoSsrRules } from './q-no-ssr.js'
import { qPageRules } from './q-page.js'
import { qParallaxRules } from './q-parallax.js'
import { qPopupEditRules } from './q-popup-edit.js'
import { qPullToRefreshRules } from './q-pull-to-refresh.js'
import { qResponsiveRules } from './q-responsive.js'
import { qSlideItemRules } from './q-slide-item.js'
import { qSpaceRules } from './q-space.js'
import { qSplitterRules } from './q-splitter.js'
import { qTableRules } from './q-table.js'
import { qTreeRules } from './q-tree.js'
import { qUploaderRules } from './q-uploader.js'
import { qVideoRules } from './q-video.js'

/**
 * getAllRules() — aggregates all component rule arrays into a flat Rule[].
 * All 80+ Quasar components are registered here.
 */
export function getAllRules(): Rule[] {
  const rules: Rule[] = [
    // Grid system (row/col/gutter) — foundation, comes first
    ...gridRules,
    ...spacingRules,
    ...positionRules,

    // M1 — simple / high-value

    // M1 — simple / high-value

    // M1 — simple / high-value
    ...qBadgeRules,
    ...qAvatarRules,
    ...qChipRules,
    ...qIconRules,
    ...qImgRules,
    ...qBtnRules,
    ...qBannerRules,
    ...qBarRules,
    ...qBreadcrumbsRules,
    ...qCardRules,
    ...qCheckboxRules,
    ...qCircularProgressRules,
    ...qDialogRules,
    ...qFieldRules,
    ...qInfiniteScrollRules,
    ...qInnerLoadingRules,
    ...qInputRules,
    ...qItemRules,
    ...qLinearProgressRules,
    ...qRadioRules,
    ...qRatingRules,
    ...qSelectRules,
    ...qSeparatorRules,
    ...qSkeletonRules,
    ...qSpinnerRules,
    ...qToggleRules,
    ...qTooltipRules,
    // M2 — interactive / composite
    ...qCarouselRules,
    ...qChatRules,
    ...qColorRules,
    ...qDateRules,
    ...qDrawerRules,
    ...qExpansionItemRules,
    ...qFileRules,
    ...qFormRules,
    ...qKnobRules,
    ...qMarkupTableRules,
    ...qMenuRules,
    ...qOptionGroupRules,
    ...qPaginationRules,
    ...qRangeRules,
    ...qScrollAreaRules,
    ...qSliderRules,
    ...qStepperRules,
    ...qTabPanelsRules,
    ...qTabsRules,
    ...qTimeRules,
    ...qTimelineRules,
    ...qToolbarRules,
    // M3 — complex / layout
    ...qEditorRules,
    ...qFooterRules,
    ...qHeaderRules,
    ...qIntersectionRules,
    ...qLayoutRules,
    ...qNoSsrRules,
    ...qPageRules,
    ...qParallaxRules,
    ...qPopupEditRules,
    ...qPullToRefreshRules,
    ...qResponsiveRules,
    ...qSlideItemRules,
    ...qSpaceRules,
    ...qSplitterRules,
    ...qTableRules,
    ...qTreeRules,
    ...qUploaderRules,
    ...qVideoRules
  ]
  return rules
}

export type { ComponentRule }
