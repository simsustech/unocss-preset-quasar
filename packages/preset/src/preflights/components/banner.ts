import type { Preflight } from '@unocss/core'

/**
 * banner component styles — auto-generated from quasar.css.
 * Contains all .q-banner selector blocks (variants, states, pseudo-elements).
 */
export const bannerComponentPreflight: Preflight = {
  getCSS: () => `.q-banner {
  min-height: 54px;
  padding: 8px 16px;
  background: #fff;
}

.q-banner--top-padding {
  padding-top: 14px;
}

.q-banner__avatar {
  min-width: 1px !important;
}

.q-banner__avatar > .q-avatar {
  font-size: 46px;
}

.q-banner__avatar > .q-icon {
  font-size: 40px;
}

.q-banner__avatar:not(:empty) + .q-banner__content {
  padding-left: 16px;
}

.q-banner__actions.col-auto {
  padding-left: 16px;
}

.q-banner__actions.col-all .q-btn-item {
  margin: 4px 0 0 4px;
}

.q-banner--dense {
  min-height: 32px;
  padding: 8px;
}

.q-banner--dense.q-banner--top-padding {
  padding-top: 12px;
}

.q-banner--dense .q-banner__avatar > .q-avatar, .q-banner--dense .q-banner__avatar > .q-icon {
  font-size: 28px;
}

.q-banner--dense .q-banner__avatar:not(:empty) + .q-banner__content {
  padding-left: 8px;
}

.q-banner--dense .q-banner__actions.col-auto {
  padding-left: 8px;
}

`
}
