

const routes = [
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
       { path: '', component: () => import('pages/DashBoard.vue') }, //dashboard
      { path: '/dashboard', component: () => import('pages/DashBoard.vue') }, //dashboard
      { path: '/customer', component: () => import('pages/NewClients.vue') }, //customers
      { path: '/customers', component: () => import('pages/ClientList.vue') }, //customers  list
      { path: '/customers/profile', component: () => import('pages/ClientProfile.vue') }, //customers  profile and order history
      { path: '/customers/profile/current', component: () => import('pages/ClientProfile_current.vue') }, //customers  profile and order history
      { path: '/customer/orders', component: () => import('pages/ClientOrderHistory.vue') }, // entire  customer from the beginning
      { path: '/customers/orders/new', component:()=> import('pages/ClientOrders.vue')},
      { path: '/customers/orders/transaction', component: () => import('pages/ClientList.vue') }, // particular transaction order of a customer

      { path: '/items/list', component: () => import('pages/ItemsList.vue') }, //get all items
      { path: '/items/new', component: () => import('pages/NewItems.vue') }, //get all items
      { path: '/items/po', component: () => import('pages/ClientList.vue') }, // get items on a particular PO
      { path: '/items/expired', component: () => import('pages/ItemsExpiredList.vue') }, // get expired items
      { path: '/items/low-quantity', component: () => import('pages/ItemsNoStockList.vue') }, // get low quantity items
      { path: '/items/movement', component: () => import('pages/ItemsMovementList.vue') }, // get low quantity items
      { path: '/items/reports', component: () => import('pages/ItemReports.vue') }, // get low quantity items

      { path: '/inventory', component: () => import('pages/ItemsInventory.vue') }, // particular transaction order of a customer
      { path: '/inventory/open', component: () => import('pages/ClientList.vue') }, // particular transaction order of a customer
      { path: '/inventory/close', component: () => import('pages/ClientList.vue') }, // particular transaction order of a customer
      { path: '/inventory/adjustment', component: () => import('pages/ItemsAdjustmentList.vue') }, //get all items

      { path: '/reports/dispense/monthly', component: () => import('pages/ItemsMonthlyDispenseReport.vue') },

      { path: '/users/new', component: () => import('pages/RegisterUsers.vue') }, // particular transaction order of a customer
       { path: '/users/user/', component: () => import('pages/UpdateUsers.vue') }, // particular transaction order of a customer
      { path: '/users/list', component: () => import('pages/RegisteredUsersList.vue') }, // particular transaction order of a customer
      { path: '/users/credentials', component: () => import('pages/UserCredentials.vue') }, // particular transaction order of a customer

       { path: '/libraries/units', component: () => import('src/pages/library/UnitsList.vue') }, // particular transaction order of a customer
       { path: '/libraries/list', component: () => import('src/pages/library/LibraryPage.vue') }, // particular transaction order of a customer
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
