/* oxlint-disable */
/* eslint-disable */
import 'quasar/dist/types/feature-flag.d.ts'

declare module 'quasar/dist/types/feature-flag.d.ts' {
  interface QuasarFeatureFlags {
    pwa: true
    ssr: true
  }
}
