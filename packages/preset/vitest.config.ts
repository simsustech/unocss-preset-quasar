import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    /**
     * Every spec that builds a sheet reaches the network unless this runs.
     * `@unocss/preset-web-fonts` (enabled by default) fetches its stylesheet
     * while the generator is built, so an un-stubbed suite risks a real request
     * to fonts.bunny.net per generator — the source of the long-standing
     * `Test timed out in 30000ms` flakes, which appeared under load and with a
     * different failing file each run. See `test/setup-network.ts`.
     */
    setupFiles: ['test/setup-network.ts'],
    /**
     * A sheet build is a few hundred milliseconds idle and seconds on a busy
     * box, so the 5000ms default is not enough headroom. The network stub above
     * removes the dominant stall; this stays as the outer guard for a heavily
     * loaded machine.
     */
    testTimeout: 30000
  }
})
