import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Pseudo-Element Elimination Plan',
  description:
    'Comprehensive plan to eliminate ::before/::after from Quasar SASS and simplify unocss-preset-quasar',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Plan', link: '/plan/' },
      { text: 'Inventory', link: '/inventory/' },
      { text: 'Per-Component Impact', link: '/impact/' },
      { text: 'PoC Implementations', link: '/poc/' },
      { text: 'Before/After', link: '/before-after/' },
      { text: 'Migration Guide', link: '/migration/' }
    ],
    sidebar: {
      '/plan/': [
        { text: 'Overview', link: '/plan/' },
        { text: 'Phases & Timeline', link: '/plan/phases' },
        { text: 'Goals & Success Criteria', link: '/plan/goals' },
        { text: 'Risk Assessment', link: '/plan/risks' }
      ],
      '/inventory/': [
        { text: 'Complete Inventory', link: '/inventory/' },
        { text: 'Replacement Strategies', link: '/inventory/strategies' }
      ],
      '/impact/': [
        { text: 'Overview', link: '/impact/' },
        { text: 'QField / QInput / QSelect', link: '/impact/qfield' },
        { text: 'QDate', link: '/impact/qdate' },
        { text: 'QBtn / QBtnToggle / QFab', link: '/impact/qbtn' },
        { text: 'QToggle / QCheckbox / QRadio', link: '/impact/qtoggle' },
        { text: 'QSlider', link: '/impact/qslider' },
        { text: 'QDialog / QMenu / QTooltip', link: '/impact/qdialog' },
        { text: 'QTree / QTable / QList', link: '/impact/qtree' },
        { text: 'QBadge / QChip / QAvatar', link: '/impact/qbadge' },
        { text: 'QProgress / QSpinner / QCarousel', link: '/impact/qprogress' },
        { text: 'QIcon / QKnob / QEditor', link: '/impact/qicon' },
        { text: 'Visibility / Core', link: '/impact/visibility' }
      ],
      '/poc/': [
        { text: 'Overview', link: '/poc/' },
        { text: 'QField Real DOM Overlays', link: '/poc/qfield' },
        { text: 'QDate Native Calendar', link: '/poc/qdate' },
        { text: 'QDialog Native <dialog>', link: '/poc/qdialog' },
        { text: 'QTooltip Native Popover', link: '/poc/qtooltip' },
        { text: 'QToggle Native Checkbox', link: '/poc/qtoggle' },
        { text: 'QSlider Native Input', link: '/poc/qslider' }
      ],
      '/before-after/': [
        { text: 'Overview', link: '/before-after/' },
        { text: 'QField', link: '/before-after/qfield' },
        { text: 'QDate', link: '/before-after/qdate' },
        { text: 'QBtn', link: '/before-after/qbtn' },
        { text: 'QToggle', link: '/before-after/qtoggle' },
        { text: 'QSlider', link: '/before-after/qslider' },
        { text: 'QDialog', link: '/before-after/qdialog' },
        { text: 'QTree', link: '/before-after/qtree' },
        { text: 'Full CSS Diff', link: '/before-after/full-diff' }
      ],
      '/migration/': [
        { text: 'Overview', link: '/migration/' },
        { text: 'Breaking Changes', link: '/migration/breaking' },
        { text: 'Quasar Core Changes', link: '/migration/quasar-core' },
        { text: 'Preset Changes', link: '/migration/preset' },
        { text: 'Consumer Migration', link: '/migration/consumer' },
        { text: 'Testing Strategy', link: '/migration/testing' }
      ]
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/simsustech/unocss-preset-quasar'
      }
    ],
    search: { provider: 'local' }
  }
})
