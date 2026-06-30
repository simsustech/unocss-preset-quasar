<template>
  <form
    ref="formRef"
    method="post"
    action="https://codepen.io/pen/define/"
    target="_blank"
    rel="noopener"
    class="hidden"
  >
    <input v-if="active" type="hidden" name="data" :value="options" />
  </form>
</template>

<script setup>
import { Quasar } from 'quasar'
import { computed, nextTick, ref } from 'vue'

import { slugify } from '@/assets/page-utils.js'

const cssResources = [
  'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons',
  `https://cdn.jsdelivr.net/npm/quasar@${Quasar.version}/dist/quasar.min.css`
].join(';')

const jsResources = [
  'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js',
  `https://cdn.jsdelivr.net/npm/quasar@${Quasar.version}/dist/quasar.umd.prod.js`
].join(';')

const replace = (name) => (_, p1) => {
  const parts = p1
    .split(',')
    .map((p) => p.trim())
    .filter((p) => p.length !== 0)
    .reduce((acc, p) => {
      acc.push(p)
      return acc
    }, [])

  const text = []
  if (parts.length !== 0) {
    text.push('const { ' + parts.join(', ') + ' } = ' + name)
  }
  return text.join('\n')
}

const props = defineProps({ title: String })

const active = ref(false)
const formRef = ref(null)
const parts = ref({})

const css = computed(() => parts.value.style?.content.trim() || '')

const cssPreprocessor = computed(() => {
  const lang = parts.value.style?.lang || ''
  return lang === 'css' ? 'none' : lang || 'none'
})

const js = computed(() => {
  const quasarImports = /import\s+{([^}'\n]+)}\s+from\s+'quasar'/g
  const vueImports = /import\s+{([^}'\n]+)}\s+from\s+'vue'/g
  const otherImports = /import ([^'\n]*) from ([^\n]*)/g
  let component = /export default {([\s\S]*)}/g.exec(
    parts.value.js?.content || ''
  )

  component = ((component && component[1]) || '').trim()
  if (component.length !== 0) {
    component = '\n  ' + component + '\n'
  }

  let script = /([\s\S]*)export default {/g.exec(parts.value.js?.content || '')
  script = ((script && script[1]) || '')
    .replace(quasarImports, replace('Quasar'))
    .replace(vueImports, replace('Vue'))
    .replace(otherImports, '')
    .trim()

  script += script ? '\n\n' : ''
  return (
    script +
    `const app = Vue.createApp({${component}})

app.use(Quasar, { config: {} })
app.mount('#q-app')
`
  )
})

const html = computed(() =>
  (parts.value.html?.content || '')
    .replaceAll(/(<template>|<\/template>$)/g, '')
    .replaceAll('\n', '\n  ')
    .replaceAll(
      /([\w]+=")([^"]*?)(")/g,
      (match, p1, p2, p3) =>
        p1 + p2.replaceAll('>', '___TEMP_REPLACEMENT___') + p3
    )
    .replaceAll(
      /<(q-[\w-]+|div)([^>]*?)\s*?([\n\r][\t ]+)?\/>/gs,
      '<$1$2$3></$1>'
    )
    .replaceAll(
      /(<template[^>]*>)(\s*?(?:[\n\r][\t ]+)?)<(thead|tbody|tfoot)/gs,
      '$1$2<___PREVENT_TEMPLATE___$3'
    )
    .replaceAll(
      /<(thead|tbody|tfoot)(.*?)[\n\r]?(\s*)<\/\1>/gs,
      (match, p1, p2, p3) =>
        '<template>\n' +
        p3 +
        '  <' +
        p1 +
        p2.split(/[\n\r]+/g).join('\n  ') +
        '\n' +
        p3 +
        '  </' +
        p1 +
        '>\n' +
        p3 +
        '</template>'
    )
    .replaceAll('___PREVENT_TEMPLATE___', '')
    .replaceAll('___TEMP_REPLACEMENT___', '>')
    .replaceAll(/^\s{2}/gm, '')
    .trim()
)

const editors = computed(() => {
  const flag =
    (html.value && 0b100) | (css.value && 0b010) | (js.value && 0b001)

  return flag.toString(2)
})

const computedTitle = computed(
  () =>
    (typeof document !== 'undefined'
      ? document.title.split(' | ')[0] + ': '
      : '') +
    (props.title ? props.title + ' - ' : '') +
    `Quasar v${Quasar.version}`
)

const slugifiedTitle = computed(() => 'example--' + slugify(props.title))

const options = computed(() => {
  const data = {
    title: computedTitle.value,
    html: `<!--
Forked from:
${window.location.origin + window.location.pathname}#${slugifiedTitle.value}
-->
<div id="q-app" style="min-height: 100vh;">
${html.value}
</div>`,
    head: '',
    html_pre_processor: 'none',
    css: css.value,
    css_pre_processor: cssPreprocessor.value,
    css_external: cssResources,
    js: js.value,
    js_pre_processor: 'none',
    js_external: jsResources,
    editors: editors.value
  }
  return JSON.stringify(data)
})

// `// #region [label]`, `/* #region */`, `<!-- #region -->` and the matching
// `#endregion` markers. Each form is matched on a line on its own, including
// the trailing newline so removal doesn't leave a blank line behind.
const REGION_LINE_RE =
  /^[ \t]*(?:\/\/|\/\*|<!--)\s*#(?:end)?region\b[^\n]*\n?/gm

const stripRegions = (text) => (text ?? '').replace(REGION_LINE_RE, '')

function open(whichParts) {
  parts.value = whichParts.reduce((acc, item) => {
    if (item.codepen) {
      acc[item.codepen] = {
        content: stripRegions(item.content),
        lang: item.lang
      }
    }
    return acc
  }, {})

  if (active.value) {
    formRef.value.submit()
    return
  }

  active.value = true

  nextTick(() => {
    formRef.value.submit()
  })
}

defineExpose({ open })
</script>
