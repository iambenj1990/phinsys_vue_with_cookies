const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
        {
        path: '',
        redirect: '/dashboard'   // 👈 default child
      },
      {
        path: 'dashboard',
        component: () => import('pages/DashBoard.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'customer',
        component: () => import('pages/NewClients.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'customer/releasing',
        component: () => import('pages/NewClientsReleasing.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'customers',
        component: () => import('pages/ClientList.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'customers/profile',
        component: () => import('pages/ClientProfile.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'customers/profile/current',
        component: () => import('pages/ClientProfile_current.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'customer/orders',
        component: () => import('pages/ClientOrderHistory.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'customers/orders/new',
        component: () => import('pages/ClientOrders.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'ris/orders/new',
        component: () => import('pages/NewRIS.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'ris/orders',
        component: () => import('pages/RISListing.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'ris/info/adjust',
        component: () => import('pages/AdjustRIS.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'ris/orders/info',
        component: () => import('pages/RISinfo.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'customers/orders/transaction',
        component: () => import('pages/ClientList.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'items/list',
        component: () => import('pages/ItemsList.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'items/new',
        component: () => import('pages/NewItems.vue'),
        meta: { requiresAuth: true },
      },
         {
        path: 'items/update',
        component: () => import('pages/UpdateItems.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'items/new/batch',
        component: () => import('pages/NewItemsBatchUpload.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'items/po',
        component: () => import('pages/ClientList.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'items/expired',
        component: () => import('pages/ItemsExpiredList.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'items/low-quantity',
        component: () => import('src/pages/ItemsLowStockList.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'items/empty-quantity',
        component: () => import('src/pages/ItemsEmptyStocksList.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'items/movement',
        component: () => import('pages/ItemsMovementList.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'items/reports',
        component: () => import('pages/ItemReports.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'customer/dispense',
        component: () => import('pages/ItemsCustomerDispense.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'inventory',
        component: () => import('pages/ItemsInventory.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'items/temporary-po',
        component: () => import('pages/ItemsTemporaryPO.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'inventory/open',
        component: () => import('pages/ClientList.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'inventory/close',
        component: () => import('pages/ClientList.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'inventory/adjustment',
        component: () => import('pages/ItemsAdjustmentList.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'inventory/stockcard',
        component: () => import('pages/ItemsStockCard.vue'),
        meta: { requiresAuth: true },
      },
       {
        path: 'inventory/stockcard/item',
        component: () => import('pages/ItemsStockCardByItem.vue'),
        meta: { requiresAuth: true },
      },

      {
        path: 'reports/dispense/monthly',
        component: () => import('pages/ItemsMonthlyDispenseReport.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'users/new',
        component: () => import('pages/RegisterUsers.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'users/user',
        component: () => import('pages/UpdateUsers.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'users/list',
        component: () => import('pages/RegisteredUsersList.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'users/credentials',
        component: () => import('pages/UserCredentials.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'users/audit/logs',
        component: () => import('src/pages/AuditTrail.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'libraries/units',
        component: () => import('src/pages/library/UnitsList.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'libraries/list',
        component: () => import('src/pages/library/LibraryPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'libraries/config',
        component: () => import('src/pages/SystemConfiguration.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'libraries/catalog',
        component: () => import('src/pages/library/libItemsList.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },

  // login page stays outside of MainLayout
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
  },

  // 404 page
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
