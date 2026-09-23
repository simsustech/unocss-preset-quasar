import * as qcalendar from './qcalendar/index.js'
import * as qmarkdown from './qmarkdown/index.js'
import * as qmediaplayer from './qmediaplayer/index.js'

/**
 * Third-party Quasar UI libraries whose CSS this preset ports.
 *
 * Each key is a name a consumer can declare in `QuasarPreset({ appExtensions })`
 * and each value is that library's module namespace. The collections inside are
 * read by export suffix (`…Rules`, `…Preflights`, `…Shortcuts`) exactly as
 * `coreModules` and `componentModules` are, so a library is extended by
 * exporting a file from its folder — the barrel itself never changes.
 */
export const appExtensionModules = {
  qcalendar,
  qmarkdown,
  qmediaplayer
} as const

export type AppExtensionName = keyof typeof appExtensionModules

/** The declared names, in the order a consumer wrote them. */
export const appExtensionNames = Object.keys(
  appExtensionModules
) as AppExtensionName[]
