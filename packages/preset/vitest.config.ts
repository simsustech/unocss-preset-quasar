import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    /**
     * Several tests build a full UnoCSS sheet from the preset, which is a few
     * hundred milliseconds on an idle machine and several seconds when the box
     * is busy (dev servers, Playwright, a build). At the 5000ms default they
     * fail as `Test timed out in 5000ms` in clusters — measured as roughly one
     * run in four, with different files each time, which reads like flakiness
     * in the assertions but is only the default budget.
     */
    testTimeout: 30000
  }
})
