// Coverage diff: emitted CSS selectors per route, local harness vs reference.
// Usage:
//   node scripts/diff-coverage.mjs --routes q-btn,q-card --out /tmp/coverage-diff.json
//   node scripts/diff-coverage.mjs --all --out /tmp/coverage-diff.json
// Writes { [route]: { local: <count>, ref: <count>, missingInLocal: [<selector>] } }
// plus module mapping by q-<name> class prefix.
import { writeFileSync } from 'node:fs'
// Resolved from the harness workspace (preset workspace has no playwright dep).
import { chromium } from '/home/stefan/Projects/quasar-testing-harness/node_modules/.pnpm/@playwright+test@1.63.0/node_modules/@playwright/test/index.mjs'

const LOCAL = 'http://localhost:3000'
const REF = 'https://simsustech.github.io/quasar-testing-harness'

const args = process.argv.slice(2)
const routesArg = args.find((a) => a.startsWith('--routes='))?.split('=')[1]
const runAll = args.includes('--all')
const out =
  args.find((a) => a.startsWith('--out='))?.split('=')[1] ??
  '/tmp/coverage-diff.json'
const style = 'md3'

async function selectorsFor(page, base, route) {
  await page.goto(`${base}/${route}?style=${style}`, {
    waitUntil: 'networkidle',
    timeout: 60000
  })
  await page.waitForTimeout(2000)
  return page.evaluate(() => {
    const out = []
    for (const sh of document.styleSheets) {
      let rules
      try {
        rules = [...sh.cssRules]
      } catch {
        continue // cross-origin sheet
      }
      for (const r of rules) {
        if (r.selectorText) out.push(r.selectorText)
      }
    }
    return out
  })
}

function moduleOf(selector) {
  const m = selector.match(/\.q-([a-z]+(?:-[a-z]+)*)/)
  return m ? m[1] : '(other)'
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })

let routes
if (runAll) {
  await page.goto(`${REF}/?style=${style}`, {
    waitUntil: 'networkidle',
    timeout: 60000
  })
  await page.waitForTimeout(1500)
  routes = await page.evaluate(() =>
    [...document.querySelectorAll('a[href]')]
      .map(
        (a) =>
          (a.getAttribute('href') ?? '').split('?')[0].split('/').pop() ?? ''
      )
      .filter((h) => /^q-[a-z0-9-]+$/.test(h))
      .filter((h, i, arr) => arr.indexOf(h) === i)
  )
  console.log(`discovered ${routes.length} routes`)
} else {
  routes = (routesArg ?? 'q-btn,q-card').split(',')
}

const diff = {}
for (const route of routes) {
  const local = await selectorsFor(page, LOCAL, route)
  const ref = await selectorsFor(page, REF, route)
  const localSet = new Set(local)
  const missing = [...new Set(ref)].filter((s) => !localSet.has(s))
  const byModule = {}
  for (const s of missing) {
    const mod = moduleOf(s)
    byModule[mod] = (byModule[mod] ?? 0) + 1
  }
  diff[route] = {
    local: local.length,
    ref: ref.length,
    missingCount: missing.length,
    byModule,
    missing: missing.slice(0, 200)
  }
  console.log(
    `${route}: local=${local.length} ref=${ref.length} missing=${missing.length}`
  )
}

await browser.close()
writeFileSync(out, JSON.stringify(diff, null, 1))
console.log(`wrote ${out}`)
