/**
 * Keep the suite off the network.
 *
 * The preset enables `@unocss/preset-web-fonts` by default (bunny.net, Roboto),
 * and that preset resolves its `@import` by FETCHING the font stylesheet while
 * the generator is built. So every `createGenerator`/`QuasarPreset` call in this
 * suite made a real request to fonts.bunny.net, with a 3-attempt retry and a
 * 2s per-attempt timeout.
 *
 * That is the flake, and it is not a test-logic problem: on an idle machine the
 * request lands in well under the per-test budget, but under load (a build, a
 * Playwright run, a busy box) the request is starved and the surrounding test
 * hits `Test timed out in 30000ms`. The failing file was different each run
 * because whichever spec's request lost the race timed out — which is why it
 * read like "parallel-worker isolation" and why every file passed in isolation.
 *
 * Stubbing the fetch removes the network from the equation entirely. The suite
 * asserts what the preset EMITS for its own rules; the fetched font CSS is the
 * web-fonts preset's business, not this package's, and no test reads it.
 */
const emptyStylesheet = (): Response =>
  new Response('/* web fonts stubbed in tests */', {
    status: 200,
    headers: { 'content-type': 'text/css' }
  })

const originalFetch = globalThis.fetch

globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url =
    typeof input === 'string'
      ? input
      : input instanceof URL
        ? input.href
        : input.url
  if (/fonts\.(bunny|google)/.test(url)) return emptyStylesheet()
  return originalFetch(input, init)
}) as typeof globalThis.fetch
