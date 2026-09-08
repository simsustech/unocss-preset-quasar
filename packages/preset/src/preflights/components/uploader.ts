import type { Preflight } from '@unocss/core'

/**
 * uploader component styles — auto-generated from quasar.css.
 * Contains all .q-uploader selector blocks (variants, states, pseudo-elements).
 */
export const uploaderComponentPreflight: Preflight = {
  getCSS: () => `.q-uploader {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  vertical-align: top;
  background: #fff;
  position: relative;
  width: 320px;
  max-height: 320px;
}

.q-uploader--bordered {
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.q-uploader__input {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer !important;
  z-index: 1;
}

.q-uploader__input::file-selector-button {
  cursor: pointer;
}

.q-uploader__file:before {
  content: "";
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  background: currentColor;
  opacity: 0.04;
}

.q-uploader__header {
  position: relative;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  background-color: var(--q-primary);
  color: #fff;
  width: 100%;
}

.q-uploader__spinner {
  font-size: 24px;
  margin-right: 4px;
}

.q-uploader__header-content {
  padding: 8px;
}

.q-uploader__dnd {
  outline: 1px dashed currentColor;
  outline-offset: -4px;
  background: rgba(255, 255, 255, 0.6);
}

.q-uploader__overlay {
  font-size: 36px;
  color: #000;
  background-color: rgba(255, 255, 255, 0.6);
}

.q-uploader__list {
  position: relative;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  padding: 8px;
  min-height: 60px;
  flex: 1 1 auto;
}

.q-uploader__file {
  border-radius: 4px 4px 0 0;
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.q-uploader__file .q-circular-progress {
  font-size: 24px;
}

.q-uploader__file--img {
  color: #fff;
  height: 200px;
  min-width: 200px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}

.q-uploader__file--img:before {
  content: none;
}

.q-uploader__file--img .q-circular-progress {
  color: #fff;
}

.q-uploader__file--img .q-uploader__file-header {
  padding-bottom: 24px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 20%, rgba(255, 255, 255, 0));
}

.q-uploader__file + .q-uploader__file {
  margin-top: 8px;
}

.q-uploader__file-header {
  position: relative;
  padding: 4px 8px;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}

.q-uploader__file-header-content {
  padding-right: 8px;
}

.q-uploader__file-status {
  font-size: 24px;
  margin-right: 4px;
}

.q-uploader__title {
  font-size: 14px;
  font-weight: bold;
  line-height: 1.285714;
  word-break: break-word;
}

.q-uploader__subtitle {
  font-size: 12px;
  line-height: 1.5;
}

.q-uploader--disable .q-uploader__header, .q-uploader--disable .q-uploader__list {
  pointer-events: none;
}

.q-uploader--dark {
  border-color: rgba(255, 255, 255, 0.28);
  box-shadow: 0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12);
}

.q-uploader--dark .q-uploader__file {
  border-color: rgba(255, 255, 255, 0.28);
}

.q-uploader--dark .q-uploader__dnd, .q-uploader--dark .q-uploader__overlay {
  background: rgba(255, 255, 255, 0.3);
}

.q-uploader--dark .q-uploader__overlay {
  color: #fff;
}

`
}
