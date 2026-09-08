import type { Preflight } from '@unocss/core'

/**
 * card component styles — auto-generated from quasar.css.
 * Contains all .q-card selector blocks (variants, states, pseudo-elements).
 */
export const cardComponentPreflight: Preflight = {
  getCSS: () => `.q-card {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  vertical-align: top;
  background: #fff;
  position: relative;
}

.q-card > div:not(.q--avoid-card-border),
.q-card > img:not(.q--avoid-card-border) {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.q-card > div:nth-child(1 of :not(.q--avoid-card-border)),
.q-card > img:nth-child(1 of :not(.q--avoid-card-border)) {
  border-top: 0;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}

.q-card > div:nth-last-child(1 of :not(.q--avoid-card-border)),
.q-card > img:nth-last-child(1 of :not(.q--avoid-card-border)) {
  border-bottom: 0;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.q-card > div:not(.q--avoid-card-border) {
  border-left: 0;
  border-right: 0;
  box-shadow: none;
}

.q-card--bordered {
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.q-card--dark {
  border-color: rgba(255, 255, 255, 0.28);
  box-shadow: 0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12);
}

.q-card__section {
  position: relative;
}

.q-card__section--vert {
  padding: 16px;
}

.q-card__section--horiz > div:not(.q--avoid-card-border),
.q-card__section--horiz > img:not(.q--avoid-card-border) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.q-card__section--horiz > div:nth-child(1 of :not(.q--avoid-card-border)),
.q-card__section--horiz > img:nth-child(1 of :not(.q--avoid-card-border)) {
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}

.q-card__section--horiz > div:nth-last-child(1 of :not(.q--avoid-card-border)),
.q-card__section--horiz > img:nth-last-child(1 of :not(.q--avoid-card-border)) {
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
}

.q-card__section--horiz > div:not(.q--avoid-card-border) {
  border-top: 0;
  border-bottom: 0;
  box-shadow: none;
}

.q-card__actions {
  padding: 8px;
  align-items: center;
}

.q-card__actions .q-btn--rectangle {
  padding: 0 8px;
}

.q-card__actions--horiz > .q-btn-item + .q-btn-item,
.q-card__actions--horiz > .q-btn-group + .q-btn-item,
.q-card__actions--horiz > .q-btn-item + .q-btn-group {
  margin-left: 8px;
}

.q-card__actions--vert > .q-btn-item.q-btn--round {
  align-self: center;
}

.q-card__actions--vert > .q-btn-item + .q-btn-item,
.q-card__actions--vert > .q-btn-group + .q-btn-item,
.q-card__actions--vert > .q-btn-item + .q-btn-group {
  margin-top: 4px;
}

.q-card__actions--vert > .q-btn-group > .q-btn-item {
  flex-grow: 1;
}

.q-card > img {
  display: block;
  width: 100%;
  max-width: 100%;
  border: 0;
}

`
}
