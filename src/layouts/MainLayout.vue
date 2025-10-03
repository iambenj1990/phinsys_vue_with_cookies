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
              <q-avatar size="26px" class="q-mr-sm">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
              {{ user.first_name }} {{ user.last_name }}
            </template>

            <q-tooltip>Account</q-tooltip>

            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup @click="$router.push('/users/user/')">
                <q-item-section>
                  <q-item-label>
                    <q-icon name="account_circle" size="20px"></q-icon>
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

          <q-item clickable v-ripple to="/dashboard" v-if="moduleAccess('Dashboard')">
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
            <q-item clickable v-ripple to="/customer/orders" v-if="moduleAccess('Releasing')">
              <q-item-section class="q-ml-sm">
                <q-item-label class="text-caption">
                  <q-icon name="pallet" class="q-ml-md q-mr-md" size="24px" />
                  Releasing
                </q-item-label>
              </q-item-section>
            </q-item>
            <!--
              <q-item clickable v-ripple to="/ris/orders">
              <q-item-section class="q-ml-sm">
                <q-item-label class="text-caption">
                <q-icon name="receipt" class="q-ml-md q-mr-md" size="24px" />
                Requisition and Issuance
                </q-item-label>
              </q-item-section>
              </q-item>
            -->
            <q-item clickable v-ripple to="/customers" v-if="moduleAccess('Customer History')">
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
            <q-item clickable v-ripple to="/items/list" v-if="moduleAccess('Purchasing')">
              <q-item-section class="q-ml-sm">
                <q-item-label class="text-caption">
                  <q-icon name="get_app" class="q-ml-md q-mr-md" size="24px" />Stock
                  Purchases</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/ris/orders" v-if="moduleAccess('RIS')">
              <q-item-section class="q-ml-sm">
                <q-item-label class="text-caption">
                  <q-icon name="receipt" class="q-ml-md q-mr-md" size="24px" />
                  Requisition and Issuance
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/inventory/adjustment" v-if="moduleAccess('Adjustments')">
              <q-item-section class="q-ml-sm">
                <q-item-label class="text-caption">
                  <q-icon name="lock_clock" class="q-ml-md q-mr-md" size="24px" />Stock
                  Adjustment</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/items/movement" v-if="moduleAccess('Stocks')">
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
            <q-item clickable v-ripple to="/users/list" v-if="moduleAccess('User Management')">
              <q-item-section class="q-ml-sm">
                <q-item-label class="text-caption">
                  <q-icon name="manage_accounts" class="q-ml-md q-mr-md" size="24px" />Users
                  Management
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/libraries/list" v-if="moduleAccess('Libraries')">
              <q-item-section class="q-ml-sm">
                <q-item-label class="text-caption">
                  <q-icon name="category" class="q-ml-md q-mr-md" size="24px" />Libraries
                </q-item-label>
              </q-item-section>
            </q-item>
            <!-- <q-item
              clickable
              v-ripple
              @click="
                () => {
                  syncdataDialog = true
                }
              "
            >
              <q-item-section class="q-ml-sm">
                <q-item-label class="text-caption">
                  <q-icon name="wifi_off" class="q-ml-md q-mr-md" size="24px" />Offline Mode
                </q-item-label>
              </q-item-section>
            </q-item> -->
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="syncdataDialog" persistent>
      <q-card class="q-px-md">
        <q-card-section class="row items-center" v-if="online">
          <q-icon name="sync" size="56px" class="q-mr-md" color="orange" />
          <div>
            <div class="text-h6">Fetch Data from Main Server</div>
            <div class="text-subtitle2">
              Download data for offline use. Please ensure you have a stable connection.
              <q-btn
                color="primary"
                class="q-ml-sm q-mt-md text-subtitle2"
                :loading="loadingDownload"
                @click="downloadData()"
              >
                <div>Download Data</div>
                <q-icon name="cloud_download" class="q-mr-sm q-ml-sm" />
                <template v-slot:loading>
                  <q-spinner size="20px" color="white" />
                </template>
              </q-btn>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="row items-center" v-else>
          <q-icon name="wifi_off" size="56px" class="q-mr-md" color="orange" />
          <div class="col-md-6 q-pt-lg">
            <div class="text-h6">Push Data to Main Server</div>
            <div class="text-subtitle2">
              Upload data to sync with the server.
              <q-btn
                color="green"
                class="q-ml-sm q-mt-md text-subtitle2"
                :loading="loadingUpload"
                @click="uploadData()"
              >
                <div>Upload Data</div>
                <q-icon name="cloud_upload" class="q-mr-sm q-ml-sm" />
                <template v-slot:loading>
                  <q-spinner size="20px" color="white" />
                </template>
              </q-btn>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="red" @click="syncdataDialog = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>

import { useUserStore } from 'src/stores/userStore'
export default {
  name: 'MyLayout',
  components: {},

  setup() {

    const userStore = useUserStore()
    return {

      userStore,
    }
  },
  data() {
    return {
      Credentials: [],
      module_access: {
        module:'',
        add:false,
        edit:false,
        delete:false,
        view:false,
        export:false,
      },
      user: {},
      online: true,
      syncdataDialog: false,
      leftDrawerOpen: false,
      expanded: true,
      loadingDownload: false,
      loadingUpload: false,
    }
  },
  methods: {
    async downloadData() {
      this.loadingDownload = true
      await new Promise(
        setTimeout(() => {
          this.loadingDownload = false
        }, 3000),
      )
    },

    async uploadData() {
      this.loadingUpload = true
      await new Promise(
        setTimeout(() => {
          this.loadingUpload = false
        }, 3000),
      )
    },

    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },

    async logout() {
      try {
        await this.userStore.logoutUser()
        this.$router.push('/login')
      } catch (error) {
        console.log(error)
      }
    },

     async GetAuthenticatedUser() {
      await this.userStore.authenticatedUserCheck()
      this.user = this.userStore.user
      this.Credentials = this.userStore.credentials

    },

    moduleAccess(label){
     const access = this.Credentials.find(module => module.module === label);
      return access? access.view: false;
    }

  },

  watch: {},
  mounted() {
    // This is where you can perform any actions when the component is mounted
    this.GetAuthenticatedUser()

  },
}
</script>
<style scoped></style>
