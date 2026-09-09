import type { Preflight } from '@unocss/core'

export const helpersPreflight: Preflight = {
  getCSS: () => `body.electron .q-electron-drag {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
body.electron .q-electron-drag .q-btn-item, body.electron .q-electron-drag--exception {
  -webkit-app-region: no-drag;
}

img.responsive {
  max-width: 100%;
  height: auto;
}

/*
 * When the Unstyled style is active, strip background/color from Quasar
 * component root elements. There is no Quasar CSS/SASS when using the
 * preset — but components still apply preset utility shortcuts internally
 * (e.g. QBtn with color="positive" applies \\`
}
