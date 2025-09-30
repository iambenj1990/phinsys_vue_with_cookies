import { defineRouter } from '#q-app/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import { useUserStore } from 'src/stores/userStore'
import routes from './routes'


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)

  })

  Router.beforeEach(async(to, from, next) => {
  const authenticated = useUserStore()

   if (authenticated.user === null) {
    console.log('Authenticated user check performed in router')
    await authenticated.authenticatedUserCheck()
  }

  const isAuthenticated = authenticated.isAuthenticated
  const isLoginPage = to.path === '/'

  if (to.meta.requiresAuth && !isAuthenticated) {
    // not logged in → go to login page
    return next('/')
  }

  if (isLoginPage && isAuthenticated) {
    // logged in but going to login → redirect to dashboard
    return next('/main')
  }

  return next()

})



  return Router
})
