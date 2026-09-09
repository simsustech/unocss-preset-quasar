import type { Preflight } from '@unocss/core'

export const treePreflights: Preflight[] = [
  {
    getCSS: () => `.q-tree {
  position: relative;
  color: #9e9e9e;
}
.q-tree__node {
  padding: 0 0 3px 22px;
}
.q-tree__node--disabled {
  pointer-events: none;
}
.q-tree__node--disabled .disabled {
  opacity: 1 !important;
}
.q-tree__node--disabled > div,
.q-tree__node--disabled > i,
.q-tree__node--disabled > .disabled {
  opacity: 0.6 !important;
}
.q-tree__node--disabled > div .q-tree__node--disabled > div,
.q-tree__node--disabled > div .q-tree__node--disabled > i,
.q-tree__node--disabled > div .q-tree__node--disabled > .disabled,
.q-tree__node--disabled > i .q-tree__node--disabled > div,
.q-tree__node--disabled > i .q-tree__node--disabled > i,
.q-tree__node--disabled > i .q-tree__node--disabled > .disabled,
.q-tree__node--disabled > .disabled .q-tree__node--disabled > div,
.q-tree__node--disabled > .disabled .q-tree__node--disabled > i,
.q-tree__node--disabled > .disabled .q-tree__node--disabled > .disabled {
  opacity: 1 !important;
}
.q-tree__children {
  padding-left: 25px;
}
.q-tree__node-body {
  padding: 5px 0 8px 5px;
}
.q-tree__node--parent {
  padding-left: 2px;
}
.q-tree__node--parent > .q-tree__node-collapsible > .q-tree__node-body {
  padding: 5px 0 8px 27px;
}
.q-tree__node--link {
  cursor: pointer;
}
.q-tree__node-header {
  padding: 4px;
  margin-top: 3px;
  border-radius: 4px;
  outline: 0;
}
.q-tree__node-header-content {
  color: #000;
  transition: color 0.3s;
}
.q-tree__node--selected .q-tree__node-header-content {
  color: #9e9e9e;
}
.q-tree__icon {
  font-size: 21px;
}
.q-tree__img {
  height: 42px;
  border-radius: 2px;
}
.q-tree__avatar {
  border-radius: 50%;
  width: 28px;
  height: 28px;
}
.q-tree__arrow, .q-tree__spinner {
  font-size: 16px;
  margin-right: 4px;
}
.q-tree__arrow {
  transition: transform 0.3s;
}
.q-tree__arrow--rotate {
  transform: rotate3d(0, 0, 1, 90deg);
}
.q-tree__tickbox {
  margin-right: 4px;
}
.q-tree > .q-tree__node {
  padding: 0;
}
.q-tree > .q-tree__node--child > .q-tree__node-header {
  padding-left: 24px;
}
.q-tree--dark .q-tree__node-header-content {
  color: #fff;
}
.q-tree__vnode {
  padding-bottom: 3px;
}
.q-tree__vguide {
  position: relative;
  flex: 0 0 25px;
  width: 25px;
}
.q-tree--virtual .q-tree__node-header {
  flex: 1 1 0%;
  min-width: 0;
}
.q-tree--virtual .q-tree__node-body {
  flex: 1 1 0%;
  min-width: 0;
}
.q-tree--virtual .q-tree__vnode--parent .q-tree__node-header {
  padding-left: 6px;
}
.q-tree--virtual .q-tree__vnode--parent .q-tree__node-body {
  padding-left: 27px;
}
.q-tree--virtual .q-tree__vnode--child .q-tree__node-header {
  padding-left: 26px;
}
.q-tree--virtual .q-tree__vnode--root.q-tree__vnode--parent .q-tree__node-header {
  padding-left: 4px;
}
.q-tree--virtual .q-tree__vnode--root.q-tree__vnode--child .q-tree__node-header {
  padding-left: 24px;
}
.q-tree--dense > .q-tree__node--child > .q-tree__node-header {
  padding-left: 1px;
}
.q-tree--dense .q-tree__arrow, .q-tree--dense .q-tree__spinner {
  margin-right: 1px;
}
.q-tree--dense .q-tree__img {
  height: 32px;
}
.q-tree--dense .q-tree__tickbox {
  margin-right: 3px;
}
.q-tree--dense .q-tree__node {
  padding: 0;
}
.q-tree--dense .q-tree__node-header {
  margin-top: 0;
  padding: 1px;
}
.q-tree--dense .q-tree__node--child {
  padding-left: 17px;
}
.q-tree--dense .q-tree__node-body {
  padding: 0 0 2px;
}
.q-tree--dense .q-tree__node--parent > .q-tree__node-collapsible > .q-tree__node-body {
  padding: 0 0 2px 20px;
}
.q-tree--dense .q-tree__children {
  padding-left: 16px;
}
.q-tree--dense .q-tree__vnode {
  padding-bottom: 0;
}
.q-tree--dense .q-tree__vguide {
  flex: 0 0 16px;
  width: 16px;
}
.q-tree--dense.q-tree--virtual .q-tree__vnode--child .q-tree__node-header {
  padding-left: 18px;
}
.q-tree--dense.q-tree--virtual .q-tree__vnode--parent .q-tree__node-header {
  padding-left: 1px;
}
.q-tree--dense.q-tree--virtual .q-tree__vnode--parent .q-tree__node-body {
  padding-left: 20px;
}
`
  }
]
