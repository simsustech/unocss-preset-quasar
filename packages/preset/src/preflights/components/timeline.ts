import type { Preflight } from '@unocss/core'

/**
 * timeline component styles — auto-generated from quasar.css.
 * Contains all .q-timeline selector blocks (variants, states, pseudo-elements).
 */
export const timelineComponentPreflight: Preflight = {
  getCSS: () => `.q-timeline {
  padding: 0;
  width: 100%;
  list-style: none;
}

.q-timeline h6 {
  line-height: inherit;
}

.q-timeline--dark {
  color: #fff;
}

.q-timeline--dark .q-timeline__subtitle {
  opacity: 0.7;
}

.q-timeline__content {
  padding-bottom: 24px;
}

.q-timeline__title {
  margin-top: 0;
  margin-bottom: 16px;
}

.q-timeline__subtitle {
  font-size: 12px;
  margin-bottom: 8px;
  opacity: 0.6;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
}

.q-timeline__dot {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 15px;
}

.q-timeline__dot:before, .q-timeline__dot:after {
  content: "";
  background: currentColor;
  display: block;
  position: absolute;
}

.q-timeline__dot:before {
  border: 3px solid transparent;
  border-radius: 100%;
  height: 15px;
  width: 15px;
  top: 4px;
  left: 0;
  transition: background 0.3s ease-in-out, border 0.3s ease-in-out;
}

.q-timeline__dot:after {
  width: 3px;
  opacity: 0.4;
  top: 24px;
  bottom: 0;
  left: 6px;
}

.q-timeline__dot .q-icon {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  font-size: 16px;
  height: 38px;
  line-height: 38px;
  width: 100%;
  color: #fff;
}

.q-timeline__dot .q-icon > svg,
.q-timeline__dot .q-icon > img {
  width: 1em;
  height: 1em;
}

.q-timeline__dot-img {
  position: absolute;
  top: 4px;
  left: 0;
  right: 0;
  height: 31px;
  width: 31px;
  background: currentColor;
  border-radius: 50%;
}

.q-timeline__heading {
  position: relative;
}

.q-timeline__heading:first-child .q-timeline__heading-title {
  padding-top: 0;
}

.q-timeline__heading:last-child .q-timeline__heading-title {
  padding-bottom: 0;
}

.q-timeline__heading-title {
  padding: 32px 0;
  margin: 0;
}

.q-timeline__entry {
  position: relative;
  line-height: 22px;
}

.q-timeline__entry:last-child {
  padding-bottom: 0 !important;
}

.q-timeline__entry:last-child .q-timeline__dot:after {
  content: none;
}

.q-timeline__entry--icon .q-timeline__dot {
  width: 31px;
}

.q-timeline__entry--icon .q-timeline__dot:before {
  height: 31px;
  width: 31px;
}

.q-timeline__entry--icon .q-timeline__dot:after {
  top: 41px;
  left: 14px;
}

.q-timeline__entry--icon .q-timeline__subtitle {
  padding-top: 8px;
}

.q-timeline--dense--right .q-timeline__entry {
  padding-left: 40px;
}

.q-timeline--dense--right .q-timeline__entry--icon .q-timeline__dot {
  left: -8px;
}

.q-timeline--dense--right .q-timeline__dot {
  left: 0;
}

.q-timeline--dense--left .q-timeline__heading {
  text-align: right;
}

.q-timeline--dense--left .q-timeline__entry {
  padding-right: 40px;
}

.q-timeline--dense--left .q-timeline__entry--icon .q-timeline__dot {
  right: -8px;
}

.q-timeline--dense--left .q-timeline__content, .q-timeline--dense--left .q-timeline__title, .q-timeline--dense--left .q-timeline__subtitle {
  text-align: right;
}

.q-timeline--dense--left .q-timeline__dot {
  right: 0;
}

.q-timeline--comfortable {
  display: table;
}

.q-timeline--comfortable .q-timeline__heading {
  display: table-row;
  font-size: 200%;
}

.q-timeline--comfortable .q-timeline__heading > div {
  display: table-cell;
}

.q-timeline--comfortable .q-timeline__entry {
  display: table-row;
  padding: 0;
}

.q-timeline--comfortable .q-timeline__entry--icon .q-timeline__content {
  padding-top: 8px;
}

.q-timeline--comfortable .q-timeline__subtitle, .q-timeline--comfortable .q-timeline__dot, .q-timeline--comfortable .q-timeline__content {
  display: table-cell;
  vertical-align: top;
}

.q-timeline--comfortable .q-timeline__subtitle {
  width: 35%;
}

.q-timeline--comfortable .q-timeline__dot {
  position: relative;
  min-width: 31px;
}

.q-timeline--comfortable--right .q-timeline__heading .q-timeline__heading-title {
  margin-left: -50px;
}

.q-timeline--comfortable--right .q-timeline__subtitle {
  text-align: right;
  padding-right: 30px;
}

.q-timeline--comfortable--right .q-timeline__content {
  padding-left: 30px;
}

.q-timeline--comfortable--right .q-timeline__entry--icon .q-timeline__dot {
  left: -8px;
}

.q-timeline--comfortable--left .q-timeline__heading {
  text-align: right;
}

.q-timeline--comfortable--left .q-timeline__heading .q-timeline__heading-title {
  margin-right: -50px;
}

.q-timeline--comfortable--left .q-timeline__subtitle {
  padding-left: 30px;
}

.q-timeline--comfortable--left .q-timeline__content {
  padding-right: 30px;
}

.q-timeline--comfortable--left .q-timeline__content, .q-timeline--comfortable--left .q-timeline__title {
  text-align: right;
}

.q-timeline--comfortable--left .q-timeline__entry--icon .q-timeline__dot {
  right: 0;
}

.q-timeline--comfortable--left .q-timeline__dot {
  right: -8px;
}

.q-timeline--loose .q-timeline__heading-title {
  text-align: center;
  margin-left: 0;
}

.q-timeline--loose .q-timeline__entry, .q-timeline--loose .q-timeline__subtitle, .q-timeline--loose .q-timeline__dot, .q-timeline--loose .q-timeline__content {
  display: block;
  margin: 0;
  padding: 0;
}

.q-timeline--loose .q-timeline__dot {
  position: absolute;
  left: 50%;
  margin-left: -7.15px;
}

.q-timeline--loose .q-timeline__entry {
  padding-bottom: 24px;
  overflow: hidden;
}

.q-timeline--loose .q-timeline__entry--icon .q-timeline__dot {
  margin-left: -15px;
}

.q-timeline--loose .q-timeline__entry--icon .q-timeline__subtitle {
  line-height: 38px;
}

.q-timeline--loose .q-timeline__entry--icon .q-timeline__content {
  padding-top: 8px;
}

.q-timeline--loose .q-timeline__entry--left .q-timeline__content, .q-timeline--loose .q-timeline__entry--right .q-timeline__subtitle {
  float: left;
  padding-right: 30px;
  text-align: right;
}

.q-timeline--loose .q-timeline__entry--left .q-timeline__subtitle, .q-timeline--loose .q-timeline__entry--right .q-timeline__content {
  float: right;
  text-align: left;
  padding-left: 30px;
}

.q-timeline--loose .q-timeline__subtitle, .q-timeline--loose .q-timeline__content {
  width: 50%;
}

`
}
