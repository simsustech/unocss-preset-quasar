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
      { text: 'Styles', link: '/styles/overview' },
      { text: 'Core', link: '/core/theming' },
      { text: 'Components', link: '/components/catalogue' },
      {
        text: 'More',
        items: [
          { text: 'Plugins', link: '/plugins/overview' },
          { text: 'App Extensions', link: '/app-extensions/overview' },
          { text: 'Architecture', link: '/architecture/overview' }
        ]
      },
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
      '/plugins/': [
        {
          text: 'Plugins',
          items: [
            { text: 'Overview', link: '/plugins/overview' },
            { text: 'Available Plugins', link: '/plugins/available-plugins' }
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
            { text: 'Runtime Switching', link: '/styles/scoping' }
          ]
        }
      ],
      '/core/': [
        {
          text: 'Core Utilities',
          items: [
            { text: 'Theming & Tokens', link: '/core/theming' },
            { text: 'Colors', link: '/core/colors' },
            { text: 'Typography', link: '/core/typography' },
            { text: 'Elevation & Z-index', link: '/core/elevation' },
            { text: 'Spacing', link: '/core/spacing' },
            { text: 'Flex & Grid', link: '/core/flex' },
            { text: 'Positioning', link: '/core/positioning' },
            { text: 'Visibility & Responsiveness', link: '/core/visibility' },
            { text: 'Transitions & Motion', link: '/core/transitions' },
            { text: 'Input & Platform', link: '/core/input-platform' }
          ]
        }
      ],
      '/components/': [
        {
          text: 'Components',
          items: [{ text: 'Catalogue', link: '/components/catalogue' }]
        }
      ],
      '/app-extensions/': [
        {
          text: 'App Extensions',
          items: [
            { text: 'Overview', link: '/app-extensions/overview' },
            { text: 'Supported Libraries', link: '/app-extensions/supported' }
          ]
        }
      ],
      '/architecture/': [
        {
          text: 'Architecture',
          items: [
            { text: 'How It Works', link: '/architecture/overview' },
            {
              text: 'Styles & Scoping',
              link: '/architecture/style-configuration'
            },
            {
              text: 'Extraction & Safelisting',
              link: '/architecture/extraction'
            },
            { text: 'Rule Assembly', link: '/architecture/rule-assembly' },
            { text: 'Decisions', link: '/architecture/decisions' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'QuasarPreset()', link: '/api/quasar-preset' },
            { text: 'QuasarPresetOptions', link: '/api/quasar-preset-options' },
            { text: 'Styles (/styles)', link: '/api/styles' },
            { text: 'Theme (/theme)', link: '/api/theme' },
            { text: 'Runtime (/runtime)', link: '/api/runtime' },
            { text: 'setThemeColors()', link: '/api/set-theme-colors' }
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
