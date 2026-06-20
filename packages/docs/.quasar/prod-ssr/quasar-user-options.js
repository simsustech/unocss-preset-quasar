/* eslint-disable */
/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.config file > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/

import iconSet from 'quasar/icon-set/svg-mdi-v6.js'

import {
  AddressbarColor,
  AppFullscreen,
  AppVisibility,
  BottomSheet,
  Cookies,
  Dark,
  Dialog,
  Loading,
  LoadingBar,
  LocalStorage,
  Meta,
  Notify,
  Platform,
  Screen,
  SessionStorage
} from 'quasar'

export default {
  config: { loadingBar: { color: 'brand-primary', size: '4px' } },
  iconSet,
  plugins: {
    AddressbarColor,
    AppFullscreen,
    AppVisibility,
    BottomSheet,
    Cookies,
    Dark,
    Dialog,
    Loading,
    LoadingBar,
    LocalStorage,
    Meta,
    Notify,
    Platform,
    Screen,
    SessionStorage
  }
}
