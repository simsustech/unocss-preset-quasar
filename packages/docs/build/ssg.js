import { join, normalize } from 'node:path'
import fse from 'fs-extra'
import { globSync } from 'tinyglobby'

const rootFolder = normalize(join(import.meta.dirname, '..'))
const baseUrl = 'http://localhost'
const clientDir = join(rootFolder, 'dist/quasar.dev/client')
const themeList = ['light', 'dark']

const themedRouteList = [
  '', // landing page
  ...globSync('**/*.md', { cwd: join(rootFolder, 'src/pages') }).map((key) => {
    const parts = key.slice(0, -3).split('/')
    const len = parts.length
    const _path =
      parts[len - 2] === parts[len - 1] ? parts.slice(0, len - 1) : parts

    return _path.join('/')
  })
]

const lowerCaseRE = /^[a-z]/
const lightRouteList = [
  'layout-builder',
  ...globSync('*.vue', { cwd: join(rootFolder, 'src/layouts/gallery') })
    .map((entry) => entry.slice(0, -4))
    .filter((entry) => lowerCaseRE.test(entry))
    .map((entry) => 'layout/gallery/' + entry)
]

const { renderSsrContext } = await import('../dist/quasar.dev/index.js')

function get(url, theme) {
  return renderSsrContext({
    req: {
      url: baseUrl + url,
      headers: {
        cookie: `theme=${theme}`
      }
    }
  })
}

for (const theme of themeList) {
  await get('/get-a-404', theme)
    .catch((err) => {
      console.error(
        '[ Quasar SSG ] Failed to render 404 page for theme:',
        theme
      )
      console.error(err)
      process.exit(1)
    })
    .then((html) => {
      const file = join(clientDir, `index-404-${theme}.html`)
      fse.ensureFileSync(file)
      fse.writeFileSync(file, html, 'utf8')
      console.log(`[ Quasar SSG ] [ ${theme} ] Rendered 404 page`)
    })

  for (const _path of themedRouteList) {
    await get('/' + _path, theme)
      .catch((err) => {
        console.error('[ Quasar SSG ] Failed to render:', {
          theme,
          path: _path
        })
        if (err) console.error(err)
        process.exit(1)
      })
      .then((html) => {
        const file = join(clientDir, _path, `index-${theme}.html`)
        fse.ensureFileSync(file)
        fse.writeFileSync(file, html, 'utf8')
        console.log(`[ Quasar SSG ] [ ${theme} ] Rendered: /${_path}`)
      })
  }
}

for (const _path of lightRouteList) {
  await get('/' + _path, 'light')
    .catch((err) => {
      console.error('[ Quasar SSG ] Failed to render path:', _path)
      if (err) console.error(err)
      process.exit(1)
    })
    .then((html) => {
      const file = join(clientDir, _path, 'index.html')
      fse.ensureFileSync(file)
      fse.writeFileSync(file, html, 'utf8')
      console.log(`[ Quasar SSG ] [ light (only) ] Rendered: /${_path}`)
    })
}
