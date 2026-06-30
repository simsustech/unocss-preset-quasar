import mdParse from './md-parse.js'

const mdRE = /.md$/

export function mdVitePlugin(isProd) {
  return {
    name: 'quasar:docs:md',
    enforce: 'pre',

    transform(code, id) {
      if (mdRE.test(id)) {
        try {
          return mdParse(code, id, isProd)
        } catch (err) {
          this.error(err)
        }
      }
    }
  }
}
