<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn flat dense round @click="toggleLeftDrawer" aria-label="Menu" icon="menu" />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-icon name="local_pharmacy" color="red" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold">
            City Health Office - Inventory System
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <!-- <q-btn round dense flat color="grey-8" icon="notifications"> -->
            <!-- <q-badge color="red" text-color="white" floating> 2 </q-badge> -->
            <!-- <q-tooltip>Notifications</q-tooltip> -->
          <!-- </q-btn> -->
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2" :width="240" breakpoint="500" >
      <q-scroll-area class="fit">
        <q-list>
          <q-item> </q-item>
          <q-item clickable v-ripple to="/dashboard">
            <q-icon name="dashboard" size="24px" class="q-mr-md" />
            <p class="text-sm">Dashboard</p>
          </q-item>
          <q-separator />
          <q-expansion-item v-model="expanded"
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
            <q-item clickable v-ripple  to="/customers">
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
            <q-item clickable v-ripple  to="/items/list">
              <q-item-section class="q-ml-sm">
                <q-item-label class="text-caption">
                  <q-icon name="get_app" class="q-ml-md q-mr-md" size="24px" />Stock
                  Purchases</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple  to="/inventory/adjustment">
              <q-item-section class="q-ml-sm">
                <q-item-label class="text-caption">
                  <q-icon name="lock_clock" class="q-ml-md q-mr-md" size="24px" />Stock
                  Adjustment</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/items/movement" >
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
            <q-item clickable v-ripple to="/items/reports" >
              <q-item-section class="q-ml-sm">
                <q-item-label class="text-caption">
                  <q-icon name="production_quantity_limits" class="q-ml-md q-mr-md" size="24px" />Stocks
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
                  <q-icon name="manage_accounts" class="q-ml-md q-mr-md" size="24px" />Users Management
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
    <q-page-container >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'MyLayout',
  components:{

  },

  setup() {
    const leftDrawerOpen = ref(false)

    const search = ref('')

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    return {

      leftDrawerOpen,
      search,
      toggleLeftDrawer,
    }
  },
  data(){
    return{
      expanded: true

    }
  },
  methods: {

  },

  watch: {

  }
}
</script>
<style scoped>
.fixed-drawer .q-scrollarea {
  height: 100vh;
  position: fixed;
}
</style>
