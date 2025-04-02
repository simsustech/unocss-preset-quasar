// \/\^q-(.*)\$\/,\n(.*)\(\[, c\], \{ theme \}\) =>

// prettier-ignore
import { readFileSync, writeFileSync } from 'fs'
import css from 'css'
import { CssToTailwindTranslator } from 'css-to-tailwind-translator'
const quasarCss = readFileSync('./quasar.css', 'utf-8')

const output = css.parse(quasarCss)

output.stylesheet.rules.forEach((rule) => {
  if (rule.selectors?.length) {
    return rule.selectors?.map((selector) => console.log(selector))
  }
})
