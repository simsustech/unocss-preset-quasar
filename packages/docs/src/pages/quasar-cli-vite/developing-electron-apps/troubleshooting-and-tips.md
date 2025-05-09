---
title: Troubleshooting and Tips
desc: (@quasar/app-vite) Tips and tricks for a Quasar desktop app with Electron.
---

## Browser Devtools

You probably want your app to only give access to the browser devtools on dev mode only. On the production version (without debugging enabled) you'll want to disable this behavior.

While we're at it, why not also open devtools by default when we're on dev mode.

```js /src-electron/electron-main
function createWindow () {
  mainWindow = new BrowserWindow({ ... })

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  }
  else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }
}
```

## Debugging Main Process

When running your application in development you may have noticed a message from the main process mentioning a remote debugger. Ever since the release of electron@^1.7.2, remote debugging over the Inspect API was introduced and can be easily accessed by opening the provided link with Google Chrome or through another debugger that can remotely attach to the process using the default port of 5858, such as Visual Studio Code.

```bash
Debugger listening on ws://127.0.0.1:5858/b285586a-6091-4c41-b6ea-0d389e6f9c93
For help, see: https://nodejs.org/en/docs/inspector
```

The port can vary, based on the quasar.config > electron > inspectPort setting. If the specified port is already occupied, the next closest available port will be used.
