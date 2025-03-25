const routes = [
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/dashboard', component: () => import('pages/IndexPage.vue') }, //dashboard
      { path: '/customer', component: () => import('pages/NewClients.vue') }, //customers
      { path: '/customers', component: () => import('pages/ClientList.vue') }, //customers  list

      { path: '/customer/orders', component: () => import('pages/ClientList.vue') }, // entire orders of a customer from the beginning
      { path: '/customers/orders/transaction', component: () => import('pages/ClientList.vue') }, // particular transaction order of a customer

      { path: '/items', component: () => import('pages/ClientList.vue') }, //get all items
      { path: '/items/po', component: () => import('pages/ClientList.vue') }, // get items on a particular PO
      { path: '/items/expired', component: () => import('pages/ClientList.vue') }, // get expired items
      { path: '/items/low-quantity', component: () => import('pages/ClientList.vue') }, // get low quantity items

      { path: '/inventory', component: () => import('pages/ClientList.vue') }, // particular transaction order of a customer
      { path: '/inventory/open', component: () => import('pages/ClientList.vue') }, // particular transaction order of a customer
      { path: '/inventory/close', component: () => import('pages/ClientList.vue') }, // particular transaction order of a customer

    ]
  },
  {
    path: '/',
    component: () => import('pages/LoginPage.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
