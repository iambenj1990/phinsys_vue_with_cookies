<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-blue">Pharmarcy Reports</div>
        </q-card-section>

        <q-card-section>
          <q-tabs
            align="left"
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab name="Inventory" label="Inventory" />
            <q-tab name="Expired" label="Expired Stocks" />
            <q-tab name="Low" label="Low Stocks" />
            <q-tab name="Empty" label="Zero Stocks" />
            <q-tab name="Dispense" label="Dispense" />
            <q-tab name="Temporary" label="Temporary P.O. #" />
            <q-tab name="Consumption" label="Customer Dispense" />
          </q-tabs>
          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="Inventory" v-if="moduleAccess('Inventory','view')">
              <!-- <div class="text-h6">Mails</div> -->
              <inventory />
            </q-tab-panel>

            <q-tab-panel name="Expired"  v-if="moduleAccess('Expiry','view')">
              <!-- <div class="text-h6">Alarms</div> -->
              <expire />
            </q-tab-panel>

            <q-tab-panel name="Low"  v-if="moduleAccess('Low Stocks','view')">
              <!-- <div class="text-h6">Movies</div> -->
              <low />
            </q-tab-panel>

            <q-tab-panel name="Empty"  v-if="moduleAccess('No Stocks','view')">
              <!-- <div class="text-h6">Movies</div> -->
              <Empty />
            </q-tab-panel>


            <q-tab-panel name="Dispense"  v-if="moduleAccess('Dispensed','view')">
              <!-- <div class="text-h6">Movies</div> -->
              <dispense />
            </q-tab-panel>

             <q-tab-panel name="Temporary"  v-if="moduleAccess('Temporary PO#','view')">
              <!-- <div class="text-h6">Movies</div> -->
              <tempPO />
            </q-tab-panel>

                <q-tab-panel name="Consumption"  v-if="moduleAccess('Customer Dispensed','view')">
              <!-- <div class="text-h6">Movies</div> -->
              <consumation />
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import expire from 'pages/ItemsExpiredList.vue'
import low from 'src/pages/ItemsLowStockList.vue'
import Empty from 'src/pages/ItemsEmptyStocksList.vue'
//import stock from './ItemsMovementList.vue'
import dispense from './ItemsMonthlyDispenseReport.vue'
import inventory from './ItemsInventory.vue'
import tempPO from './ItemsTemporaryPO.vue'
import consumation from './ItemsCustomerDispense.vue'

import { useUserStore } from 'src/stores/userStore'

export default {
  name: 'ItemReports',
  components: {
    tempPO,
    Empty,
    inventory,
    dispense,
    expire,
    low,
    consumation,
    // stock,
  },
  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  data() {
    return {
      Credentials:[],
      user:{},
      // Add your component data here
      tab: 'Inventory', // Default tab
    }
  },
  methods: {
    onAction() {
      // Add your action logic here
      // console.log('Action triggered')
    },

     async GetAuthenticatedUser() {
      await this.userStore.authenticatedUserCheck()
      this.user = this.userStore.user
      this.Credentials = this.userStore.credentials
    },
    moduleAccess(label, type) {
      const access = this.Credentials.find((module) => module.module === label)
      // console.log(access)
      if (type === 'view') return access ? access.view : false
      if (type === 'add') return access ? access.add : false
      if (type === 'edit') return access ? access.edit : false
      if (type === 'delete') return access ? access.delete : false
      if (type === 'export') return access ? access.export : false
    },
  },
  mounted() {

    this.GetAuthenticatedUser()

    const tabFromQuery = this.$route.query.tab
    if (tabFromQuery) {
      this.tab = tabFromQuery
    }
  },
}
</script>

<style scoped>
/* Add your styles here */
</style>
