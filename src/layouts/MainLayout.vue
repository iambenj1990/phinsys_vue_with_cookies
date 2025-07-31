<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn flat dense round @click="toggleLeftDrawer()" aria-label="Menu" icon="menu" />
        <q-btn flat no-caps no-wrap class="q-ml-xs">
          <q-icon name="local_pharmacy" color="red" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold">
            City Health Office - Inventory System
          </q-toolbar-title>
        </q-btn>

        <div class="q-ml-auto q-gutter-sm">
          <q-btn-dropdown flat dense dropdown-icon="arrow_drop_down">
            <template v-slot:label>
              <q-avatar size="26px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </template>

            <q-tooltip>Account</q-tooltip>

            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup @click=" $router.push('/users/user/')">
                <q-item-section>
                  <q-item-label>
                    <q-icon name="account_circle"  size="20px"></q-icon>
                    Account
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="logout()">
                <q-item-section>
                  <q-item-label>
                     <q-icon name="logout" size="20px"></q-icon>
                    Logout
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-green-10 text-white">
      <q-scroll-area class="fit">
        <q-list>
          <q-item> </q-item>

          <q-item clickable v-ripple to="/dashboard">
            <q-icon name="dashboard" size="24px" class="q-mr-md" />
            <p class="text-sm">Dashboard</p>
          </q-item>
          <q-separator />
          <q-expansion-item
            v-model="expanded"
            label="Client Management"
            icon="app_registration"
            class="text-subtitle2"
          >
            <q-item clickable v-ripple to="/customer/orders">
              <q-item-section class="q-ml-sm">
                <q-item-label class="text-caption">
                  <q-icon name="pallet" class="q-ml-md q-mr-md" size="24px" />
                  Releasing
                </q-item-label>
              </q-item-section>
            </q-item>
              <q-item clickable v-ripple to="/ris/orders/new">
              <q-item-section class="q-ml-sm">
                <q-item-label class="text-caption">
                  <q-icon name="receipt" class="q-ml-md q-mr-md" size="24px" />
                  Requisition and Issuance
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/customers">
              <q-item-section class="q-ml-sm">
                <q-item-label class="text-caption">
                  <q-icon name="person" class="q-ml-md q-mr-md" size="24px" />
                  Customer History
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-expansion-item
            label="Stocks Management"
            expand-separator
            icon="inventory"
            class="text-subtitle2"
            v-model="expanded"
          >
            <q-item clickable v-ripple to="/items/list">
              <q-item-section class="q-ml-sm">
                <q-item-label class="text-caption">
                  <q-icon name="get_app" class="q-ml-md q-mr-md" size="24px" />Stock
                  Purchases</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/inventory/adjustment">
              <q-item-section class="q-ml-sm">
                <q-item-label class="text-caption">
                  <q-icon name="lock_clock" class="q-ml-md q-mr-md" size="24px" />Stock
                  Adjustment</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/items/movement">
              <q-item-section class="q-ml-sm">
                <q-item-label class="text-caption">
                  <q-icon name="timeline" class="q-ml-md q-mr-md" size="24px" />Stock
                  Inventory</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-expansion-item
            label="Reports"
            expand-separator
            icon="bar_chart"
            class="text-subtitle2"
            v-model="expanded"
          >
            <q-item clickable v-ripple to="/items/reports">
              <q-item-section class="q-ml-sm">
                <q-item-label class="text-caption">
                  <q-icon
                    name="production_quantity_limits"
                    class="q-ml-md q-mr-md"
                    size="24px"
                  />Stocks
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-expansion-item
            label="Settings"
            expand-separator
            icon="settings"
            class="text-subtitle2"
            v-model="expanded"
          >
            <q-item clickable v-ripple to="/users/list">
              <q-item-section class="q-ml-sm">
                <q-item-label class="text-caption">
                  <q-icon name="manage_accounts" class="q-ml-md q-mr-md" size="24px" />Users
                  Management
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/libraries/list">
              <q-item-section class="q-ml-sm">
                <q-item-label class="text-caption">
                  <q-icon name="category" class="q-ml-md q-mr-md" size="24px" />Libraries
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import auth from 'src/services/auth'
import {useUserStore} from 'src/stores/userStore'
export default {
  name: 'MyLayout',
  components: {},

  setup() {
    const ausSrvc = auth
    const userStore = useUserStore()
    return {
      ausSrvc,
      userStore
    }
  },
  data() {
    return {
      leftDrawerOpen: false,
      expanded: true,
    }
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },

    async logout(){
      try {
        await this.ausSrvc.logout()
        this.$router.push('/')
      } catch (error) {
        console.log (error)
      }
    },

    GetUserID(){
      const unsanitized_object = localStorage.getItem('user')
      const sanitized_object = unsanitized_object.replace('__q_objt|', '')
      const user = JSON.parse(sanitized_object)
      this.userStore.authenticatedUser = user.id
     // console.log(user.id)
    }
  },

  watch: {},
  mounted() {
    // This is where you can perform any actions when the component is mounted

    if (this.ausSrvc.isAuthenticated()) {
      this.ausSrvc.initializeAuth()
      this.GetUserID()
    }
  },
}
</script>
<style scoped></style>
