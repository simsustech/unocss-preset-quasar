import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Pseudo-Element Elimination',
  description:
    'Complete plan, impact analysis, and PoC for eliminating ::before/::after from Quasar components',
  base: '/pseudo-elimination/',
  themeConfig: {
    nav: [
      { text: 'Plan', link: '/plan/' },
      { text: 'Impact Analysis', link: '/impact/' },
      { text: 'PoC: QDate', link: '/poc/qdate' },
      { text: 'Screenshots', link: '/screenshots/' }
    ],
    sidebar: {
      '/plan/': [
        { text: 'Overview', link: '/plan/' },
        { text: 'Strategy', link: '/plan/strategy' },
        { text: 'Phases', link: '/plan/phases' },
        { text: 'Validation', link: '/plan/validation' }
      ],
      '/impact/': [
        { text: 'Overview', link: '/impact/' },
        { text: 'Per-Component Table', link: '/impact/per-component' },
        { text: 'Native Swap Feasibility', link: '/impact/feasibility' }
      ],
      '/poc/': [
        { text: 'QDate PoC', link: '/poc/qdate' },
        { text: 'Structural Classes', link: '/poc/structural-classes' },
        { text: 'Preset Changes', link: '/poc/preset-changes' }
      ],
      '/screenshots/': [
        { text: 'Before/After', link: '/screenshots/' },
        { text: 'QDate Calendar', link: '/screenshots/qdate' },
        { text: 'QField Overlay', link: '/screenshots/qfield' }
      ]
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/simsustech/unocss-preset-quasar'
      }
    ]
  }
})
