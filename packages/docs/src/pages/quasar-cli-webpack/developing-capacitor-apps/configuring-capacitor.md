---
title: Configuring Capacitor
desc: (@quasar/app-webpack) How to manage your Capacitor apps with Quasar CLI.
related:
  - /quasar-cli-webpack/quasar-config-file
---

We'll be using Quasar CLI to develop and build a Mobile App. The difference between building a SPA, PWA, Electron App or a Mobile App is simply determined by the "mode" parameter in "quasar dev" and "quasar build" commands.

There are two configuration files of great importance to your mobile apps. We'll go over each one.

## capacitor.config.json

The most important config file for your mobile app is `/src-capacitor/capacitor.config.json`. The `/src-capacitor` folder is a Capacitor project, so please refer to [Capacitor documentation](https://capacitor.ionicframework.com) in order to understand what each file from there does. But for now, have a few moments to read about [capacitor.config.json](https://capacitor.ionicframework.com/docs/basics/configuring-your-app/).

Some properties from this file will get overwritten as we'll see in next section.

## quasar.config file

There are two places in the `/quasar.config` file where you can configure Quasar specific features for Capacitor.

```js /quasar.config file
return {
  capacitor: {
    /**
     * Automatically hide the Capacitor Splashscreen when app is ready,
     * (is using the Splashscreen Capacitor plugin).
     *
     * @default true
     */
    hideSplashscreen?: boolean;

    /**
     * Preparation params with which the Capacitor CLI is called
     *
     * @default [ 'sync', ctx.targetName ]
     */
    capacitorCliPreparationParams?: string[];

    /** If not present, will look for `package.json > name` */
    appName?: string;
    /** If not present, will look for `package.json > version` */
    version?: string;
    /** If not present, will look for `package.json > description` */
    description?: string;
  }
}
```

And you can also configure:

```js /quasar.config file
return {
  framework: {
    config: {
      capacitor: {
        iosStatusBarPadding: true / false // add the dynamic top padding on iOS mobile devices
      }
    }
  }
}
```

Finally, you can also disable or configure the back button hook (used for Dialogs):

```js /quasar.config file
return {
  framework: {
    config: {
      capacitor: {
        // Quasar handles app exit on mobile phone back button.
        backButtonExit: true / false / '*' / ['/login', '/home', '/my-page'],

        // On the other hand, the following completely
        // disables Quasar's back button management.
        backButton: true / false
      }
    }
  }
}
```

Should you want to tamper with the Webpack config for UI in /src you have two options:

```js /quasar.config file
build: {
  extendWebpack(webpackCfg) { ... },
  chainWebpack(webpackChain) { ... }
}
```
