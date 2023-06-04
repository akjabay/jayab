
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/items',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/items/ItemsPage.vue') },
      { path: ':view', component: () => import('pages/items/ItemsPage.vue') },
    ]
  },
  {
    path: '/products',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: ':pid', component: () => import('pages/products/ProductPage.vue') },
    ]
  },
  {
    path: '/accounts',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/user/LoginPage.vue') },
      { path: 'signup', component: () => import('pages/user/SignupPage.vue') },
      { path: 'reset-password', component: () => import('pages/user/PassResetPage.vue') },
      { path: 'profile', component: () => import('pages/user/ProfilePage.vue') },
      { path: 'profile/setting', component: () => import('pages/user/ProfileSettingPage.vue') },
      { path: 'profile/setting/:userId', component: () => import('pages/user/ProfileSettingPage.vue') },
      { path: 'profile/:userId', component: () => import('pages/user/ProfilePage.vue') },
      { path: 'subscription', component: () => import('pages/subscription/SubscriptionPage.vue') },
      { path: 'subscription/:id', component: () => import('pages/subscription/SubscriptionActivatePage.vue') },
      { path: 'plus', component: () => import('pages/user/PlusPage.vue') },
      { path: 'plus/manage-map', component: () => import('pages/user/ManageMapPage.vue') },
      { path: 'plus/manage-list', component: () => import('pages/user/ManageListPage.vue') },
    ]
  },

  {
    path: '/categories',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: ':categoryId', component: () => import('pages/categories/CategoryPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
