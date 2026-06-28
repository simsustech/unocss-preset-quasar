import { existsSync, readFileSync } from 'node:fs'
import { dirname, isAbsolute, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

type Alias = {
  find: string | RegExp
  replacement: string
}

/**
 * Walk up from `start` until we find a directory containing
 * `unocss-preset-quasar`'s `package.json`, then return its `src/` folder.
 * Works regardless of whether this module was loaded from `src/` or
 * `dist/`.
 */
const findPackageSrcDir = (start: string): string => {
  let dir = start
  for (let i = 0; i < 10; i++) {
    const pkgPath = resolve(dir, 'package.json')
    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
        if (pkg.name === 'unocss-preset-quasar') {
          return resolve(dir, 'src')
        }
      } catch {
        // ignore parse errors and keep walking
      }
    }
    const parent = dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  // Fallback: assume src/ is a sibling of the loaded file
  return resolve(start, 'src')
}

const resolveSrcDir = (): string => {
  // Allow the consumer to override the package location via env var
  const envPath = process.env.UNOCSS_PRESET_QUASAR_SRC
  if (envPath && isAbsolute(envPath)) return envPath
  return findPackageSrcDir(dirname(fileURLToPath(import.meta.url)))
}

const srcDir = resolveSrcDir()

/**
 * Vite resolve.alias records that map the package's published entry points
 * back to their TypeScript sources, so the dev server picks up live edits
 * without needing a rebuild.
 *
 * Intended for `vitrify.dev.alias` (or any `resolve.alias` config) in dev
 * mode. Do NOT apply this in production — published consumers should use
 * the compiled dist output.
 *
 * Usage:
 * ```ts
 * // quasar-dev/packages/app/vitrify.config.ts
 * import { quasarPresetAliases } from 'unocss-preset-quasar/vite-aliases'
 *
 * export default defineConfig({
 *   vitrify: {
 *     dev: { alias: quasarPresetAliases() }
 *   }
 * })
 * ```
 *
 * The package source directory is auto-detected by walking up from this
 * module to find `unocss-preset-quasar/package.json`. Set
 * `UNOCSS_PRESET_QUASAR_SRC` to override.
 */
export const quasarPresetAliases = (): Alias[] => {
  const dir = resolveSrcDir()
  return [
    {
      find: /^unocss-preset-quasar$/,
      replacement: resolve(dir, 'index.ts')
    },
    {
      find: /^unocss-preset-quasar\/styles$/,
      replacement: resolve(dir, 'styles/index.ts')
    },
    {
      find: /^unocss-preset-quasar\/theme$/,
      replacement: resolve(dir, 'theme.ts')
    },
    {
      find: /^unocss-preset-quasar\/vite-aliases$/,
      replacement: resolve(dir, 'vite-aliases.ts')
    }
  ]
}
