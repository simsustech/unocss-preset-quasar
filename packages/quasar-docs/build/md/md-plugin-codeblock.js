import { langMatch } from './highlight/build-langs.js'
import { encodeForAttr } from './md-parse-utils.js'
// import { highlighter } from './highlight/build-highlighter.js'
// import { buildFenceTransformers, themeOptions } from './highlight/shared.js'
// import { getFenceBuildOnlyTransformers } from './highlight/twoslash.js'
// import { getSharedStyleToClasses } from '../shiki-css-stash.js'

// function getHighlightedContent(rawContent, attrs) {
//   const { lang } = attrs
//   const content = rawContent.trim()

//   const html = highlighter
//     .codeToHtml(content, {
//       lang,
//       ...themeOptions,
//       transformers: [
//         ...buildFenceTransformers(getFenceBuildOnlyTransformers(attrs)),
//         ...getSharedStyleToClasses()
//       ]
//     })
//     .replace('<pre ', '<pre v-pre ')

//   return `<div class="relative-position copybtn-hover">${html}<DocCopyBtn /></div>`
// }

/**
 * lang -> one of the supported languages
 * title -> optional card title
 */
const definitionLineRE = new RegExp(
  '^' +
    `(?<lang>(tabs|${langMatch}))` + // then a language name
    String.raw`(\s+(?<title>.+))?` + // then optional title
    '$'
)

/**
 * <<| lang title |>>
 * ...content...
 */
const tabsLineRE = new RegExp(
  String.raw`^<<\|\s+` + // starts with "<<|" + at least one space char
    `(?<lang>${langMatch})` + // then a language name
    String.raw`(\s+(?<title>.+))?` + // then optional title
    String.raw`\s*\|>>$` // then any number of space chars + the ending "|>>"
)

function extractTabs(content) {
  const list = []
  const tabMap = {}

  let currentTabName = null

  for (const line of content.split('\n')) {
    const tabsMatch = line.match(tabsLineRE)

    if (tabsMatch !== null) {
      const {
        groups: { lang, title }
      } = tabsMatch

      currentTabName = title?.trim() || `Tab ${list.length + 1}`

      list.push(currentTabName)
      tabMap[currentTabName] = {
        attrs: { lang },
        content: []
      }
    } else if (currentTabName !== null) {
      tabMap[currentTabName].content.push(line)
    }
  }

  if (list.length === 0) return

  return {
    param: `[ ${list.map((tab) => `'${tab}'`).join(', ')} ]`,
    content: list
      .map((tabName) => {
        const props = tabMap[tabName]
        const tabContent = props.content.join('\n')
        return (
          `<q-tab-panel class="q-pa-none" name="${tabName}">` +
          getDocCode(tabContent, props.attrs) +
          '</q-tab-panel>'
        )
      })
      .join('\n')
  }
}

export function parseDefinitionLine(token) {
  const match = token.info.trim().match(definitionLineRE)

  if (match === null) {
    return {
      lang: 'text',
      title: null
    }
  }

  const {
    groups: { lang, title }
  } = match

  return {
    lang,
    title: title?.trim() || null,
    ...(lang === 'tabs' ? { tabs: extractTabs(token.content) } : {})
  }
}

function getDocCode(content, attrs) {
  return `<DocCode lang="${attrs.lang}" :code="${encodeForAttr(content.trim())}" />`
}

export default function mdPluginCodeblock(md) {
  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx]
    const attrs = parseDefinitionLine(token)

    md.$frontMatter.pageScripts.add(
      "import DocPrerender from '@/components/DocPrerender.js'"
    )
    md.$frontMatter.pageScripts.add(
      "import DocCopyBtn from '@/components/DocCopyBtn.vue'"
    )
    md.$frontMatter.pageScripts.add(
      "import DocCode from '@/components/DocCode.vue'"
    )

    return (
      `<DocPrerender${attrs.title !== null ? ` title="${attrs.title}"` : ''}` +
      `${attrs.tabs !== void 0 ? ` :tabs="${attrs.tabs.param}"` : ''}>` +
      (attrs.tabs !== void 0
        ? attrs.tabs.content
        : getDocCode(token.content, attrs)) +
      '</DocPrerender>'
    )
  }
}
