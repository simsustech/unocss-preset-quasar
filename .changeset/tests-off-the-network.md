---
'unocss-preset-quasar': patch
---

Take the test suite off the network, which removes its long-standing flake.

The preset enables `@unocss/preset-web-fonts` by default, and that preset
resolves its `@import` by fetching the font stylesheet while the generator is
built. Every `createGenerator`/`QuasarPreset` call in the suite therefore made a
real request to `fonts.bunny.net`, with a 3-attempt retry. Idle, the request
landed quickly; under load (a build, a Playwright run, dev servers) it was
starved and the surrounding spec hit `Test timed out in 30000ms`. The failing
file differed every run, which made it read like parallel-worker isolation.

`test/setup-network.ts` (registered via `setupFiles`) stubs font requests only.
Measured at identical load — two busy cores — the pre-fix suite flaked in 2 of 4
full runs; the stubbed suite passed 3 of 3 and 411/411 on an idle run.
