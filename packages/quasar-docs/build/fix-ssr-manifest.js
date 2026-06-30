/**
 * Vite 3+ injects vendor.css into the manifest, which doubles up the html link tag for it.
 * This differs significantly from Vite 2, which didn't do this when manually generating a vendor chunk
 * that also contains CSS (not only JS).
 *
 * See ./chunks.js for more info.
 */

import { join } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'

console.log('Fixing SSR manifest...')

const manifestPath = join(
  import.meta.dirname,
  '../dist/quasar.dev/quasar.manifest.json'
)
const manifestJson = JSON.parse(readFileSync(manifestPath, 'utf8'))

for (const key in manifestJson) {
  manifestJson[key] = manifestJson[key].filter(
    (entry) => entry !== '/assets/vendor.css'
  )
}

writeFileSync(manifestPath, JSON.stringify(manifestJson))
