import { type Preflight, type Rule, type UserShortcuts } from 'unocss'
import { type QuasarTheme } from '../../theme.js'

import { shortcuts as QIconShortcuts } from './components/QIcon.unocss.js'
import { shortcuts as QAjaxBarShortcuts } from './components/QAjaxBar.unocss.js'
import { shortcuts as QBtnShortcuts } from './components/QBtn.unocss.js'
import { shortcuts as PanelShortcuts } from './composables/panel.unocss.js'
import { shortcuts as QAvatarShortcuts } from './components/QAvatar.unocss.js'
import { shortcuts as QBadgeShortcuts } from './components/QBadge.unocss.js'
import { shortcuts as QBannerShortcuts } from './components/QBanner.unocss.js'
import { shortcuts as QBarShortcuts } from './components/QBar.unocss.js'
import {
  preflights as QBreadcrumbsPreflights,
  shortcuts as QBreadcrumbsShortcuts
} from './components/QBreadcrumbs.unocss.js'
import { shortcuts as QBtnDropdownShortcuts } from './components/QBtnDropdown.unocss.js'
import { shortcuts as QBtnGroupShortcuts } from './components/QBtnGroup.unocss.js'
import { shortcuts as QBtnToggleShortcuts } from './components/QBtnToggle.unocss.js'
import { shortcuts as QCardShortcuts } from './components/QCard.unocss.js'
import { shortcuts as QCarouselShortcuts } from './components/QCarousel.unocss.js'
import { shortcuts as QChatMessageShortcuts } from './components/QChatMessage.unocss.js'
import {
  preflights as QCheckboxPreflights,
  shortcuts as QCheckboxShortcuts
} from './components/QCheckbox.unocss.js'
import {
  preflights as QChipPreflights,
  shortcuts as QChipShortcuts
} from './components/QChip.unocss.js'
import {
  preflights as QCircularProgressPreflights,
  shortcuts as QCircularProgressShortcuts
} from './components/QCircularProgress.unocss.js'
import { shortcuts as QColorPickerShortcuts } from './components/QColorPicker.unocss.js'
import { shortcuts as QDateShortcuts } from './components/QDate.unocss.js'
import {
  preflights as QDialogPreflights,
  shortcuts as QDialogShortcuts
} from './components/QDialog.unocss.js'
import { shortcuts as QEditorShortcuts } from './components/QEditor.unocss.js'
import { shortcuts as QExpansionItemShortcuts } from './components/QExpansionItem.unocss.js'
import { shortcuts as QFabShortcuts } from './components/QFab.unocss.js'
import {
  shortcuts as QFieldShortcuts,
  preflights as QFieldPreflights
} from './components/QField.unocss.js'
import { shortcuts as QFileShortcuts } from './components/QFile.unocss.js'
import { shortcuts as QFormShortcuts } from './components/QForm.unocss.js'
import { shortcuts as QImgShortcuts } from './components/QImg.unocss.js'
import { shortcuts as QInnerLoadingShortcuts } from './components/QInnerLoading.unocss.js'
import { shortcuts as QInputShortcuts } from './components/QInput.unocss.js'
import { shortcuts as QIntersectionShortcuts } from './components/QIntersection.unocss.js'
import { shortcuts as QItemShortcuts } from './components/QItem.unocss.js'
import { shortcuts as QKnobShortcuts } from './components/QKnob.unocss.js'
import {
  shortcuts as QLayoutShortcuts,
  preflights as QLayoutPreflights
} from './components/QLayout.unocss.js'
import {
  shortcuts as QLinearProgressShortcuts,
  preflights as QLinearProgressPreflights
} from './components/QLinearProgress.unocss.js'
import { shortcuts as QMenuShortcuts } from './components/QMenu.unocss.js'
import { shortcuts as QOptionGroupShortcuts } from './components/QOptionGroup.unocss.js'
import { shortcuts as QPageShortcuts } from './components/QPage.unocss.js'
import { shortcuts as QPageStickyShortcuts } from './components/QPageSticky.unocss.js'
import { shortcuts as QPaginationShortcuts } from './components/QPagination.unocss.js'
import { shortcuts as QParallaxShortcuts } from './components/QParallax.unocss.js'
import { shortcuts as QPopupEditShortcuts } from './components/QPopupEdit.unocss.js'
import { shortcuts as QPullToRefreshShortcuts } from './components/QPullToRefresh.unocss.js'
import {
  shortcuts as QRadioShortcuts,
  preflights as QRadioPreflights
} from './components/QRadio.unocss.js'
import { shortcuts as QRatingShortcuts } from './components/QRating.unocss.js'
import { shortcuts as QResponsiveShortcuts } from './components/QResponsive.unocss.js'
import { shortcuts as QScrollareaShortcuts } from './components/QScrollarea.unocss.js'
import {
  shortcuts as QSelectShortcuts,
  preflights as QSelectPreflights
} from './components/QSelect.unocss.js'
import { shortcuts as QSeparatorShortcuts } from './components/QSeparator.unocss.js'
import {
  shortcuts as QSkeletonShortcuts,
  preflights as QSkeletonPreflights
} from './components/QSkeleton.unocss.js'
import { shortcuts as QSlideItemShortcuts } from './components/QSlideItem.unocss.js'
import { shortcuts as QSliderShortcuts } from './components/QSlider.unocss.js'
import { shortcuts as QSpaceShortcuts } from './components/QSpace.unocss.js'
import {
  shortcuts as QSpinnerShortcuts,
  preflights as QSpinnerPreflights
} from './components/QSpinner.unocss.js'
import { shortcuts as QSplitterShortcuts } from './components/QSplitter.unocss.js'
import { shortcuts as QStepperShortcuts } from './components/QStepper.unocss.js'
import { shortcuts as QTabPanelShortcuts } from './components/QTabPanel.unocss.js'
import {
  shortcuts as QTableShortcuts,
  preflights as QTablePreflights
} from './components/QTable.unocss.js'
import { shortcuts as QTabsShortcuts } from './components/QTabs.unocss.js'
import { shortcuts as QTimeShortcuts } from './components/QTime.unocss.js'
import { shortcuts as QTimelineShortcuts } from './components/QTimeline.unocss.js'
import {
  shortcuts as QToggleShortcuts,
  preflights as QTogglePreflights
} from './components/QToggle.unocss.js'
import { shortcuts as QToolbarShortcuts } from './components/QToolbar.unocss.js'
import { shortcuts as QTooltipShortcuts } from './components/QTooltip.unocss.js'
import {
  shortcuts as QTreeShortcuts,
  preflights as QTreePreflights
} from './components/QTree.unocss.js'
import { shortcuts as QUploaderShortcuts } from './components/QUploader.unocss.js'
import { shortcuts as QVideoShortcuts } from './components/QVideo.unocss.js'
import { shortcuts as QVirtualScrollShortcuts } from './components/QVirtualScroll.unocss.js'

import { shortcuts as QMorphShortcuts } from './directives/QMorph.unocss.js'
import { shortcuts as QRippleShortcuts } from './directives/QRipple.unocss.js'

import { shortcuts as QBottomSheetShortcuts } from './plugins/QBottomSheet.unocss.js'
import { shortcuts as QDialogPluginShortcuts } from './plugins/QDialogPlugin.unocss.js'
import { shortcuts as QLoadingShortcuts } from './plugins/QLoading.unocss.js'
import { shortcuts as QNotifyShortcuts } from './plugins/QNotify.unocss.js'

import { shortcuts as QHeaderShortcuts } from './components/QHeader.unocss.js'
import { shortcuts as QFooterShortcuts } from './components/QFooter.unocss.js'
import { shortcuts as QDrawerShortcuts } from './components/QDrawer.unocss.js'
import { QuasarStyle } from '../index.js'

import { QBtn as QuasarButton } from 'quasar'
const style: QuasarStyle = {
  variants: [],
  preflights: ([] as Preflight<QuasarTheme>[]).concat(
    QBreadcrumbsPreflights,
    QCheckboxPreflights,
    QChipPreflights,
    QCircularProgressPreflights,
    QDialogPreflights,
    QFieldPreflights,
    QLayoutPreflights,
    QLinearProgressPreflights,
    QRadioPreflights,
    QSelectPreflights,
    QSpinnerPreflights,
    QSkeletonPreflights,
    QTablePreflights,
    QTogglePreflights,
    QTreePreflights
  ),
  rules: ([] as Rule<QuasarTheme>[]).concat(),
  shortcuts: ([] as UserShortcuts<QuasarTheme>[]).concat(
    QIconShortcuts,
    QAjaxBarShortcuts,
    QAvatarShortcuts,
    QBadgeShortcuts,
    QBreadcrumbsShortcuts,
    QBannerShortcuts,
    QBarShortcuts,
    QBtnShortcuts,
    QBtnDropdownShortcuts,
    QBtnGroupShortcuts,
    QBtnToggleShortcuts,
    QCardShortcuts,
    QCarouselShortcuts,
    QChatMessageShortcuts,
    QCheckboxShortcuts,
    QChipShortcuts,
    QCircularProgressShortcuts,
    QColorPickerShortcuts,
    QDateShortcuts,
    QDialogShortcuts,
    QEditorShortcuts,
    QExpansionItemShortcuts,
    QFabShortcuts,
    QFieldShortcuts,
    QFileShortcuts,
    QFormShortcuts,
    QImgShortcuts,
    QInnerLoadingShortcuts,
    QInputShortcuts,
    QIntersectionShortcuts,
    QItemShortcuts,
    QKnobShortcuts,
    QLayoutShortcuts,
    QLinearProgressShortcuts,
    QMenuShortcuts,
    QOptionGroupShortcuts,
    QPageShortcuts,
    QPageStickyShortcuts,
    QPaginationShortcuts,
    QParallaxShortcuts,
    QPopupEditShortcuts,
    QPullToRefreshShortcuts,
    QRadioShortcuts,
    QRatingShortcuts,
    QResponsiveShortcuts,
    QScrollareaShortcuts,
    QSelectShortcuts,
    QSeparatorShortcuts,
    QSkeletonShortcuts,
    QSlideItemShortcuts,
    QSliderShortcuts,
    QSpaceShortcuts,
    QSpinnerShortcuts,
    QSplitterShortcuts,
    QStepperShortcuts,
    QTabPanelShortcuts,
    QTableShortcuts,
    QTabsShortcuts,
    QTimeShortcuts,
    QTimelineShortcuts,
    QToggleShortcuts,
    QToolbarShortcuts,
    QTooltipShortcuts,
    QTreeShortcuts,
    QUploaderShortcuts,
    QVideoShortcuts,
    QVirtualScrollShortcuts,
    PanelShortcuts,
    QMorphShortcuts,
    QRippleShortcuts,
    QBottomSheetShortcuts,
    QDialogPluginShortcuts,
    QLoadingShortcuts,
    QNotifyShortcuts,

    QHeaderShortcuts,
    QFooterShortcuts,
    QDrawerShortcuts
  )
}

export const setDefaultProps = ({ QBtn }: { QBtn: any }) => {}

export default style
