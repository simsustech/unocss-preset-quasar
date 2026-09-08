import type { Preflight } from '@unocss/core'

/**
 * table component styles — auto-generated from quasar.css.
 * Contains all .q-table selector blocks (variants, states, pseudo-elements).
 */
export const tableComponentPreflight: Preflight = {
  getCSS: () => `.q-table {
  width: 100%;
  max-width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.q-table thead tr, .q-table tbody td {
  height: 48px;
}

.q-table th {
  font-weight: 500;
  font-size: 12px;
  user-select: none;
  -webkit-user-select: none;
}

.q-table th.sortable {
  cursor: pointer;
}

.q-table th.sortable:hover .q-table__sort-icon {
  opacity: 0.64;
}

.q-table th.sorted .q-table__sort-icon {
  opacity: 0.86 !important;
}

.q-table th.sort-desc .q-table__sort-icon {
  transform: rotate(180deg);
}

.q-table th, .q-table td {
  padding: 7px 16px;
  background-color: inherit;
}

.q-table thead, .q-table td, .q-table th {
  border-style: solid;
  border-width: 0;
}

.q-table tbody td {
  font-size: 13px;
}

.q-table__card {
  color: #000;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
}

.q-table__card .q-table__middle {
  flex: 1 1 auto;
}

.q-table__card .q-table__top,
.q-table__card .q-table__bottom {
  flex: 0 0 auto;
}

.q-table__container {
  position: relative;
}

.q-table__container > div:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}

.q-table__container > div:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.q-table__container > .q-inner-loading {
  border-radius: inherit !important;
}

.q-table__top {
  padding: 12px 16px;
}

.q-table__top .q-table__control {
  flex-wrap: wrap;
}

.q-table__title {
  font-size: 20px;
  letter-spacing: 0.005em;
  font-weight: 400;
}

.q-table__separator {
  min-width: 8px !important;
}

.q-table__progress {
  height: 0 !important;
}

.q-table__progress th {
  padding: 0 !important;
  border: 0 !important;
}

.q-table__progress .q-linear-progress {
  position: absolute;
  bottom: 0;
}

.q-table__middle {
  max-width: 100%;
}

.q-table__bottom {
  min-height: 50px;
  padding: 4px 14px 4px 16px;
  font-size: 12px;
}

.q-table__bottom .q-table__control {
  min-height: 24px;
}

.q-table__bottom-nodata-icon {
  font-size: 200%;
  margin-right: 8px;
}

.q-table__bottom-item {
  margin-right: 16px;
}

.q-table__control {
  display: flex;
  align-items: center;
}

.q-table__sort-icon {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  opacity: 0;
  font-size: 120%;
}

.q-table__sort-icon--left, .q-table__sort-icon--center {
  margin-left: 4px;
}

.q-table__sort-icon--right {
  margin-right: 4px;
}

.q-table--col-auto-width {
  width: 1px;
}

.q-table__card--dark,
.q-table--dark {
  box-shadow: 0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12);
}

.q-table--flat {
  box-shadow: none;
}

.q-table--bordered {
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.q-table--square {
  border-radius: 0;
}

.q-table__linear-progress {
  height: 2px;
}

.q-table--no-wrap th, .q-table--no-wrap td {
  white-space: nowrap;
}

.q-table--grid {
  box-shadow: none;
  border-radius: 4px;
}

.q-table--grid .q-table__top {
  padding-bottom: 4px;
}

.q-table--grid .q-table__middle {
  min-height: 2px;
  margin-bottom: 4px;
}

.q-table--grid .q-table__middle thead, .q-table--grid .q-table__middle thead th {
  border: 0 !important;
}

.q-table--grid .q-table__linear-progress {
  bottom: 0;
}

.q-table--grid .q-table__bottom {
  border-top: 0;
}

.q-table--grid .q-table__grid-content {
  flex: 1 1 auto;
}

.q-table--grid.fullscreen {
  background: inherit;
}

.q-table__grid-item-card {
  vertical-align: top;
  padding: 12px;
}

.q-table__grid-item-card .q-separator {
  margin: 12px 0;
}

.q-table__grid-item-row + .q-table__grid-item-row {
  margin-top: 8px;
}

.q-table__grid-item-title {
  opacity: 0.54;
  font-weight: 500;
  font-size: 12px;
}

.q-table__grid-item-value {
  font-size: 13px;
}

.q-table__grid-item {
  padding: 4px;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.q-table__grid-item--selected {
  transform: scale(0.95);
}

.q-table--horizontal-separator > table > thead > tr > th, .q-table--horizontal-separator > table > tbody > tr:not(:last-child) > td, .q-table--horizontal-separator > .q-table__middle > table > thead > tr > th, .q-table--horizontal-separator > .q-table__middle > table > tbody > tr:not(:last-child) > td, .q-table--cell-separator > table > thead > tr > th, .q-table--cell-separator > table > tbody > tr:not(:last-child) > td, .q-table--cell-separator > .q-table__middle > table > thead > tr > th, .q-table--cell-separator > .q-table__middle > table > tbody > tr:not(:last-child) > td {
  border-bottom-width: 1px;
}

.q-table--vertical-separator > table > * > tr > * + *, .q-table--vertical-separator > .q-table__middle > table > * > tr > * + *, .q-table--cell-separator > table > * > tr > * + *, .q-table--cell-separator > .q-table__middle > table > * > tr > * + * {
  border-left-width: 1px;
}

.q-table--vertical-separator > table > thead > tr:last-child > th, .q-table--vertical-separator > .q-table__middle > table > thead > tr:last-child > th, .q-table--cell-separator > table > thead > tr:last-child > th, .q-table--cell-separator > .q-table__middle > table > thead > tr:last-child > th {
  border-bottom-width: 1px;
}

.q-table--vertical-separator.q-table--loading > .q-table__middle > table > thead > tr:nth-last-child(2) > th, .q-table--cell-separator.q-table--loading > .q-table__middle > table > thead > tr:nth-last-child(2) > th {
  border-bottom-width: 1px;
}

.q-table--vertical-separator > .q-table__top, .q-table--cell-separator > .q-table__top {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.q-table--dense .q-table__top {
  padding: 6px 16px;
}

.q-table--dense .q-table__bottom {
  min-height: 33px;
}

.q-table--dense .q-table__sort-icon {
  font-size: 110%;
}

.q-table--dense .q-table th, .q-table--dense .q-table td {
  padding: 4px 8px;
}

.q-table--dense .q-table thead tr, .q-table--dense .q-table tbody tr, .q-table--dense .q-table tbody td {
  height: 28px;
}

.q-table--dense .q-table th:first-child, .q-table--dense .q-table td:first-child {
  padding-left: 16px;
}

.q-table--dense .q-table th:last-child, .q-table--dense .q-table td:last-child {
  padding-right: 16px;
}

.q-table--dense .q-table__bottom-item {
  margin-right: 8px;
}

.q-table--dense .q-table__select .q-field__control, .q-table--dense .q-table__select .q-field__native {
  min-height: 24px;
  padding: 0;
}

.q-table--dense .q-table__select .q-field__marginal {
  height: 24px;
}

.q-table__bottom:not(.q-table__bottom--nodata) {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.q-table thead, .q-table tr, .q-table th, .q-table td {
  border-color: rgba(0, 0, 0, 0.12);
}

.q-table tbody td {
  position: relative;
}

.q-table tbody td:before, .q-table tbody td:after {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.q-table tbody td:before {
  background: rgba(0, 0, 0, 0.03);
}

.q-table tbody td:after {
  background: rgba(0, 0, 0, 0.06);
}

.q-table tbody tr.selected td:after {
  content: "";
}

.q-table__card--dark,
.q-table--dark {
  border-color: rgba(255, 255, 255, 0.28);
}

.q-table--dark .q-table__bottom, .q-table--dark thead, .q-table--dark tr, .q-table--dark th, .q-table--dark td {
  border-color: rgba(255, 255, 255, 0.28);
}

.q-table--dark tbody td:before {
  background: rgba(255, 255, 255, 0.07);
}

.q-table--dark tbody td:after {
  background: rgba(255, 255, 255, 0.1);
}

.q-table--dark.q-table--vertical-separator > .q-table__top, .q-table--dark.q-table--cell-separator > .q-table__top {
  border-color: rgba(255, 255, 255, 0.28);
}

.q-table .q-virtual-scroll__padding tr {
  height: 0 !important;
}

.q-table .q-virtual-scroll__padding td {
  padding: 0 !important;
}

`
}
