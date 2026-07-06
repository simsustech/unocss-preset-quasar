import { RouteRecordRaw } from 'vue-router'

const componentRoutes = import.meta.glob('../pages/components/*.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/IndexPage.vue') },
      {
        path: 'components',
        children: Object.entries(componentRoutes).map(([name, component]) => {
          const path = name
            .split('/')
            .at(-1)!
            .split('Page.')
            .at(0)
            ?.toLowerCase()

          return {
            path,
            component
          }
        })
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/404',
    alias: '/:catchAll(.*)*',
    component: () => import('src/pages/Error404Page.vue')
  }
]

export default routes
