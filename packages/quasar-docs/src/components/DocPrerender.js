import { computed, h, ref } from 'vue'
import { QCard, QSeparator, QTab, QTabPanels, QTabs } from 'quasar'

const iconClassMap = {
  Yarn: ' doc-tab-icon doc-tab-icon--yarn',
  NPM: ' doc-tab-icon doc-tab-icon--npm',
  PNPM: ' doc-tab-icon doc-tab-icon--pnpm',
  Bun: ' doc-tab-icon doc-tab-icon--bun'
}

export default {
  props: {
    title: String,
    tabs: Array
  },

  setup(props, { slots }) {
    const currentTab = ref(props.tabs !== void 0 ? props.tabs[0] : null)

    const hasHeader = computed(
      () => props.title !== void 0 || props.tabs !== void 0
    )

    function getContent() {
      const acc = []

      if (props.title !== void 0) {
        acc.push(
          h('div', { class: 'header-toolbar row items-center' }, [
            h('div', { class: 'doc-card-title q-my-xs q-mr-sm' }, props.title)
          ])
        )
      }

      if (props.tabs !== void 0) {
        acc.push(
          h(
            QTabs,
            {
              class: 'header-tabs',
              align: 'left',
              activeColor: 'brand-primary',
              indicatorColor: 'brand-primary',
              dense: true,
              breakpoint: 0,
              shrink: true,
              modelValue: currentTab.value,
              'onUpdate:modelValue': (v) => {
                currentTab.value = v
              }
            },
            () =>
              props.tabs.map((tab) =>
                h(QTab, {
                  name: tab,
                  label: tab,
                  class: 'header-btn' + (iconClassMap[tab] || ''),
                  noCaps: true
                })
              )
          )
        )
      }

      if (hasHeader.value) acc.push(h(QSeparator))

      if (props.tabs !== void 0) {
        acc.push(
          h(
            QTabPanels,
            {
              animated: true,
              modelValue: currentTab.value,
              keepAlive: true
            },
            slots.default
          )
        )
      } else {
        acc.push(...slots.default())
      }

      return acc
    }

    return () => h(QCard, { flat: true, bordered: true }, getContent)
  }
}
