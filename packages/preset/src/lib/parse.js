// \/\^q-(.*)\$\/,\n(.*)\(\[, c\], \{ theme \}\) =>
// /^q-$1$/, ([, c], { theme }) => theme.quasar?.components?.['q-$1'] ??
// prettier-ignore
import { readFileSync, writeFileSync } from 'fs'
import css from 'css'
import { CssToTailwindTranslator } from 'css-to-tailwind-translator'
const quasarCss = readFileSync('./quasar.css', 'utf-8')

const output = css.parse(quasarCss)
// console.log(output.stylesheet.rules)
// console.log(output.stylesheet.rules.at(-1).declarations)

const cssToUnoCssMap = {}

const cssRuleToUnocss = (selector, declarations) => {
  const cssProps = declarations
    .map((declaration) => `${declaration.property}: ${declaration.value}`)
    .join(';\n')

  let subselector = ''
  if (selector.includes(' ')) {
    let split = selector.split(' ')
    split = split.map((str, i) => {
      if (i > 0) {
        if (str.includes('__'))
          return (
            // prettier-ignore
            str
            // .replaceAll('> ', '>')
            // .replaceAll('+ ', '+')
            // .replaceAll(' >', '>')
            // .replaceAll(' +', '+')
            .replaceAll('__', '\\\\_\\\\_')
            .replaceAll('\n', '')
          )
      }
      return str
    })
    selector = split[0]

    subselector = `[&_${split.slice(1).join('_')}]:`
  }
  if (selector.includes(':')) {
    const selectorSplit = selector.split(':')
    selector = selectorSplit[0]
    subselector = subselector
      ? subselector.replace('[&', `[&:${selectorSplit.slice(1).join(':')}`)
      : `[&:${selectorSplit.slice(1).join(':')}]:`
  }
  if (selector.slice(1).includes('.')) {
    const selectorSplit = selector.split('.')
    selector = selectorSplit.slice(0, 2).join('.')
    subselector = subselector
      ? subselector.replace('[&', `[&.${selectorSplit.slice(2).join('.')}`)
      : `[&.${selectorSplit.slice(2).join('.')}]:`
  }
  const typeMatch = selector.match(/(.*)\[type=(.*)\]/)
  if (typeMatch) {
    selector = typeMatch[1]
    subselector = subselector
      ? subselector.replace('[&', `[&[type=${typeMatch[2]}]`)
      : `[&[type=${typeMatch[2]}]]:`
  }
  if (selector.includes('q-btn--dense')) console.log(selector)

  const cssCode = `
${selector} {
  ${cssProps}
}
`

  const tailwindCss = CssToTailwindTranslator(cssCode)

  cssToUnoCssMap[selector] = [
    ...(cssToUnoCssMap[selector] || []).concat(
      `${subselector}${subselector ? '(' : ''}${tailwindCss.data[0].resultVal}${
        subselector ? ')' : ''
      }`.split(' ')
    )
  ]

  if (tailwindCss)
    return `
[
  /^${selector}$/,
  (
    [, c],
    { theme }
  ) => \`${subselector}(${tailwindCss.data[0].resultVal})\`
],
`
}
output.stylesheet.rules.forEach((rule) => {
  if (rule.selectors?.length) {
    return rule.selectors?.map((selector) =>
      cssRuleToUnocss(selector, rule.declarations)
    )
  }
})
// console.log(unocssRules)
// writeFileSync('./unocssrules.js', unocssRules.flat().join('\n'))

// console.log(cssToUnoCssMap)
const unocssShortcuts = Object.entries(cssToUnoCssMap).map(
  ([selector, classes]) => {
    if (selector.at(0) === '.') selector = selector.slice(1)
    else return
    return `
[
  /^${selector}$/,
  (
    [, c],
    { theme }
  ) => \`${classes.join(' ')}\`
],
`
  }
)

writeFileSync('./unocssshortcuts.js', unocssShortcuts.join('\n'))
writeFileSync(
  './unocssclasses.js',
  Object.keys(cssToUnoCssMap)
    .map((selector) => {
      if (selector.at(0) === '.') selector = selector.slice(1)
      else return ''
      return `'${selector}'`
    })
    .filter((selector) => selector)
    .join(',\n')
)
// console.log(
//   Object.entries(cssToUnoCssMap).filter(([key, val]) => key.includes('field'))
// )
