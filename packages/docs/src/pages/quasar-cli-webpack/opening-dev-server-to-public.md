---
title: Opening Your Dev Server to the Public
desc: (@quasar/app-webpack) How to offer temporary access to your development server to anyone on the Internet.
---

At some point you may want to show someone else the project you've been working on. Fortunately, there are a couple of good tools to accomplish this, [localhost.run](https://localhost.run/) and [Ngrok](https://ngrok.com/). Both create a tunnel to your dev server and (by default) auto-generate an internet address on their respective servers to offer to your clients or anyone special you'd like to show your work to.

::: warning
Opening your dev server to the public poses security risks. Be absolutely cautious when using tools like this.

When you've finished with your demonstration or testing, make sure to stop localhost.run or ngrok. This will prevent any unwanted access of your computer through them.
:::

## Using Tunnelmole

Tunnelmole will work on any machine with NodeJS 16+ installed and has no non-JavaScript dependencies.

First, install `tunnelmole` package globally:

```tabs
<<| bash Yarn |>>
$ yarn global add tunnelmole
<<| bash NPM |>>
$ npm install -g tunnelmole
<<| bash PNPM |>>
$ pnpm add -g tunnelmole
<<| bash Bun |>>
$ bun add -g tunnelmole
```

Then, assuming you are running quasar on port `80`, run the following:

```bash
$ tmole 80
```

If your port is different to `80`, change `80` to your port.

Here's the full command with output:

```bash
$ tmole 80
http://b8ootd-ip-157-211-195-182.tunnelmole.com is forwarding to localhost:80
https://b8ootd-ip-157-211-195-182.tunnelmole.com is forwarding to localhost:80
```

If you are self hosting your own Tunnelmole service or you have a set an API key for the official service, you can run the following to use a custom subdomain (again, replace `80` with your port if it is different).

```bash
$ tmole 80 as mysubdomain.tunnelmole.com
```

Its also possible to launch tunnelmole from code if you add it as a dependency to your project (`yarn add --dev tunnelmole` or `npm i --save-dev tunnelmole` or pnpm/bun equivalents)

First import tunnelmole. Both ES and CommonJS modules are supported.

Importing tunnelmole as an ES module

```js
// import as ESM:
import { tunnelmole } from 'tunnelmole'

// or import as CommonJS module:
const tunnelmole = require('tunnelmole/cjs')
```

Once the module is imported you can start tunnelmole with the code below, changing port `80` to the port your application listens on if it is different.

```js
const url = await tunnelmole({
  port: 80
  // Optionally, add "domain: 'mysubdomain.tunnelmole.com'" if using a custom subdomain
})
// url = https://idsq6j-ip-157-211-195-169.tunnelmole.com
```

## Using localhost.run

1. Assuming you have an SSH shell, you only need issue the following command (substituting your details)

```bash
$ ssh -R 80:localhost:8080 ssh.localhost.run
# In case your development server doesn't run on port 8080 you need to change the number to the correct port
```

2. That's it, and you will now have a random subdomain based on your current system username assigned to you like so:

```bash
$ ssh -R 80:localhost:8080 ssh.localhost.run
Connect to http://fakeusername-random4chars.localhost.run or https://fakeusername-random4chars.localhost.run
Press ctrl-c to quit.
```

It's not currently possible to request your own subdomain.

## Using Ngrok

1. Download and install ngrok [here](https://ngrok.com/download).
   (Please note that the ngrok executable file does not need to be placed in or run from inside your cordova folder. When on a mac it's best to place the ngrok executable file inside `/usr/local/bin` to be able to run it globally.)

2. Start your Dev server

```bash
$ quasar dev
```

3. Create your ngrok connection

```bash
$ ngrok http 8080
# In case your development server doesn't run on port 8080 you need to change the number to the correct port
```

4. ngrok shows the url in the command line when it started.

```bash
Tunnel Status                 online
Version                       2.0/2.0
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://92832de0.ngrok.io -> localhost:8080
Forwarding                    https://92832de0.ngrok.io -> localhost:8080

Connections                  ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

Please be careful as the 'Forwarding' URL will be accessible to anyone until this connection is closed again.

### Inspecting traffic

When running ngrok, visit `http://localhost:4040` to inspect the traffic.

This tool allows for custom domains, password protection and a lot more. If you require further assistance, please refer to the [ngrok docs](https://ngrok.com/docs) for more information.
