import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'unocss-preset-quasar',
  description:
    'UnoCSS preset for Quasar Framework — utility-first, tree-shakeable Quasar component styles',

  base: '/unocss-preset-quasar/',

  head: [['link', { rel: 'icon', href: '/unocss-preset-quasar/favicon.svg' }]],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Core', link: '/core/theming' },
      { text: 'Styles', link: '/styles/overview' },
      { text: 'API', link: '/api/quasar-preset' },
      { text: 'Changelog', link: '/changelog' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'Quasar Integration', link: '/guide/quasar-integration' },
            { text: 'Development', link: '/guide/development' }
          ]
        }
      ],
      '/core/': [
        {
          text: 'Core Utilities',
          items: [
            { text: 'Theming', link: '/core/theming' },
            { text: 'Colors', link: '/core/colors' },
            { text: 'Typography', link: '/core/typography' },
            { text: 'Elevation & Shadows', link: '/core/elevation' },
            { text: 'Transitions', link: '/core/transitions' },
            { text: 'Flex & Grid', link: '/core/flex' },
            { text: 'Positioning', link: '/core/positioning' },
            { text: 'Spacing', link: '/core/spacing' },
            { text: 'Visibility', link: '/core/visibility' }
          ]
        }
      ],
      '/styles/': [
        {
          text: 'Style System',
          items: [
            { text: 'Overview', link: '/styles/overview' },
            { text: 'Material Design 3', link: '/styles/material-design-3' },
            { text: 'Material Design 2', link: '/styles/material-design-2' },
            { text: 'Unstyled', link: '/styles/unstyled' },
            { text: 'Scoped Mode', link: '/styles/scoping' }
          ]
        }
      ],
      '/plugins/': [
        {
          text: 'Plugins',
          items: [
            { text: 'Overview', link: '/plugins/overview' },
            { text: 'Available Plugins', link: '/plugins/available-plugins' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'QuasarPreset()', link: '/api/quasar-preset' },
            { text: 'QuasarPresetOptions', link: '/api/quasar-preset-options' },
            { text: 'QuasarStyle', link: '/api/quasar-style' },
            { text: 'QuasarTheme', link: '/api/quasar-theme' },
            { text: 'quasarPresetAliases()', link: '/api/vite-aliases' },
            { text: 'setThemeColors()', link: '/api/set-theme-colors' },
            { text: 'Helpers', link: '/api/helpers' }
          ]
        }
      ]
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/simsustech/unocss-preset-quasar'
      }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024–2026 Stefan van Herwijnen'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern:
        'https://github.com/simsustech/unocss-preset-quasar/edit/main/packages/docs/:path'
    }
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})
